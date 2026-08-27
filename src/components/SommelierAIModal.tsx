import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Wine, 
  Utensils, 
  Send, 
  ChefHat, 
  Plus, 
  Clock, 
  Check, 
  CalendarDays,
  Flame,
  Lightbulb
} from 'lucide-react';
import { MenuItem } from '../types';

interface SommelierAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickAddByName: (dishName: string) => void;
  onOpenReservation: () => void;
}

const STARTER_PROMPTS = [
  "Pair wines for a romantic 3-course anniversary dinner with Prime Florentine Ribeye",
  "Recommend a light seafood and pasta feast with crisp Northern Italian whites",
  "Suggest a vegetarian woodfire pairing for 2 with decadent dessert",
  "Which wine from the cellar best balances the Wild Boar Pappardelle?",
];

export const SommelierAIModal: React.FC<SommelierAIModalProps> = ({
  isOpen,
  onClose,
  onQuickAddByName,
  onOpenReservation,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<any>(null);
  const [addedDishes, setAddedDishes] = useState<string[]>([]);

  const handleAskSommelier = async (promptText: string) => {
    const textToSubmit = promptText || query;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setResponseResult(null);

    try {
      const res = await fetch('/api/ai/pairing-sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSubmit }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResponseResult(data);
      } else {
        throw new Error(data.error || 'Sommelier consultation error');
      }
    } catch (err: any) {
      console.error(err);
      // fallback in case of error
      setResponseResult({
        greeting: "Benvenuti a L'Aura. Master Sommelier Elena recommends our signature Woodfire Harmony flight.",
        recommendations: [
          {
            courseTitle: "Antipasto Pairing",
            dishName: "Heirloom Burrata & Woodfired Figs",
            dishDescription: "Ember-roasted mission figs with creamy Pugliese burrata and 24-month aged Prosciutto di Parma.",
            pairedDrink: "Franciacorta Brut DOCG, Lombardy",
            pairingNotes: "Fine brioche bubbles cut through rich milk fats, balancing the sweet fig notes.",
            chefTip: "Warm the sourdough slice over table candlelight before spreading."
          },
          {
            courseTitle: "Primi & Secondi Symphony",
            dishName: "45-Day Dry Aged Prime Florentine Ribeye (32oz)",
            dishDescription: "Oak-charred prime bone-in ribeye with rosemary bone marrow butter.",
            pairedDrink: "Brunello di Montalcino DOCG 2017",
            pairingNotes: "Structured dusty tannins and black cherry nuances elevate the rich beef marbling.",
            chefTip: "Pair with a pinch of Mediterranean sea salt flakes."
          }
        ],
        sommelierAdvice: "Ask our floor team to aerate bold Tuscan vintages 15 minutes before the main course."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourseDish = (dishName: string) => {
    onQuickAddByName(dishName);
    setAddedDishes((prev) => [...prev, dishName]);
  };

  return (
    <div 
      id="sommelier-ai-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e0e] border border-white/10 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className="p-5 sm:p-6 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-[#c5a059] flex items-center justify-center text-black">
              <Wine className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="serif text-xl sm:text-2xl font-light text-[#f5f5f5]">
                  Sommelier Elena’s AI Concierge
                </h2>
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                Curated wine pairings & tasting journeys from our 450-bottle cellar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close sommelier modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Starter Chips */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold block mb-2.5">
              Popular Culinary Pairings
            </span>
            <div className="flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(prompt);
                    handleAskSommelier(prompt);
                  }}
                  className="text-xs text-left px-3.5 py-2 bg-black/60 border border-white/5 text-white/60 hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors flex items-center gap-2 cursor-pointer font-light"
                >
                  <Lightbulb className="w-3 h-3 text-[#c5a059] shrink-0" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loading Animation */}
          {loading && (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059] animate-spin">
                <Wine className="w-5 h-5" />
              </div>
              <p className="serif text-xl font-light text-white">
                Sommelier Elena is consulting cellar reserves...
              </p>
              <p className="text-xs text-white/40 font-light">
                Balancing acidity, woodfire smoke notes, and vintage tannins.
              </p>
            </div>
          )}

          {/* AI Pairing Response Result */}
          {responseResult && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              {/* Greeting */}
              <div className="p-4 bg-[#c5a059]/10 border border-[#c5a059]/20 text-xs sm:text-sm text-[#c5a059] leading-relaxed serif italic">
                "{responseResult.greeting}"
              </div>

              {/* Course Cards */}
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold flex items-center gap-2">
                  <ChefHat className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Recommended Culinary Sequence & Cellar Pairings</span>
                </h3>

                {responseResult.recommendations?.map((course: any, idx: number) => {
                  const isAdded = addedDishes.includes(course.dishName);
                  return (
                    <div
                      key={idx}
                      className="p-5 bg-black/50 border border-white/5 hover:border-white/10 space-y-3 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a059]">
                            {course.courseTitle}
                          </span>
                          <h4 className="serif text-lg sm:text-xl font-light text-white">
                            {course.dishName}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddCourseDish(course.dishName)}
                          className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-950/60 border border-emerald-500/60 text-emerald-300'
                              : 'bg-[#c5a059] hover:bg-[#d8b46e] text-black'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3 stroke-[2.5]" />
                              <span>In Your Cart</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add Dish</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        {course.dishDescription}
                      </p>

                      {/* Paired Beverage Box */}
                      <div className="p-3 bg-black border border-white/5 text-xs space-y-1">
                        <div className="flex items-center gap-2 text-[#c5a059]">
                          <Wine className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                          <span className="text-[11px] font-medium tracking-wide">Paired Vintage: {course.pairedDrink}</span>
                        </div>
                        <p className="text-white/50 pl-5.5 leading-relaxed font-light text-[11px]">
                          {course.pairingNotes}
                        </p>
                      </div>

                      {course.chefTip && (
                        <div className="text-[11px] text-[#c5a059]/80 italic pl-1">
                          ★ Sommelier Tip: {course.chefTip}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {responseResult.sommelierAdvice && (
                <div className="p-4 bg-black/40 border border-white/5 text-xs text-white/60 flex items-start gap-2.5 font-light leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>{responseResult.sommelierAdvice}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenReservation();
                  }}
                  className="flex-1 py-3.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Reserve Table for this Pairing</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 bg-[#0a0a0a] border-t border-white/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskSommelier(query);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for custom wine pairings, tasting journeys, dietary substitutes..."
              className="flex-1 px-4 py-3 bg-black border border-white/10 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#c5a059] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-5 py-3 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-all disabled:opacity-30 cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
