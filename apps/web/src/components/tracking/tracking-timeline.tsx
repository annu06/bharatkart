'use client';

import { Check, Package, Store, Truck, MapPin, PartyPopper } from 'lucide-react';
import { OrderTrackingStatus } from '@/store/slices/tracking-slice';
import { cn } from '@/lib/utils';

interface TrackingTimelineProps {
  currentStatus: OrderTrackingStatus | null;
}

const timelineSteps = [
  { status: 'order_placed', label: 'Order Placed', icon: Check },
  { status: 'store_accepted', label: 'Store Accepted', icon: Store },
  { status: 'picking', label: 'Picking Items', icon: Package },
  { status: 'packed', label: 'Order Packed', icon: Package },
  { status: 'rider_assigned', label: 'Rider Assigned', icon: Truck },
  { status: 'picked_up', label: 'Picked Up', icon: Truck },
  { status: 'on_the_way', label: 'On The Way', icon: MapPin },
  { status: 'delivered', label: 'Delivered', icon: PartyPopper },
];

const statusOrder: OrderTrackingStatus[] = [
  'order_placed',
  'store_accepted',
  'picking',
  'packing',
  'packed',
  'rider_assigned',
  'rider_at_store',
  'picked_up',
  'on_the_way',
  'near_customer',
  'delivered',
];

export function TrackingTimeline({ currentStatus }: TrackingTimelineProps) {
  const currentIndex = currentStatus
    ? statusOrder.indexOf(currentStatus)
    : -1;

  const isCompleted = (status: string) => {
    const stepIndex = statusOrder.indexOf(status as OrderTrackingStatus);
    return stepIndex <= currentIndex;
  };

  const isCurrent = (status: string) => {
    // Map simplified timeline status to actual status
    if (status === 'picking' && (currentStatus === 'picking' || currentStatus === 'packing')) return true;
    if (status === 'on_the_way' && (currentStatus === 'on_the_way' || currentStatus === 'near_customer')) return true;
    if (status === 'rider_assigned' && (currentStatus === 'rider_assigned' || currentStatus === 'rider_at_store')) return true;
    return status === currentStatus;
  };

  return (
    <div className="space-y-0">
      {timelineSteps.map((step, index) => {
        const completed = isCompleted(step.status);
        const current = isCurrent(step.status);
        const Icon = step.icon;

        return (
          <div key={step.status} className="flex items-start gap-3">
            {/* Line + Dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all',
                  completed
                    ? 'bg-brand-500 border-brand-500'
                    : current
                    ? 'bg-white border-brand-500'
                    : 'bg-white border-gray-200'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4',
                    completed
                      ? 'text-white'
                      : current
                      ? 'text-brand-500'
                      : 'text-gray-300'
                  )}
                />
              </div>
              {index < timelineSteps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-8',
                    completed ? 'bg-brand-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div className="pt-1 pb-4">
              <p
                className={cn(
                  'text-sm font-medium',
                  completed || current ? 'text-gray-900' : 'text-gray-400'
                )}
              >
                {step.label}
              </p>
              {current && (
                <p className="text-xs text-brand-500 mt-0.5 animate-pulse">
                  In progress...
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
