import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight, Calculator, TrendingUp, Clock, Target } from 'lucide-react';
import { localKnowledgeBaseAnswers } from '../data/ghanaianFoods';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  type?: 'text' | 'assessment' | 'plan';
  metadata?: {
    calories?: number;
    protein?: number;
    fiber?: number;
    recommendations?: string[];
  };
}

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Akwaaba! 🇬🇭 I'm Adwoa, your expert EatSmart Ghana dietary consultant. I provide personalized nutrition advice, meal planning, and health guidance based on traditional Ghanaian foods and modern nutritional science.\n\n🚨 **Development Notice**: I'm currently in development phase by Paul Sarfo. My responses are based on local nutritional knowledge but should not replace professional medical advice.\n\nI can help you with:\n• Personalized meal plans\n• Nutritional analysis of Ghanaian dishes\n• Weight management strategies\n• Diabetes-friendly options\n• Hypertension management\n• Pregnancy nutrition\n• Children's dietary needs\n• Budget-friendly healthy eating",
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBmiCalculator, setShowBmiCalculator] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    age?: number;
    height?: number;
    weight?: number;
    gender?: 'male' | 'female';
    activityLevel?: 'sedentary' | 'moderate' | 'active';
    goals?: string[];
  }>({});

  // System prompt guiding the AI to behave as Adwoa — Ghanaian dietitian
  const SYSTEM_PROMPT = `You are Adwoa, an expert Ghanaian dietitian and cultural nutritionist. Provide concise, practical, evidence-informed dietary advice focused on Ghanaian foods. When asked, give meal plans, portion guidance, approximate calories, and culturally-appropriate food swaps. If a user mentions a medical condition (diabetes, hypertension, pregnancy, etc.) include a short disclaimer to consult a healthcare professional and avoid giving personalized medical diagnoses. Use friendly tone, bullet lists for plans, and short examples.`;

  const sendToAdwoa = async (userText: string): Promise<string | null> => {
    try {
      const payload = {
        // Upstream model name can be set by the provider; this default is optional.
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userText }
        ],
        max_tokens: 800
      };

      const res = await fetch('/api/adwoa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error('AI API error', res.status, body);
        return null;
      }

      const data = await res.json();
      if (data?.text) return data.text;
      if (typeof data === 'string') return data;
      return null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('sendToAdwoa failed', err);
      return null;
    }
  };

  const calculateBMI = (height: number, weight: number): number => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getPersonalizedRecommendations = (profile: typeof userProfile): string => {
    if (!profile.height || !profile.weight) return '';
    
    const bmi = calculateBMI(profile.height, profile.weight);
    const category = getBMICategory(bmi);
    
    let recommendations = `📊 **Your Health Profile**\n\n**BMI:** ${bmi.toFixed(1)} (${category})\n`;
    
    if (category === 'Underweight') {
      recommendations += `\n**Recommendations for Healthy Weight Gain:**\n• Increase calorie intake with nutrient-dense foods\n• Eat every 3-4 hours\n• Include protein with each meal\n• Add healthy fats: groundnuts, avocado, palm oil (moderate)\n• Try: Red red with extra beans, kontomire stew with fish\n• Strength training exercises 3x weekly\n• Target: 500 extra calories daily`;
    } else if (category === 'Normal weight') {
      recommendations += `\n**Maintenance Recommendations:**\n• Continue balanced Ghanaian diet\n• Maintain portion control\n• Exercise 150 minutes weekly\n• Focus on food quality and variety\n• Include all food groups daily\n• Stay hydrated with 3L water daily`;
    } else if (category === 'Overweight') {
      recommendations += `\n**Weight Loss Recommendations:**\n• Create 500-calorie daily deficit\n• Replace fufu with boiled plantains\n• Choose light soup over oily soups\n• Limit waakye to 1 cup, extra beans\n• Exercise 30 minutes daily\n• Avoid fried foods and sugary drinks\n• Target: 0.5-1kg loss per week`;
    } else {
      recommendations += `\n**Obesity Management Plan:**\n• Consult healthcare provider for personalized plan\n• Start with gentle walks (10 minutes, gradually increase)\n• Eliminate sugary drinks and fried foods\n• Focus on: kontomire stew, light soup, grilled fish\n• Portion control: use smaller plates\n• Consider professional nutritionist guidance\n• Monitor blood pressure and blood sugar regularly`;
    }
    
    return recommendations;
  };

  const generateDietaryAssessment = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
      // Check for BMI or profile requests
      if (lowerQuery.includes('bmi') || lowerQuery.includes('body mass') || lowerQuery.includes('my profile')) {
        if (userProfile.height && userProfile.weight) {
          return getPersonalizedRecommendations(userProfile);
        } else {
          return "📏 **To provide personalized recommendations, I need your measurements:**\n\nPlease share:\n• Height (in cm)\n• Weight (in kg)\n• Age (optional)\n• Gender (optional)\n• Activity level (sedentary/moderate/active)\n\nExample: 'I'm 165cm tall, weigh 70kg, female, moderately active'\n\nThis helps me calculate your BMI and provide tailored dietary advice!";
        }
      }
      
      // Check for user profile information
      const profileMatch = query.match(/(\d+)cm\s*(\d+)kg/i) || query.match(/(\d+)\s*kg\s*(\d+)\s*cm/i);
      if (profileMatch) {
        const weight = parseInt(profileMatch[1]);
        const height = parseInt(profileMatch[2]);
        
        setUserProfile(prev => ({ ...prev, height, weight }));
        
        const bmi = calculateBMI(height, weight);
        const category = getBMICategory(bmi);
        
        return `✅ **Profile Updated!**\n\n**Height:** ${height}cm\n**Weight:** ${weight}kg\n**BMI:** ${bmi.toFixed(1)} (${category})\n\n${getPersonalizedRecommendations({ height, weight })}`;
      }
      
      // Check for meal planning requests
    if (lowerQuery.includes('meal plan') || lowerQuery.includes('weekly menu') || lowerQuery.includes('diet plan')) {
      return "📋 **Personalized Weekly Meal Plan**\n\n**Monday:**\n• Breakfast: Oatmeal with banana and groundnuts\n• Lunch: Light soup with tilapia and boiled plantain\n• Dinner: Kontomire stew with brown rice (1 cup)\n\n**Tuesday:**\n• Breakfast: Boiled plantain with eggs\n• Lunch: Waakye with extra beans and vegetables\n• Dinner: Garden egg stew with grilled chicken\n\n**Wednesday:**\n• Breakfast: Fresh fruit salad with yogurt\n• Lunch: Red red with boiled plantains (moderate portion)\n• Dinner: Banku with okro soup and fish\n\n**Thursday:**\n• Breakfast: Whole wheat toast with avocado\n• Lunch: Leftover kontomire stew\n• Dinner: Tuo zaafi with leafy green soup\n\n**Friday:**\n• Breakfast: Smoothie with mango and spinach\n• Lunch: Jollof rice with mixed vegetables and chicken\n• Dinner: Light soup with snails and boiled yam\n\n**Weekend:**\n• Include traditional favorites with portion control\n• Focus on family meals with plenty of vegetables\n• Stay hydrated with water and natural fruit juices\n\n💡 **Tips:** Prep ingredients on weekends, control portions, and listen to your body's hunger signals.";
    }
    
    // Check for nutritional analysis requests
    if (lowerQuery.includes('nutrition') || lowerQuery.includes('calories') || lowerQuery.includes('healthy')) {
      return "🔬 **Nutritional Analysis of Common Ghanaian Foods**\n\n**High Protein Options:**\n• Beans: 15g protein per cup, excellent for muscle building\n• Tilapia: 25g protein per 100g, omega-3 rich\n• Groundnuts: 8g protein per handful, healthy fats\n• Snails: 16g protein per 100g, low fat\n\n**High Fiber Foods:**\n• Kontomire: 4g fiber per cup, iron-rich\n• Garden eggs: 3g fiber per cup, antioxidants\n• Beans: 8g fiber per cup, digestive health\n• Whole grains: 6g fiber per cup, sustained energy\n\n**Calorie-Conscious Choices:**\n• Light soup: 140 calories per bowl\n• Boiled plantains: 180 calories each\n• Garden egg stew: 210 calories per serving\n• Waakye (moderate): 380 calories per plate\n\n**Limit These:**\n• Fufu: 400+ calories per fist-sized portion\n• Red red: 450 calories (fried plantains add oil)\n• Shito: 100+ calories per tablespoon\n\n💡 **Balance your plate:** 1/2 vegetables, 1/4 protein, 1/4 complex carbs.";
    }
    
    // Check for weight management
    if (lowerQuery.includes('weight loss') || lowerQuery.includes('lose weight') || lowerQuery.includes('dieting')) {
      return "⚖️ **Sustainable Weight Management Strategy**\n\n**Daily Calorie Targets:**\n• Women: 1500-1800 calories for weight loss\n• Men: 1800-2200 calories for weight loss\n\n**Portion Control Guide:**\n• Fufu/Banku: Fist size only (200 calories)\n• Rice/Waakye: 1 cup cooked (250 calories)\n• Protein: Palm size (150-200 calories)\n• Vegetables: Fill half your plate (50-100 calories)\n• Oil: 1 tablespoon per meal (120 calories)\n\n**Meal Timing:**\n• 7am: Protein-rich breakfast\n• 10am: Fruit snack\n• 1pm: Balanced lunch\n• 4pm: Nuts or yogurt\n• 7pm: Light dinner\n\n**Smart Swaps:**\n• Fufu → Boiled plantains (saves 250 calories)\n• Fried plantains → Boiled plantains (saves 150 calories)\n• White rice → Brown rice (adds fiber)\n• Oily soups → Light soup (saves 200 calories)\n\n💡 **Exercise:** Walk 30 minutes daily, drink 3L water, and sleep 7-8 hours.";
    }
    
    // Check for diabetes management
    if (lowerQuery.includes('diabetes') || lowerQuery.includes('blood sugar')) {
      return "🩺 **Diabetes Management with Ghanaian Foods**\n\n**Blood Sugar Friendly Foods:**\n• Kontomire stew: Low glycemic index, high fiber\n• Light soup: Minimal carbs, hydrating\n• Beans: Complex carbs, soluble fiber\n• Boiled plantains: Medium glycemic, portion controlled\n\n**Foods to Limit:**\n• Fufu: High glycemic index (70+)\n• Gari: Rapid glucose spike\n• White rice: High glycemic load\n• Sugary drinks: Immediate glucose rise\n\n**Meal Planning:**\n• Eat every 4-5 hours to maintain stable glucose\n• Include protein with every meal\n• Monitor glucose 2 hours after meals\n• Walk 15 minutes after eating\n\n**Portion Guidelines:**\n• Carbs: 1 cup per meal maximum\n• Protein: Palm size portion\n• Vegetables: Unlimited non-starchy types\n• Fruits: 2-3 servings daily\n\n⚠️ **Always consult your healthcare provider before making dietary changes.";
    }
    
    return null;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuery = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Quick local handling for BMI/profile requests or other quick assessments
      const assessmentResponse = generateDietaryAssessment(userQuery.toLowerCase());
      if (assessmentResponse) {
        const aiMessage: Message = {
          id: Math.random().toString(),
          sender: 'ai',
          text: assessmentResponse,
          timestamp: new Date(),
          type: 'assessment'
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        return;
      }

      // Call the serverless AI proxy which forwards to the configured provider (Vercel AI / OpenAI / etc.)
      const aiText = await sendToAdwoa(userQuery);

      let finalText = aiText;
      let messageType: Message['type'] = 'text';

      if (!finalText) {
        // Fallback to local knowledge base if external AI fails
        for (const item of localKnowledgeBaseAnswers) {
          if (item.keywords.some(keyword => userQuery.toLowerCase().includes(keyword))) {
            finalText = item.answer;
            break;
          }
        }
      }

      if (!finalText) {
        finalText = "Sorry — I'm having trouble reaching the AI service right now. Try again or ask a different question.";
      }

      const aiMessage: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: finalText,
        timestamp: new Date(),
        type: messageType
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('handleSendMessage error', err);
      const aiMessage: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: "Sorry, Adwoa is temporarily unavailable. Please try again later.",
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const sampleQuestions = [
    "Calculate my BMI and give recommendations",
    "Create a weekly meal plan for weight loss",
    "What are the most nutritious Ghanaian foods?",
    "How can I manage diabetes with local foods?",
    "What's a good portion control guide?",
    "Healthy breakfast options with Ghanaian foods",
    "How to eat healthy on a budget?",
    "Best foods for hypertension",
    "Pregnancy nutrition guide",
    "Children's healthy meal ideas",
    "Post-workout nutrition with local foods",
    "Meal timing for blood sugar control",
    "High protein Ghanaian food combinations"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col h-[600px]">
      <div className="border-b border-slate-100 pb-4 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Adwoa — Expert Dietary Consultant
          </h2>
          <p className="text-xs text-slate-500">Personalized Nutrition & Meal Planning | Developed by Paul Sarfo</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md flex items-center gap-1 animate-pulse">
            ● In Development
          </span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
            <Target className="w-3 h-3" />
            Expert Mode
          </span>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md flex items-center gap-1">
            <Calculator className="w-3 h-3" />
            BMI Ready
          </span>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none'
                : msg.type === 'assessment' 
                  ? 'bg-gradient-to-r from-emerald-50 to-blue-50 text-slate-800 rounded-tl-none border border-emerald-200 font-light'
                  : 'bg-slate-100 text-slate-800 rounded-tl-none font-light'
            }`}>
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 text-slate-400 text-sm font-light p-4 rounded-2xl rounded-tl-none animate-pulse">
              Adwoa is typing a response...
            </div>
          </div>
        )}
      </div>

      {/* BMI Calculator Section */}
      {showBmiCalculator && (
        <div className="mb-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              Quick BMI Calculator
            </h3>
            <button
              onClick={() => setShowBmiCalculator(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="number"
              placeholder="Height (cm)"
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              onChange={(e) => setUserProfile(prev => ({ ...prev, height: parseInt(e.target.value) || undefined }))}
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              onChange={(e) => setUserProfile(prev => ({ ...prev, weight: parseInt(e.target.value) || undefined }))}
            />
          </div>
          <button
            onClick={() => {
              if (userProfile.height && userProfile.weight) {
                const recommendations = getPersonalizedRecommendations(userProfile);
                const bmiMessage: Message = {
                  id: Math.random().toString(),
                  sender: 'ai',
                  text: recommendations,
                  timestamp: new Date(),
                  type: 'assessment'
                };
                setMessages(prev => [...prev, bmiMessage]);
                setShowBmiCalculator(false);
              }
            }}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-500 transition-colors"
          >
            Get Personalized Recommendations
          </button>
        </div>
      )}

      {/* Sample Questions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Get started with these expert questions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputValue(q);
                }}
                className="text-left text-xs bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 p-3 rounded-xl transition-all flex items-center justify-between group"
              >
                {q}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 font-medium flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <strong>Pro Tip:</strong> Share your height and weight (e.g., "165cm 70kg") for personalized BMI-based recommendations!
            </p>
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="flex gap-2 border-t border-slate-100 pt-4 mt-auto">
        <button
          onClick={() => setShowBmiCalculator(!showBmiCalculator)}
          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-3 rounded-xl transition-all flex items-center justify-center"
          title="BMI Calculator"
        >
          <Calculator className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask for meal plans, nutrition advice, portion control, diabetes management..."
          className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:bg-white border border-slate-100 focus:border-emerald-600"
        />
        <button
          onClick={handleSendMessage}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl shadow-md transition-all flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
