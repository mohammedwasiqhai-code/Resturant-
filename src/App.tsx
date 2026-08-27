import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DishCustomizerModal } from './components/DishCustomizerModal';
import { ReservationSection } from './components/ReservationSection';
import { ReservationLookupModal } from './components/ReservationLookupModal';
import { ReviewsSection } from './components/ReviewsSection';
import { WriteReviewModal } from './components/WriteReviewModal';
import { OnlineOrderingCartModal } from './components/OnlineOrderingCartModal';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { SommelierAIModal } from './components/SommelierAIModal';
import { StoryHoursLocationSection } from './components/StoryHoursLocationSection';
import { Footer } from './components/Footer';

import { MenuItem, CartItem, Order, Reservation, Review } from './types';
import { INITIAL_REVIEWS, MENU_ITEMS } from './data/restaurantData';
import { ShoppingBag, CalendarDays, Sparkles } from 'lucide-react';

export function App() {
  // State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [selectedDishForCustomizer, setSelectedDishForCustomizer] = useState<MenuItem | null>(null);
  
  // Active Order & Reservation State
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [latestReservation, setLatestReservation] = useState<Reservation | null>(null);

  // Fetch live reviews and menu from server on mount
  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (data.menuItems && Array.isArray(data.menuItems)) {
          setMenuItems(data.menuItems);
        }
      })
      .catch((err) => console.log('Loaded bundled menu items.'));

    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => console.log('Loaded bundled reviews.'));
  }, []);

  // Cart Handlers
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if identical item with same options and notes exists
      const existingIndex = prev.findIndex(
        (item) =>
          item.menuItem.id === newItem.menuItem.id &&
          item.specialInstructions === newItem.specialInstructions &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(newItem.selectedOptions)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + newItem.quantity;
        const unitPrice = current.itemTotal / current.quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          itemTotal: unitPrice * newQty,
        };
        return updated;
      } else {
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const unitPrice = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quick Add from Sommelier or Search
  const handleQuickAddByName = (dishName: string) => {
    const found = menuItems.find(
      (m) => m.name.toLowerCase() === dishName.toLowerCase() || dishName.toLowerCase().includes(m.name.toLowerCase())
    );
    if (found) {
      const newCartItem: CartItem = {
        cartItemId: `quick-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        menuItem: found,
        quantity: 1,
        selectedOptions: [],
        itemTotal: found.price,
      };
      handleAddToCart(newCartItem);
    }
  };

  // Reviews Helpful Upvote
  const handleVoteHelpful = async (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const voted = !r.userVotedHelpful;
          return {
            ...r,
            userVotedHelpful: voted,
            helpfulCount: voted ? r.helpfulCount + 1 : Math.max(0, r.helpfulCount - 1),
          };
        }
        return r;
      })
    );

    try {
      await fetch(`/api/reviews/${reviewId}/vote`, { method: 'POST' });
    } catch (e) {}
  };

  const handleReviewSubmitted = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setActiveOrder(newOrder);
    setIsOrderTrackerOpen(true);
  };

  const handleReservationSuccess = (newReservation: Reservation) => {
    setLatestReservation(newReservation);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToReserve = () => {
    const el = document.getElementById('reserve');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#c5a059] selection:text-black font-sans antialiased">
      {/* 1. Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={scrollToReserve}
        onOpenSommelier={() => setIsSommelierOpen(true)}
      />

      <main>
        {/* 2. Hero Section */}
        <HeroSection
          onOpenReservation={scrollToReserve}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSommelier={() => setIsSommelierOpen(true)}
        />

        {/* 3. Online Menu Section with Customizer */}
        <MenuSection
          menuItems={menuItems}
          onSelectDishForOrder={(dish) => setSelectedDishForCustomizer(dish)}
          onOpenSommelier={() => setIsSommelierOpen(true)}
        />

        {/* 4. Table Reservation Section */}
        <ReservationSection
          onReservationSuccess={handleReservationSuccess}
          onOpenLookup={() => setIsLookupOpen(true)}
        />

        {/* 5. Verified Diner Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onOpenWriteReview={() => setIsWriteReviewOpen(true)}
          onVoteHelpful={handleVoteHelpful}
        />

        {/* 6. Story, Chef, Hours, Location & FAQs */}
        <StoryHoursLocationSection />
      </main>

      {/* 7. Footer */}
      <Footer
        onOpenReservation={scrollToReserve}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
      />

      {/* Floating Quick Action Drawer Bar (Mobile & Desktop) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {activeOrder && (
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-none bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 font-medium text-[11px] uppercase tracking-widest shadow-2xl border border-emerald-500/40"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Track #{activeOrder.orderNumber}</span>
          </button>
        )}

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2.5 px-6 py-2.5 rounded-none bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[11px] uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4 text-black" />
          <span>Cart</span>
          {totalCartCount > 0 && (
            <span className="bg-black text-[#c5a059] px-2 py-0.5 text-[10px] font-extrabold tracking-normal">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* Modals & Slide-overs */}
      <DishCustomizerModal
        dish={selectedDishForCustomizer}
        isOpen={!!selectedDishForCustomizer}
        onClose={() => setSelectedDishForCustomizer(null)}
        onAddToCart={handleAddToCart}
      />

      <OnlineOrderingCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      <LiveOrderTrackerModal
        order={activeOrder}
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        onUpdateOrderStatus={(orderId, status) => {
          if (activeOrder && activeOrder.id === orderId) {
            setActiveOrder({ ...activeOrder, status });
          }
        }}
      />

      <SommelierAIModal
        isOpen={isSommelierOpen}
        onClose={() => setIsSommelierOpen(false)}
        onQuickAddByName={handleQuickAddByName}
        onOpenReservation={() => {
          setIsSommelierOpen(false);
          scrollToReserve();
        }}
      />

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />

      <ReservationLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
}
export default App;
