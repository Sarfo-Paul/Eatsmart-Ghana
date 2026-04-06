import React, { useState } from 'react';
import { Scale, Heart, Info, Apple, CheckCircle2 } from 'lucide-react';

export const RiskCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (w > 0 && h > 0) {
      const calculatedBmi = w / (h * h);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) {
        setCategory('Underweight');
      } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
        setCategory('Healthy Weight');
      } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Scale className="w-6 h-6 text-emerald-600" />
          Quick BMI & Weight Target Calculator
        </h2>
        <p className="text-slate-500">
          Calculate your Body Mass Index (BMI) to understand your caloric requirements and optimal Ghanaian portion sizes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <form onSubmit={calculateBmi} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:border-emerald-600 font-light text-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:border-emerald-600 font-light text-slate-700"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              Calculate BMI
            </button>
            {bmi && (
              <button
                type="button"
                onClick={resetCalculator}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          {!bmi ? (
            <div className="text-center py-12 text-slate-400 font-light flex flex-col items-center justify-center">
              <Heart className="w-12 h-12 text-slate-300 mb-2 animate-pulse" />
              Enter your weight and height to get personalized Ghanaian diet portion recommendations.
            </div>
          ) : (
            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100/50 px-3 py-1 rounded-md">
                Calculation Results
              </span>

              <div className="mt-4 mb-6">
                <span className="text-4xl font-extrabold text-slate-800">{bmi.toFixed(1)}</span>
                <span className="text-sm font-medium text-slate-400 ml-2">BMI</span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-100 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-400 font-bold">Health Status</div>
                  <div className="text-lg font-bold text-slate-800">{category}</div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                <div className="flex gap-2 items-center mb-2 font-bold text-amber-800 text-sm">
                  <Apple className="w-4 h-4" /> Recommended Swallow Portions:
                </div>
                <p className="leading-relaxed font-light">
                  {category === 'Healthy Weight' && 'You can enjoy standard local swallows (Banku, Fufu) but load your plate with 50% soup/stew and 50% carbs.'}
                  {category === 'Overweight' && 'Reduce local swallow (Fufu, Banku, Kenkey) portions to the size of your fist. Double the intake of light soups and garden eggs.'}
                  {category === 'Obese' && 'Severely limit high-carb swallows. Substitute with boiled water yam, oats, or garden egg stews. Focus on vegetables.'}
                  {category === 'Underweight' && 'Increase portion sizes. Enjoy diverse local foods like Waakye, Red Red with minimal palm oil, and boiled plantains.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-850 text-sm font-light leading-relaxed">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Did you know?</span> Traditional Ghanaian swallows (Fufu, Banku, Akple) expand heavily during digestion. Waiting 15 minutes after eating gives your brain time to register true satiety and prevent overeating.
        </div>
      </div>
    </div>
  );
};
