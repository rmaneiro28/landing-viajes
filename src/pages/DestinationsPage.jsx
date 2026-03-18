import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Star, ChevronDown, Search, X, MapPin, SlidersHorizontal, Heart } from 'lucide-react';
import { TOURS } from '../data/tours';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import OptimizedImage from '../components/OptimizedImage';

const DestinationsPage = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite: isItemInFavorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(['Playa y Relax']);
  const [sortBy, setSortBy] = useState('relevant');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

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

  const filteredTours = useMemo(() => {
    let result = TOURS.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.region.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = tour.price <= maxPrice;
      
      const matchesActivities = selectedActivities.length === 0 ||
        tour.activities.some(act => selectedActivities.includes(act));
      
      const matchesDuration = selectedDurations.length === 0 ||
        selectedDurations.some(label => {
          const option = durationOptions.find(o => o.label === label);
          return tour.durationDays >= option.min && tour.durationDays <= option.max;
        });

      return matchesSearch && matchesPrice && matchesActivities && matchesDuration;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchTerm, maxPrice, selectedDurations, selectedActivities, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, maxPrice, selectedDurations, selectedActivities, sortBy]);

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTours.slice(start, start + itemsPerPage);
  }, [filteredTours, currentPage, itemsPerPage]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const onResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="pt-24 md:pt-28 pb-20 bg-[#f4f7f6] min-h-screen">
      <div className="max-w-full mx-auto px-4 md:px-12 lg:px-20">
        
        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-brand-teal transition-colors">Inicio</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="text-slate-600">Explorar Destinos</span>
        </nav>

        {/* Mobile Filter & Sort Bar - Simplified & Functional */}
        <div className="lg:hidden sticky top-20 z-40 -mx-4 md:-mx-12 px-4 md:px-12 py-4 mb-8 bg-[#f4f7f6]/80 backdrop-blur-md border-b border-white/50">
           <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 px-1">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="bg-brand-dark text-white px-5 py-3 rounded-2xl flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand-dark/20 active:scale-95 transition-all shrink-0"
              >
                 <SlidersHorizontal className="w-4 h-4 text-brand-teal" /> Filtros
              </button>
              
              <div className="flex items-center gap-2 shrink-0">
                 {/* Active Filter Chips */}
                 {maxPrice < 1500 && (
                   <button
                     onClick={() => setMaxPrice(1500)}
                     className="px-3 py-2.5 rounded-2xl border border-brand-teal bg-brand-teal/10 text-brand-dark text-[10px] font-black flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                   >
                     Max ${maxPrice} <X className="w-3 h-3 text-brand-teal" />
                   </button>
                 )}

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

                 {(maxPrice < 1500 || selectedDurations.length > 0 || selectedActivities.length > 0 || searchTerm) && (
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

        <div className="flex flex-col lg:flex-row  gap-8 lg:gap-10 items-start">
          
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(isFilterOpen || isLargeScreen) && (
              <motion.aside 
                initial={isFilterOpen ? { x: -300, opacity: 0 } : {}}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className={`${isFilterOpen ? 'fixed inset-0 z-100 bg-white  p-8 pt-8 pb-16 overflow-y-auto' : 'hidden lg:block w-80 shrink-0 space-y-6 '}`}
              >
                {isFilterOpen && (
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-black text-brand-dark italic">Refinar Viaje</h3>
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
                        setMaxPrice(1500);
                        setSelectedDurations([]);
                        setSelectedActivities([]);
                      }}
                      className="text-brand-teal text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
                    >
                      Limpiar
                    </button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-10">
                    <label className="text-[11px] font-black text-slate-400 block mb-6 uppercase tracking-[0.2em]">Presupuesto Máximo</label>
                    <div className="px-2">
                       <input 
                         type="range" 
                         min="100" 
                         max="1500" 
                         step="50"
                         value={maxPrice}
                         onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                         className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-teal mb-4"
                       />
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 italic">
                      <span>$100</span>
                      <span className="text-brand-dark font-black not-italic text-lg">${maxPrice}</span>
                      <span>$1500+</span>
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
                          className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border ${selectedActivities.includes(act) ? 'bg-teal-50 border-brand-teal text-brand-teal' : 'bg-slate-50 border-transparent text-slate-500'}`}
                        >
                          <div 
                            className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${selectedActivities.includes(act) ? 'bg-brand-teal border-brand-teal' : 'border-slate-300'}`}
                          >
                            {selectedActivities.includes(act) && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          <span className="text-[12px] font-black uppercase tracking-wide">
                            {act}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {isFilterOpen && (
                    <div className="sticky bottom-0 left-0 right-0 z-50 mt-6 bg-gradient-to-t from-white/95 via-white/70 to-transparent p-3 pt-0">
                      <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full bg-brand-dark text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl"
                      >
                        Aplicar Cambios
                      </button>
                    </div>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <main className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <h2 className="text-3xl font-black text-brand-dark mb-2">Destinos encontrados ({filteredTours.length})</h2>
                <p className="text-slate-400 font-bold italic text-sm">Basado en tus preferencias de búsqueda</p>
              </div>
              
              <div className="hidden md:flex items-center gap-4 relative">
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Ordenar por:</span>
                <div className="relative">
                   <button 
                     onClick={() => setIsSortOpen(!isSortOpen)}
                     className="bg-white border border-slate-100 pl-6 pr-4 py-3.5 rounded-2xl text-[12px] font-black text-brand-dark shadow-sm flex items-center gap-4 hover:border-brand-teal transition-all min-w-50 justify-between"
                   >
                     {sortOptions.find(o => o.id === sortBy)?.label}
                     <ChevronDown className={`w-4 h-4 text-brand-teal transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                   </button>
                   
                   <AnimatePresence>
                     {isSortOpen && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 10 }}
                         className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-40"
                       >
                         {sortOptions.map(opt => (
                           <button 
                             key={opt.id}
                             onClick={() => { setSortBy(opt.id); setIsSortOpen(false); }}
                             className={`w-full text-left px-6 py-4 text-[12px] font-black uppercase tracking-widest transition-colors ${sortBy === opt.id ? 'bg-teal-50 text-brand-teal' : 'text-slate-500 hover:bg-slate-50'}`}
                           >
                             {opt.label}
                           </button>
                         ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </div>
            </div>

            {paginatedTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-8">
                {paginatedTours.map((tour, i) => (
                  <Link
                    key={tour.id}
                    to={`/paquetes/${tour.id}`}
                    className="block group"
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-50 transition-all flex flex-col h-full"
                    >
                      <div className="relative h-64 overflow-hidden shrink-0">
                        <OptimizedImage 
                          src={tour.image} 
                          alt={tour.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          containerClassName="w-full h-full"
                        />
                        
                        {/* Heart icon top right */}
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(tour);
                          }}
                          className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all z-10 ${isItemInFavorites(tour.id) ? 'bg-brand-teal text-white' : 'bg-white text-slate-400 hover:text-rose-500'}`}
                        >
                          <Heart size={18} fill={isItemInFavorites(tour.id) ? "currentColor" : "none"} strokeWidth={2} />
                        </button>

                        {/* Popular Badge bottom left */}
                        {(i === 0 || tour.rating >= 4.9) && (
                          <div className="absolute bottom-4 left-4 bg-[#0ed3cf] px-3 py-1 rounded-sm shadow-md z-10">
                            <span className="text-brand-dark font-black text-[9px] uppercase tracking-tighter">MÁS POPULAR</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-2">
                           <h3 className="text-xl font-black text-brand-dark leading-tight">{tour.title}</h3>
                           <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="text-[14px] font-black text-brand-dark">{tour.rating}</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-400 mb-6 text-[13px] font-semibold italic">
                          <MapPin size={14} className="text-brand-teal" />
                          <span>{tour.location}</span>
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <p className="text-brand-dark font-black text-2xl tracking-tighter">
                              ${tour.price} <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest ml-1 italic">/ noche</span>
                            </p>
                          </div>
                          
                          <div className="bg-brand-teal text-brand-dark px-6 py-2.5 rounded-xl font-black text-[12px] shadow-lg shadow-teal-500/20 active:scale-95 transition-all">
                             Ver Detalles
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
                <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 w-full">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-brand-dark mb-3 italic">No hay destinos disponibles</h3>
                  <p className="text-slate-500 italic font-medium mb-10 max-w-sm mx-auto">Prueba ajustando el rango de precio o selecciona otras actividades.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setMaxPrice(1500);
                      setSelectedDurations([]);
                      setSelectedActivities([]);
                    }}
                    className="bg-brand-teal text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/10 active:scale-95 transition-all"
                  >
                    Ver todos los destinos
                  </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:border-brand-teal hover:text-brand-teal transition-all disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-300"
                >
                  <ChevronDown className="w-5 h-5 rotate-90" />
                </button>
                
                <div className="flex gap-2">
                   {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-brand-teal text-white shadow-lg shadow-teal-500/20' : 'bg-white border border-slate-100 text-slate-400 hover:border-brand-teal hover:text-brand-teal font-black'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:border-brand-teal hover:text-brand-teal transition-all disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-300"
                >
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
