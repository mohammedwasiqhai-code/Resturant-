import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Clock, 
  Wine, 
  Plus, 
  Filter, 
  ChevronRight,
  Info,
  CheckCircle2,
  Utensils,
  Award
} from 'lucide-react';
import { MenuItem, DietaryTag } from '../types';
import { MENU_CATEGORIES } from '../data/restaurantData';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onSelectDishForOrder?: (item: MenuItem) => void;
  onSelectItemForCustomization?: (item: MenuItem) => void;
  onQuickAdd?: (item: MenuItem) => void;
  onOpenSommelier: () => void;
}

const ALL_DIETARY_TAGS: DietaryTag[] = [
  'Chef Special',
  'Signature',
  'Woodfired',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Spicy',
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onSelectDishForOrder,
  onSelectItemForCustomization,
  onQuickAdd,
  onOpenSommelier,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<DietaryTag[]>([]);

  const handleSelectDish = (dish: MenuItem) => {
    if (onSelectDishForOrder) {
      onSelectDishForOrder(dish);
    } else if (onSelectItemForCustomization) {
      onSelectItemForCustomization(dish);
    }
  };

  const handleQuickAddDish = (dish: MenuItem) => {
    if (onQuickAdd) {
      onQuickAdd(dish);
    } else if (onSelectDishForOrder) {
      onSelectDishForOrder(dish);
    }
  };

  const toggleTag = (tag: DietaryTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesItalian = item.italianName?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesWine = item.pairingWine?.toLowerCase().includes(q);
        if (!matchesName && !matchesItalian && !matchesDesc && !matchesWine) {
          return false;
        }
      }
      // Dietary tags filter (must match all selected tags)
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((t) => item.tags.includes(t));
        if (!hasAllTags) return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, selectedTags]);

  return (
    <section id="menu" className="py-24 px-6 sm:px-10 lg:px-12 bg-[#0a0a0a] text-[#f5f5f5] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Title & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-[#c5a059]" />
            <span className="text-[#c5a059] uppercase tracking-[0.4em] text-[10px] font-semibold">
              Artisanal Portfolio
            </span>
            <div className="h-[1px] w-8 bg-[#c5a059]" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light serif tracking-tight text-[#f5f5f5] mb-5">
            Seasonal Tasting & A La Carte
          </h2>
          <p className="text-white/45 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Every dish is cooked fresh over open white oak embers or rolled by hand each morning. 
            Select any creation to customize preparations, view sommelier pairings, or order online.
          </p>
        </div>

        {/* Search and Sommelier Assistant Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, truffle, ribeye, wine pairing..."
              className="w-full pl-11 pr-10 py-3 bg-[#0e0e0e] border border-white/10 text-xs text-[#f5f5f5] placeholder:text-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-white/40 hover:text-[#c5a059]"
              >
                Clear
              </button>
            )}
          </div>

          {/* AI Pairing Advisor CTA */}
          <button
            id="menu-sommelier-advisor-btn"
            onClick={onOpenSommelier}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-[#c5a059]/40 bg-[#c5a059]/5 hover:bg-[#c5a059]/15 text-[#c5a059] text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Consult AI Sommelier Elena</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/5">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2 text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a059] text-black shadow-lg'
                    : 'border border-white/5 bg-white/[0.02] text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dietary Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium flex items-center gap-1.5 mr-2">
            <Filter className="w-3 h-3 text-[#c5a059]" />
            Filters:
          </span>
          {ALL_DIETARY_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'border border-[#c5a059] bg-[#c5a059]/15 text-[#c5a059]'
                    : 'border border-white/5 text-white/40 hover:text-white hover:border-white/20'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3 h-3 text-[#c5a059]" />}
                <span>{tag}</span>
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-[10px] uppercase tracking-widest text-[#c5a059] hover:underline ml-2 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white/[0.01] border border-white/5 p-8">
            <Info className="w-8 h-8 text-[#c5a059] mx-auto mb-3" />
            <p className="text-base font-light text-white/80 mb-1">No dishes match your criteria</p>
            <p className="text-xs text-white/40 mb-6">Try adjusting your dietary filters or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedTags([]);
              }}
              className="px-6 py-2.5 bg-[#c5a059] text-black text-[10px] uppercase tracking-widest font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                className="group flex flex-col bg-[#0e0e0e] border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300"
              >
                {/* Dish Image with Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-semibold bg-black/80 text-[#c5a059] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 border border-[#c5a059]/40 text-[#c5a059] font-mono text-sm font-bold">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-3">
                      <h3 className="serif text-2xl font-normal text-[#f5f5f5] group-hover:text-[#c5a059] transition-colors">
                        {item.name}
                      </h3>
                      {item.italianName && (
                        <p className="text-xs text-white/40 italic font-light mt-0.5">
                          {item.italianName}
                        </p>
                      )}
                    </div>

                    <p className="text-white/50 text-xs leading-relaxed line-clamp-3 mb-5 font-light">
                      {item.description}
                    </p>

                    {/* Wine Pairing Note */}
                    {item.pairingWine && (
                      <div className="flex items-center gap-2 text-[11px] text-white/60 bg-white/[0.02] p-2.5 border border-white/5 mb-5">
                        <Wine className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span className="truncate">Pairing: {item.pairingWine}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleSelectDish(item)}
                      className="flex-1 py-2.5 px-4 bg-white/[0.03] hover:bg-[#c5a059] text-white/80 hover:text-black border border-white/10 hover:border-[#c5a059] text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer text-center"
                    >
                      Customize & Order
                    </button>

                    <button
                      onClick={() => handleQuickAddDish(item)}
                      title="Quick add to cart"
                      className="p-2.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black transition-colors cursor-pointer flex items-center justify-center"
                      aria-label={`Quick add ${item.name} to order`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
