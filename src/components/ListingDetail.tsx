export default function ListingDetail({ listing, onBack, onAddToCart, onBuyNow }: any) {
  return (
    <div className="max-w-4xl mx-auto bg-card-bg rounded-3xl shadow-lg border border-bg-secondary p-6 md:p-10 mx-4 sm:mx-0 animate-fade-in-up">
      <button onClick={onBack} className="text-text-secondary hover:text-accent-light mb-6 flex items-center gap-2 font-medium transition-colors">
        ← Back to Marketplace
      </button>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square bg-bg-secondary rounded-3xl flex items-center justify-center text-8xl mb-6 shadow-inset border border-bg-primary/50 transform hover:scale-[1.02] transition-transform">
            {listing.img}
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="inline-block px-4 py-1.5 bg-accent-purple/10 text-accent-light rounded-full text-sm font-semibold mb-4 border border-accent-purple/30 self-start shadow-sm">
            {listing.category}
          </span>
          <h2 className="text-4xl font-extrabold text-text-primary mb-4 leading-tight">{listing.title}</h2>
          <p className="text-text-secondary mb-8 leading-relaxed text-lg">
            High-quality provision of {listing.title}. Secure transaction directly to the seller via Aviore's frictionless UPI Cart Checkout.
          </p>
          <div className="text-5xl font-black text-text-primary mb-10 tracking-tight">₹{listing.price}</div>

          <div className="flex flex-col lg:flex-row gap-4">
            <button 
              onClick={onAddToCart}
              className="flex-1 py-4 rounded-xl font-bold text-lg bg-bg-primary border-2 border-accent-purple text-accent-light hover:bg-accent-purple hover:text-text-primary transition-all shadow-md active:scale-95"
            >
              Add to Cart
            </button>

            <button 
              onClick={onBuyNow}
              className="flex-1 py-4 rounded-xl font-bold text-lg bg-accent-purple text-text-primary hover:bg-accent-light transition-all shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.23)] active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
