import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, ChevronRight, ArrowLeft, Search } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import OptimizedImage from '../components/OptimizedImage';
import SEO from '../components/SEO';

const FavoritesPage = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-[#f8fafc] min-h-screen">
      <SEO 
        title="Mis Favoritos | Jandy Tours"
        description="Explora tus destinos guardados y planifica tu próxima aventura premium en Venezuela."
      />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <Link to="/destinos" className="inline-flex items-center gap-2 text-brand-teal text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-70 transition-opacity mb-4">
              <ArrowLeft size={14} />
              Volver a Destinos
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter italic">
              Mis <span className="text-brand-teal">Favoritos</span>
            </h1>
            <p className="text-slate-400 font-bold italic text-sm">
              {favorites.length === 0 
                ? 'No tienes destinos guardados aún' 
                : `Tienes ${favorites.length} ${favorites.length === 1 ? 'destino guardado' : 'destinos guardados'}`
              }
            </p>
          </div>
        </div>

        {/* Favorites Grid */}
        <AnimatePresence mode="popLayout">
          {favorites.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {favorites.map((tour) => (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  className="group"
                >
                  <Link
                    to={`/paquetes/${tour.id}`}
                    className="block bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-50 transition-all h-full flex flex-col hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <OptimizedImage 
                        src={tour.image} 
                        alt={tour.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        containerClassName="w-full h-full"
                      />
                      
                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(tour);
                        }}
                        className="absolute top-4 right-4 p-3 rounded-full bg-brand-teal text-white shadow-lg shadow-teal-500/40 z-10 hover:scale-110 active:scale-90 transition-all"
                      >
                        <Heart size={20} fill="currentColor" strokeWidth={2} />
                      </button>

                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm z-10 flex items-center gap-1.5 border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-[12px] font-black text-brand-dark">{tour.rating}</span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="mb-4">
                        <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-2 block italic">{tour.region}</span>
                        <h3 className="text-2xl font-black text-brand-dark leading-tight tracking-tight italic">{tour.title}</h3>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 mb-8 text-[13px] font-bold italic">
                        <MapPin size={14} className="text-brand-teal" />
                        <span>{tour.location}</span>
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-brand-dark font-black text-2xl tracking-tighter">
                            ${tour.price} <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1 italic">/ persona</span>
                          </p>
                        </div>
                        
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all shadow-sm">
                           <ChevronRight className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-32 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 shadow-sm"
            >
              <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Heart className="w-10 h-10 text-brand-teal/30" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-4 italic">Tu maleta está vacía</h3>
              <p className="text-slate-400 italic font-medium mb-12 max-w-sm mx-auto">Explora nuestros destinos premium y guarda los que más te gusten para planificar tu próxima aventura.</p>
              <Link
                to="/destinos"
                className="inline-flex items-center gap-3 bg-brand-teal text-brand-dark px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Search className="w-4 h-4" />
                Explorar Destinos
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FavoritesPage;
