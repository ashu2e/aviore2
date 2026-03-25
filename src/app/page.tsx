"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketplaceGrid from "@/components/MarketplaceGrid";
import ListingDetail from "@/components/ListingDetail";
import SellerDashboard from "@/components/SellerDashboard";
import AIGreetingAgent from "@/components/AIGreetingAgent";
import AuthModal from "@/components/AuthModal";
import CartModal from "@/components/CartModal";
import CheckoutFlow from "@/components/CheckoutFlow";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  const [showAuth, setShowAuth] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [showAIAgent, setShowAIAgent] = useState(true);

  useEffect(() => {
    fetch('/api/me').then(res => res.json()).then(data => {
      if(!data.error) {
        setUser(data);
        if (data.role === 'buyer') setShowAIAgent(true);
        fetchCart();
      }
    }).catch(() => {});
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart/items');
      if (res.ok) setCartItems(await res.json());
    } catch (e) {}
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setCartItems([]);
    setSelectedListing(null);
    setIsCheckout(false);
  };

  const addToCart = async (listingId: string) => {
    if (!user) return setShowAuth(true);
    await fetch('/api/cart/add', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, quantity: 1 })
    });
    await fetchCart();
    setIsCartOpen(true);
  };

  const processCheckoutConfirm = async () => {
    await fetch('/api/cart/clear', { method: 'POST' });
    setCartItems([]);
    setIsCheckout(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        user={user} 
        onLoginClick={() => setShowAuth(true)} 
        onLogoutClick={handleLogout}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onSuccess={(userData) => {
            setUser(userData);
            setShowAuth(false);
            if(userData.role === 'buyer') setShowAIAgent(true);
            fetchCart();
          }} 
        />
      )}

      {isCartOpen && (
        <CartModal 
          items={cartItems} 
          onClose={() => setIsCartOpen(false)} 
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckout(true);
          }}
        />
      )}

      {showAIAgent && <AIGreetingAgent onDismiss={() => setShowAIAgent(false)} />}

      <main className="max-w-7xl mx-auto mt-8">
        {!isCheckout && !selectedListing && user?.role !== 'seller' && <HeroSection />}

        {user?.role === 'seller' ? (
          <SellerDashboard />
        ) : isCheckout ? (
          <CheckoutFlow 
            items={cartItems}
            onConfirm={processCheckoutConfirm}
            onBack={() => setIsCheckout(false)}
          />
        ) : selectedListing ? (
          <ListingDetail 
            listing={selectedListing} 
            onBack={() => setSelectedListing(null)} 
            onAddToCart={() => addToCart(selectedListing.id)}
            onBuyNow={() => {
              addToCart(selectedListing.id);
              setIsCheckout(true);
            }}
          />
        ) : (
          <MarketplaceGrid onSelectListing={setSelectedListing} />
        )}
      </main>
    </div>
  );
}
