import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Star, Clock, MapPin, ChevronDown, ListFilter, SlidersHorizontal, ArrowRight, Search } from 'lucide-react';
import { TOURS } from '../data/tours';

const CATEGORIES = ['Todo', 'Aventura', 'Playa y Relax', 'Cultura e Historia', 'Naturaleza'];

const PackagesPage = () => {
  const [activeCategory, setActiveCategory] = useState('Todo');

  const filteredPackages = activeCategory === 'Todo' 
    ? TOURS 
    : TOURS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-28 pb-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
           <div className="max-w-xl">
              <span className="text-brand-teal font-black uppercase tracking-[0.2em] text-[11px] mb-4 block animate-bounce-horizontal">Destinos @jandytours.ve</span>
              <h1 className="text-5xl md:text-6xl font-black text-brand-dark leading-tight mb-8">
                Nuestros Paquetes
              </h1>
              <p className="text-slate-500 font-semibold text-lg italic max-w-lg leading-relaxed">
                Experiencias seleccionadas con todo incluido para que solo te preocupes de disfrutar tu próxima gran aventura en Venezuela.
              </p>
           </div>
           
           <div className="flex gap-4">
              <Link to="/destinos" className="flex items-center gap-3 bg-white border border-slate-100 px-8 py-4 rounded-2xl text-sm font-black text-brand-dark shadow-xl shadow-slate-200/50 hover:border-brand-teal transition-all">
                 <ListFilter className="w-4 h-4 text-brand-teal" /> Ver Filtros Pro
              </Link>
           </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-20 overflow-x-auto pb-4 scrollbar-hide">
           {CATEGORIES.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`whitespace-nowrap px-10 py-5 rounded-3xl font-black uppercase tracking-[0.15em] text-[11px] transition-all duration-300 ${
                 activeCategory === cat 
                   ? 'bg-brand-teal text-white shadow-2xl shadow-teal-500/30 active:scale-95' 
                   : 'bg-white text-slate-400 border border-slate-100/50 hover:bg-slate-50 hover:text-slate-700'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           <AnimatePresence mode="popLayout">
           {filteredPackages.map((pkg, i) => (
             <motion.div
               key={pkg.id}
               layout
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.5, delay: i * 0.05 }}
               className="bg-white rounded-[4.5rem] overflow-hidden border border-slate-50 shadow-2xl shadow-slate-200/50 group flex flex-col h-full"
             >
                <div className="relative h-[480px] overflow-hidden">
                   <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   
                   {/* Overlay Price & Tag */}
                   <div className="absolute top-10 left-10">
                      <div className="px-6 py-2.5 bg-brand-dark/30 backdrop-blur-xl rounded-full border border-white/20 whitespace-nowrap">
                         <span className="text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                           <div className={`w-2.5 h-2.5 rounded-full ${i % 2 === 0 ? 'bg-teal-400' : 'bg-orange-400 animate-pulse shadow-glow'}`}></div> {pkg.tag || 'PAQUETE'}
                         </span>
                      </div>
                   </div>

                   <div className="absolute bottom-10 right-10">
                      <div className="bg-brand-dark p-8 px-12 rounded-[2.5rem] shadow-3xl border border-white/10 group-hover:-translate-y-2 transition-transform duration-500">
                         <span className="text-white text-4xl font-black italic tracking-tighter">${pkg.price}</span>
                         <span className="text-white/40 block text-[10px] font-black uppercase mt-1">USD / Total</span>
                      </div>
                   </div>
                </div>

                <div className="p-12 pb-16 flex-1 flex flex-col">
                   <div className="flex items-center gap-2 text-brand-teal mb-4 uppercase tracking-[0.2em] text-[11px] font-black bg-teal-50 w-fit px-4 py-1.5 rounded-full italic">
                      <Clock className="w-4 h-4" /> {pkg.duration}
                   </div>
                   
                   <h3 className="text-[36px] font-black text-brand-dark leading-[1.1] mb-8 tracking-tighter group-hover:text-brand-teal transition-colors">
                     {pkg.title}
                   </h3>
                   
                   <p className="text-slate-500 font-semibold mb-12 italic leading-relaxed text-lg">
                     {pkg.description}
                   </p>

                   <div className="mt-auto flex items-center justify-between pt-12 border-t border-slate-50">
                      <div className="flex flex-col">
                         <div className="flex items-center gap-1.5 mb-2">
                            {[...Array(5)].map((_, starI) => (
                              <Star key={starI} className={`w-4 h-4 ${starI < Math.floor(pkg.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                            ))}
                         </div>
                         <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">{pkg.rating} (Ver 2k+ fotos)</span>
                      </div>
                      <Link to={`/paquetes/${pkg.id}`} className="bg-brand-teal text-white w-16 h-16 rounded-[2rem] flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-teal-500/20 group/btn">
                         <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                      </Link>
                   </div>
                </div>
             </motion.div>
           ))}
           </AnimatePresence>
        </div>

        {/* Load More Custom Design */}
        <div className="mt-24 flex flex-col items-center">
           <div className="flex items-center gap-6 mb-8 text-slate-300">
              <div className="w-24 h-px bg-slate-200"></div>
              <span className="text-xs font-black uppercase tracking-[0.4em]">Mostrando {filteredPackages.length} tours</span>
              <div className="w-24 h-px bg-slate-200"></div>
           </div>
           <button className="bg-white border border-slate-100 px-16 py-6 rounded-[3rem] text-brand-dark font-black tracking-[0.2em] uppercase text-xs shadow-2xl shadow-slate-200/50 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all group flex items-center gap-4 active:scale-95">
              Explorar más rutas <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
           </button>
        </div>

        {/* Exclusive Offers Section */}
        <section className="mt-40 bg-brand-dark p-20 md:p-32 rounded-[6rem] relative overflow-hidden group border border-white/5">
           <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-teal/5 rounded-full blur-[200px] pointer-events-none translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-[3s]"></div>
           <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 mb-10">
                 <span className="w-2 h-2 bg-brand-teal rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Suscripción Jandy Club</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tighter italic">
                ¿Buscas <span className="text-brand-teal">descuentos?</span>
              </h2>
              <p className="text-2xl text-white/50 mb-16 italic font-medium leading-relaxed max-w-2xl mx-auto">
                Recibe promociones "flash" y cupos liberados en Los Roques y Canaima antes que nadie.
              </p>
              
              <form className="max-w-3xl mx-auto relative group/form shadow-2xl">
                 <input 
                   type="email" 
                   placeholder="Tu mejor correo electrónico" 
                   className="w-full bg-white/5 border border-white/10 rounded-[3rem] py-8 pl-12 pr-64 text-white font-semibold placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-brand-teal/40 transition-all text-xl"
                 />
                 <button className="absolute top-3 right-3 bg-brand-teal text-white px-16 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs hover:scale-95 hover:bg-teal-400 transition-all shadow-2xl shadow-teal-500/20 active:scale-90 flex items-center gap-3">
                   Unirse <ArrowRight className="w-4 h-4" />
                 </button>
              </form>
           </div>
        </section>
      </div>
    </div>
  );
};

export default PackagesPage;
