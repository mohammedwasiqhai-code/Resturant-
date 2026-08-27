import React, { useState } from 'react';
import { 
  Flame, 
  Wine, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ArrowUp, 
  Check, 
  Sparkles, 
  Heart 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  onOpenSommelier: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReservation,
  onOpenCart,
  onOpenSommelier,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#070707] border-t border-white/5 text-[#f5f5f5] pt-20 pb-14 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Col 1 & 2: Brand & Ethos */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#c5a059] flex items-center justify-center text-black">
                <Flame className="w-4 h-4 fill-black text-black" />
              </div>
              <div>
                <span className="serif text-2xl font-light tracking-widest text-[#f5f5f5] block">
                  L'AURA
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block">
                  Fine Dining & Woodfire Kitchen
                </span>
              </div>
            </div>

            <p className="text-xs text-white/40 leading-relaxed font-light max-w-sm">
              An intimate culinary sanctum celebrating heirloom Tuscan recipes, dry-aged cuts over 900° oak embers, and artisanal cellar reserves in the heart of King Street West.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[10px] uppercase tracking-wider text-[#c5a059]">
              <span>★ Michelin Guide 2025</span>
              <span className="text-white/20">•</span>
              <span>★ OpenTable Top 50</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50 font-light">
              <li>
                <a href="#menu" className="hover:text-[#c5a059] transition-colors">
                  Artisanal Online Menu
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-[#c5a059] transition-colors text-left cursor-pointer"
                >
                  Table Reservation
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCart}
                  className="hover:text-[#c5a059] transition-colors text-left cursor-pointer"
                >
                  Order Delivery & Takeout
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSommelier}
                  className="hover:text-[#c5a059] transition-colors text-left flex items-center gap-1.5 text-[#c5a059] cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Sommelier Concierge</span>
                </button>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#c5a059] transition-colors">
                  Guest Critiques & Ratings
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#c5a059] transition-colors">
                  Executive Chef & Ethos
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-semibold">
              Visit & Contact
            </h4>
            <div className="space-y-2 text-xs text-white/50 font-light">
              <p className="text-white/80 font-normal">{RESTAURANT_INFO.address}</p>
              <p className="flex items-center gap-2 pt-1">
                <Phone className="w-3 h-3 text-[#c5a059]" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#c5a059]" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
              <p className="pt-2 text-[10px] uppercase tracking-wider text-white/40 leading-relaxed">
                Dinner: Daily 17:00 – 22:30 <br />
                Weekend Brunch: 10:30 – 15:00
              </p>
            </div>
          </div>

          {/* Col 5: VIP Tasting Newsletter */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-semibold">
              Cellar Circle
            </h4>
            <p className="text-xs text-white/40 leading-relaxed font-light">
              Receive private invitations to seasonal white truffle releases and rare vintage uncorkings.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/[0.02] border border-[#c5a059]/40 text-xs text-[#c5a059] flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Welcome to L'Aura Cellar Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Join Tasting Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/30 font-light">
          <p>© {new Date().getFullYear()} L'AURA Fine Dining & Woodfire Kitchen. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <span className="uppercase tracking-widest text-[9px]">428 King St W, Toronto</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white/[0.03] hover:bg-white/[0.08] text-[#c5a059] border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3 h-3" />
              <span className="text-[9px] uppercase tracking-widest font-semibold">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
