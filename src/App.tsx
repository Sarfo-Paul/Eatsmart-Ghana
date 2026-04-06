import { useState } from 'react';
import { HomeHero } from './components/HomeHero';
import { ConditionSelector } from './components/ConditionSelector';
import { DietResults } from './components/DietResults';
import { FoodLibrary } from './components/FoodLibrary';
import { AiAssistant } from './components/AiAssistant';
import { RiskCalculator } from './components/RiskCalculator';
import { HealthCondition } from './data/ghanaianFoods';
import { ShieldCheck, HeartPulse, Sparkles, BookOpen, Scale } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'recommender' | 'library' | 'ai' | 'calculator'>('recommender');
  const [selectedCondition, setSelectedCondition] = useState<HealthCondition | null>(null);

  const handleSelectCondition = (condition: HealthCondition) => {
    setSelectedCondition(condition);
    // Smooth scroll down to the results
    setTimeout(() => {
      document.getElementById('diet-results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-center py-2 text-xs font-semibold tracking-wide border-b border-slate-800 flex justify-center items-center gap-2">
        <span>🇬🇭 Promoting Healthier Traditional Ghanaian Diets</span>
        <span className="hidden md:inline text-slate-400">•</span>
        <span className="hidden md:inline text-slate-400">Trusted by health-conscious families nationwide</span>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-emerald-600/10">
              🇬🇭
            </div>
            <div>
              <span className="text-xl font-black text-slate-800 tracking-tight">EatSmart</span>
              <span className="text-xl font-light text-emerald-600 ml-1">Ghana</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => { setCurrentTab('recommender'); }}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                currentTab === 'recommender' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              Diet Recommender
            </button>

            <button
              onClick={() => setCurrentTab('library')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                currentTab === 'library' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Ghanaian Food Directory
            </button>

            <button
              onClick={() => setCurrentTab('ai')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                currentTab === 'ai' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Ask Adwoa (AI)
            </button>

            <button
              onClick={() => setCurrentTab('calculator')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                currentTab === 'calculator' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4" />
              BMI Calculator
            </button>
          </nav>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Professional Grade
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex border-t border-slate-100 bg-white justify-around py-3">
          <button
            onClick={() => setCurrentTab('recommender')}
            className={`flex flex-col items-center text-xs gap-1 font-bold ${
              currentTab === 'recommender' ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <HeartPulse className="w-5 h-5" />
            Plan
          </button>

          <button
            onClick={() => setCurrentTab('library')}
            className={`flex flex-col items-center text-xs gap-1 font-bold ${
              currentTab === 'library' ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Library
          </button>

          <button
            onClick={() => setCurrentTab('ai')}
            className={`flex flex-col items-center text-xs gap-1 font-bold ${
              currentTab === 'ai' ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Ask AI
          </button>

          <button
            onClick={() => setCurrentTab('calculator')}
            className={`flex flex-col items-center text-xs gap-1 font-bold ${
              currentTab === 'calculator' ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <Scale className="w-5 h-5" />
            BMI
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <HomeHero
          onExploreLibrary={() => setCurrentTab('library')}
          onStartRecommender={() => setCurrentTab('recommender')}
          onOpenAssistant={() => setCurrentTab('ai')}
        />

        <div className="space-y-12">
          {currentTab === 'recommender' && (
            <div className="space-y-12 animate-in fade-in duration-300">
              <ConditionSelector
                selectedConditionId={selectedCondition?.id || null}
                onSelectCondition={handleSelectCondition}
              />

              {selectedCondition && (
                <div id="diet-results-section" className="scroll-mt-24">
                  <DietResults condition={selectedCondition} />
                </div>
              )}
            </div>
          )}

          {currentTab === 'library' && (
            <div className="animate-in fade-in duration-300">
              <FoodLibrary />
            </div>
          )}

          {currentTab === 'ai' && (
            <div className="animate-in fade-in duration-300">
              <AiAssistant />
            </div>
          )}

          {currentTab === 'calculator' && (
            <div className="animate-in fade-in duration-300">
              <RiskCalculator />
            </div>
          )}
        </div>
      </main>

      {/* Local Footnote */}
      <footer className="border-t border-slate-100 bg-white mt-24 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-light">
          <div>
            <span className="font-bold text-slate-800">EatSmart Ghana</span> — Developed by Paul Sarfo © 2026
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Medical Board</a>
          </div>

          <div>
            Designated for educational & public health promotion. AI in development phase.
          </div>
        </div>
      </footer>
    </div>
  );
}
