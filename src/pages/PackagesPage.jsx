import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight, ChevronDown, SlidersHorizontal, X, Search } from 'lucide-react';
import { TOURS } from '../data/tours';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const PackagesPage = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite: isItemInFavorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const activitiesList = [
    'Playa y Relax',
    'Aventura',
    'Cultura e Historia',
    'Naturaleza',
    'Gastronomía',
    'Navegación'
  ];

  const durationOptions = [
    { label: '1-3 días', min: 1, max: 3 },
    { label: '4-7 días', min: 4, max: 7 },
    { label: '8-14 días', min: 8, max: 14 },
    { label: '15+ días', min: 15, max: 100 }
  ];

  const sortOptions = [
    { id: 'relevant', label: 'Más relevantes' },
    { id: 'price-low', label: 'Precio: Menor a Mayor' },
    { id: 'price-high', label: 'Precio: Mayor a Menor' },
    { id: 'rating', label: 'Mejor Calificados' }
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) setSearchTerm(query);
  }, [searchParams]);

  const toggleDuration = (label) => {
    setSelectedDurations(prev =>
      prev.includes(label) ? prev.filter(d => d !== label) : [...prev, label]
    );
  };

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    );
  };

  const filteredPackages = useMemo(() => {
    let result = TOURS.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.region.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesActivities = selectedActivities.length === 0 ||
        tour.activities.some(act => selectedActivities.includes(act));
      
      const matchesDuration = selectedDurations.length === 0 ||
        selectedDurations.some(label => {
          const option = durationOptions.find(o => o.label === label);
          return tour.durationDays >= option.min && tour.durationDays <= option.max;
        });

      return matchesSearch && matchesActivities && matchesDuration;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchTerm, selectedDurations, selectedActivities, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDurations, selectedActivities, sortBy]);

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPackages.slice(start, start + itemsPerPage);
  }, [filteredPackages, currentPage, itemsPerPage]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const onResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Packages Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/canaima.png" alt="Experiencias Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-6">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight not-italic"
           >
             Nuestras <span className="text-brand-teal not-italic">Experiencias</span>
           </motion.h1>
           <p className="text-xl text-white/70 font-medium">Conectamos viajeros con las mejores operadoras y guías turísticos de Venezuela.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        
        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-brand-teal transition-colors">Inicio</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="text-slate-600">Experiencias</span>
        </nav>

        {/* Mobile Filter & Sort Bar */}
        <div className="lg:hidden sticky top-20 z-40 -mx-6 px-6 py-4 mb-8 bg-[#f8fafc]/80 backdrop-blur-md border-b border-white/50">
           <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 px-1">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="bg-brand-dark text-white px-5 py-3 rounded-2xl flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand-dark/20 active:scale-95 transition-all shrink-0"
              >
                 <SlidersHorizontal className="w-4 h-4 text-brand-teal" /> Filtros
              </button>
              
              <div className="flex items-center gap-2 shrink-0">
                 {selectedDurations.length > 0 && (
                   <button
                     onClick={() => setSelectedDurations([])}
                     className="px-3 py-2.5 rounded-2xl border border-brand-teal bg-brand-teal/10 text-brand-dark text-[10px] font-black flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                   >
                     {selectedDurations.length} {selectedDurations.length === 1 ? 'Duración' : 'Duraciones'} <X className="w-3 h-3 text-brand-teal" />
                   </button>
                 )}

                 {selectedActivities.length > 0 && (
                   <button
                     onClick={() => setSelectedActivities([])}
                     className="px-3 py-2.5 rounded-2xl border border-brand-teal bg-brand-teal/10 text-brand-dark text-[10px] font-black flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                   >
                     {selectedActivities.length} {selectedActivities.length === 1 ? 'Exp.' : 'Exps.'} <X className="w-3 h-3 text-brand-teal" />
                   </button>
                 )}

                 {searchTerm && (
                   <button
                     onClick={() => setSearchTerm('')}
                     className="px-3 py-2.5 rounded-2xl border border-brand-teal bg-brand-teal/10 text-brand-dark text-[10px] font-black flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                   >
                     "{searchTerm.substring(0, 10)}{searchTerm.length > 10 ? '...' : ''}" <X className="w-3 h-3 text-brand-teal" />
                   </button>
                 )}

                 {(selectedDurations.length > 0 || selectedActivities.length > 0 || searchTerm) && (
                   <div className="w-px h-6 bg-slate-200 mx-1"></div>
                 )}
                 
                 <button 
                   onClick={() => setIsSortOpen(true)}
                   className="bg-white border border-slate-200 text-brand-dark px-5 py-3 rounded-2xl flex items-center justify-between gap-2 text-[11px] font-black uppercase tracking-widest shrink-0 shadow-sm"
                 >
                   <span>{sortOptions.find(o => o.id === sortBy)?.label.split(':')[0]}</span>
                   <ChevronDown className="w-3.5 h-3.5 text-brand-teal" />
                 </button>
              </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(isFilterOpen || isLargeScreen) && (
              <motion.aside 
                initial={isFilterOpen ? { x: -300, opacity: 0 } : {}}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className={`${isFilterOpen ? 'fixed inset-0 z-100 bg-white p-8 pt-8 pb-16 overflow-y-auto' : 'hidden lg:block w-80 shrink-0 space-y-6 '}`}
              >
                {isFilterOpen && (
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-brand-dark">Refinar Viaje</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                      <X className="w-6 h-6 text-brand-dark" />
                    </button>
                  </div>
                )}

                <div className={`${!isFilterOpen ? 'bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50' : ''}`}>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-brand-dark flex items-center gap-3">
                       <SlidersHorizontal className="w-5 h-5 text-brand-teal" /> Filtros
                    </h3>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedDurations([]);
                        setSelectedActivities([]);
                      }}
                      className="text-brand-teal text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                    >
                      Limpiar
                    </button>
                  </div>

                  {/* Search bar inside filters */}
                  <div className="mb-8">
                    <label className="text-[11px] font-black text-slate-400 block mb-3 uppercase tracking-[0.2em]">Buscar</label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        placeholder="Buscar experiencia..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="mb-10">
                    <label className="text-[11px] font-black text-slate-400 block mb-6 uppercase tracking-[0.2em]">Duración</label>
                    <div className="grid grid-cols-2 gap-3">
                      {durationOptions.map(opt => (
                        <button 
                          key={opt.label}
                          onClick={() => toggleDuration(opt.label)}
                          className={`py-4 px-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${selectedDurations.includes(opt.label) ? 'bg-brand-dark text-white border-brand-dark shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-brand-teal/30'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activity Type */}
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 block mb-6 uppercase tracking-[0.2em]">Experiencias</label>
                    <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-4">
                      {activitiesList.map(act => (
                        <button 
                          key={act} 
                          onClick={() => toggleActivity(act)}
                          className={`lg:w-full text-left py-3 px-5 rounded-2xl border text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-between ${selectedActivities.includes(act) ? 'bg-brand-dark text-white border-brand-dark shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-brand-teal/30'}`}
                        >
                          <span>{act}</span>
                          {selectedActivities.includes(act) && <span className="w-2 h-2 rounded-full bg-brand-teal shrink-0 ml-3"></span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Grid area */}
          <div className="flex-1 space-y-10">
            {/* Desktop Sort Options Bar */}
            <div className="hidden lg:flex items-center justify-between bg-white px-8 py-5 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                 Mostrando <span className="text-brand-dark font-black">{filteredPackages.length}</span> experiencias
               </p>

               <div className="flex items-center gap-6">
                 <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ordenar por</span>
                 <div className="relative">
                   <button 
                     onClick={() => setIsSortOpen(!isSortOpen)}
                     className="flex items-center gap-2 bg-slate-50 border border-slate-100 text-brand-dark px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-brand-teal/30 transition-all min-w-[200px] justify-between"
                   >
                     <span>{sortOptions.find(o => o.id === sortBy)?.label}</span>
                     <ChevronDown className="w-3.5 h-3.5 text-brand-teal" />
                   </button>

                   <AnimatePresence>
                     {isSortOpen && (
                       <>
                         <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: 10 }}
                           className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-3xl shadow-2xl z-50 py-3 overflow-hidden"
                         >
                           {sortOptions.map(opt => (
                             <button
                               key={opt.id}
                               onClick={() => {
                                 setSortBy(opt.id);
                                 setIsSortOpen(false);
                               }}
                               className={`w-full text-left px-6 py-3.5 text-[10px] font-black uppercase tracking-widest transition-colors ${sortBy === opt.id ? 'text-brand-teal bg-teal-50/50' : 'text-slate-500 hover:text-brand-dark hover:bg-slate-50'}`}
                             >
                               {opt.label}
                             </button>
                           ))}
                         </motion.div>
                       </>
                     )}
                   </AnimatePresence>
                 </div>
               </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {paginatedPackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="bg-white group flex flex-col rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Tag top-left */}
                      <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-md">
                        <span className="text-white text-[9px] font-black uppercase tracking-[0.25em] flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-brand-teal' : 'bg-orange-400'}`}></span>
                          {pkg.tag || pkg.category}
                        </span>
                      </div>

                      {/* Rating top-right */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[11px] font-black text-brand-dark">{pkg.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col border-b border-slate-100">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-black uppercase tracking-wide">
                          <Clock className="w-3.5 h-3.5 text-brand-teal" />
                          {pkg.duration}
                        </div>
                        <div className="w-px h-3 bg-slate-200"></div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-black uppercase tracking-wide">
                          <MapPin className="w-3.5 h-3.5 text-brand-teal" />
                          {pkg.region}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-black text-brand-dark leading-tight tracking-tight mb-4 group-hover:text-brand-teal transition-colors">
                        {pkg.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 flex-1 line-clamp-3">
                        {pkg.description}
                      </p>

                      {/* CTA */}
                      <Link
                        to={`/paquetes/${pkg.id}`}
                        className="flex items-center justify-between pt-6 border-t border-slate-100 group/cta"
                      >
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark group-hover/cta:text-brand-teal transition-colors">
                          Ver experiencia
                        </span>
                        <div className="w-9 h-9 bg-brand-dark rounded-lg flex items-center justify-center group-hover/cta:bg-brand-teal transition-colors">
                          <ArrowRight className="w-4 h-4 text-white group-hover/cta:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-10">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-3 rounded-2xl border border-slate-200 text-xs font-black uppercase tracking-widest bg-white text-slate-500 hover:text-brand-dark disabled:opacity-40 hover:border-brand-teal/30 transition-all shadow-sm"
                >
                  Anterior
                </button>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest px-4">
                  Pág {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-5 py-3 rounded-2xl border border-slate-200 text-xs font-black uppercase tracking-widest bg-white text-slate-500 hover:text-brand-dark disabled:opacity-40 hover:border-brand-teal/30 transition-all shadow-sm"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Count/Status for mobile */}
        <div className="lg:hidden mt-12 flex items-center gap-6 text-slate-300">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
            {filteredPackages.length} experiencias disponibles
          </span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        {/* Mobile Filter Modal/Drawer */}
        <AnimatePresence>
          {isFilterOpen && !isLargeScreen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black z-1000"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-[3.5rem] z-2000 p-8 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-black text-brand-dark">Filtros</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-3 bg-slate-100 rounded-full">
                    <X className="w-5 h-5 text-brand-dark" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Search inside drawer */}
                  <div>
                    <label className="text-[11px] font-black text-slate-400 block mb-3 uppercase tracking-[0.2em]">Buscar</label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        placeholder="Buscar experiencia..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-brand-dark focus:outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-[11px] font-black text-slate-400 block mb-4 uppercase tracking-[0.2em]">Duración</label>
                    <div className="grid grid-cols-2 gap-3">
                      {durationOptions.map(opt => (
                        <button 
                          key={opt.label}
                          onClick={() => toggleDuration(opt.label)}
                          className={`py-3.5 px-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${selectedDurations.includes(opt.label) ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-slate-400 border-slate-100'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activity Type */}
                  <div>
                    <label className="text-[11px] font-black text-slate-400 block mb-4 uppercase tracking-[0.2em]">Experiencias</label>
                    <div className="grid grid-cols-2 gap-3">
                      {activitiesList.map(act => (
                        <button 
                          key={act} 
                          onClick={() => toggleActivity(act)}
                          className={`py-3.5 px-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${selectedActivities.includes(act) ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-slate-400 border-slate-100'}`}
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDurations([]);
                      setSelectedActivities([]);
                    }}
                    className="flex-1 py-4 border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-dark"
                  >
                    Limpiar
                  </button>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 py-4 bg-brand-teal text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20"
                  >
                    Aplicar
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Sort Options Drawer */}
        <AnimatePresence>
          {isSortOpen && !isLargeScreen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSortOpen(false)}
                className="fixed inset-0 bg-black z-1000"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 bg-white rounded-t-[3.5rem] z-2000 p-8"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-black text-brand-dark">Ordenar por</h3>
                  <button onClick={() => setIsSortOpen(false)} className="p-3 bg-slate-100 rounded-full">
                    <X className="w-5 h-5 text-brand-dark" />
                  </button>
                </div>

                <div className="space-y-4 pb-6">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSortBy(opt.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full py-4 text-center text-xs font-black uppercase tracking-widest rounded-2xl border transition-all ${sortBy === opt.id ? 'bg-brand-dark text-white border-brand-dark' : 'bg-slate-50 text-slate-500 border-slate-100'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="mt-24 bg-brand-dark p-14 md:p-20 rounded-[3.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-teal/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="max-w-3xl relative z-10">
            <span className="text-brand-teal font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">
              ¿Eres operadora o guía turístico?
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
              Registra tu servicio en nuestra plataforma
            </h2>
            <p className="text-white/50 text-base font-medium mb-10 max-w-xl leading-relaxed">
              Conectamos operadoras, guías y hoteles con miles de viajeros que buscan explorar Venezuela.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 bg-brand-teal text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-brand-dark transition-all group"
            >
              Solicitar registro <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PackagesPage;
