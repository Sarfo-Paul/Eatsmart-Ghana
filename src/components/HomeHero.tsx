import React from 'react';
import { HeartPulse, ShieldCheck, Utensils, BookOpen, Sparkles } from 'lucide-react';

interface HomeHeroProps {
  onExploreLibrary: () => void;
  onStartRecommender: () => void;
  onOpenAssistant: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onExploreLibrary,
  onStartRecommender,
  onOpenAssistant,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-amber-900 text-white py-16 px-6 sm:px-12 rounded-3xl shadow-2xl mb-12">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl opacity-10 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-10 -ml-20 -mb-20"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/50 border border-emerald-600/30 text-emerald-300 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Ghana's Premier Health-Optimized Diet Planner 🇬🇭
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-emerald-200">
          Your Health, Crafted With Rich Ghanaian Flavors
        </h1>

        <p className="text-lg md:text-xl text-emerald-100/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Say goodbye to generic diet advice. Discover localized nutritional plans tailored for Diabetes, Hypertension, and Weight Management using authentic Ghanaian meals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartRecommender}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <HeartPulse className="w-5 h-5" />
            Get Personalized Diet
          </button>
          <button
            onClick={onExploreLibrary}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <BookOpen className="w-5 h-5" />
            Explore Ghanaian Foods
          </button>
          <button
            onClick={onOpenAssistant}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Ask Adwoa (AI)
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 border-t border-white/10 pt-10 text-left">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Condition-Specific</h4>
              <p className="text-sm text-emerald-100/70">Expert insights for diabetes, hypertension, and ulcer management.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-amber-300">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">100% Ghanaian Foods</h4>
              <p className="text-sm text-emerald-100/70">No foreign ingredients. Real Waakye, Kontomire, Kenkey, and Soups.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Portion Guided</h4>
              <p className="text-sm text-emerald-100/70">Calorie and glycemic index breakdowns tailored to local swallow sizes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
