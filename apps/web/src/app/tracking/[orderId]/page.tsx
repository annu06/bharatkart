'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  setActiveOrder,
  updateStatus,
  updateRiderLocation,
  updateEta,
  setRiderInfo,
  setRoute,
  OrderTrackingStatus,
} from '@/store/slices/tracking-slice';
import { LiveMap } from '@/components/tracking/live-map';
import { TrackingTimeline } from '@/components/tracking/tracking-timeline';
import { RiderCard } from '@/components/tracking/rider-card';
import { useSocket } from '@/hooks/use-socket';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function TrackingPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useDispatch();
  const { status, riderLocation, eta, distanceRemaining, riderInfo, route } =
    useSelector((state: RootState) => state.tracking);

  const socket = useSocket();

  useEffect(() => {
    if (orderId) {
      dispatch(setActiveOrder(orderId));
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    if (!socket || !orderId) return;

    socket.emit('join:order', { orderId });

    socket.on('order:status', (data: { status: OrderTrackingStatus }) => {
      dispatch(updateStatus(data.status));
    });

    socket.on(
      'rider:location',
      (data: {
        lat: number;
        lng: number;
        heading: number;
        speed: number;
        timestamp: number;
      }) => {
        dispatch(updateRiderLocation(data));
      }
    );

    socket.on('order:eta', (data: { eta: number; distance: number }) => {
      dispatch(updateEta(data));
    });

    socket.on('rider:info', (data: typeof riderInfo) => {
      dispatch(setRiderInfo(data));
    });

    socket.on('order:route', (data: Array<{ lat: number; lng: number }>) => {
      dispatch(setRoute(data));
    });

    return () => {
      socket.emit('leave:order', { orderId });
      socket.off('order:status');
      socket.off('rider:location');
      socket.off('order:eta');
      socket.off('rider:info');
      socket.off('order:route');
    };
  }, [socket, orderId, dispatch]);

  const getStatusMessage = useCallback(() => {
    switch (status) {
      case 'order_placed':
        return 'Order placed successfully!';
      case 'store_accepted':
        return 'Store accepted your order';
      case 'picking':
        return 'Your items are being picked';
      case 'packing':
        return 'Your order is being packed';
      case 'packed':
        return 'Order is packed and ready';
      case 'rider_assigned':
        return 'Delivery partner assigned';
      case 'rider_at_store':
        return 'Rider reached the store';
      case 'picked_up':
        return 'Order picked up';
      case 'on_the_way':
        return 'Your order is on the way!';
      case 'near_customer':
        return 'Rider is nearby!';
      case 'delivered':
        return 'Order delivered! 🎉';
      default:
        return 'Tracking your order...';
    }
  }, [status]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/orders"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-gray-900">
              {getStatusMessage()}
            </h1>
            {eta && (
              <p className="text-xs text-gray-500">
                Arriving in {eta} min • {((distanceRemaining || 0) / 1000).toFixed(1)} km away
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Live Map */}
      <div className="h-[45vh] relative">
        <LiveMap
          riderLocation={riderLocation}
          route={route}
          status={status}
        />
        {/* ETA Badge */}
        {eta && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 bg-white rounded-xl shadow-lg px-4 py-2"
          >
            <p className="text-xs text-gray-500">ETA</p>
            <p className="text-xl font-bold text-brand-500">{eta} min</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-t-3xl -mt-6 relative z-10 shadow-xl min-h-[40vh] p-6"
      >
        {/* Rider Card */}
        {riderInfo && (
          <RiderCard
            name={riderInfo.name}
            photo={riderInfo.photo}
            vehicleNumber={riderInfo.vehicleNumber}
            rating={riderInfo.rating}
            phone={riderInfo.phone}
          />
        )}

        {/* Timeline */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Order Status
          </h3>
          <TrackingTimeline currentStatus={status} />
        </div>
      </motion.div>
    </main>
  );
}
