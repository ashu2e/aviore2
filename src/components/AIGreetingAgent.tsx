"use client";

import React, { useState } from 'react';

export default function AIGreetingAgent({ onDismiss }: { onDismiss: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

  const questions = [
    "Hi there! I'm Avi, your personal AI guide. How is your day going?",
    "That's great. What are you planning to achieve today?",
    "Got it. Roughly how much time do you spend on a screen every day?"
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newAnswers = [...answers, inputValue];
    setAnswers(newAnswers);
    setInputValue('');

    if (step < 2) {
      setStep(step + 1);
    } else {
      setTimeout(() => {
        setRecommendations([
          { id: 101, title: 'Digital Detox Guide', price: '₹499', category: 'Digital Products' },
          { id: 102, title: '1-on-1 Productivity Coaching', price: '₹1499', category: 'Freelance Services' },
          { id: 103, title: 'Ergonomic Desk Setup', price: '₹999', category: 'Services' }
        ]);
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-bg-primary border border-card-bg rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col transform transition-all">
        <div className="bg-accent-purple p-4 text-text-primary flex justify-between items-center border-b border-accent-light/30">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <h3 className="font-semibold">Aviore AI Guide</h3>
          </div>
          <button onClick={onDismiss} className="text-text-primary/80 hover:text-text-primary transition text-xl font-bold">×</button>
        </div>
        
        <div className="p-6 flex-1 max-h-[60vh] overflow-y-auto w-full flex flex-col gap-4 bg-bg-secondary">
          {!recommendations ? (
            <>
              <div className="bg-card-bg p-4 rounded-2xl rounded-tl-none shadow-sm border border-accent-purple/30 text-text-primary self-start max-w-[85%]">
                {questions[step]}
              </div>
              
              <div className="mt-4 flex gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-2 bg-bg-primary text-text-primary border border-card-bg rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-accent-purple outline-none placeholder-text-secondary"
                  autoFocus
                />
                <button 
                  onClick={handleSend}
                  className="bg-accent-purple text-text-primary px-4 py-2 rounded-xl hover:bg-accent-light transition shadow-sm font-medium"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-card-bg p-4 rounded-2xl rounded-tl-none shadow-sm border border-accent-purple/30 text-text-primary">
                Thanks for sharing! Based on your time and goals, here is what I recommend from the marketplace:
              </div>
              <div className="flex flex-col gap-3">
                {recommendations.map(item => (
                  <div key={item.id} className="bg-bg-primary p-3 rounded-xl border border-card-bg shadow-sm flex justify-between items-center hover:border-accent-purple/50 transition cursor-pointer">
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{item.title}</p>
                      <p className="text-xs text-accent-light">{item.category}</p>
                    </div>
                    <span className="font-medium text-text-primary">{item.price}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={onDismiss}
                className="mt-4 w-full bg-accent-purple text-text-primary py-3 rounded-xl hover:bg-accent-light font-medium transition shadow-md"
              >
                Explore Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
