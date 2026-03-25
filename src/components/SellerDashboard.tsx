"use client";

import React, { useState } from 'react';

export default function SellerDashboard() {
  const [notifications, setNotifications] = useState([
    { id: '1', listing: 'SEO Audit Report', buyer: 'Alice', status: 'pending' }
  ]);
  const [formData, setFormData] = useState({ title: '', price: '', type: 'Product', category: 'Freelance Services', description: '', img: '💼', upi_id: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Listing published successfully!');
        setFormData({ ...formData, title: '', price: '', description: '', upi_id: '' });
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (err) {
      alert('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 px-4 sm:px-0">
      <div className="lg:col-span-2 bg-card-bg p-6 md:p-8 rounded-3xl shadow-lg border border-bg-secondary">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Create New Listing</h2>
        <form onSubmit={handleCreateListing} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
              <input type="text" required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-bg-primary border border-bg-secondary text-text-primary rounded-xl focus:ring-2 focus:ring-accent-purple outline-none transition placeholder-card-bg/50" placeholder="e.g., Creative Logo Design" />
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">Price (₹)</label>
              <input type="number" required value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 bg-bg-primary border border-bg-secondary text-text-primary rounded-xl focus:ring-2 focus:ring-accent-purple outline-none transition placeholder-card-bg/50" placeholder="e.g., 1499" />
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">Type</label>
              <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 bg-bg-primary border border-bg-secondary text-text-primary rounded-xl focus:ring-2 focus:ring-accent-purple outline-none transition">
                <option>Product</option>
                <option>Service</option>
              </select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
              <select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-bg-primary border border-bg-secondary text-text-primary rounded-xl focus:ring-2 focus:ring-accent-purple outline-none transition">
                <option>Freelance Services</option>
                <option>Digital Products</option>
                <option>Courses</option>
                <option>Consulting</option>
              </select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
              <textarea rows={4} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-bg-primary border border-bg-secondary text-text-primary rounded-xl focus:ring-2 focus:ring-accent-purple outline-none transition placeholder-card-bg/50" placeholder="Detailed description of what the buyer gets..." />
            </div>

            <div className="col-span-2 bg-bg-secondary p-5 rounded-2xl border border-accent-purple/30">
              <label className="block text-sm font-bold text-accent-light mb-2">Payout UPI ID</label>
              <input type="text" required value={formData.upi_id} onChange={e=>setFormData({...formData, upi_id: e.target.value})} className="w-full px-4 py-3 bg-bg-primary border border-accent-purple/50 text-text-primary rounded-xl focus:ring-2 focus:ring-accent-purple outline-none transition placeholder-card-bg/50" placeholder="e.g., yourname@okhdfcbank" />
              <p className="text-xs text-text-secondary mt-2">This UPI ID will be used to generate direct QR codes for buyers at checkout.</p>
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-accent-purple text-text-primary font-bold py-4 rounded-xl hover:bg-accent-light transition shadow-lg disabled:opacity-50">
            {loading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="bg-card-bg p-6 rounded-3xl shadow-lg border border-bg-secondary">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            🔔 Confirmations
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{notifications.length}</span>
          </h3>
          
          {notifications.map(notif => (
            <div key={notif.id} className="bg-bg-primary border border-bg-secondary p-4 rounded-xl">
              <p className="text-sm text-text-primary break-words font-medium">
                <strong className="text-accent-light">{notif.buyer}</strong> claimed they paid for <strong>{notif.listing}</strong>.
              </p>
              <p className="text-xs text-text-secondary mt-1 mb-3">Please verify your bank app before confirming.</p>
              <button 
                onClick={() => setNotifications(notifications.filter(n => n.id !== notif.id))}
                className="w-full bg-accent-purple/20 text-accent-light text-sm py-2 border border-accent-purple/30 rounded-lg hover:bg-accent-purple hover:text-white transition font-medium"
              >
                Verify & Accept
              </button>
            </div>
          ))}
          {notifications.length === 0 && (
            <p className="text-sm text-text-secondary italic">No pending confirmations.</p>
          )}
        </div>
      </div>
    </div>
  );
}
