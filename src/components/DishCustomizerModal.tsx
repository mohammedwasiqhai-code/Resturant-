import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Sparkles, 
  Flame, 
  Clock, 
  Wine, 
  AlertCircle, 
  Check, 
  ChefHat 
} from 'lucide-react';
import { MenuItem, MenuItemOption, CartItem } from '../types';

interface DishCustomizerModalProps {
  dish: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const DishCustomizerModal: React.FC<DishCustomizerModalProps> = ({
  dish,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedOptionsMap, setSelectedOptionsMap] = useState<Record<string, MenuItemOption>>({});

  useEffect(() => {
    if (dish) {
      setQuantity(1);
      setSpecialInstructions('');
      const initial: Record<string, MenuItemOption> = {};
      if (dish.customizationGroups) {
        dish.customizationGroups.forEach((group) => {
          if (group.options && group.options.length > 0) {
            initial[group.title] = group.options[0];
          }
        });
      }
      setSelectedOptionsMap(initial);
    }
  }, [dish]);

  const handleOptionSelect = (groupTitle: string, option: MenuItemOption) => {
    setSelectedOptionsMap((prev) => ({
      ...prev,
      [groupTitle]: option,
    }));
  };

  // Calculate total item price including modifiers
  const selectedOptionsList: MenuItemOption[] = Object.values(selectedOptionsMap);
  const modifiersTotal = selectedOptionsList.reduce(
    (acc: number, opt: MenuItemOption) => acc + (opt?.price || 0),
    0
  );
  const singleUnitPrice = dish.price + modifiersTotal;
  const totalPrice = singleUnitPrice * quantity;

  const handleConfirm = () => {
    const formattedOptions: { groupTitle: string; selectedOption: MenuItemOption }[] = Object.entries(selectedOptionsMap).map(
      ([groupTitle, selectedOption]) => ({
        groupTitle,
        selectedOption: selectedOption as MenuItemOption,
      })
    );

    const newCartItem: CartItem = {
      cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      menuItem: dish,
      quantity,
      selectedOptions: formattedOptions,
      specialInstructions: specialInstructions.trim() || undefined,
      itemTotal: totalPrice,
    };

    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div 
      id="dish-customizer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e0e] border border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image with Gradient */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-black text-white/70 hover:text-white border border-white/10 transition-colors backdrop-blur-sm cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-semibold bg-[#c5a059] text-black"
                >
                  {tag}
                </span>
              ))}
              {dish.pairingWine && (
                <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-medium bg-black/80 text-[#c5a059] border border-[#c5a059]/30 flex items-center gap-1">
                  <Wine className="w-2.5 h-2.5" />
                  {dish.pairingWine}
                </span>
              )}
            </div>
            <h3 className="serif text-2xl sm:text-3xl font-light text-[#f5f5f5]">
              {dish.name}
            </h3>
            {dish.italianName && (
              <p className="text-xs serif italic text-[#c5a059] mt-0.5">
                {dish.italianName}
              </p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              {dish.description}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-white/40 pt-1">
              {dish.prepTimeMinutes && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#c5a059]" />
                  {dish.prepTimeMinutes} mins prep
                </span>
              )}
              {dish.calories && (
                <span>• {dish.calories} kcal</span>
              )}
              {dish.allergens && dish.allergens.length > 0 && (
                <span className="text-[#c5a059]/80">
                  • Contains: {dish.allergens.join(', ')}
                </span>
              )}
            </div>
          </div>

          {/* Customization Options */}
          {dish.customizationGroups && dish.customizationGroups.length > 0 && (
            <div className="space-y-6 pt-3 border-t border-white/5">
              {dish.customizationGroups.map((group) => {
                const currentSelected = selectedOptionsMap[group.title];
                return (
                  <div key={group.title} className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold">
                        {group.title}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-white/40 font-light">Choose 1</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {group.options.map((option) => {
                        const isSelected = currentSelected?.name === option.name;
                        return (
                          <button
                            key={option.name}
                            type="button"
                            onClick={() => handleOptionSelect(group.title, option)}
                            className={`p-3.5 text-left border transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#c5a059]/15 border-[#c5a059] text-[#f5f5f5]'
                                : 'bg-black/40 border-white/5 text-white/60 hover:border-white/20'
                            }`}
                          >
                            <span className="text-xs font-normal">{option.name}</span>
                            <div className="flex items-center gap-2">
                              {option.price > 0 && (
                                <span className="text-xs font-mono text-[#c5a059]">
                                  +${option.price.toFixed(2)}
                                </span>
                              )}
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-[#c5a059] stroke-[2.5]" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Special Kitchen Notes */}
          <div className="space-y-2 pt-3 border-t border-white/5">
            <label 
              htmlFor="special-instructions-input"
              className="block text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold"
            >
              Special Kitchen Instructions
            </label>
            <textarea
              id="special-instructions-input"
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra sauce on side, allergy notes, please omit fresh parsley..."
              className="w-full px-4 py-3 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 sm:p-6 bg-[#0a0a0a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Increment/Decrement */}
          <div className="flex items-center gap-3 bg-black border border-white/10 p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>

            <span className="w-8 text-center text-xs font-mono text-white">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 bg-white/[0.04] hover:bg-white/[0.08] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Add to Order Button with Dynamic Price */}
          <button
            onClick={handleConfirm}
            id="add-customized-dish-btn"
            className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[10px] uppercase tracking-widest flex items-center justify-between transition-all cursor-pointer"
          >
            <span>Add to Culinary Order</span>
            <span className="font-mono text-sm">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
