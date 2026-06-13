import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight, ChevronDown, ListFilter } from 'lucide-react';
import { TOURS } from '../data/tours';

const CATEGORIES = ['Todo', 'Aventura', 'Playa y Relax', 'Cultura e Historia', 'Naturaleza'];

const PackagesPage = () => {
  const [activeCategory, setActiveCategory] = useState('Todo');

  const filteredPackages = activeCategory === 'Todo'
    ? TOURS
    : TOURS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-28 pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
          <span className="text-brand-teal font-black uppercase tracking-[0.25em] text-[11px] mb-4 block">
              Destinos · Caramelo Tours
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-dark leading-[0.95] mb-6 tracking-tighter italic">
              Experiencias
            </h1>
            <p className="text-slate-500 font-semibold text-base leading-relaxed max-w-md">
              Conectamos viajeros con las mejores operadoras y guías turísticos de Venezuela.
            </p>
          </div>

          <Link
            to="/destinos"
            className="flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-brand-teal transition-all self-start md:self-auto"
          >
            <ListFilter className="w-4 h-4" /> Ver todos
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-16 border-b border-slate-100 pb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-lg font-black uppercase tracking-[0.15em] text-[10px] transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-dark text-white'
                  : 'bg-transparent text-slate-400 hover:text-brand-dark border border-slate-200 hover:border-brand-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="bg-white group flex flex-col rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-shadow duration-500"
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
                  <h3 className="text-2xl font-black text-brand-dark leading-tight tracking-tight mb-4 group-hover:text-brand-teal transition-colors">
                    {pkg.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
                    {pkg.description}
                  </p>

                  {/* CTA */}
                  <Link
                    to={`/paquetes/${pkg.id}`}
                    className="flex items-center justify-between pt-6 border-t border-slate-100 group/cta"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark group-hover/cta:text-brand-teal transition-colors">
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

        {/* Count */}
        <div className="mt-12 flex items-center gap-6 text-slate-300">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
            {filteredPackages.length} experiencias disponibles
          </span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        {/* CTA Section */}
        <section className="mt-24 bg-brand-dark p-14 md:p-20 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-teal/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="max-w-3xl relative z-10">
            <span className="text-brand-teal font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">
              ¿Eres operadora o guía turístico?
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter italic">
              Registra tu servicio en nuestra plataforma
            </h2>
            <p className="text-white/50 text-base font-medium italic mb-10 max-w-xl leading-relaxed">
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
