import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Flame, 
  Award, 
  Wine, 
  Car, 
  HelpCircle, 
  ChevronDown, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const StoryHoursLocationSection: React.FC = () => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Private Wine Cellar (up to 14 guests)');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is there valet parking available?",
      a: "Yes, complimentary white-glove valet parking is offered at our King Street entrance Thursday through Sunday starting at 5:00 PM. Public underground parking is also available across the street."
    },
    {
      q: "What is the restaurant dress code?",
      a: "Our dress code is Smart Casual / Elegant. We kindly request no athletic wear, beachwear, or baseball caps in our Grand Dining Room and Sommelier Vault."
    },
    {
      q: "Can you accommodate severe allergies & dietary preferences?",
      a: "Absolutely. Our kitchen prepares dedicated gluten-free and vegetarian course variations. Please inform our host upon booking or in your online order notes."
    },
    {
      q: "What is the corkage policy?",
      a: "Guests may bring special personal cellar bottles not currently featured on our wine list. Corkage fee is $50 per 750ml bottle (maximum 2 bottles per party)."
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setInquirySubmitted(true);
  };

  return (
    <section id="story" className="py-24 px-6 sm:px-10 lg:px-12 bg-[#0a0a0a] text-[#f5f5f5] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* 1. Chef & Sommelier Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img
                src={RESTAURANT_INFO.chef.photo}
                alt={RESTAURANT_INFO.chef.name}
                className="w-full h-[480px] object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#c5a059]">
                  {RESTAURANT_INFO.chef.subtitle}
                </span>
                <h3 className="serif text-2xl font-light text-[#f5f5f5] mt-1">
                  {RESTAURANT_INFO.chef.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-[#c5a059]" />
              <span className="text-[#c5a059] uppercase tracking-[0.4em] text-[10px] font-semibold">
                Culinary Ethos
              </span>
              <div className="h-[1px] w-8 bg-[#c5a059]" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-light serif tracking-tight text-[#f5f5f5] leading-tight">
              Rooted in Tuscan Fire, <br />
              <span className="text-[#c5a059] italic font-normal">Crafted with Modern Precision</span>
            </h2>

            <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light">
              {RESTAURANT_INFO.chef.bio}
            </p>

            <blockquote className="p-5 bg-white/[0.02] border-l-2 border-[#c5a059] text-white/80 text-xs sm:text-sm italic font-serif leading-relaxed">
              "{RESTAURANT_INFO.chef.quote}"
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-[#0e0e0e] border border-white/5">
                <Wine className="w-4 h-4 text-[#c5a059] mb-2.5" />
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#f5f5f5]">{RESTAURANT_INFO.sommelier.name}</h4>
                <p className="text-[11px] text-white/40 mt-1 font-light leading-relaxed">{RESTAURANT_INFO.sommelier.bio}</p>
              </div>

              <div className="p-5 bg-[#0e0e0e] border border-white/5">
                <Award className="w-4 h-4 text-[#c5a059] mb-2.5" />
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#f5f5f5]">Michelin Guide 2025</h4>
                <p className="text-[11px] text-white/40 mt-1 font-light leading-relaxed">Recognized for artisanal excellence & woodfire gastronomy.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Hours, Location, and Interactive Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hours Card */}
          <div className="p-8 bg-[#0e0e0e] border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#c5a059]" />
                <h3 className="serif text-2xl font-light text-[#f5f5f5]">
                  Hours of Service
                </h3>
              </div>
              <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[9px] uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Open Today
              </span>
            </div>

            <div className="space-y-4 divide-y divide-white/5 text-xs">
              {RESTAURANT_INFO.openingHours.map((schedule, i) => (
                <div key={i} className="pt-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/80 font-medium">{schedule.days}</span>
                  <div className="text-right text-white/40 space-x-2">
                    {schedule.lunch && <span>Lunch: <strong className="text-[#c5a059] font-normal">{schedule.lunch}</strong></span>}
                    {schedule.brunch && <span>Brunch: <strong className="text-[#c5a059] font-normal">{schedule.brunch}</strong></span>}
                    <span>• Dinner: <strong className="text-[#c5a059] font-normal">{schedule.dinner}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 text-xs text-white/40 flex items-center gap-2">
              <Car className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span>Complimentary Valet Parking available Thursday – Sunday from 17:00.</span>
            </div>
          </div>

          {/* Location & Directions Card */}
          <div className="p-8 bg-[#0e0e0e] border border-white/5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#c5a059]" />
                <h3 className="serif text-2xl font-light text-[#f5f5f5]">
                  Location & Contact
                </h3>
              </div>

              <div className="space-y-2 text-xs text-white/70">
                <p className="font-normal text-[#f5f5f5] text-sm">
                  {RESTAURANT_INFO.address}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-white/40 pt-1">
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#c5a059] flex items-center gap-1.5 transition-colors">
                    <Phone className="w-3 h-3 text-[#c5a059]" />
                    <span>{RESTAURANT_INFO.phone}</span>
                  </a>
                  <span className="hidden sm:inline">•</span>
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#c5a059] flex items-center gap-1.5 transition-colors">
                    <Mail className="w-3 h-3 text-[#c5a059]" />
                    <span>{RESTAURANT_INFO.email}</span>
                  </a>
                </div>
              </div>

              {/* Map View Frame */}
              <div className="relative h-36 w-full overflow-hidden border border-white/10 bg-black flex items-center justify-center group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                  alt="King Street West Location Map"
                  className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3 text-center">
                  <MapPin className="w-5 h-5 text-[#c5a059] animate-bounce" />
                  <span className="text-xs font-medium text-[#f5f5f5] mt-1">428 King Street West, Toronto</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] flex items-center gap-1 mt-1">
                    Get Directions <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <a
                href="https://maps.google.com/?q=428+King+Street+West+Toronto"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white text-[10px] uppercase tracking-widest font-semibold text-center transition-colors"
              >
                Google Maps
              </a>
              <a
                href="tel:4168825910"
                className="py-3 px-6 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call Host</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Private Dining, Catering & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-[#c5a059]" />
              <h3 className="serif text-2xl font-light text-[#f5f5f5]">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    className="border border-white/5 bg-[#0e0e0e] overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs uppercase tracking-wider text-white/80 hover:text-[#c5a059] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#c5a059] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-white/50 leading-relaxed font-light animate-in fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Private Event / Catering Inquiry */}
          <div className="lg:col-span-6 p-8 bg-[#0e0e0e] border border-white/5 space-y-5">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <h3 className="serif text-2xl font-light text-[#f5f5f5]">
                Private Events & Vault Tastings
              </h3>
            </div>
            <p className="text-xs text-white/40 font-light leading-relaxed">
              Inquire about hosting executive dinners, wedding celebrations, or private wine vault tastings.
            </p>

            {inquirySubmitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
                <h4 className="text-xs uppercase tracking-widest font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-white/60 font-light">
                  Our private events director will reach out within 24 hours with custom menus and cellar pairings.
                </p>
                <button
                  type="button"
                  onClick={() => setInquirySubmitted(false)}
                  className="mt-2 text-[10px] uppercase tracking-widest text-[#c5a059] underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full px-4 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                  />
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="Your Email *"
                    className="w-full px-4 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="Private Wine Cellar (up to 14 guests)" className="bg-black text-white">The Sommelier Vault (4 to 14 guests)</option>
                  <option value="Heated Courtyard Buyout (up to 40 guests)" className="bg-black text-white">Heated Olive Courtyard Buyout (20 to 40 guests)</option>
                  <option value="Full Restaurant Buyout (up to 120 guests)" className="bg-black text-white">Full Restaurant Buyout (up to 120 guests)</option>
                  <option value="Off-Site Artisanal Woodfire Catering" className="bg-black text-white">Off-Site Artisanal Woodfire Catering</option>
                </select>

                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Estimated date, guest count, and vision..."
                  className="w-full px-4 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Request Private Event Proposal</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
