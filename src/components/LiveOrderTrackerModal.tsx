import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ChefHat, 
  Truck, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Sparkles,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface LiveOrderTrackerModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrderStatus?: (orderId: string, status: OrderStatus) => void;
}

const STAGES: { status: OrderStatus; label: string; description: string; icon: any }[] = [
  {
    status: 'confirmed',
    label: 'Order Confirmed',
    description: 'Ticket received by Executive Chef Marco’s kitchen brigade.',
    icon: CheckCircle2,
  },
  {
    status: 'in_kitchen',
    label: 'Handcrafting & Prep',
    description: 'Fresh pasta rolled, crudo sliced, and ingredients seasoned.',
    icon: ChefHat,
  },
  {
    status: 'in_oven',
    label: 'Woodfire Ember Cooking',
    description: 'Dishes roasting over 900°F oak wood embers.',
    icon: Flame,
  },
  {
    status: 'out_for_delivery',
    label: 'Courier In Transit / Ready',
    description: 'Packed in insulated thermal boxes with fresh herbs.',
    icon: Truck,
  },
  {
    status: 'delivered',
    label: 'Delivered & Complete',
    description: 'Buon Appetito! Enjoy your artisanal culinary feast.',
    icon: Sparkles,
  },
];

export const LiveOrderTrackerModal: React.FC<LiveOrderTrackerModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateOrderStatus,
}) => {
  if (!isOpen || !order) return null;

  const [currentStatusIndex, setCurrentStatusIndex] = useState<number>(() => {
    const idx = STAGES.findIndex((s) => s.status === order.status);
    return idx >= 0 ? idx : 1;
  });

  const [remainingMinutes, setRemainingMinutes] = useState(order.estimatedMinutes || 35);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const advanceStage = () => {
    if (currentStatusIndex < STAGES.length - 1) {
      const nextIndex = currentStatusIndex + 1;
      setCurrentStatusIndex(nextIndex);
      if (onUpdateOrderStatus) {
        onUpdateOrderStatus(order.id, STAGES[nextIndex].status);
      }
    }
  };

  return (
    <div 
      id="live-order-tracker-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e0e] border border-white/10 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tracker Header */}
        <div className="p-5 sm:p-6 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Live Kitchen Dispatch
              </span>
            </div>
            <h2 className="serif text-2xl sm:text-3xl font-light text-[#f5f5f5]">
              Order #{order.orderNumber}
            </h2>
            <p className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">
              Placed for {order.customer.fullName} • {order.fulfillmentType.toUpperCase()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close order tracker"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Estimated Time Card */}
          <div className="p-5 bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">Estimated Arrival / Readiness</span>
                <div className="serif text-2xl sm:text-3xl font-light text-[#c5a059]">
                  {currentStatusIndex >= 4 ? 'Ready & Delivered!' : `~ ${remainingMinutes} Minutes`}
                </div>
              </div>
            </div>

            {/* Test Simulation Button */}
            {currentStatusIndex < STAGES.length - 1 && (
              <button
                type="button"
                onClick={advanceStage}
                className="px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-[#c5a059] text-[10px] uppercase tracking-widest font-bold border border-white/10 flex items-center gap-1.5 self-end sm:self-center cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate Step</span>
              </button>
            )}
          </div>

          {/* Stepper Progression */}
          <div className="space-y-4 pt-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold">
              Cooking & Dispatch Timeline
            </h3>

            <div className="space-y-5 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-px before:bg-white/10">
              {STAGES.map((stage, idx) => {
                const isCompleted = idx < currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                const isPending = idx > currentStatusIndex;
                const IconComponent = stage.icon;

                return (
                  <div key={stage.status} className="relative flex items-start gap-4 pl-0.5">
                    {/* Step Icon */}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        isCurrent
                          ? 'bg-[#c5a059] border-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20'
                          : isCompleted
                          ? 'bg-emerald-600/80 border-emerald-500/50 text-white'
                          : 'bg-black border-white/10 text-white/30'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs uppercase tracking-wider ${
                            isCurrent
                              ? 'text-[#c5a059] font-bold'
                              : isCompleted
                              ? 'text-white/80 font-medium'
                              : 'text-white/30'
                          }`}
                        >
                          {stage.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] uppercase tracking-widest font-bold text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 border border-[#c5a059]/30 animate-pulse">
                            In Progress
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/40 mt-0.5 font-light">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery or Pickup Address Card */}
          <div className="p-4 bg-black/40 border border-white/5 text-xs space-y-1.5 font-light">
            <div className="font-medium text-white/80 flex items-center gap-2 text-[10px] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>
                {order.fulfillmentType === 'delivery' ? 'Delivery Destination' : 'Pickup Location'}
              </span>
            </div>
            <p className="text-white/70">
              {order.fulfillmentType === 'delivery'
                ? `${order.customer.address} ${order.customer.apartment ? `(${order.customer.apartment})` : ''}`
                : "L'Aura Host Stand: 428 King Street West, Toronto, ON"}
            </p>
            {order.customer.deliveryNotes && (
              <p className="text-[#c5a059]/80 italic text-[11px]">
                Notes: "{order.customer.deliveryNotes}"
              </p>
            )}
          </div>

          {/* Items Recap */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
              Items Ordered ({order.items.length})
            </span>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs p-2.5 bg-black/40 border border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-white/5 flex items-center justify-center font-mono text-[#c5a059] text-[10px]">
                      {item.quantity}x
                    </span>
                    <span className="text-white/80 font-light">{item.menuItem.name}</span>
                  </div>
                  <span className="font-mono text-[#c5a059]">
                    ${item.itemTotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm font-normal text-white pt-2">
              <span className="serif">Grand Total Paid</span>
              <span className="font-mono text-[#c5a059] font-bold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Support Hotline */}
        <div className="p-4 sm:p-5 bg-[#0a0a0a] border-t border-white/5 flex items-center justify-between">
          <a
            href="tel:4168825910"
            className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#c5a059] hover:text-[#d8b46e] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Host Hotline: (416) 882-5910</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 text-[10px] uppercase tracking-widest font-bold border border-white/10 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
