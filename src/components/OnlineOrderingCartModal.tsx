import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Tag, 
  Clock, 
  MapPin, 
  CreditCard, 
  DollarSign, 
  Phone, 
  User, 
  Mail, 
  Sparkles,
  AlertCircle,
  Truck,
  Store,
  Utensils
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderFulfillmentType, Order } from '../types';

interface OnlineOrderingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const OnlineOrderingCartModal: React.FC<OnlineOrderingCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fulfillmentType, setFulfillmentType] = useState<OrderFulfillmentType>('delivery');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent?: number; discountFixed?: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash_on_pickup'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Customer Contact Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  // Financial Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discount = (subtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountFixed) {
      discount = Math.min(subtotal, appliedPromo.discountFixed);
    }
  }

  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal >= 100 ? 0 : 4.99) : 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.13; // 13% HST

  let tipAmount = 0;
  if (tipPercentage > 0) {
    tipAmount = (subtotal * tipPercentage) / 100;
  } else if (customTip && parseFloat(customTip) > 0) {
    tipAmount = parseFloat(customTip);
  }

  const grandTotal = Math.max(0, taxableAmount + tax + deliveryFee + tipAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'WELCOME15') {
      setAppliedPromo({ code, discountPercent: 15 });
      setPromoCodeInput('');
    } else if (code === 'CHEFAURA') {
      if (subtotal < 80) {
        setPromoError('CHEFAURA requires a minimum subtotal of $80');
        return;
      }
      setAppliedPromo({ code, discountFixed: 20 });
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid or expired promo code. Try WELCOME15 for 15% off.');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please provide your full name, email, and phone number.');
      return;
    }

    if (fulfillmentType === 'delivery' && !address.trim()) {
      setErrorMessage('Please provide a delivery street address.');
      return;
    }

    if (fulfillmentType === 'dine-in-table' && !tableNumber.trim()) {
      setErrorMessage('Please provide your table number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        fulfillmentType,
        items: cartItems,
        subtotal,
        discount,
        promoCode: appliedPromo?.code,
        deliveryFee,
        tax,
        tip: tipAmount,
        total: grandTotal,
        customer: {
          fullName,
          email,
          phone,
          address: fulfillmentType === 'delivery' ? address : undefined,
          apartment: fulfillmentType === 'delivery' ? apartment : undefined,
          deliveryNotes: fulfillmentType === 'delivery' ? deliveryNotes : undefined,
          tableNumber: fulfillmentType === 'dine-in-table' ? tableNumber : undefined,
        },
        paymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit order.');
      }

      // Celebratory Confetti!
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#d97706', '#fbbf24', '#ffffff'],
        });
      } catch (err) {
        // Confetti non-fatal
      }

      onClearCart();
      onOrderSuccess(data.order);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong processing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="online-ordering-drawer"
      className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        className="w-full max-w-xl bg-[#0e0e0e] border-l border-white/10 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c5a059] flex items-center justify-center text-black">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="serif text-xl sm:text-2xl font-light text-[#f5f5f5]">
                Your Culinary Order
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-white/40">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in order
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fulfillment Type Toggle */}
        <div className="p-4 bg-black/60 border-b border-white/5">
          <div className="grid grid-cols-3 gap-2 bg-black p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setFulfillmentType('delivery')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                fulfillmentType === 'delivery'
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => setFulfillmentType('pickup')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                fulfillmentType === 'pickup'
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Takeout</span>
            </button>

            <button
              type="button"
              onClick={() => setFulfillmentType('dine-in-table')}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                fulfillmentType === 'dine-in-table'
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-white/40 px-1">
            <div className="flex items-center gap-1.5 font-light">
              <Clock className="w-3 h-3 text-[#c5a059]" />
              <span>
                {fulfillmentType === 'delivery' ? 'Est. 35–45 min' : 'Ready in 20 min'}
              </span>
            </div>
            {fulfillmentType === 'delivery' && (
              <span className="text-[#c5a059] text-[10px] uppercase tracking-wider">
                {subtotal >= 100 ? 'Free Delivery' : '$4.99 Delivery Fee'}
              </span>
            )}
          </div>
        </div>

        {/* Main Content Area (Items list + Checkout form) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Cart Empty View */}
          {cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-14 h-14 bg-white/5 flex items-center justify-center mx-auto text-white/30">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="serif text-xl font-light text-white">Your basket is empty</p>
              <p className="text-xs text-white/40 max-w-xs mx-auto font-light leading-relaxed">
                Explore our woodfire specialties, handmade pastas, and wines to add to your order.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-3 bg-[#c5a059] text-black font-bold text-[10px] uppercase tracking-widest cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40">
                  <span>Selected Dishes</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-400/80 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="flex gap-3.5 p-3.5 bg-black/60 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <img
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      className="w-16 h-16 object-cover shrink-0 border border-white/5"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-white truncate uppercase tracking-wider">
                          {cartItem.menuItem.name}
                        </h4>
                        <span className="text-xs font-mono text-[#c5a059] shrink-0">
                          ${cartItem.itemTotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Selected Options Pills */}
                      {cartItem.selectedOptions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {cartItem.selectedOptions.map((opt, i) => (
                            <span
                              key={i}
                              className="text-[9px] uppercase tracking-wider bg-white/[0.04] border border-white/5 px-2 py-0.5 text-white/60"
                            >
                              {opt.selectedOption.name}
                              {opt.selectedOption.price > 0 && ` (+$${opt.selectedOption.price})`}
                            </span>
                          ))}
                        </div>
                      )}

                      {cartItem.specialInstructions && (
                        <p className="text-[10px] text-white/40 italic mt-1 truncate">
                          Note: "{cartItem.specialInstructions}"
                        </p>
                      )}

                      {/* Quantity and Delete Controls */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5">
                        <div className="flex items-center gap-2 bg-black px-2 py-0.5 border border-white/10">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                            className="text-white/40 hover:text-white p-0.5 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-mono text-white min-w-[16px] text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                            className="text-white/40 hover:text-white p-0.5 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.cartItemId)}
                          className="text-white/30 hover:text-red-400 p-1 cursor-pointer transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="p-4 bg-black/40 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 flex items-center gap-2">
                    <Tag className="w-3 h-3 text-[#c5a059]" />
                    <span className="text-[10px] uppercase tracking-wider">Promo / Voucher</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#c5a059]">Try WELCOME15</span>
                </div>

                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#c5a059]/10 border border-[#c5a059]/30 px-3 py-2 text-xs">
                    <span className="text-[#c5a059] font-medium">
                      Code {appliedPromo.code} applied!
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-red-400 hover:underline text-[10px] uppercase tracking-wider cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-[#c5a059] font-bold text-[10px] uppercase tracking-widest border border-white/10 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400">{promoError}</p>
                )}
              </div>

              {/* Gratuity / Tip Selection */}
              <div className="p-4 bg-black/40 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span className="text-[10px] uppercase tracking-wider">Culinary & Courier Gratuity</span>
                  <span className="text-[#c5a059] font-mono">${tipAmount.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[15, 18, 20, 25].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => {
                        setTipPercentage(pct);
                        setCustomTip('');
                      }}
                      className={`py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                        tipPercentage === pct
                          ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold'
                          : 'bg-black/40 border-white/5 text-white/50 hover:text-white'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setTipPercentage(0);
                      setCustomTip('');
                    }}
                    className={`py-1.5 text-[10px] uppercase tracking-widest border transition-all cursor-pointer ${
                      tipPercentage === 0 && !customTip
                        ? 'bg-white/10 border-white/20 text-white font-bold'
                        : 'bg-black/40 border-white/5 text-white/40 hover:text-white'
                    }`}
                  >
                    None
                  </button>
                </div>
              </div>

              {/* Guest & Contact Details Form */}
              <form id="checkout-contact-form" onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold">
                  Contact & Fulfillment Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Marco Bellini"
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(416) 555-0142"
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marco@example.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                {/* Delivery Address if delivery */}
                {fulfillmentType === 'delivery' && (
                  <div className="space-y-3 p-4 bg-black/40 border border-white/5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
                        Street Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="450 Wellington St W"
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="text"
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                          placeholder="Apt / Suite / Buzzer"
                          className="w-full px-3 py-2 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={deliveryNotes}
                          onChange={(e) => setDeliveryNotes(e.target.value)}
                          placeholder="Driver drop-off notes"
                          className="w-full px-3 py-2 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Table Number if Dine-In Table */}
                {fulfillmentType === 'dine-in-table' && (
                  <div className="p-4 bg-black/40 border border-white/5">
                    <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
                      Table Number * (printed on table plaque)
                    </label>
                    <input
                      type="text"
                      required
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 14 or Hearth 4"
                      className="w-full px-3 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                )}

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#c5a059]/15 border-[#c5a059] text-white font-bold'
                          : 'bg-[#0a0a0a] border-white/10 text-white/50'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-3 border text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'apple_pay'
                          ? 'bg-[#c5a059]/15 border-[#c5a059] text-white font-bold'
                          : 'bg-[#0a0a0a] border-white/10 text-white/50'
                      }`}
                    >
                      <span> Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash_on_pickup')}
                      className={`p-3 border text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'cash_on_pickup'
                          ? 'bg-[#c5a059]/15 border-[#c5a059] text-white font-bold'
                          : 'bg-[#0a0a0a] border-white/10 text-white/50'
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>At Counter</span>
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/40 text-red-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Bill Breakdown Summary */}
                <div className="space-y-2 p-4 bg-black border border-white/5 text-xs font-light">
                  <div className="flex justify-between text-white/50">
                    <span>Items Subtotal</span>
                    <span className="font-mono text-white/80">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({appliedPromo?.code})</span>
                      <span className="font-mono">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  {fulfillmentType === 'delivery' && (
                    <div className="flex justify-between text-white/50">
                      <span>Delivery Courier Fee</span>
                      <span className="font-mono text-white/80">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-white/50">
                    <span>HST (13%)</span>
                    <span className="font-mono text-white/80">${tax.toFixed(2)}</span>
                  </div>

                  {tipAmount > 0 && (
                    <div className="flex justify-between text-white/50">
                      <span>Staff Gratuity</span>
                      <span className="font-mono text-white/80">${tipAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-white pt-2.5 border-t border-white/10 font-normal">
                    <span className="serif text-base">Total Amount</span>
                    <span className="font-mono text-base text-[#c5a059] font-bold">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  id="checkout-place-order-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-between px-6 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Transmitting to Kitchen...' : 'Place Culinary Order'}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">${grandTotal.toFixed(2)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
