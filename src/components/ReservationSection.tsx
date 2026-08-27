import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  Sparkles, 
  Check, 
  MapPin, 
  Flame, 
  Wine, 
  UtensilsCrossed, 
  AlertCircle, 
  Share2, 
  Calendar as CalendarIcon,
  Search,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Reservation, SeatingArea, ReservationOccasion } from '../types';
import { SEATING_AREAS, AVAILABLE_TIME_SLOTS } from '../data/restaurantData';

interface ReservationSectionProps {
  onReservationSuccess: (reservation: Reservation) => void;
  onOpenLookup: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationSuccess,
  onOpenLookup,
}) => {
  // Form State
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('7:00 PM');
  const [selectedSeatingArea, setSelectedSeatingArea] = useState<SeatingArea>('main_dining');
  const [occasion, setOccasion] = useState<ReservationOccasion>('date_night');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Guest Details
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Quick Date Shortcut buttons
  const getQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name, email, and mobile phone number.');
      return;
    }

    if (!selectedDate || !selectedTimeSlot) {
      setErrorMessage('Please pick a date and desired time slot.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName,
        email,
        phone,
        guestsCount,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        seatingArea: selectedSeatingArea,
        occasion,
        specialRequests,
      };

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Unable to confirm reservation.');
      }

      // Celebratory Confetti Burst
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#d97706', '#10b981', '#ffffff'],
        });
      } catch (e) {
        // non-fatal
      }

      setConfirmedReservation(data.reservation);
      onReservationSuccess(data.reservation);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong while booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAreaObj = SEATING_AREAS.find((a) => a.id === selectedSeatingArea);

  const createCalendarUrl = (res: Reservation) => {
    const title = encodeURIComponent(`Dinner at L'Aura - Table for ${res.guestsCount}`);
    const details = encodeURIComponent(
      `Confirmation Code: ${res.confirmationCode}\nSeating Area: ${res.seatingArea}\nOccasion: ${res.occasion}\nAddress: 428 King Street West, Toronto\nPhone: (416) 882-5910`
    );
    const location = encodeURIComponent("L'Aura Restaurant, 428 King Street West, Toronto, ON");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="reserve" className="py-24 px-6 sm:px-10 lg:px-12 bg-[#050505] text-[#f5f5f5] border-b border-white/5 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-[#c5a059]" />
            <span className="text-[#c5a059] uppercase tracking-[0.4em] text-[10px] font-semibold">
              Table Reservations
            </span>
            <div className="h-[1px] w-8 bg-[#c5a059]" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light serif tracking-tight text-[#f5f5f5] mb-5">
            Book Your Dining Experience
          </h2>
          <p className="text-white/45 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Choose your preferred dining atmosphere, from our Grand Dining Room to the heated Olive Courtyard or front-row Chef’s Hearth counter.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] uppercase tracking-widest text-[#c5a059]">
            <span>• Instant Email & SMS Confirmation</span>
            <span>• No Cancellation Fees up to 2h Prior</span>
            <button
              onClick={onOpenLookup}
              className="text-white/60 hover:text-[#c5a059] underline font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Search className="w-3 h-3" />
              <span>Already have a booking?</span>
            </button>
          </div>
        </div>

        {/* Confirmed State View */}
        {confirmedReservation ? (
          <div className="max-w-2xl mx-auto bg-[#0e0e0e] border border-[#c5a059]/40 p-8 sm:p-10 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                Reservation Confirmed
              </span>
              <h3 className="serif text-3xl font-light text-[#f5f5f5] mt-1">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs text-white/50 mt-2">
                A confirmation voucher has been sent to <span className="text-[#c5a059] font-medium">{confirmedReservation.email}</span>.
              </p>
            </div>

            {/* Confirmation Ticket Badge */}
            <div className="p-5 bg-black/60 border border-white/10 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-white/50">Booking Reference</span>
                <span className="text-lg font-mono font-bold text-[#c5a059] tracking-widest">
                  {confirmedReservation.confirmationCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Date & Time</span>
                  <span className="text-white/90 font-medium">
                    {confirmedReservation.date} at {confirmedReservation.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Party Size</span>
                  <span className="text-white/90 font-medium">
                    {confirmedReservation.guestsCount} Guests
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Seating Area</span>
                  <span className="text-white/90 font-medium capitalize">
                    {confirmedReservation.seatingArea.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 block">Occasion</span>
                  <span className="text-white/90 font-medium capitalize">
                    {confirmedReservation.occasion.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {confirmedReservation.specialRequests && (
                <div className="pt-2 border-t border-white/10 text-xs text-[#c5a059]/90 italic">
                  Note: "{confirmedReservation.specialRequests}"
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={createCalendarUrl(confirmedReservation)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </a>

              <button
                onClick={() => setConfirmedReservation(null)}
                className="py-3 px-4 border border-white/20 text-white hover:bg-white hover:text-black font-medium text-[11px] uppercase tracking-widest transition-colors cursor-pointer"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Wizard Form */
          <form 
            id="table-reservation-form"
            onSubmit={handleBookingSubmit} 
            className="bg-[#0e0e0e] border border-white/5 p-6 sm:p-10 space-y-10"
          >
            {/* Step 1: Party Size */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>1. Select Number of Guests</span>
              </label>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setGuestsCount(count)}
                    className={`py-3 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                      guestsCount === count
                        ? 'bg-[#c5a059] text-black font-bold shadow-lg'
                        : 'border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {count} {count === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>2. Choose Dining Date</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDate(getQuickDate(0))}
                    className="px-3 py-1 text-[10px] uppercase tracking-widest border border-white/10 bg-white/[0.02] text-white/60 hover:text-[#c5a059]"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(getQuickDate(1))}
                    className="px-3 py-1 text-[10px] uppercase tracking-widest border border-white/10 bg-white/[0.02] text-white/60 hover:text-[#c5a059]"
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(getQuickDate(2))}
                    className="px-3 py-1 text-[10px] uppercase tracking-widest border border-white/10 bg-white/[0.02] text-white/60 hover:text-[#c5a059]"
                  >
                    In 2 Days
                  </button>
                </div>
              </div>

              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-[#f5f5f5] text-xs focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>

            {/* Step 3: Time Slot Selector */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>3. Select Preferred Time Slot</span>
              </label>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold block">
                  Dinner Service (17:00 – 22:30)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {AVAILABLE_TIME_SLOTS.filter((s) => s.period === 'Dinner').map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-2.5 px-2 text-xs uppercase tracking-wider relative transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c5a059] text-black font-bold shadow-lg'
                            : 'border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {slot.time}
                        {slot.popular && !isSelected && (
                          <span className="absolute -top-1.5 -right-1 px-1 py-0.2 bg-black border border-[#c5a059]/40 text-[#c5a059] text-[8px] uppercase tracking-normal">
                            Peak
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold block pt-2">
                  Lunch / Afternoon Service (11:30 – 14:30)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {AVAILABLE_TIME_SLOTS.filter((s) => s.period === 'Lunch').map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-2.5 px-2 text-xs uppercase tracking-wider transition-all ${
                          !slot.available
                            ? 'opacity-20 cursor-not-allowed border border-white/5 text-white/20'
                            : isSelected
                            ? 'bg-[#c5a059] text-black font-bold shadow-lg'
                            : 'border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20 cursor-pointer'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Seating Ambiance Area */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold flex items-center gap-2">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>4. Select Seating Atmosphere</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SEATING_AREAS.map((area) => {
                  const isSelected = selectedSeatingArea === area.id;
                  return (
                    <div
                      key={area.id}
                      onClick={() => setSelectedSeatingArea(area.id)}
                      className={`cursor-pointer border overflow-hidden transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#c5a059]/10 border-[#c5a059]'
                          : 'bg-[#0a0a0a] border-white/10 hover:border-white/30 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="relative h-32 w-full overflow-hidden bg-black">
                        <img
                          src={area.image}
                          alt={area.name}
                          className="w-full h-full object-cover opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                        <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-black/80 text-[#c5a059] border border-white/10">
                          {area.badge}
                        </span>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className={`text-xs uppercase tracking-wider font-semibold ${isSelected ? 'text-[#c5a059]' : 'text-white'}`}>
                            {area.name}
                          </h4>
                          <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed mt-1 font-light">
                            {area.description}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-wider border-t border-white/5">
                          <span>{area.capacityText}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Occasion & Special Requests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold mb-2">
                  Dining Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as ReservationOccasion)}
                  className="w-full px-4 py-3 text-xs bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="casual" className="bg-black text-white">Casual Dining</option>
                  <option value="date_night" className="bg-black text-white">Romantic Date Night</option>
                  <option value="birthday" className="bg-black text-white">Birthday Celebration</option>
                  <option value="anniversary" className="bg-black text-white">Anniversary Dinner</option>
                  <option value="business" className="bg-black text-white">Business / Client Dinner</option>
                  <option value="celebration" className="bg-black text-white">Special Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold mb-2">
                  Dietary Restrictions or Table Notes
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Nut allergy, quiet booth..."
                  className="w-full px-4 py-3 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {/* Step 6: Guest Contact Info */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold">
                5. Guest Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jacqueline Sterling"
                    className="w-full px-4 py-3 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jacqueline@sterling.com"
                    className="w-full px-4 py-3 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(416) 555-0188"
                    className="w-full px-4 py-3 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/40 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Confirm Booking CTA */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5">
              <div className="text-xs text-white/40 text-center sm:text-left">
                <span>Reserving for </span>
                <span className="text-[#c5a059] font-medium">{guestsCount} Guests</span>
                <span> on </span>
                <span className="text-[#c5a059] font-medium">{selectedDate}</span>
                <span> at </span>
                <span className="text-[#c5a059] font-medium">{selectedTimeSlot}</span>
                <span> in the </span>
                <span className="text-[#c5a059] font-medium capitalize">{selectedSeatingArea.replace('_', ' ')}</span>.
              </div>

              <button
                type="submit"
                id="submit-table-reservation-btn"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Securing Table...' : 'Confirm Table Reservation'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
