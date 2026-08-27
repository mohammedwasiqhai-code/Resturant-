import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  User, 
  MapPin, 
  Utensils 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Review } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
}) => {
  if (!isOpen) return null;

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>('');
  const [authorLocation, setAuthorLocation] = useState<string>('Toronto, ON');
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [category, setCategory] = useState<'Food Quality' | 'Service' | 'Atmosphere' | 'Value' | 'Overall'>('Food Quality');
  const [recommendedDish, setRecommendedDish] = useState<string>('Handmade Wild Boar Pappardelle');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!authorName.trim() || !comment.trim()) {
      setErrorMessage('Please provide your name and your dining feedback.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        authorName,
        authorLocation,
        rating,
        title: title || 'Exceptional Dining Experience',
        comment,
        category,
        recommendedDish,
        verifiedDiner: true,
      };

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review.');
      }

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}

      onReviewSubmitted(data.review);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error publishing your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="write-review-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-xl bg-[#0e0e0e] border border-white/10 shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059]">
              Share Your Experience
            </span>
            <h3 className="serif text-2xl font-light text-[#f5f5f5] mt-1">
              Write a Guest Review
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating Picker */}
          <div className="text-center p-5 bg-black border border-white/5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold block mb-3">
              Overall Culinary Rating
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-7 h-7 ${
                        isFilled
                          ? 'text-[#c5a059] fill-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.4)]'
                          : 'text-white/20'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-light text-[#c5a059] mt-2 inline-block">
              {rating === 5 && 'Outstanding • Michelin-caliber'}
              {rating === 4 && 'Very Good • Exceeded expectations'}
              {rating === 3 && 'Average'}
              {rating <= 2 && 'Needs improvement'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Julian Montgomery"
                className="w-full px-3.5 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">City / Neighborhood</label>
              <input
                type="text"
                value={authorLocation}
                onChange={(e) => setAuthorLocation(e.target.value)}
                placeholder="e.g. Yorkville, Toronto"
                className="w-full px-3.5 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Primary Review Focus</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
              >
                <option value="Food Quality">Food Quality & Taste</option>
                <option value="Service">Service & Hospitality</option>
                <option value="Atmosphere">Ambiance & Atmosphere</option>
                <option value="Value">Value & Portions</option>
                <option value="Overall">Overall Experience</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Recommended Dish</label>
              <input
                type="text"
                value={recommendedDish}
                onChange={(e) => setRecommendedDish(e.target.value)}
                placeholder="e.g. 45-Day Ribeye or Burrata Pizza"
                className="w-full px-3.5 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Headline / Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Flawless woodfire steaks and attentive service!"
              className="w-full px-3.5 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Detailed Review *</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your dining highlights, flavors, favorite courses, or cellar pairings..."
              className="w-full px-3.5 py-2.5 text-xs bg-[#0a0a0a] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/40 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-white/70 text-[10px] uppercase tracking-widest font-bold border border-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold text-[10px] uppercase tracking-widest disabled:opacity-40 cursor-pointer transition-all"
            >
              <span>{isSubmitting ? 'Publishing...' : 'Submit Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
