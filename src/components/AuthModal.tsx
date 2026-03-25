"use client";

import React, { useState } from 'react';

export default function AuthModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password, role, upi_id: role === 'seller' ? email.split('@')[0]+'@upi' : null };
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess(data);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-bg-primary border border-card-bg rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-xl">✕</button>
        <h2 className="text-2xl font-bold text-text-primary mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
             <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 bg-bg-secondary text-text-primary border border-card-bg rounded-xl focus:ring-accent-purple outline-none placeholder-text-secondary/50" />
          )}
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-bg-secondary text-text-primary border border-card-bg rounded-xl focus:ring-accent-purple outline-none placeholder-text-secondary/50" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-bg-secondary text-text-primary border border-card-bg rounded-xl focus:ring-accent-purple outline-none placeholder-text-secondary/50" />
          
          {!isLogin && (
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-3 bg-bg-secondary text-text-primary border border-card-bg rounded-xl focus:ring-accent-purple outline-none">
              <option value="buyer">I want to Browse & Buy</option>
              <option value="seller">I want to Sell Services</option>
            </select>
          )}

          <button type="submit" className="w-full bg-accent-purple text-text-primary font-bold py-3 rounded-xl hover:bg-accent-light transition mt-2 shadow-lg">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-accent-light font-bold hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
