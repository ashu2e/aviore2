export default function HeroSection() {
  return (
    <div className="text-center py-16 px-4 mb-8 bg-gradient-to-br from-bg-secondary to-card-bg rounded-3xl border border-card-bg shadow-sm mt-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
        From screen to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent-purple">real time.</span>
      </h1>
      <p className="text-lg text-text-secondary max-w-2xl mx-auto">
        Discover services and products. Connect directly. Pay instantly via UPI.
      </p>
    </div>
  );
}
