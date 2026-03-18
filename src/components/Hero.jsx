import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOURS } from '../data/tours';
import OptimizedImage from './OptimizedImage';

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingType, setSelectingType] = useState('departure'); // 'departure' or 'return'
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    if (departureDate) params.append('departure', departureDate.toISOString());
    if (returnDate) params.append('return', returnDate.toISOString());
    navigate(`/destinos?${params.toString()}`);
  };

  const formatDate = (date) => {
    if (!date) return '¿Cuándo?';
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  // Calendar logic
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const calendarDays = useMemo(() => {
    const days = [];
    const numDays = daysInMonth(currentMonth);
    const startDay = startDayOfMonth(currentMonth);

    // Empty spaces for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Actual days
    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }
    return days;
  }, [currentMonth]);

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const selectDate = (date) => {
    if (!date) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    if (selectingType === 'departure') {
      setDepartureDate(date);
      if (returnDate && date >= returnDate) setReturnDate(null);
      setSelectingType('return');
    } else {
      if (departureDate && date < departureDate) {
        setDepartureDate(date);
        setReturnDate(null);
      } else {
        setReturnDate(date);
        setShowCalendar(false);
      }
    }
  };

  const isSelected = (date) => {
    if (!date) return false;
    return (departureDate && date.getTime() === departureDate.getTime()) ||
      (returnDate && date.getTime() === returnDate.getTime());
  };

  const isInRange = (date) => {
    if (!date || !departureDate || !returnDate) return false;
    return date > departureDate && date < returnDate;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isPast = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-brand-dark overflow-x-hidden">
      {/* Background with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/salto_angel.png"
          alt="Salto Angel"
          className="w-full h-full object-cover scale-110"
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
            <h1 className="relative text-6xl md:text-[8rem] xl:text-[10rem] font-black leading-[0.9] text-white tracking-tighter italic drop-shadow-2xl">
              Explora el <br className="hidden lg:block" />
              <span className="text-brand-teal not-italic">Salto Ángel</span>
            </h1>
          </div>

          <p className="max-w-2xl mx-auto text-base md:text-xl text-white/70 font-semibold italic mb-12 leading-relaxed text-balance">
            Diseñamos aventuras personalizadas con guías de élite en los paisajes más sobrecogedores del mundo.
          </p>

          {/* Advanced Search Concierge */}
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-3 md:p-3 shadow-2xl relative">
            <div className="flex flex-col lg:flex-row items-center gap-1">

              {/* Destination Field */}
              <div className="relative group w-full lg:w-[40%]">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand-teal transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  placeholder="¿Hacia dónde te lleva tu instinto?"
                  className="w-full rounded-[1.8rem] bg-white/10 border border-transparent pl-15 pr-6 py-5 md:py-6 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/15 focus:border-white/20 transition-all font-bold italic text-lg"
                />

                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-3 overflow-hidden rounded-[2rem] bg-brand-dark/95 backdrop-blur-3xl border border-white/10 p-3 text-left shadow-2xl z-50">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => { setSearch(s.title); }}
                        className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-white hover:bg-brand-teal hover:text-brand-dark transition-all rounded-xl mb-1 last:mb-0"
                      >
                        <span>{s.title} <span className="text-white/40 group-hover:text-brand-dark/50 ml-2 font-normal">| {s.region}</span></span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vertical Divider (Desktop Only) */}
              <div className="hidden lg:block w-px h-12 bg-white/10 mx-2"></div>

              {/* Date Fields */}
              <div className="flex w-full lg:w-[45%] gap-2 p-1">
                <button
                  onClick={() => { setShowCalendar(true); setSelectingType('departure'); }}
                  className={`flex-1 flex flex-col items-start px-6 py-4 rounded-[1.8rem] transition-all hover:bg-white/10 group text-left ${showCalendar && selectingType === 'departure' ? 'bg-white/15' : ''}`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-brand-teal">Ida</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-brand-teal/70" />
                    <span className="text-white font-bold italic">{formatDate(departureDate)}</span>
                  </div>
                </button>

                <div className="w-px h-10 bg-white/10 self-center"></div>

                <button
                  onClick={() => { setShowCalendar(true); setSelectingType('return'); }}
                  className={`flex-1 flex flex-col items-start px-6 py-4 rounded-[1.8rem] transition-all hover:bg-white/10 group text-left ${showCalendar && selectingType === 'return' ? 'bg-white/15' : ''}`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-brand-teal">Vuelta</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-brand-teal/70" />
                    <span className="text-white font-bold italic">{formatDate(returnDate)}</span>
                  </div>
                </button>
              </div>

              {/* Search Button */}
              <div className="w-full lg:w-[15%] p-1">
                <button
                  onClick={() => handleSearch()}
                  className="w-full group relative overflow-hidden rounded-[1.8rem] bg-brand-teal text-brand-dark font-black uppercase tracking-widest text-xs py-5 md:py-6 hover:bg-white transition-all shadow-xl shadow-teal-500/20 active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="lg:hidden">Explorar</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Custom Calendar Dropdown */}
            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  ref={calendarRef}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-full lg:w-[320px] bg-brand-dark/95 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-6 shadow-3xl z-[100]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white">
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-white font-black italic uppercase tracking-tighter">
                      {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white">
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                      <div key={d} className="text-center text-[10px] font-black text-white/30 py-2">{d}</div>
                    ))}
                    {calendarDays.map((date, i) => (
                      <button
                        key={i}
                        disabled={isPast(date)}
                        onClick={() => selectDate(date)}
                        className={`
                            relative h-10 w-full rounded-xl text-xs font-bold transition-all flex items-center justify-center
                            ${!date ? 'pointer-events-none' : ''}
                            ${isSelected(date) ? 'bg-brand-teal text-brand-dark' : 'text-white hover:bg-white/10'}
                            ${isInRange(date) ? 'bg-brand-teal/20 text-brand-teal' : ''}
                            ${isToday(date) && !isSelected(date) ? 'border border-brand-teal text-brand-teal' : ''}
                            ${isPast(date) ? 'opacity-20 cursor-not-allowed' : ''}
                          `}
                      >
                        {date?.getDate()}
                        {isSelected(date) && (
                          <motion.div layoutId="active-date" className="absolute inset-0 bg-brand-teal rounded-xl -z-10" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-white/30">Seleccionando:</span>
                      <span className="text-xs font-bold text-brand-teal italic">{selectingType === 'departure' ? 'Fecha de Ida' : 'Fecha de Vuelta'}</span>
                    </div>
                    <button onClick={() => setShowCalendar(false)} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white">Cerrar</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
