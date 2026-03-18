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

  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [activeDateType, setActiveDateType] = useState(null); // 'ida' or 'vuelta'
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [calendarPosition, setCalendarPosition] = useState('bottom');
  const searchBarRef = useRef(null);
  const calendarRef = useRef(null);

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
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
        setActiveDateType(null);
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

  const openCalendar = (e, type) => {
    e.stopPropagation();
    setActiveDateType(type);
    
    // Calculate if it should open top or bottom
    const rect = e.currentTarget.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    setCalendarPosition(spaceBelow < 400 && spaceAbove > spaceBelow ? 'top' : 'bottom');
    setShowCalendar(true);
  };

  const formatDateLabel = (date) => {
    if (!date) return '¿Cuándo?';
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handleDateSelect = (date) => {
    if (!date) return;
    
    // Don't allow selecting dates before today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    if (activeDateType === 'ida') {
      setDepartureDate(date);
      if (returnDate && date > returnDate) setReturnDate(null);
      setActiveDateType('vuelta');
    } else {
      if (departureDate && date < departureDate) {
        setDepartureDate(date);
        setReturnDate(null);
      } else {
        setReturnDate(date);
        setShowCalendar(false);
        setActiveDateType(null);
      }
    }
  };

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = getDaysInMonth(month, year);
    
    // Fill leading empty days
    const firstDayOfWeek = days[0].getDay() || 7; // Adjust for Monday start
    const leadingEmpty = Array(firstDayOfWeek - 1).fill(null);
    
    return [...leadingEmpty, ...days];
  }, [currentMonth]);

  const changeMonth = (offset) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.3 }}
          className="w-full max-w-5xl mt-8 px-4 md:px-0"
          ref={searchBarRef}
        >
          <div className="bg-white/10 backdrop-blur-3xl p-2 rounded-[2rem] md:rounded-full border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center group/search relative">
            
            {/* Destination Input */}
            <div className="w-full md:w-[40%] flex items-center gap-4 px-6 py-3 md:py-4 bg-white/5 rounded-full group hover:bg-white/10 transition-all border border-transparent hover:border-white/10 relative">
              <MapPin className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform shrink-0" />
              <div className="flex-1 text-left min-w-0">
                <label className="text-[9px] uppercase tracking-[0.2em] font-black text-white/40 block">Destino</label>
                <input 
                  type="text" 
                  placeholder="¿A dónde quieres ir?" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none focus:ring-0 text-[15px] md:text-[16px] font-black italic tracking-tight"
                />
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-white/10 mx-1"></div>

            {/* Departure (Ida) */}
            <div 
              onClick={(e) => openCalendar(e, 'ida')}
              className={`w-full md:w-[18%] flex items-center gap-3 px-6 py-4 bg-white/5 rounded-full group hover:bg-white/10 transition-all border-2 cursor-pointer relative z-10 ${activeDateType === 'ida' ? 'border-brand-teal' : 'border-transparent'}`}
            >
               <Calendar className="w-4 h-4 text-brand-teal" />
               <div className="text-left">
                 <label className="text-[9px] uppercase tracking-[0.2em] font-black text-white/40 block">Ida</label>
                 <span className={`text-[15px] font-black italic tracking-tight ${departureDate ? 'text-white' : 'text-white/20'}`}>
                   {formatDateLabel(departureDate)}
                 </span>
               </div>
            </div>

            {/* Return (Vuelta) */}
            <div 
              onClick={(e) => openCalendar(e, 'vuelta')}
              className={`w-full md:w-[18%] flex items-center gap-3 px-6 py-4 bg-white/5 rounded-full group hover:bg-white/10 transition-all border-2 cursor-pointer relative z-10 ${activeDateType === 'vuelta' ? 'border-brand-teal' : 'border-transparent'}`}
            >
               <Calendar className="w-4 h-4 text-brand-teal" />
               <div className="text-left">
                 <label className="text-[9px] uppercase tracking-[0.2em] font-black text-white/40 block">Vuelta</label>
                 <span className={`text-[15px] font-black italic tracking-tight ${returnDate ? 'text-white' : 'text-white/20'}`}>
                   {formatDateLabel(returnDate)}
                 </span>
               </div>
            </div>

            {/* CTA Button */}
            <div className="w-full md:w-auto p-1 flex-1 md:flex-none">
              <button 
                onClick={() => handleSearch()}
                className="w-full md:w-[140px] h-12 md:h-[56px] flex items-center justify-center gap-3 bg-brand-teal text-brand-dark rounded-full font-black uppercase tracking-[0.2em] text-[12px] hover:bg-teal-400 active:scale-95 transition-all shadow-xl hover:shadow-teal-500/30 group/btn"
              >
                 <span>Buscar</span>
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  ref={suggestionRef}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-[calc(100%+15px)] left-0 md:left-4 w-full md:w-[50%] bg-brand-dark/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden z-[100] shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                >
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => selectSuggestion(s.title)}
                      className="w-full text-left px-8 py-5 hover:bg-white/10 transition-all flex items-center justify-between group/item border-b border-white/5 last:border-0"
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-white font-black text-lg italic tracking-tight group-hover/item:text-brand-teal transition-colors">{s.title}</span>
                        <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-0.5">{s.region}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/50 group-hover/item:text-brand-teal group-hover/item:translate-x-1 transition-all" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Intelligent Calendar */}
            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  ref={calendarRef}
                  initial={{ opacity: 0, y: calendarPosition === 'bottom' ? 20 : -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: calendarPosition === 'bottom' ? 20 : -20, scale: 0.95 }}
                  className={`absolute left-1/2 -translate-x-1/2 md:translate-x-0 bg-white rounded-[2rem] w-[320px] p-6 shadow-[0_50px_100px_rgba(0,0,0,0.5)] z-[999] border border-slate-100 
                    ${calendarPosition === 'bottom' ? 'top-[calc(100%+20px)]' : 'bottom-[calc(100%+20px)]'}
                    ${activeDateType === 'ida' ? 'md:left-[35%]' : 'md:left-[55%]'}
                  `}
                >
                  {/* Triangle Indicator */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-slate-100 z-[1000]
                    ${calendarPosition === 'bottom' ? '-top-2 border-l border-t' : '-bottom-2 border-r border-b'}
                  `}></div>
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                      <ArrowRight className="w-4 h-4 rotate-180 text-slate-400" />
                    </button>
                    <div className="text-center font-black">
                      <span className="text-brand-dark text-[15px] uppercase tracking-widest">
                        {currentMonth.toLocaleDateString('es-ES', { month: 'long' })}
                      </span>
                      <span className="text-slate-300 ml-2 text-[15px]">{currentMonth.getFullYear()}</span>
                    </div>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 mb-4">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                      <div key={day} className="text-[10px] font-black text-slate-400 uppercase text-center">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map((date, i) => {
                      if (!date) return <div key={`empty-${i}`} className="h-10"></div>;
                      
                      const isSelected = (departureDate && date.toDateString() === departureDate.toDateString()) || 
                                       (returnDate && date.toDateString() === returnDate.toDateString());
                      const isInRange = departureDate && returnDate && date > departureDate && date < returnDate;
                      
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isToday = date.toDateString() === today.toDateString();
                      const isPast = date < today;

                      return (
                        <button
                          key={date.toISOString()}
                          onClick={() => !isPast && handleDateSelect(date)}
                          disabled={isPast}
                          className={`h-10 relative flex items-center justify-center text-[13px] font-bold rounded-xl transition-all
                            ${isSelected ? 'bg-brand-teal text-white shadow-lg shadow-teal-500/20 z-10' : 
                              isInRange ? 'bg-teal-50 text-brand-teal' : 
                              isPast ? 'text-slate-200 cursor-not-allowed' :
                              'hover:bg-slate-50 text-slate-600'}
                            ${isToday && !isSelected ? 'border-2 border-brand-teal/30 text-brand-teal font-black' : ''}
                          `}
                        >
                          {date.getDate()}
                          {isToday && !isSelected && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-teal rounded-full border-2 border-white"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Viajes de</span>
                      <span className="text-brand-dark font-black text-xs italic">Premium Experience</span>
                    </div>
                    <button 
                      onClick={() => setShowCalendar(false)}
                      className="text-[10px] font-black text-brand-teal uppercase tracking-widest hover:opacity-70"
                    >
                      Listo
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Lowered Z-index to not interfere with calendar */}
      <motion.div 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-20 transition-opacity duration-300 ${showCalendar ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
      >
         <div className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center p-1.5 transition-all group-hover:border-brand-teal/40">
            <motion.div 
              animate={{ 
                y: [0, 12, 0],
                opacity: [1, 0, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="w-1 h-1 bg-brand-teal rounded-full"
            />
         </div>
         <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] group-hover:text-white/50 transition-colors">Explorar</span>
      </motion.div>

       {/* Styled bottom gradient */}
       <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent z-10 pointer-events-none"></div>
    </section>

  );
};

export default Hero;
