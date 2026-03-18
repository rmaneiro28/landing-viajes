import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { TOURS } from '../data/tours';
import OptimizedImage from './OptimizedImage';

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const dateInputRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState('');

  const landmarks = [
    { name: 'Canaima', pos: 'top-1/4 left-[15%]', price: '$450', delay: 0.2 },
    { name: 'Los Roques', pos: 'top-[35%] right-[10%]', price: '$890', delay: 0.5 },
    { name: 'Mérida', pos: 'bottom-[30%] left-[10%]', price: '$320', delay: 0.8 },
    { name: 'La Tortuga', pos: 'bottom-1/3 right-[15%]', price: '$280', delay: 1.1 },
  ];

  const allLocations = useMemo(() => {
    return TOURS.map(t => ({ title: t.title, region: t.region }));
  }, []);

  useEffect(() => {
    if (search.length > 1) {
      const filtered = allLocations.filter(loc => 
        loc.title.toLowerCase().includes(search.toLowerCase()) || 
        loc.region.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search, allLocations]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (term = search) => {
    navigate(`/destinos?q=${encodeURIComponent(term)}`);
    setShowSuggestions(false);
  };

  const selectSuggestion = (term) => {
    setSearch(term);
    handleSearch(term);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '¿Cuándo viajas?';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section ref={heroRef} className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image with Parallax & Ken Burns */}
      <motion.div 
        animate={{ 
          x: mousePos.x * -1, 
          y: mousePos.y * -1,
          scale: 1.1 
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        className="absolute inset-0 z-0"
      >
        <OptimizedImage
          src="/salto_angel.png"
          alt="Angel Falls Hero"
          className="w-full h-full object-cover opacity-60"
          containerClassName="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark/60"></div>
      </motion.div>

      {/* Floating Landmarks */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {landmarks.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: l.delay, duration: 1, type: "spring" }}
            className={`absolute ${l.pos} hidden lg:block pointer-events-auto`}
          >
             <motion.div 
               whileHover={{ scale: 1.1 }}
               className="group relative"
             >
                <div className="w-4 h-4 bg-brand-teal rounded-full animate-ping absolute inset-0"></div>
                <div className="w-4 h-4 bg-brand-teal rounded-full relative z-10 border-2 border-white shadow-xl"></div>
                
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 min-w-[150px] shadow-2xl">
                   <p className="text-white font-black italic text-sm mb-0.5">{l.name}</p>
                   <p className="text-brand-teal text-[10px] font-black uppercase tracking-widest">Desde {l.price}</p>
                </div>
             </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8 px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3"
        >
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">12 Viajeros explorando ahora mismo</span>
        </motion.div>

        <motion.div
           style={{ 
             x: mousePos.x * 0.5, 
             y: mousePos.y * 0.5 
           }}
           className="mb-14"
        >
          <h1 className="text-6xl md:text-[120px] font-black text-white leading-tight md:leading-[0.9] mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] tracking-tighter italic">
            <span className="not-italic md:hidden">Explora el</span>
            <br className="md:hidden" />
            <span className="text-brand-teal not-italic md:hidden">Salto Ángel</span>
            <span className="hidden md:inline">Viaja a lo</span> <br className="hidden md:block" />
            <span className="text-brand-teal not-italic hidden md:inline">Extraordinario</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed md:italic font-medium md:text-white/70">
            Viva la aventura de tu vida en el corazón de la selva venezolana.
          </p>
        </motion.div>

        {/* Search Bar - Center Bottomish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
          className="w-full max-w-5xl perspective-[1000px] relative px-4 md:px-0"
        >
          <div className="bg-white/10 backdrop-blur-3xl p-2 md:p-4 rounded-[2rem] md:rounded-[4rem] border border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-row items-center gap-2 transform-gpu hover:rotate-x-1 transition-all duration-700 select-none group/search relative">
            
            {/* Mobile/Desktop Search Input */}
            <div className="flex-1 flex items-center gap-3 md:gap-5 px-4 md:px-8 py-3 md:py-0 bg-white/5 rounded-[1.5rem] md:rounded-[3rem] group hover:bg-white/10 transition-all border border-transparent hover:border-white/10 relative">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-brand-teal shrink-0" />
              <input 
                type="text" 
                placeholder="¿A dónde quieres ir?" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-0 text-sm md:text-[18px] font-bold italic"
              />
            </div>
            
            {/* Desktop-only Date Picker */}
            <div 
              onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.focus()}
              className="hidden md:flex flex-1 items-center gap-5 px-8 bg-white/5 rounded-[3rem] group hover:bg-white/10 transition-all border border-transparent hover:border-white/10 cursor-pointer"
            >
              <Calendar className="w-6 h-6 text-brand-teal" />
              <div className="text-left flex-1 min-w-0">
                <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 block mb-1">Fecha</label>
                <div className="relative h-6 flex items-center">
                   <input 
                     ref={dateInputRef}
                     type="date" 
                     value={selectedDate}
                     onChange={(e) => setSelectedDate(e.target.value)}
                     className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                   />
                   <span className={`text-[17px] font-black italic tracking-tight block truncate ${selectedDate ? 'text-white' : 'text-white/20'}`}>
                     {formatDate(selectedDate)}
                   </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleSearch}
              className="bg-brand-teal text-brand-dark px-6 md:px-14 py-4 md:py-7 rounded-[1.5rem] md:rounded-[3rem] font-black uppercase tracking-[0.1em] md:tracking-[0.3em] text-[11px] md:text-[13px] hover:bg-teal-400 active:scale-95 transition-all shadow-xl"
            >
               Buscar
            </button>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  ref={suggestionRef}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.98 }}
                  className="absolute top-[calc(100%+15px)] left-0 right-0 md:right-auto md:w-[60%] lg:w-[50%] bg-brand-dark/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden z-[100] shadow-[0_50px_100px_rgba(0,0,0,0.9)] mx-4 md:mx-0"
                >
                  <div className="p-4 md:p-6 border-b border-white/5 bg-white/5 px-8 md:px-10">
                    <span className="text-[9px] md:text-[10px] font-black text-brand-teal uppercase tracking-[0.4em] md:tracking-[0.5em]">Sugerencias</span>
                  </div>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => selectSuggestion(s.title)}
                      className="w-full text-left px-8 md:px-12 py-5 md:py-8 hover:bg-white/10 transition-all flex items-center justify-between group/item border-b border-white/5 last:border-0"
                    >
                      <div className="flex flex-col">
                        <span className="text-white font-black text-lg md:text-2xl italic tracking-tight group-hover/item:text-brand-teal transition-colors">{s.title}</span>
                        <span className="text-white/40 text-[9px] md:text-[11px] font-black uppercase tracking-widest leading-relaxed mt-0.5 md:mt-1">{s.region}</span>
                      </div>
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover/item:border-brand-teal group-hover/item:bg-brand-teal group-hover/item:scale-110 transition-all">
                        <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-white group-hover/item:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
           <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] rotate-90 mb-4 origin-left">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-brand-teal to-transparent"></div>
        </motion.div>
      </div>

       {/* Decorative gradient at bottom */}
       <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none opacity-50"></div>
    </section>
  );
};

export default Hero;
