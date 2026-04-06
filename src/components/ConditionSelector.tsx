import React from 'react';
import { Heart, Activity, ShieldAlert, Scale, Smile, Info } from 'lucide-react';
import { conditions, HealthCondition } from '../data/ghanaianFoods';

interface ConditionSelectorProps {
  selectedConditionId: string | null;
  onSelectCondition: (condition: HealthCondition) => void;
}

const iconsMap: { [key: string]: React.ReactNode } = {
  activity: <Activity className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  "shield-alert": <ShieldAlert className="w-6 h-6" />,
  scale: <Scale className="w-6 h-6" />,
  smile: <Smile className="w-6 h-6" />,
};

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  selectedConditionId,
  onSelectCondition,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
      <div className="max-w-xl mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Step 1: Select Health Profile</h2>
        <p className="text-slate-500">
          Tell us about your health goal or medical condition to customize your Ghanaian diet plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conditions.map((condition) => {
          const isSelected = selectedConditionId === condition.id;
          return (
            <button
              key={condition.id}
              onClick={() => onSelectCondition(condition)}
              className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/40 ring-4 ring-emerald-600/5 shadow-md'
                  : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {iconsMap[condition.icon] || <Activity className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{condition.name}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{condition.description}</p>
              </div>

              {isSelected && (
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-3 py-1.5 rounded-lg border border-emerald-200/50">
                  <Smile className="w-4 h-4" /> Selected Profile
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-850 text-sm font-light leading-relaxed">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Important Medical Disclaimer:</span> This app provides general dietary suggestions based on traditional Ghanaian recipes and is not a substitute for professional medical advice, diagnosis, or treatment from your doctor or dietitian.
        </div>
      </div>
    </div>
  );
};
