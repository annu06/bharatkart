import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrackingService } from './tracking.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://bharatkart.vercel.app'],
    credentials: true,
  },
  transports: ['websocket'],
})
export class TrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly trackingService: TrackingService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.trackingService.removeRider(client.id);
  }

  @SubscribeMessage('join:order')
  handleJoinOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { orderId: string },
  ) {
    client.join(`order:${data.orderId}`);
    console.log(`Client ${client.id} joined order:${data.orderId}`);
  }

  @SubscribeMessage('leave:order')
  handleLeaveOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { orderId: string },
  ) {
    client.leave(`order:${data.orderId}`);
  }

  @SubscribeMessage('rider:update-location')
  handleRiderLocationUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      riderId: string;
      orderId: string;
      lat: number;
      lng: number;
      heading: number;
      speed: number;
    },
  ) {
    const locationData = {
      lat: data.lat,
      lng: data.lng,
      heading: data.heading,
      speed: data.speed,
      timestamp: Date.now(),
    };

    // Store location in Redis for persistence
    this.trackingService.updateRiderLocation(data.riderId, locationData);

    // Broadcast to order room (customer watching the order)
    this.server.to(`order:${data.orderId}`).emit('rider:location', locationData);

    // Calculate and emit ETA
    this.trackingService
      .calculateEta(data.orderId, data.lat, data.lng)
      .then((eta) => {
        this.server.to(`order:${data.orderId}`).emit('order:eta', eta);
      });
  }

  @SubscribeMessage('order:update-status')
  handleOrderStatusUpdate(
    @MessageBody() data: { orderId: string; status: string },
  ) {
    this.server.to(`order:${data.orderId}`).emit('order:status', {
      status: data.status,
    });
  }

  // Emit rider info when assigned
  emitRiderAssigned(
    orderId: string,
    riderInfo: {
      name: string;
      phone: string;
      photo: string;
      vehicleNumber: string;
      rating: number;
    },
  ) {
    this.server.to(`order:${orderId}`).emit('rider:info', riderInfo);
    this.server.to(`order:${orderId}`).emit('order:status', {
      status: 'rider_assigned',
    });
  }

  // Emit route to customer
  emitRoute(orderId: string, route: Array<{ lat: number; lng: number }>) {
    this.server.to(`order:${orderId}`).emit('order:route', route);
  }
}
