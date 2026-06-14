import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { TOURS } from '../data/tours';
import OptimizedImage from './OptimizedImage';
import TravelMatchModal from './TravelMatchModal';

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (search.trim().length <= 1) return [];
    return TOURS.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.region.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const handleSearch = (term = search) => {
    if (!term.trim()) return;
    const params = new URLSearchParams();
    params.append('q', term);
    navigate(`/destinos?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[700px] md:min-h-[850px] flex items-center justify-center overflow-hidden bg-brand-dark overflow-x-hidden pt-20 md:pt-0">
      {/* Background with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/salto_angel.png"
          alt="Salto Angel"
          className="w-full h-full object-cover scale-110"
          containerClassName="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/20 to-brand-dark/95 md:from-brand-dark/40 md:via-brand-dark/10 md:to-brand-dark/90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 md:px-6 text-center mt-10 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="relative inline-block mb-8 md:mb-12">
            <h1 className="relative text-5xl sm:text-6xl md:text-[7rem] xl:text-[9rem] font-black leading-[0.95] md:leading-[0.9] text-white tracking-tighter italic drop-shadow-2xl">
              Descubre <br className="hidden lg:block" />
              <span className="text-brand-teal not-italic">Venezuela</span>
            </h1>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-xl text-white/70 font-semibold italic mb-10 md:mb-12 leading-relaxed px-4 md:px-0 text-balance">
            Tu directorio de confianza para explorar los mejores destinos, operadoras y experiencias turísticas de Venezuela.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl w-full mx-auto bg-white/5 backdrop-blur-3xl border border-white/20 rounded-3xl md:rounded-[2.5rem] p-2 md:p-3 shadow-2xl relative">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-1">

              {/* Destination Field */}
              <div className="relative group w-full">
                <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand-teal transition-colors">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  placeholder="¿Hacia dónde te gustaría viajar?"
                  className="w-full rounded-2xl md:rounded-[1.8rem] bg-white/10 border border-transparent pl-12 md:pl-14 pr-4 md:pr-6 py-4 md:py-6 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all font-bold italic text-base md:text-lg"
                />

                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 md:mt-3 overflow-hidden rounded-2xl md:rounded-[2rem] bg-brand-dark/95 backdrop-blur-3xl border border-white/10 p-2 md:p-3 text-left shadow-2xl z-50">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => { setSearch(s.title); }}
                        className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold text-white hover:bg-brand-teal hover:text-brand-dark transition-all rounded-xl mb-1 last:mb-0 group/btn"
                      >
                        <span className="truncate">{s.title} <span className="text-white/40 group-hover/btn:text-brand-dark/50 ml-2 font-normal">| {s.region}</span></span>
                        <ArrowRight size={14} className="opacity-0 group-hover/btn:opacity-100 flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <div className="w-full lg:w-auto p-1 shrink-0">
                <button
                  onClick={() => handleSearch()}
                  className="w-full lg:w-auto h-full flex items-center justify-center group relative overflow-hidden rounded-2xl md:rounded-[1.8rem] bg-brand-teal text-brand-dark font-black uppercase tracking-widest text-xs py-4 md:py-6 px-8 hover:bg-white transition-all shadow-xl shadow-teal-500/20 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Explorar</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Travel Match Trigger */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsMatchModalOpen(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white font-bold text-sm transition-all group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              ¿No sabes a dónde ir? Descubre tu destino ideal
            </button>
          </div>
        </motion.div>
      </div>

      <TravelMatchModal 
        isOpen={isMatchModalOpen} 
        onClose={() => setIsMatchModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
