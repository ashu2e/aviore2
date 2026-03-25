export default function Navbar({ user, onLoginClick, onLogoutClick, cartCount, onCartClick }: any) {
  return (
    <nav className="bg-bg-secondary shadow-md border-b border-card-bg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center text-white font-bold text-xl shadow-inner border border-accent-light/50">A</div>
          <span className="text-xl font-bold tracking-tight text-text-primary">Aviore</span>
        </div>
        
        <div className="flex items-center gap-6">
          {user?.role !== 'seller' && (
            <button onClick={onCartClick} className="relative flex items-center text-text-secondary hover:text-text-primary transition group">
              <span className="text-2xl pt-1 grayscale group-hover:grayscale-0 transition-all">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent-purple text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-bg-secondary shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-text-secondary hidden sm:block">
                {user.role === 'seller' ? 'Seller Portal' : user.name}
              </span>
              <button onClick={onLogoutClick} className="text-xs font-bold text-accent-light hover:text-white transition px-4 py-2 border border-accent-purple/30 rounded-xl bg-bg-primary shadow-sm">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="text-sm font-bold bg-accent-purple text-text-primary px-5 py-2.5 rounded-xl shadow-md hover:bg-accent-light transition">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
