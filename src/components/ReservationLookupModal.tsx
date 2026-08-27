import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CalendarDays, 
  Clock, 
  Users, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Ban,
  Calendar
} from 'lucide-react';
import { Reservation } from '../types';

interface ReservationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationLookupModal: React.FC<ReservationLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [searchCode, setSearchCode] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setLoading(true);
    setError('');
    setReservation(null);
    setCancelSuccess(false);

    try {
      const res = await fetch(`/api/reservations/${searchCode.trim().toUpperCase()}`);
      const data = await res.json();

      if (!res.ok || !data.reservation) {
        throw new Error('No reservation found matching this booking code.');
      }

      setReservation(data.reservation);
    } catch (err: any) {
      setError(err.message || 'Lookup failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async () => {
    if (!reservation) return;
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      const res = await fetch(`/api/reservations/${reservation.confirmationCode}/cancel`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReservation(data.reservation);
        setCancelSuccess(true);
      }
    } catch (err) {
      alert('Failed to cancel reservation. Please call the restaurant directly.');
    }
  };

  return (
    <div 
      id="reservation-lookup-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/10 shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold block mb-1">
              Table Management
            </span>
            <h3 className="serif text-2xl font-light text-[#f5f5f5]">
              Manage Your Reservation
            </h3>
            <p className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">
              Enter your booking reference code (e.g., LAURA-9482)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              required
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="e.g. LAURA-9482"
              className="w-full pl-10 pr-3 py-3 text-xs bg-black border border-white/10 text-white placeholder:text-white/30 uppercase font-mono tracking-wider focus:outline-none focus:border-[#c5a059]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer disabled:opacity-40"
          >
            {loading ? 'Searching...' : 'Find'}
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/40 text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {reservation && (
          <div className="p-5 bg-black border border-white/5 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/40 font-semibold block">Guest Name</span>
                <span className="serif text-lg font-light text-white">{reservation.fullName}</span>
              </div>
              <span className={`px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-bold ${
                reservation.status === 'confirmed'
                  ? 'bg-emerald-950/60 border border-emerald-500/60 text-emerald-300'
                  : 'bg-red-950/60 border border-red-500/60 text-red-300'
              }`}>
                {reservation.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-light">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-0.5">Date & Time</span>
                <span className="text-white/80">{reservation.date} at {reservation.timeSlot}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-0.5">Party Size</span>
                <span className="text-white/80">{reservation.guestsCount} Guests</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-0.5">Seating Area</span>
                <span className="text-white/80 capitalize">{reservation.seatingArea.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-0.5">Occasion</span>
                <span className="text-white/80 capitalize">{reservation.occasion.replace('_', ' ')}</span>
              </div>
            </div>

            {reservation.status === 'confirmed' && (
              <div className="pt-3 border-t border-white/5 flex justify-end">
                <button
                  type="button"
                  onClick={handleCancelReservation}
                  className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 flex items-center gap-1.5 py-1.5 px-3 bg-red-950/20 border border-red-900/30 cursor-pointer"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Cancel Reservation</span>
                </button>
              </div>
            )}

            {cancelSuccess && (
              <p className="text-xs text-[#c5a059] font-light text-center">
                Your reservation has been cancelled.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
