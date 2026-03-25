"use client";

import React, { useState, useEffect } from 'react';

const CATEGORIES = ['All', 'Freelance Services', 'Digital Products', 'Courses', 'Consulting'];

const MOCK_LISTINGS = [
  { id: '1', title: 'UI/UX Design for SaaS', price: 4999, category: 'Freelance Services', img: '🎨' },
  { id: '2', title: 'Advanced React Course', price: 1299, category: 'Courses', img: '💻' },
  { id: '3', title: 'SEO Audit Report', price: 999, category: 'Consulting', img: '📊' },
  { id: '4', title: 'Notion Life Planner', price: 299, category: 'Digital Products', img: '📝' },
];

export default function MarketplaceGrid({ onSelectListing }: { onSelectListing: (listing: any) => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [listings, setListings] = useState<any[]>(MOCK_LISTINGS);

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data) && data.length > 0) {
          setListings([...data, ...MOCK_LISTINGS]);
        }
      })
      .catch(() => {});
  }, []);

  const filteredListings = activeCategory === 'All' 
    ? listings 
    : listings.filter(l => l.category === activeCategory);

  return (
    <>
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar px-4 sm:px-0">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat 
                ? 'bg-accent-purple text-text-primary shadow-md border border-accent-light/20' 
                : 'bg-card-bg text-text-secondary border border-bg-secondary hover:border-accent-purple/50 focus:outline-none'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-0">
        {filteredListings.map(item => (
          <div key={item.id} className="bg-card-bg rounded-2xl shadow-lg border border-bg-secondary overflow-hidden hover:border-accent-purple/50 transition-colors duration-300 flex flex-col group">
            <div className="h-48 bg-bg-secondary flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
              {item.img}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-semibold text-accent-light mb-1 uppercase tracking-wider">{item.category}</span>
              <h3 className="font-bold text-text-primary mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-xl font-bold text-text-primary mt-auto">₹{item.price}</p>
              <button 
                onClick={() => onSelectListing(item)}
                className="mt-4 w-full bg-accent-purple/10 text-accent-light font-medium py-2 rounded-xl border border-accent-purple/30 hover:bg-accent-purple hover:text-text-primary transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
