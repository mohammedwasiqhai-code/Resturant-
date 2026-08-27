import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  CheckCircle2, 
  MessageSquarePlus, 
  Award, 
  Sparkles, 
  Filter, 
  Utensils 
} from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onOpenWriteReview: () => void;
  onVoteHelpful: (reviewId: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenWriteReview,
  onVoteHelpful,
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);

  const filteredReviews = reviews.filter((r) => {
    if (selectedCategoryFilter !== 'All' && r.category !== selectedCategoryFilter) {
      return false;
    }
    if (minRatingFilter > 0 && r.rating < minRatingFilter) {
      return false;
    }
    return true;
  });

  const categories = ['All', 'Food Quality', 'Service', 'Atmosphere', 'Value'];

  return (
    <section id="reviews" className="py-24 px-6 sm:px-10 lg:px-12 bg-[#0a0a0a] text-[#f5f5f5] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-[#c5a059]" />
              <span className="text-[#c5a059] uppercase tracking-[0.4em] text-[10px] font-semibold">
                Guest Critiques
              </span>
              <div className="h-[1px] w-8 bg-[#c5a059]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light serif tracking-tight text-[#f5f5f5]">
              What Our Guests Are Saying
            </h2>
            <p className="text-white/45 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mt-3">
              Over 840+ verified patrons have reviewed L’Aura for romantic anniversaries, lively chef's counter tastings, and woodfired private dining.
            </p>
          </div>

          <button
            id="write-review-btn"
            onClick={onOpenWriteReview}
            className="self-start md:self-auto px-6 py-3.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Leave a Guest Review</span>
          </button>
        </div>

        {/* Aggregated Score & Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Score Card */}
          <div className="p-8 bg-[#0e0e0e] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                Aggregate Score
              </span>
              <div className="flex items-baseline gap-3 my-4">
                <span className="serif text-6xl font-light text-[#f5f5f5]">
                  4.9
                </span>
                <span className="text-white/30 text-base font-light">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                ))}
              </div>
              <p className="text-xs text-white/40 font-light leading-relaxed">
                Based on 842 verified OpenTable & in-house guest critiques.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#c5a059]">
              <span>★ Top 50 in Canada</span>
              <span>100% Verified</span>
            </div>
          </div>

          {/* Metric Breakdown Bars */}
          <div className="lg:col-span-2 p-8 bg-[#0e0e0e] border border-white/5 space-y-5 flex flex-col justify-center">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold">
              Culinary & Service Dimensions
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-white/80 mb-1.5 font-light">
                  <span>Woodfire & Culinary Precision</span>
                  <span className="text-[#c5a059] font-mono">4.9 / 5.0 (98%)</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 overflow-hidden">
                  <div className="h-full bg-[#c5a059]" style={{ width: '98%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/80 mb-1.5 font-light">
                  <span>Ambiance & Hearth Atmosphere</span>
                  <span className="text-[#c5a059] font-mono">5.0 / 5.0 (100%)</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 overflow-hidden">
                  <div className="h-full bg-[#c5a059]" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/80 mb-1.5 font-light">
                  <span>Hospitality & Sommelier Service</span>
                  <span className="text-[#c5a059] font-mono">4.8 / 5.0 (96%)</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 overflow-hidden">
                  <div className="h-full bg-[#c5a059]" style={{ width: '96%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/80 mb-1.5 font-light">
                  <span>Online Takeout & Delivery Packaging</span>
                  <span className="text-[#c5a059] font-mono">4.9 / 5.0 (97%)</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 overflow-hidden">
                  <div className="h-full bg-[#c5a059]" style={{ width: '97%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category & Rating Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#c5a059]" />
              Focus:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-[#c5a059] text-black font-bold'
                    : 'border border-white/5 bg-white/[0.02] text-white/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40">
            <span>Filter rating:</span>
            <button
              onClick={() => setMinRatingFilter(0)}
              className={`cursor-pointer ${minRatingFilter === 0 ? 'text-[#c5a059] font-bold' : 'text-white/40 hover:text-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setMinRatingFilter(5)}
              className={`px-2 py-0.5 border flex items-center gap-1 cursor-pointer ${
                minRatingFilter === 5 
                  ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#c5a059] font-bold' 
                  : 'border-white/10 text-white/40 hover:text-white'
              }`}
            >
              5 <Star className="w-2.5 h-2.5 fill-[#c5a059] text-[#c5a059]" />
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-7 bg-[#0e0e0e] border border-white/5 hover:border-[#c5a059]/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                      alt={review.authorName}
                      className="w-10 h-10 object-cover border border-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-[#f5f5f5]">
                          {review.authorName}
                        </h4>
                        {review.verifiedDiner && (
                          <CheckCircle2 className="w-3 h-3 text-[#c5a059]" title="Verified Diner" />
                        )}
                      </div>
                      <span className="text-[10px] text-white/40 block mt-0.5">
                        {review.authorLocation || "Verified Guest"} • {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= review.rating
                            ? 'text-[#c5a059] fill-[#c5a059]'
                            : 'text-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Headline & Content */}
                <h5 className="serif text-lg font-normal text-white/90 mb-2">
                  "{review.title}"
                </h5>
                <p className="text-xs text-white/50 leading-relaxed font-light mb-5">
                  {review.comment}
                </p>

                {/* Recommended Dish Badge */}
                {review.recommendedDish && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 text-[10px] uppercase tracking-wider text-[#c5a059] mb-4">
                    <Utensils className="w-3 h-3 text-[#c5a059]" />
                    <span>Recommended: <strong className="text-white font-medium">{review.recommendedDish}</strong></span>
                  </div>
                )}
              </div>

              {/* Footer / Helpful Upvote */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                <span className="text-[9px] uppercase tracking-widest text-white/30 border border-white/5 px-2 py-0.5">
                  {review.category}
                </span>

                <button
                  onClick={() => onVoteHelpful(review.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                    review.userVotedHelpful
                      ? 'border border-[#c5a059] bg-[#c5a059]/15 text-[#c5a059] font-bold'
                      : 'border border-white/5 hover:border-white/20 text-white/40 hover:text-white'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
