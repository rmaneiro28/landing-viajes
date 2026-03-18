import React, { useEffect, useMemo, useState } from 'react';
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
   const [tourNotFound, setTourNotFound] = useState(false);
   const [activeTab, setActiveTab] = useState('itinerario');
   const [selectedDates, setSelectedDates] = useState([]);
   const [shareMessage, setShareMessage] = useState('');
   const [showShareModal, setShowShareModal] = useState(false);

   const shareLinks = useMemo(() => [
     { name: 'Copiar enlace', icon: <Plus className="w-5 h-5 text-white" />, action: async () => {
         if (!navigator.clipboard) {
            setShareMessage('Tu navegador no permite copiar. Usa copiar manualmente.');
            return;
         }
         try {
            await navigator.clipboard.writeText(window.location.href);
            setShareMessage('¡Enlace copiado con éxito!');
         } catch (err) {
            setShareMessage('No se pudo copiar el enlace. Intenta manualmente.');
         }
         setTimeout(() => setShareMessage(''), 2500);
         setShowShareModal(false);
       }
     },
     { name: 'WhatsApp', icon: <MessageCircle className="w-5 h-5 text-green-500" />, action: () => {
         const phoneNumber = '584123397066';
         const message = encodeURIComponent(`Hola Jandy Tours, revisa este tour: ${tour?.title || 'tour'} - ${window.location.href}`);
         window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
         setShowShareModal(false);
       }
     }
   ], [tour?.title]);

   const handleShare = async () => {
      if (navigator.share) {
         try {
            await navigator.share({
               title: `Reserva ${tour?.title}`,
               text: `Mira este tour: ${tour?.title} - ${tour?.location}`,
               url: window.location.href,
            });
            return;
         } catch (err) {
            // continue to fallback
         }
      }
      setShowShareModal(true);
   };

   const openWhatsAppQuick = () => {
      if (!tour) return;
      const phoneNumber = '584123397066';
      const message = encodeURIComponent(`Hola Jandy Tours! Quiero reservar el tour "${tour.title}".`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
   };

   const handleReserve = () => {
      if (!tour) return;
      if (!selectedDates.length) {
         setShareMessage('Selecciona una fecha antes de reservar.');
         setTimeout(() => setShareMessage(''), 2500);
         return;
      }
      addToCart({ ...tour, selectedDates });
      setShareMessage('Tour añadido al carrito con tus fechas.');
      setTimeout(() => setShareMessage(''), 2500);
   };

   const toggleDateSelection = (date) => {
      setSelectedDates(prev => {
         if (prev.includes(date)) {
            return prev.filter(d => d !== date);
         }
         return [...prev, date];
      });
   };

   useEffect(() => {
      const foundTour = TOURS.find(t => t.id === id);
      if (foundTour) {
         setTour(foundTour);
         setSelectedDates(foundTour.availableDates ? [foundTour.availableDates[0]] : []);
         window.scrollTo(0, 0);
         setTourNotFound(false);
      } else {
         setTourNotFound(true);
      }
   }, [id]);

   if (tourNotFound) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-[#f4f7f6] p-4">
            <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-lg">
               <h1 className="text-2xl font-black text-brand-dark mb-3">Tour no encontrado</h1>
               <p className="text-slate-500 mb-6">No pudimos encontrar ese paquete. Regresa a explorar otros destinos.</p>
               <Link to="/destinos" className="bg-brand-teal text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-teal-600 transition-all">Ver destinos</Link>
            </div>
         </div>
      );
   }

   if (!tour) return null;

   const features = useMemo(() => [
      { icon: <ShieldCheck className="w-6 h-6" />, title: 'Seguro de Viaje', desc: 'Cobertura completa Allianz' },
      { icon: <Users className="w-6 h-6" />, title: 'Guía Certificado', desc: 'Experto local bilingüe' },
      { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Pensión Completa', desc: 'Gastronomía regional' },
   ], []);

   const highlights = useMemo(() => [
      { icon: <Hotel size={18} />, label: 'Hospedaje', value: 'Eco-Luxury' },
      { icon: <Plane size={18} />, label: 'Transporte', value: 'Vip Transfer' },
      { icon: <Coffee size={18} />, label: 'Desayuno', value: 'Incluido' },
   ], []);

   return (
      <div className="bg-white min-h-screen pb-32 lg:pb-0">
         {/* Header Image Section */}
         <section className="relative h-[80vh] md:h-[85vh] min-h-145 md:min-h-162.5 overflow-hidden">
            <OptimizedImage
               src={tour.image}
               alt={tour.title}
               className="w-full h-full object-cover mask-b-from-7"
               containerClassName="w-full h-full"
               priority={true}
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>

            {/* Top Controls - Increased spacing */}
            <div className="absolute top-28 md:top-36 left-0 w-full px-4 md:px-6 z-20">
               <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <Link to="/destinos" className="group flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/20 px-5 py-3.5 rounded-2xl text-white font-black uppercase tracking-widest text-[9px] md:text-[11px] hover:bg-brand-teal hover:border-brand-teal transition-all">
                     <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver
                  </Link>
                  <div className="flex gap-2 items-center">
                     <button onClick={handleShare} className="p-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                        <Share2 size={18} />
                     </button>
                     <button
                        onClick={() => toggleFavorite(tour)}
                        className={`p-3 rounded-xl transition-all ${isFavorite(tour.id) ? 'bg-brand-teal text-white' : 'bg-white text-brand-teal border border-white/20'}`}
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
                           <span className="text-white text-[10px] ml-1 font-bold">(120 Reseñas)</span>
                        </div>
                     </div>

                     <div className="relative">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-3 tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                           {tour.title}
                        </h1>
                     </div>

                     <div className="flex flex-wrap items-center gap-2 mt-4">
                        <span className="inline-flex items-center gap-1 bg-brand-teal text-brand-light text-[10px] md:text-xs font-black uppercase rounded-full px-3 py-1 border border-brand-teal/40">
                           <MapPin className="w-3 h-3" /> {tour.location}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-indigo-500 text-brand-light text-[10px] md:text-xs font-black uppercase rounded-full px-3 py-1 border border-indigo-300/60">
                           <Clock className="w-3 h-3" /> {tour.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-amber-500 text-brand-light text-[10px] md:text-xs font-black uppercase rounded-full px-3 py-1 border border-amber-300/60">
                           <Users className="w-3 h-3" /> {tour.guests || 'Hasta 12 viajeros'}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-emerald-500 text-brand-light text-[10px] md:text-xs font-black uppercase rounded-full px-3 py-1 border border-emerald-300/60">
                           <Star className="w-3 h-3" /> {tour.rating}
                        </span>
                     </div>

                     <div className="mt-4">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-black mb-2">Fechas disponibles</div>
                        <div className="flex flex-wrap gap-2">
                           {tour.availableDates?.map((date) => (
                              <button
                                 key={date}
                                 onClick={() => toggleDateSelection(date)}
                                 className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border transition-all ${selectedDates.includes(date) ? 'bg-white text-brand-dark border-transparent' : 'bg-white/15 text-white border-white/40 hover:bg-white/30'}`}
                              >
                                 {date}
                              </button>
                           ))}
                        </div>
                        <div className="mt-2 text-[11px] text-white/80">
                           {selectedDates.length > 0 ? `${selectedDates.length} fecha(s) seleccionada(s): ${selectedDates.join(', ')}` : 'Selecciona tus fechas preferidas.'}
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Highlights Bar */}
         <div className="relative z-30 -mt-10 md:px-0">
            <div className="max-w-4xl mx-auto px-4">
               <div className="bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-200 sm:grid sm:grid-cols-3 gap-2">
                  {highlights.map((h, i) => (
                     <div key={i} className="flex items-center gap-2 p-2 sm:p-3 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                        <div className="w-9 h-9 bg-brand-teal/10 text-brand-teal rounded-xl flex items-center justify-center text-lg">
                           {h.icon}
                        </div>
                        <div className="text-left">
                           <div className="text-[9px] font-black text-slate-500 uppercase tracking-wide">{h.label}</div>
                           <div className="text-[11px] font-black text-brand-dark">{h.value}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <section className="py-14 md:py-20 px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 md:gap-14">

               {/* Left Content */}
               <div className="lg:col-span-8 space-y-16 md:space-y-24">

                  <div className="space-y-8 md:space-y-12">
                     <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-4 bg-brand-teal/10 border border-brand-teal/20 rounded-2xl px-4 py-2">
                           <span className="text-[10px] uppercase font-black tracking-[0.25em] text-brand-teal">Tour Premium</span>
                           <span className="text-[10px] uppercase font-black tracking-[0.25em] text-brand-dark">Incluye transporte</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-brand-dark italic tracking-tighter">La Experiencia</h2>
                        <div className="h-px bg-slate-100 flex-1"></div>
                     </div>
                     <p className="text-base md:text-xl text-slate-500 font-semibold italic leading-relaxed text-balance">
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
                           className="min-h-75"
                        >
                           {activeTab === 'itinerario' && (
                              <div className="space-y-8 md:space-y-12 px-2">
                                 {[1, 2, 3].map(day => (
                                    <div key={day} className="flex gap-8 md:gap-12 group">
                                       <div className="flex flex-col items-center shrink-0">
                                          <div className="w-14 h-14 md:w-20 md:h-20 rounded-4xl bg-brand-dark text-white flex items-center justify-center font-black italic shadow-2xl shadow-brand-dark/20 group-hover:bg-brand-teal transition-all duration-700 text-xl">
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
                                    <div key={i} className="flex items-center gap-6 bg-slate-50/80 p-6 rounded-4xl border border-white group hover:bg-white hover:shadow-xl transition-all">
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
                  <div className="lg:sticky lg:top-28">
                     <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg text-slate-800">
                        <div className="mb-6">
                           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-teal">Tarifa All-Inclusive</span>
                           <div className="mt-3 flex items-baseline gap-1">
                              <span className="text-4xl font-black">${tour.price}</span>
                              <span className="text-xs uppercase text-slate-500">USD / Persona</span>
                           </div>
                           <p className="mt-3 text-xs text-slate-500">Precio por persona. Incluye impuestos y tasas. Reserva con soporte 24/7.</p>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-white/10 mb-10">
                           <div className="flex items-center gap-3 bg-white/10 rounded-2xl border border-white/10 p-3">
                              <Calendar className="w-4 h-4 text-brand-teal" />
                              <div>
                                 <div className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-black">Salida próxima</div>
                                 <div className="text-sm font-black text-white">24 Mayo 2024</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 bg-white/10 rounded-2xl border border-white/10 p-3">
                              <MapIcon className="w-4 h-4 text-brand-teal" />
                              <div>
                                 <div className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-black">Punto de encuentro</div>
                                 <div className="text-sm font-black text-white">Simón Bolívar</div>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <button
                              onClick={handleReserve}
                              className="w-full bg-brand-teal text-white py-3 rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:bg-teal-600 transition-all"
                              aria-label="Reservar tour"
                           >
                              <ShoppingCart className="w-4 h-4 inline mr-1" /> Reservar Ahora
                           </button>
                           <button onClick={handleShare} className="w-full border border-slate-200 text-slate-700 py-3 rounded-xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-50 transition-all">
                              <Share2 className="w-4 h-4 inline mr-1" /> Compartir
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </section>

         {/* Floating Mobile CTA Buttons */}
         <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 w-[94%] max-w-107.5 z-50">
            <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-xl flex items-center justify-between gap-2">
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">Desde</span>
                  <span className="text-sm font-black text-brand-dark">${tour.price} USD / por persona</span>
               </div>
               <button
                  onClick={handleReserve}
                  className="bg-brand-teal text-white h-11 rounded-xl font-black uppercase tracking-wide text-xs px-4 shadow-md hover:bg-teal-600 transition-all"
                  aria-label="Reservar tour"
               >
                  Reservar Ahora
               </button>
            </div>
         </div>

         {/* Floating WhatsApp Quick Action */}
         <button
            onClick={openWhatsAppQuick}
            className="fixed bottom-28 right-4 z-50 bg-[#25D366] text-white p-2.5 rounded-full shadow-lg border border-white active:scale-95 transition-all"
            aria-label="Chat WhatsApp"
         >
            <MessageCircle className="w-4 h-4" />
         </button>

         <section className="py-24 bg-slate-50/50 overflow-hidden border-t border-slate-100 mb-10">
            <div className="max-w-7xl mx-auto px-6">
               <h2 className="text-3xl font-black text-brand-dark mb-16 italic tracking-tighter text-center">Te recomendamos también</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {TOURS.filter(t => t.id !== tour.id).slice(0, 4).map(t => (
                     <Link to={`/paquetes/${t.id}`} key={t.id} className="group block">
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all">
                           <OptimizedImage
                              src={t.image}
                              alt={t.title}
                              className="w-full h-44 object-cover"
                              containerClassName="w-full h-44"
                           />
                           <div className="p-3">
                              <h3 className="text-sm font-black text-brand-dark line-clamp-2">{t.title}</h3>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">Desde ${t.price} USD</p>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>

         {/* Share Modal */}
         <AnimatePresence>
            {showShareModal && (
               <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setShowShareModal(false)}
                     className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 20 }}
                     className="relative w-full max-w-sm bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-[3rem] shadow-2xl"
                  >
                     <h3 className="text-xl font-black text-white italic mb-6 tracking-tighter text-center">Compartir</h3>
                     <div className="grid grid-cols-2 gap-4">
                        {shareLinks.map((link) => (
                           <button
                              key={link.name}
                              onClick={link.action}
                              className="flex flex-col items-center gap-3 bg-white/10 border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all text-white font-bold group"
                           >
                              <div className="bg-white p-3 rounded-2xl text-brand-dark group-hover:scale-110 transition-transform">
                                 {link.icon}
                              </div>
                              <span className="text-[10px] uppercase tracking-widest">{link.name}</span>
                           </button>
                        ))}
                     </div>
                     <button
                        onClick={() => setShowShareModal(false)}
                        className="w-full mt-8 py-2 text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                     >
                        Cerrar Ventana
                     </button>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default TourDetailsPage;
