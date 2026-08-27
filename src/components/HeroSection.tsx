import React from 'react';
import { 
  Calendar, 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  Award, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Wine, 
  Utensils 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onReserveClick?: () => void;
  onOrderClick?: () => void;
  onExploreMenuClick?: () => void;
  onSommelierClick?: () => void;
  onOpenReservation?: () => void;
  onOpenCart?: () => void;
  onOpenSommelier?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onReserveClick,
  onOrderClick,
  onExploreMenuClick,
  onSommelierClick,
  onOpenReservation,
  onOpenCart,
  onOpenSommelier,
}) => {
  const handleReserve = onOpenReservation || onReserveClick || (() => {
    document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
  });
  const handleOrder = onOpenCart || onOrderClick || (() => {});
  const handleSommelier = onOpenSommelier || onSommelierClick || (() => {});
  const handleExploreMenu = onExploreMenuClick || (() => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-12 bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden border-b border-white/5"
    >
      {/* Subtle Background Glow and Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#c5a059]/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch my-auto pt-6 pb-8">
        {/* Left Col: Michelin Branding & Editorial Headline */}
        <div className="lg:col-span-7 flex flex-col justify-center lg:pr-16 py-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#c5a059]" />
            <span className="text-[#c5a059] uppercase tracking-[0.4em] text-[10px] font-semibold">
              Michelin Star Dining • Toronto
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light leading-[0.92] mb-8 serif tracking-tighter text-[#f5f5f5]">
            The Art of <br />
            Seasonal <br />
            <span className="italic text-[#c5a059]">Woodfire</span>
          </h1>

          <p className="text-white/50 max-w-lg leading-relaxed mb-10 text-xs sm:text-sm font-light">
            Experience an exquisite journey through contemporary Tuscan woodfire gastronomy. 
            Hand-rolled daily pasta, 45-day dry-aged hearth cuts seared over white oak coals, 
            and a 450-bottle biodynamic cellar curated by Master Sommelier Elena Rossi.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              id="hero-reserve-cta"
              onClick={handleReserve}
              className="px-8 sm:px-10 py-4 bg-[#c5a059] text-black text-[11px] uppercase tracking-widest font-bold hover:bg-[#d8b46e] transition-colors cursor-pointer shadow-lg active:scale-98"
            >
              Book a Table
            </button>

            <button
              id="hero-menu-cta"
              onClick={handleExploreMenu}
              className="px-8 sm:px-10 py-4 border border-white/20 text-[11px] uppercase tracking-widest text-[#f5f5f5] hover:bg-white hover:text-black transition-colors cursor-pointer active:scale-98"
            >
              View Full Menu
            </button>

            <button
              id="hero-order-cta"
              onClick={handleOrder}
              className="px-6 py-4 border border-[#c5a059]/30 bg-white/[0.02] text-[#c5a059] text-[11px] uppercase tracking-widest hover:border-[#c5a059] hover:bg-[#c5a059]/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Online</span>
            </button>
          </div>
        </div>

        {/* Right Col: Signature Dishes & Critic Accolade Box */}
        <div className="lg:col-span-5 lg:border-l border-white/5 flex flex-col justify-between">
          {/* Signature Dishes Card */}
          <div className="flex-1 p-8 sm:p-10 border-b border-white/5 flex flex-col justify-center bg-white/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold">
                Signature Dishes
              </h3>
              <button
                onClick={handleSommelier}
                className="text-[9px] uppercase tracking-widest text-white/50 hover:text-[#c5a059] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#c5a059]" />
                <span>Pairing AI</span>
              </button>
            </div>

            <div className="space-y-6">
              <div 
                onClick={handleExploreMenu}
                className="flex justify-between items-end border-b border-white/10 pb-3 cursor-pointer group"
              >
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1 text-white/90 group-hover:text-[#c5a059] transition-colors">
                    Truffle Infused Risotto
                  </div>
                  <div className="text-[11px] text-white/40 italic">
                    Wild chanterelles, 24-month parmesan reggiano, black winter truffle
                  </div>
                </div>
                <div className="text-[#c5a059] font-mono text-sm pl-4">
                  $44
                </div>
              </div>

              <div 
                onClick={handleExploreMenu}
                className="flex justify-between items-end border-b border-white/10 pb-3 cursor-pointer group"
              >
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1 text-white/90 group-hover:text-[#c5a059] transition-colors">
                    Florentine Bone-In Ribeye (32oz)
                  </div>
                  <div className="text-[11px] text-white/40 italic">
                    Oak-charred prime steak, rosemary marrow butter, smoked sea salt
                  </div>
                </div>
                <div className="text-[#c5a059] font-mono text-sm pl-4">
                  $145
                </div>
              </div>

              <div 
                onClick={handleExploreMenu}
                className="flex justify-between items-end border-b border-white/10 pb-3 cursor-pointer group"
              >
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1 text-white/90 group-hover:text-[#c5a059] transition-colors">
                    Wild Boar Pappardelle
                  </div>
                  <div className="text-[11px] text-white/40 italic">
                    12-hour braised ragù, juniper berries, pecorino toscano
                  </div>
                </div>
                <div className="text-[#c5a059] font-mono text-sm pl-4">
                  $38
                </div>
              </div>
            </div>
          </div>

          {/* Critic Quote */}
          <div className="p-8 sm:p-10 flex flex-col justify-center relative bg-white/[0.01]">
            <div className="absolute top-4 left-6 text-6xl text-[#c5a059]/20 serif select-none">
              “
            </div>
            <p className="text-xs sm:text-sm italic text-white/70 relative z-10 pl-6 leading-relaxed font-light">
              "The most exquisite woodfire dining experience in the country. The attention to detail in every course and sommelier vintage is simply unmatched. A modern masterpiece."
            </p>
            <div className="mt-4 pl-6 text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold">
              — Julian Thorne, Michelin Dining Review
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillars Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] uppercase tracking-[0.2em] text-white/50">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#c5a059]" />
          <span>900° White Oak Woodfire Hearth</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#c5a059]" />
          <span>Daily Hand-Rolled Pastas</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#c5a059]" />
          <span>450+ Biodynamic Reserve Cellar</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white/80">Dinner Service 17:00 — 23:00</span>
        </div>
      </div>
    </section>
  );
};
