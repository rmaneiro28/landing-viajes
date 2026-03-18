import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { TOURS } from '../data/tours';
import OptimizedImage from './OptimizedImage';

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const suggestions = useMemo(() => {
    if (search.trim().length <= 1) return [];
    return TOURS.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.region.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const handleSearch = (term = search) => {
    if (!term.trim()) return;
    navigate(`/destinos?q=${term}`);
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-dark overflow-x-hidden">
      {/* Background with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/salto_angel.png"
          alt="Salto Angel"
          className="w-full h-full object-cover scale-105"
          containerClassName="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/10 to-brand-dark/90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 text-center mt-20">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
           <p className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-8 text-white/90 shadow-2xl">
              <Star className="w-3 h-3 text-brand-teal fill-brand-teal" /> Experiencia Premium en Venezuela
           </p>
           
           <div className="relative inline-block mb-12">
              <div className="absolute -inset-10 bg-white/5 backdrop-blur-2xl rounded-[4rem] border border-white/10 shadow-2xl -rotate-1 skew-x-[-1deg] hidden md:block"></div>
              <h1 className="relative text-6xl md:text-[10rem] font-black leading-[0.9] text-white tracking-tighter italic drop-shadow-2xl">
                 Explora el <br className="hidden md:block" />
                 <span className="text-brand-teal not-italic">Salto Ángel</span>
              </h1>
           </div>

           <p className="max-w-2xl mx-auto text-base md:text-xl text-white/70 font-semibold italic mb-12 leading-relaxed text-balance">
              Diseñamos aventuras personalizadas con guías de élite en los paisajes más sobrecogedores del mundo.
           </p>

           {/* Advanced Search Concierge */}
           <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-3 md:p-5 shadow-2xl">
             <div className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr] gap-3">
               <div className="relative group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand-teal transition-colors">
                    <MapPin className="w-5 h-5" />
                 </div>
                 <input
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                   placeholder="¿Hacia dónde te lleva tu instinto?"
                   className="w-full rounded-[1.5rem] bg-white/10 border border-white/10 pl-14 pr-6 py-4 md:py-5 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/15 focus:border-brand-teal/50 transition-all font-bold italic text-lg"
                 />
               </div>
               
               <button
                 onClick={() => handleSearch()}
                 className="group relative overflow-hidden rounded-[1.5rem] bg-brand-teal text-brand-dark font-black uppercase tracking-[0.2em] text-xs py-5 px-8 hover:bg-white transition-all shadow-xl shadow-teal-500/20 active:scale-95"
               >
                 <span className="relative z-10 flex items-center justify-center gap-2">
                    Comenzar Viaje <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </span>
               </button>
             </div>

             {suggestions.length > 0 && (
               <div className="absolute left-3 right-3 mt-4 overflow-hidden rounded-[2rem] bg-brand-dark/95 backdrop-blur-3xl border border-white/10 p-3 text-left shadow-2xl z-50">
                 {suggestions.map((s, i) => (
                   <button
                     key={i}
                     onClick={() => handleSearch(s.title)}
                     className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-white hover:bg-brand-teal hover:text-brand-dark transition-all rounded-xl mb-1 last:mb-0"
                   >
                     <span>{s.title} <span className="text-white/40 group-hover:text-brand-dark/50 ml-2 font-normal">| {s.region}</span></span>
                     <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                   </button>
                 ))}
               </div>
             )}
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
