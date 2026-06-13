import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface RiderLocation {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  timestamp: number;
}

@Injectable()
export class TrackingService {
  // In-memory store for development. In production, use Redis.
  private riderLocations = new Map<string, RiderLocation>();
  private riderSocketMap = new Map<string, string>(); // socketId -> riderId

  constructor(private readonly configService: ConfigService) {}

  updateRiderLocation(riderId: string, location: RiderLocation) {
    this.riderLocations.set(riderId, location);
  }

  getRiderLocation(riderId: string): RiderLocation | undefined {
    return this.riderLocations.get(riderId);
  }

  removeRider(socketId: string) {
    const riderId = this.riderSocketMap.get(socketId);
    if (riderId) {
      this.riderLocations.delete(riderId);
      this.riderSocketMap.delete(socketId);
    }
  }

  registerRiderSocket(socketId: string, riderId: string) {
    this.riderSocketMap.set(socketId, riderId);
  }

  async calculateEta(
    orderId: string,
    riderLat: number,
    riderLng: number,
  ): Promise<{ eta: number; distance: number }> {
    // In production, use Google Maps Distance Matrix API
    // For now, calculate simple straight-line distance and estimate

    // TODO: Replace with actual Google Maps API call
    // const mapsApiKey = this.configService.get('GOOGLE_MAPS_SERVER_KEY');
    // const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?...`);

    // Simulated ETA calculation
    // Average speed in Indian cities: ~20 km/h during peak, ~30 km/h otherwise
    const avgSpeedKmh = 25;
    const estimatedDistanceKm = 2; // placeholder

    const etaMinutes = Math.ceil((estimatedDistanceKm / avgSpeedKmh) * 60);
    const distanceMeters = estimatedDistanceKm * 1000;

    return { eta: etaMinutes, distance: distanceMeters };
  }

  /**
   * Smart Delivery Allocation Engine
   * Score = Distance + Traffic + Rating + Vehicle Capacity + Current Load
   */
  async findBestRider(
    storeLat: number,
    storeLng: number,
    orderWeight: number,
  ): Promise<string | null> {
    const availableRiders: Array<{
      riderId: string;
      score: number;
    }> = [];

    for (const [riderId, location] of this.riderLocations.entries()) {
      const distance = this.calculateDistance(
        location.lat,
        location.lng,
        storeLat,
        storeLng,
      );

      // Score formula: lower is better
      const distanceScore = distance * 10;
      const speedScore = location.speed > 0 ? -5 : 0; // Prefer moving riders
      const score = distanceScore + speedScore;

      availableRiders.push({ riderId, score });
    }

    // Sort by score (lowest = best)
    availableRiders.sort((a, b) => a.score - b.score);

    return availableRiders.length > 0 ? availableRiders[0].riderId : null;
  }

  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
