import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TOURS } from '../data/tours';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import OptimizedImage from '../components/OptimizedImage';
import { 
  ArrowLeft, Star, Clock, MapPin, ShieldCheck, CheckCircle2, 
  MessageCircle, Calendar, Users, Info, ChevronRight, 
  Play, Plus, Heart, Share2, ShoppingCart, Camera,
  Map as MapIcon, Coffee, Plane, Hotel
} from 'lucide-react';

const TourDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [tour, setTour] = useState(null);
  const [activeTab, setActiveTab] = useState('itinerario');

  useEffect(() => {
    const foundTour = TOURS.find(t => t.id === id); 
    if (foundTour) {
      setTour(foundTour);
      window.scrollTo(0, 0);
    } else {
      navigate('/destinos');
    }
  }, [id, navigate]);

  if (!tour) return null;

  const features = [
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Seguro de Viaje', desc: 'Cobertura completa Allianz' },
    { icon: <Users className="w-6 h-6" />, title: 'Guía Certificado', desc: 'Experto local bilingüe' },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Pensión Completa', desc: 'Gastronomía regional' },
  ];

  const highlights = [
    { icon: <Hotel size={18} />, label: 'Hospedaje', value: 'Eco-Luxury' },
    { icon: <Plane size={18} />, label: 'Transporte', value: 'Vip Transfer' },
    { icon: <Coffee size={18} />, label: 'Desayuno', value: 'Incluido' },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 lg:pb-0">
      {/* Header Image Section */}
      <section className="relative h-[80vh] md:h-[85vh] min-h-[580px] md:min-h-[650px] overflow-hidden">
        <OptimizedImage 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>
        
        {/* Top Controls - Increased spacing */}
        <div className="absolute top-28 md:top-36 left-0 w-full px-4 md:px-6 z-20">
           <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link to="/destinos" className="group flex items-center gap-2 bg-white/10 backdrop-blur-3xl border border-white/20 px-5 py-3.5 rounded-2xl text-white font-black uppercase tracking-widest text-[9px] md:text-[11px] hover:bg-brand-teal hover:border-brand-teal transition-all">
                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver
              </Link>
              <div className="flex gap-2">
                <button className="p-3.5 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all">
                  <Share2 size={18} />
                </button>
                <button 
                  onClick={() => toggleFavorite(tour)}
                  className={`p-3.5 rounded-2xl shadow-xl hover:scale-110 active:scale-90 transition-all ${isFavorite(tour.id) ? 'bg-brand-teal text-white' : 'bg-white text-brand-teal'}`}
                >
                  <Heart size={18} fill={isFavorite(tour.id) ? "currentColor" : "none"} strokeWidth={isFavorite(tour.id) ? 0 : 2} />
                </button>
              </div>
           </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-16 md:bottom-24 left-0 w-full px-6 z-20">
           <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl"
              >
                <div className="flex flex-wrap items-center gap-3 mb-8">
                   <div className="px-5 py-2 bg-brand-teal rounded-full text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-teal-500/40">
                      {tour.tag || tour.category}
                   </div>
                   <div className="flex items-center gap-1.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white text-xs font-black">{tour.rating}</span>
                      <span className="text-white/40 text-[10px] ml-1 font-bold">(120 Reseñas)</span>
                   </div>
                </div>
                
                <h1 className="text-4xl md:text-8xl font-black text-white leading-[1.1] md:leading-[1] mb-10 tracking-tighter italic">
                   {tour.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 md:gap-10">
                   <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/5 text-white text-[10px] md:text-xs font-black uppercase tracking-widest">
                      <MapPin className="text-brand-teal w-4 h-4" /> {tour.location}
                   </div>
                   <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/5 text-white text-[10px] md:text-xs font-black uppercase tracking-widest">
                      <Clock className="text-brand-teal w-4 h-4" /> {tour.duration}
                   </div>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <div className="relative z-30 -mt-10 md:px-0">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-slate-50 flex overflow-x-auto scrollbar-hide gap-8 justify-between items-center">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[90px] group">
                <div className="w-14 h-14 bg-slate-50 text-brand-teal rounded-2xl flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors duration-500">
                  {h.icon}
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{h.label}</span>
                <span className="text-[12px] font-black text-brand-dark italic">{h.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
           
           {/* Left Content */}
           <div className="lg:col-span-8 space-y-16 md:space-y-24">
              
              <div className="space-y-8 md:space-y-12">
                 <div className="flex items-center gap-6">
                   <h2 className="text-3xl md:text-5xl font-black text-brand-dark italic tracking-tighter shrink-0">La Experiencia</h2>
                   <div className="h-px bg-slate-100 flex-1"></div>
                 </div>
                 <p className="text-xl md:text-3xl text-slate-500 font-semibold italic leading-relaxed text-balance">
                   {tour.description}
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-6">
                    {features.map((f, i) => (
                      <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-white flex flex-col items-start gap-4 hover:shadow-2xl hover:shadow-slate-200 transition-all border-l-4 border-l-brand-teal group">
                         <div className="text-brand-teal bg-white p-4 rounded-2xl group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-white transition-all shadow-sm">{f.icon}</div>
                         <div>
                            <p className="text-brand-dark font-black tracking-tight text-lg italic">{f.title}</p>
                            <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest opacity-60 mt-1">{f.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Tabs Section */}
              <div className="pt-8">
                 <div className="flex gap-8 md:gap-12 border-b border-slate-100 mb-12 overflow-x-auto scrollbar-hide py-2">
                    {['itinerario', 'incluye', 'recomendaciones'].map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-6 text-[11px] md:text-sm font-black uppercase tracking-[0.3em] transition-all relative shrink-0 ${activeTab === tab ? 'text-brand-dark' : 'text-slate-300 hover:text-slate-500'}`}
                      >
                         {tab}
                         {activeTab === tab && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 w-full h-1.5 bg-brand-teal rounded-full"></motion.div>}
                      </button>
                    ))}
                 </div>

                 <AnimatePresence mode="wait">
                    <motion.div
                       key={activeTab}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -20 }}
                       className="min-h-[300px]"
                    >
                       {activeTab === 'itinerario' && (
                         <div className="space-y-8 md:space-y-12 px-2">
                            {[1, 2, 3].map(day => (
                               <div key={day} className="flex gap-8 md:gap-12 group">
                                  <div className="flex flex-col items-center shrink-0">
                                     <div className="w-14 h-14 md:w-20 md:h-20 rounded-[2rem] bg-brand-dark text-white flex items-center justify-center font-black italic shadow-2xl shadow-brand-dark/20 group-hover:bg-brand-teal transition-all duration-700 text-xl">
                                        0{day}
                                     </div>
                                     <div className="w-px h-full bg-slate-100 group-last:bg-transparent mt-6"></div>
                                  </div>
                                  <div className="pb-10 md:pb-16">
                                     <h4 className="text-2xl md:text-3xl font-black text-brand-dark mb-4 leading-tight italic tracking-tighter">Día {day}: {day === 1 ? 'Bienvenida & Relax' : day === 2 ? 'Exploración Profunda' : 'Retorno Inolvidable'}</h4>
                                     <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-md transition-shadow">
                                        <p className="text-slate-500 font-semibold italic text-lg md:text-xl leading-relaxed">
                                           Comenzamos la jornada con un desayuno buffet de autor frente al mar. {day === 2 ? 'Nadie conoce este rincón como nosotros; caminaremos por senderos vírgenes hasta la cascada oculta donde disfrutaremos un picnic privado.' : 'Tiempo libre para compras de artesanía local antes de nuestra cena de despedida.'}
                                        </p>
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                       )}

                       {activeTab === 'incluye' && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                              { t: 'Traslados VIP', d: 'Recogida exclusiva en el aeropuerto' },
                              { t: 'Eco-Hospedaje', d: 'Suite con vista panorámica' },
                              { t: 'Cena de Autor', d: 'Experiencia gastronómica incluida' },
                              { t: 'Equipamiento', d: 'Todo el kit de seguridad y snorkeling' },
                              { t: 'Guía Especialista', d: 'Experto en biodiversidad local' },
                              { t: 'Seguro Contra Todo', d: 'Paz mental en cada paso' }
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-6 bg-slate-50/80 p-6 rounded-[2rem] border border-white group hover:bg-white hover:shadow-xl transition-all">
                                 <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all shadow-sm">
                                    <ChevronRight className="w-6 h-6" />
                                 </div>
                                 <div>
                                   <p className="font-black text-brand-dark text-base uppercase tracking-tight">{item.t}</p>
                                   <p className="text-[11px] text-slate-400 font-bold italic tracking-wide">{item.d}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>

           {/* Booking Card - Sticky on Desktop */}
           <div className="lg:col-span-4 hidden lg:block">
              <div className="lg:sticky lg:top-36">
                <div className="bg-brand-dark p-12 rounded-[4rem] text-white shadow-3xl shadow-brand-dark/40 border border-white/5 overflow-hidden group">
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-[2s]"></div>
                   <div className="relative z-10">
                      <div className="mb-12">
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-teal block mb-4">Tarifa All-Inclusive</span>
                         <div className="flex items-baseline gap-3">
                            <span className="text-6xl font-black italic">${tour.price}</span>
                            <span className="text-brand-teal text-sm font-black uppercase tracking-widest">USD</span>
                         </div>
                         <p className="text-white/20 text-[10px] font-black mt-6 uppercase tracking-[0.2em] leading-relaxed">Impuestos y tasas aéreas incluidas. Reserva 100% protegida por Jandy Tours.</p>
                      </div>

                      <div className="space-y-6 pt-10 border-t border-white/10 mb-12">
                         <div className="flex items-center justify-between">
                            <span className="text-white/50 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                               <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center"><Calendar className="w-4 h-4 text-brand-teal" /></div> Salida Próxima
                            </span>
                            <span className="text-sm font-black italic">24 Mayo 2024</span>
                         </div>
                         <div className="flex items-center justify-between">
                            <span className="text-white/50 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                               <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center"><MapIcon className="w-4 h-4 text-brand-teal" /></div> Punto Encuentro
                            </span>
                            <span className="text-sm font-black italic">Simón Bolívar</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                        <button 
                          onClick={() => addToCart(tour)}
                          className="w-full bg-brand-teal text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-teal-500/20 active:translate-y-px transition-all flex items-center justify-center gap-3 group"
                        >
                          <ShoppingCart className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
                          Reservar Ahora
                        </button>
                        <button className="w-full bg-white/5 border border-white/10 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-brand-teal hover:border-brand-teal transition-all flex items-center justify-center gap-3">
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          WhatsApp Concierge
                        </button>
                      </div>
                   </div>
                </div>
              </div>
           </div>

        </div>
      </section>

      {/* Improved Floating Bottom Bar for Mobile */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-50">
          <div className="bg-brand-dark p-3.5 rounded-[2.5rem] shadow-3xl shadow-brand-dark/40 flex items-center justify-between gap-3 border border-white/10 backdrop-blur-3xl">
             <div className="flex flex-col pl-6">
                <span className="text-[8px] font-black text-brand-teal uppercase tracking-[0.2em] mb-0.5 opacity-80">Precio Final</span>
                <div className="flex items-baseline gap-1.5 leading-none">
                   <span className="text-2xl font-black text-white italic">${tour.price}</span>
                   <span className="text-brand-teal text-[9px] font-black uppercase tracking-widest">USD</span>
                </div>
             </div>
             
             <button 
                onClick={() => addToCart(tour)}
                className="bg-brand-teal text-white h-16 w-16 md:w-auto md:px-10 rounded-full md:rounded-[1.8rem] font-black uppercase text-[11px] tracking-widest shadow-xl shadow-teal-500/20 active:scale-90 transition-all flex items-center justify-center gap-3"
             >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline">Reservar</span>
             </button>
          </div>
      </div>

      {/* Recommended Section - More visual for mobile */}
      <section className="py-24 bg-slate-50/50 overflow-hidden border-t border-slate-100 mb-10">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-black text-brand-dark mb-16 italic tracking-tighter text-center">Te recomendamos también</h2>
            <div className="flex overflow-x-auto gap-8 pb-10 scrollbar-hide -mx-6 px-6">
               {TOURS.filter(t => t.id !== tour.id).slice(0, 4).map(t => (
                 <Link to={`/paquetes/${t.id}`} key={t.id} className="min-w-[280px] group flex flex-col">
                    <div className="w-full aspect-[10/12] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:-translate-y-3 relative">
                       <OptimizedImage 
                          src={t.image} 
                          alt={t.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          containerClassName="w-full h-full"
                       />
                       <div className="absolute bottom-5 left-5 right-5 p-5 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20">
                          <h3 className="text-white text-base font-black italic leading-tight mb-1">{t.title}</h3>
                          <p className="text-brand-teal text-[10px] font-black uppercase tracking-widest">${t.price} USD</p>
                       </div>
                    </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default TourDetailsPage;
