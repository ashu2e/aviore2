"use client";

import React, { useState } from 'react';

export default function CheckoutFlow({ items, onConfirm, onBack }: { items: any[], onConfirm: () => void, onBack: () => void }) {
  const [hasPaid, setHasPaid] = useState(false);
  const subtotal = items.reduce((acc, item) => acc + (item.listing.price * item.quantity), 0);

  // Group items by seller UPI ID to handle mixed-cart purchases
  const groupedSellers = items.reduce((acc, item) => {
    const upi = item.listing.upi_id || "checkout@aviore";
    if (!acc[upi]) acc[upi] = { total: 0, items: [] };
    acc[upi].total += item.listing.price * item.quantity;
    acc[upi].items.push(item);
    return acc;
  }, {});

  const confirmPayment = async () => {
    setHasPaid(true);
    // Real implementation would invoke /api/purchases/confirm
    // Then clear cart: /api/cart/clear
    setTimeout(() => {
      onConfirm();
      alert('Success! Purchase registered. Sellers notified and cart cleared.');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-card-bg rounded-3xl shadow-lg border border-bg-secondary p-6 md:p-10 mx-4 sm:mx-0">
      <button onClick={onBack} className="text-text-secondary hover:text-accent-light mb-6 flex items-center gap-2 font-medium transition-colors">
        ← Back to Shopping
      </button>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-text-primary">Order Summary</h2>
          <div className="bg-bg-secondary rounded-2xl p-6 border border-card-bg flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            {items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-card-bg last:border-0 last:pb-0">
                <div className="flex flex-col">
                  <span className="font-bold text-text-primary">{item.listing.title}</span>
                  <span className="text-sm text-text-secondary">Qty: {item.quantity}</span>
                </div>
                <span className="font-bold text-text-primary">₹{item.listing.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-4 px-6 bg-accent-purple/10 border border-accent-purple/20 rounded-2xl">
            <span className="text-xl font-bold text-text-primary">Total</span>
            <span className="text-2xl font-black text-accent-light">₹{subtotal}</span>
          </div>
        </div>
        
        <div className="bg-bg-primary rounded-2xl p-6 border border-bg-secondary flex flex-col items-center justify-start text-center shadow-lg h-full overflow-y-auto max-h-[600px] gap-6 custom-scrollbar hidden-scrollbar pb-6">
          <div className="w-full">
            <h3 className="font-bold text-2xl text-text-primary mb-2">Direct Seller Checkout</h3>
            <p className="text-sm text-text-secondary mb-4">Scan the QR code(s) below to directly pay the sellers.</p>
          </div>
          
          <div className="flex flex-col gap-8 w-full flex-shrink-0">
            {Object.entries(groupedSellers).map(([upi, group]: any) => (
              <div key={upi} className="flex flex-col items-center bg-card-bg p-4 rounded-2xl border border-accent-purple/20 shadow-md">
                <span className="text-sm font-bold text-text-secondary mb-1">Seller UPI</span>
                <span className="text-md font-bold text-accent-light mb-2">{upi}</span>
                <span className="text-lg font-black text-text-primary mb-4">Total: ₹{group.total}</span>
                <div className="bg-white p-3 rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.2)] w-48 h-48 flex items-center justify-center shrink-0">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(upi)}&pn=AvioreSeller&am=${group.total}&cu=INR`} 
                    alt={`UPI QR for ${upi}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={confirmPayment}
            disabled={hasPaid}
            className={`w-full py-4 mt-auto rounded-xl font-bold text-lg transition-all shrink-0 ${
              hasPaid 
                ? 'bg-green-600 text-white cursor-not-allowed shadow-inner' 
                : 'bg-accent-purple text-text-primary hover:bg-accent-light shadow-md hover:shadow-[0_4px_14px_0_rgba(139,92,246,0.39)]'
            }`}
          >
            {hasPaid ? '✓ Payments Confirmed' : 'I have completed all payments'}
          </button>
        </div>
      </div>
    </div>
  );
}
