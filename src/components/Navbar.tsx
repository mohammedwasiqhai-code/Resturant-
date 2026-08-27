import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  CalendarDays, 
  Sparkles, 
  Menu as MenuIcon, 
  X, 
  Search, 
  Flame
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenReservation?: () => void;
  onOpenSommelier?: () => void;
  // legacy/flexible props
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  cartItems?: CartItem[];
  setIsCartOpen?: (open: boolean) => void;
  setIsReservationModalOpen?: (open: boolean) => void;
  setIsSommelierOpen?: (open: boolean) => void;
  setIsLookupOpen?: (open: boolean) => void;
  activeOrder?: Order | null;
  setIsOrderTrackerOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenSommelier,
  activeTab = 'hero',
  setActiveTab,
  cartItems = [],
  setIsCartOpen,
  setIsReservationModalOpen,
  setIsSommelierOpen,
  setIsLookupOpen,
  activeOrder,
  setIsOrderTrackerOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleOpenCart = onOpenCart || (() => setIsCartOpen && setIsCartOpen(true));
  const handleOpenReservation = onOpenReservation || (() => setIsReservationModalOpen && setIsReservationModalOpen(true));
  const handleOpenSommelier = onOpenSommelier || (() => setIsSommelierOpen && setIsSommelierOpen(true));

  const totalCount = cartCount !== undefined 
    ? cartCount 
    : cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'reserve', label: 'Reservations' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'story', label: 'Story & Cellar' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (setActiveTab) setActiveTab(tabId);
    setMobileMenuOpen(false);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo-btn"
        >
          <div className="w-8 h-8 rounded-none border border-[#c5a059]/40 bg-[#0a0a0a] flex items-center justify-center group-hover:border-[#c5a059] transition-colors">
            <Flame className="w-4 h-4 text-[#c5a059]" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl tracking-[0.3em] font-light serif italic text-[#f5f5f5] block">
              L'AURA
            </span>
            <span className="block text-[9px] tracking-[0.35em] text-[#c5a059] uppercase font-semibold -mt-0.5">
              Woodfire & Cellar
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest text-white/60">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 cursor-pointer ${
                  isActive
                    ? 'text-white border-b border-[#c5a059] pb-1'
                    : 'hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* AI Sommelier Concierge Link/Button */}
          <button
            id="nav-sommelier-btn"
            onClick={handleOpenSommelier}
            className="flex items-center gap-1.5 px-3 py-1 border border-white/10 text-[10px] uppercase tracking-widest text-[#c5a059] hover:bg-white/[0.04] hover:border-[#c5a059]/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>Sommelier AI</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Active Order Pill if exists */}
          {activeOrder && setIsOrderTrackerOpen && (
            <button
              id="nav-active-order-btn"
              onClick={() => setIsOrderTrackerOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-emerald-500/40 text-emerald-300 text-[10px] uppercase tracking-widest font-medium hover:bg-emerald-950/40 transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>#{activeOrder.orderNumber.slice(-4)} Active</span>
            </button>
          )}

          {/* Table Reservation Button */}
          <button
            id="nav-reserve-table-btn"
            onClick={handleOpenReservation}
            className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/20 text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </button>

          {/* Online Order Cart Trigger */}
          <button
            id="nav-cart-btn"
            onClick={handleOpenCart}
            className="bg-[#c5a059] text-black px-5 py-2 text-[11px] uppercase tracking-widest font-bold hover:bg-[#d8b46e] transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline">Order</span>
            {totalCount > 0 && (
              <span className="bg-black text-[#c5a059] px-1.5 py-0.2 text-[10px] font-extrabold tracking-normal">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="nav-mobile-drawer"
          className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-6 pt-4 pb-6 space-y-4 mt-2 shadow-2xl animate-in fade-in"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 text-xs uppercase tracking-widest text-white/70 hover:text-white border-b border-white/5"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                handleOpenSommelier();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-white/10 text-[10px] uppercase tracking-widest text-[#c5a059]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>AI Sommelier</span>
            </button>
            <button
              onClick={() => {
                handleOpenReservation();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-white/20 text-[10px] uppercase tracking-widest text-white"
            >
              <CalendarDays className="w-3.5 h-3.5 text-white" />
              <span>Book Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
