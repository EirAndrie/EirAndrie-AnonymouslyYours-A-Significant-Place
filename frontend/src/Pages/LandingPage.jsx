import React from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Wind, Heart, Shield, Ghost } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-800 selection:bg-gray-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="px-4 md:px-32 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight font-cursive cursor-default">
            Anonymously Yours
          </div>
          <div>
            <a
              href="#"
              className="text-sm font-medium hover:text-gray-600 transition-colors border border-gray-200 px-4 py-2.5 rounded-sm hover:bg-gray-50"
            >
              A Piece of Advice
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block animate-fade-in-up">
            <span className="px-3 py-1 border border-gray-200 rounded-full text-[10px] uppercase tracking-[0.2em] text-gray-400 bg-white">
              Established 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif leading-tight text-gray-900 tracking-tight">
            The safe place for <br />
            <span className="italic font-light text-gray-400">
              things left unsaid.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            A digital sanctuary for your nostalgia, regrets, and quiet
            wanderlust. Leave a memory here, anonymously, and let the weight
            lift off your shoulders.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/browse")}
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-sm hover:bg-gray-800 transition-all text-sm tracking-wide uppercase font-medium shadow-lg shadow-gray-200/50"
            >
              Share a Moment
            </button>
            <button
              onClick={() => navigate("/browse")}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-800 rounded-sm hover:bg-gray-50 transition-all text-sm tracking-wide uppercase font-medium"
            >
              Read Entries
            </button>
          </div>
        </div>
      </header>

      {/* Visual Divider / Imagery */}
      <section className="w-full h-[400px] md:h-[500px] overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?q=80&w=2671&auto=format&fit=crop"
          alt="Sea Horizon"
          className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-[20s]"
        />
        z
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <p className="text-white font-cursive text-4xl md:text-5xl opacity-90 drop-shadow-md">
            "To the places we can never go back to..."
          </p>
        </div>
      </section>

      {/* Features / Philosophy */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Feature 1 */}
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto md:mx-0 group-hover:bg-gray-100 transition-colors">
                <Ghost size={20} className="text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-serif text-gray-900">
                True Anonymity
              </h3>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                No names, no profiles, no judgment. Your identity is hidden, but
                your feelings are validated.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto md:mx-0 group-hover:bg-gray-100 transition-colors">
                <Wind size={20} className="text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-serif text-gray-900">
                Release & Let Go
              </h3>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                Write a letter to a lost love, a past self, or a stranger. Send
                it into the void and feel the relief.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4 group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto md:mx-0 group-hover:bg-gray-100 transition-colors">
                <Heart size={20} className="text-gray-700 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-serif text-gray-900">
                Collective Nostalgia
              </h3>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                Read stories from others. Realize that in your loneliness, you
                are actually not alone at all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Preview */}
      <section className="py-24 px-6 border-t border-gray-100 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Recent Whispers</h2>
            <div className="w-16 h-[1px] bg-gray-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 Preview */}
            <div className="bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] rounded-sm hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=2670&auto=format&fit=crop"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Memory"
                />
              </div>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase">
                Wanderlust
              </span>
              <p className="font-serif text-lg mt-2 text-gray-800">
                "I left a piece of my heart in Kyoto..."
              </p>
              <div className="mt-4 text-xs text-right text-gray-400 font-cursive text-base">
                - stranger
              </div>
            </div>

            {/* Card 2 Preview */}
            <div className="bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] rounded-sm hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2574&auto=format&fit=crop"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Memory"
                />
              </div>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase">
                Regret
              </span>
              <p className="font-serif text-lg mt-2 text-gray-800">
                "I should have said sorry when I had the chance."
              </p>
              <div className="mt-4 text-xs text-right text-gray-400 font-cursive text-base">
                - anon
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/browse")}
              className="text-sm font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-400 transition-all"
            >
              View All Entries
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold font-cursive">
              Anonymously Yours
            </div>
            <p className="text-xs text-gray-400 mt-2">
              © 2026. All memories reserved.
            </p>
          </div>

          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black transition-colors">
              Guidelines
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Merriweather:wght@300;400&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .font-serif { font-family: 'Merriweather', serif; }
      `}</style>
    </div>
  );
};

export default LandingPage;
