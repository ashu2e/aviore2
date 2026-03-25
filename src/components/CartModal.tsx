"use client";

import React, { useState } from 'react';

export default function CartModal({ items, onClose, onCheckout }: { items: any[], onClose: () => void, onCheckout: () => void }) {
  const subtotal = items.reduce((acc, item) => acc + (item.listing.price * item.quantity), 0);
  
  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-bg-primary shadow-2xl border-l border-card-bg flex flex-col animate-slide-in-right">
        <div className="bg-bg-secondary p-4 flex justify-between items-center border-b border-card-bg">
          <h2 className="text-xl font-bold text-text-primary">Your Cart</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-2xl px-2">✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <p className="text-text-secondary text-center mt-10">Your cart is empty.</p>
          ) : (
            items.map((item: any) => (
              <div key={item.id} className="bg-card-bg rounded-xl p-4 border border-bg-secondary flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-semibold text-text-primary whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{item.listing.title}</p>
                  <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-text-primary whitespace-nowrap">₹{item.listing.price * item.quantity}</p>
              </div>
            ))
          )}
        </div>

        <div className="bg-bg-secondary p-6 border-t border-card-bg shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-text-secondary font-medium">Subtotal</span>
            <span className="text-2xl font-bold text-text-primary">₹{subtotal}</span>
          </div>
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-accent-purple text-text-primary font-bold py-4 rounded-xl hover:bg-accent-light transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
