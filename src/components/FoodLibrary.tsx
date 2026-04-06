import React, { useState } from 'react';
import { ghanaianFoods, GhanaianFood } from '../data/ghanaianFoods';
import { Search, Eye, Flame, AlertCircle } from 'lucide-react';

export const FoodLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFood, setSelectedFood] = useState<GhanaianFood | null>(null);

  const categories = ['All', 'Carbs', 'Proteins', 'Soups & Stews', 'Snacks', 'Beverages'];

  const filteredFoods = ghanaianFoods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">🇬🇭 Ghanaian Food Directory</h2>
        <p className="text-slate-500">
          Browse nutritional profiles, glycemic ratings, and healthy alternatives for local dishes.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Waakye, Kontomire, Banku, Fufu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:border-emerald-600 font-light"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between bg-white hover:border-slate-200 cursor-pointer"
            onClick={() => setSelectedFood(food)}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-700">
                  {food.category}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                  food.nutritionalValue.glycemicIndex === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  GI: {food.nutritionalValue.glycemicIndex}
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-800 mb-1">{food.name}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-2 mb-4">
                {food.description}
              </p>
            </div>

            <div className="border-t border-slate-50 pt-4 flex items-center justify-between text-slate-500 text-xs">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-500" />
                {food.nutritionalValue.calories} kcal
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                View Details <Eye className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-lg font-bold transition-all"
            >
              ×
            </button>

            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
              {selectedFood.category}
            </span>

            <h3 className="text-2xl font-extrabold text-slate-800 mt-3 mb-2">{selectedFood.name}</h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed mb-6">
              {selectedFood.description}
            </p>

            {/* Detailed Nutrition */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Nutritional Profile (Per Serving)</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs text-slate-400 font-medium">Energy Value</div>
                <div className="text-lg font-extrabold text-slate-800">{selectedFood.nutritionalValue.calories} kcal</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs text-slate-400 font-medium">Total Carbs</div>
                <div className="text-lg font-extrabold text-slate-800">{selectedFood.nutritionalValue.carbs}g</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs text-slate-400 font-medium">Lean Protein</div>
                <div className="text-lg font-extrabold text-slate-800">{selectedFood.nutritionalValue.protein}g</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-xs text-slate-400 font-medium">Dietary Fat</div>
                <div className="text-lg font-extrabold text-slate-800">{selectedFood.nutritionalValue.fat}g</div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold">Preparation Insight:</span> Always watch oil and seasoning cubes. Frying local items like plantains increases calorie density by over 100%. Choose boiling or baking where possible.
              </div>
            </div>

            <button
              onClick={() => setSelectedFood(null)}
              className="w-full mt-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-sm"
            >
              Done Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
