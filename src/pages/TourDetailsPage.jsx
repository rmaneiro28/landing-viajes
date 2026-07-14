import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TOURS } from '../data/tours';
import { useFavorites } from '../context/FavoritesContext';
import OptimizedImage from '../components/OptimizedImage';
import {
   ArrowLeft, Star, MapPin, ShieldCheck, CheckCircle2,
   MessageCircle, Users, ChevronRight,
   Heart, Share2, Sun, Compass, Wind,
   Coffee, Plane, Hotel, Phone, Cloud, CloudRain,
   Calendar, ArrowUpRight, AlertCircle, Clock
} from 'lucide-react';
import { AIRLINE_MAPPINGS } from '../components/AirlinesWidget';

const getWeatherDescription = (code) => {
   if (code === undefined || code === null) return 'Tropical';
   if (code === 0) return 'Despejado';
   if (code <= 3) return 'Parcial. Nublado';
   if (code <= 48) return 'Niebla';
   if (code <= 55) return 'Llovizna';
   if (code <= 65) return 'Lluvia';
   if (code <= 75) return 'Nieve';
   if (code <= 82) return 'Chubascos';
   if (code >= 95) return 'Tormenta';
   return 'Variado';
};

const getWeatherIcon = (code) => {
   if (code === undefined || code === null) return <Sun size={20} />;
   if (code === 0) return <Sun size={20} />;
   if (code <= 3) return <Cloud size={20} />;
   if (code <= 48) return <Cloud size={20} />;
   if (code <= 82) return <CloudRain size={20} />;
   return <CloudRain size={20} />;
};

// Agencias disponibles por destino
const AGENCIES = [
  { name: 'Paradise Travel', tipo: 'Operadora de Turismo', tel: '+58 412-345-6789' },
  { name: 'Trotamundos Tours', tipo: 'Agencia de Viajes', tel: '+58 424-234-5678' },
  { name: 'Venezuela Travels', tipo: 'Operadora de Turismo', tel: '+58 416-789-1234' },
  { name: 'Aventuras VZ', tipo: 'Guía y Transporte', tel: '+58 414-567-8901' },
  { name: 'Caribe Expediciones', tipo: 'Tours Náuticos', tel: '+58 412-890-1234' },
];

const TourDetailsPage = () => {
   const { id } = useParams();
   const { toggleFavorite, isFavorite } = useFavorites();
   const [tour, setTour] = useState(null);
   const [tourNotFound, setTourNotFound] = useState(false);
   const [activeTab, setActiveTab] = useState('itinerario');
   const [showShareModal, setShowShareModal] = useState(false);
   const [copied, setCopied] = useState(false);
   const [weather, setWeather] = useState(null);

   const features = useMemo(() => [
      { icon: <ShieldCheck className="w-5 h-5" />, title: 'Seguro de Viaje', desc: 'Cobertura completa' },
      { icon: <Users className="w-5 h-5" />, title: 'Guía Certificado', desc: 'Experto local' },
      { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Pensión Completa', desc: 'Gastronomía regional' },
   ], []);

   const highlights = useMemo(() => [
      { icon: <Hotel size={20} />, label: 'Hospedaje', value: 'Eco-Luxury' },
      { icon: <Plane size={20} />, label: 'Transporte', value: 'VIP Transfer' },
      { icon: <Coffee size={20} />, label: 'Desayuno', value: 'Incluido' },
      { 
         icon: weather ? getWeatherIcon(weather.weathercode) : <Wind size={20} />, 
         label: weather ? `Clima (${weather.temperature}°C)` : 'Clima', 
         value: weather ? getWeatherDescription(weather.weathercode) : 'Tropical' 
      },
   ], [weather]);

   const handleShare = async () => {
      if (navigator.share) {
         try {
            await navigator.share({ title: tour?.title, url: window.location.href });
            return;
         } catch (_) {}
      }
      setShowShareModal(true);
   };

   const handleCopy = async () => {
      try {
         await navigator.clipboard.writeText(window.location.href);
         setCopied(true);
         setTimeout(() => { setCopied(false); setShowShareModal(false); }, 2000);
      } catch (_) {}
   };

   useEffect(() => {
      const foundTour = TOURS.find(t => t.id === id);
      if (foundTour) {
         setTour(foundTour);
         window.scrollTo(0, 0);
         setTourNotFound(false);
         setWeather(null);
         
         if (foundTour.coords) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${foundTour.coords[0]}&longitude=${foundTour.coords[1]}&current_weather=true`)
               .then(res => res.json())
               .then(data => {
                  if (data.current_weather) {
                     setWeather(data.current_weather);
                  }
               })
               .catch(err => console.error("Error fetching weather:", err));
         }
      } else {
         setTourNotFound(true);
      }
   }, [id]);

   if (tourNotFound) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4">
            <div className="max-w-md bg-white p-8 rounded-2xl border border-amber-100 text-center shadow-lg">
               <Sun className="w-12 h-12 text-amber-400 mx-auto mb-4" />
               <h1 className="text-2xl font-black text-brand-dark mb-3">Destino no encontrado</h1>
               <p className="text-slate-500 mb-6">No pudimos encontrar ese destino. Explora nuestros otros destinos.</p>
               <Link to="/destinos" className="bg-brand-teal text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all">Ver destinos</Link>
            </div>
         </div>
      );
   }

   if (!tour) return null;

   return (
      <div className="bg-[#fdfaf6] min-h-screen">

         {/* ── HERO IMAGEN ── */}
         <section className="relative h-[75vh] md:h-[85vh] min-h-[560px] overflow-hidden">
            <OptimizedImage
               src={tour.image}
               alt={tour.title}
               className="w-full h-full object-cover"
               containerClassName="w-full h-full"
               priority={true}
            />
            {/* Gradiente cálido - más denso en la base */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0a] via-[#1a0f00]/60 to-[#1a0f00]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Controles top */}
            <div className="absolute top-28 md:top-32 left-0 w-full px-5 md:px-8 z-20">
               <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <Link to="/paquetes" className="group flex items-center gap-2 bg-black/20 backdrop-blur-xl border border-white/20 px-4 py-3 rounded-xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-brand-teal hover:border-brand-teal transition-all">
                     <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver
                  </Link>
                  <div className="flex gap-2">
                     <button onClick={handleShare} className="p-3 bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
                        <Share2 size={17} />
                     </button>
                     <button
                        onClick={() => toggleFavorite(tour)}
                        className={`p-3 rounded-xl transition-all ${isFavorite(tour.id) ? 'bg-rose-500 text-white border border-rose-400' : 'bg-black/20 backdrop-blur-xl border border-white/20 text-white hover:bg-rose-500/20'}`}
                     >
                        <Heart size={17} fill={isFavorite(tour.id) ? 'currentColor' : 'none'} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Contenido hero */}
            <div className="absolute bottom-0 left-0 w-full px-5 md:px-8 pb-10 md:pb-16 z-20">
               <div className="max-w-7xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 24 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7 }}
                  >
                     {/* Badges */}
                     <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="px-4 py-1.5 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                           {tour.tag || tour.category}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black shadow-md">
                           <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {tour.rating} · 120 reseñas
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black shadow-md">
                           <MapPin className="w-3 h-3 text-brand-teal" /> {tour.location}
                        </span>
                     </div>

                     {/* Título */}
                     <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1] tracking-tighter mb-6"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)' }}
                     >
                        {tour.title}
                     </h1>

                     {/* Highlights rápidos */}
                     <div className="flex flex-wrap gap-3">
                        {highlights.map((h, i) => (
                           <div key={i} className="flex items-center gap-3 bg-black/50 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 shadow-lg">
                              <span className="text-brand-teal w-5 h-5">{h.icon}</span>
                              <div>
                                 <div className="text-[10px] text-white/60 font-black uppercase tracking-wider">{h.label}</div>
                                 <div className="text-sm text-white font-black drop-shadow-sm">{h.value}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* ── CONTENIDO PRINCIPAL ── */}
         <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-20">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

               {/* Columna izquierda */}
               <div className="lg:col-span-8 space-y-14">

                  {/* Descripción */}
                  <div>
                     <div className="flex items-center gap-3 mb-6">
                        <Compass className="w-5 h-5 text-amber-500" />
                        <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">Sobre este destino</h2>
                        <div className="flex-1 h-px bg-amber-100"></div>
                     </div>
                     <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                        {tour.description}
                     </p>

                     {/* Feature cards */}
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        {features.map((f, i) => (
                           <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:border-brand-teal/30 transition-all group">
                              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all shrink-0">
                                 {f.icon}
                              </div>
                              <div>
                                 <p className="font-black text-brand-dark text-sm">{f.title}</p>
                                 <p className="text-slate-400 text-[11px] font-semibold">{f.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Tabs */}
                  <div>
                     <div className="flex gap-1 bg-white p-1 rounded-2xl border border-amber-100 shadow-sm mb-8 overflow-x-auto">
                        {['itinerario', 'incluye', 'agencias', 'aerolineas'].map(tab => (
                           <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`flex-1 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab
                                 ? 'bg-brand-teal text-white shadow-md shadow-teal-500/20'
                                 : 'text-slate-400 hover:text-brand-dark'}`}
                           >
                              {tab === 'agencias' ? '🏢 Agencias' : tab === 'itinerario' ? '🗺️ Itinerario' : tab === 'incluye' ? '✅ Incluye' : '✈️ Aerolíneas'}
                           </button>
                        ))}
                     </div>

                     <AnimatePresence mode="wait">
                        <motion.div
                           key={activeTab}
                           initial={{ opacity: 0, y: 12 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -12 }}
                           transition={{ duration: 0.25 }}
                        >
                           {/* ITINERARIO */}
                           {activeTab === 'itinerario' && (
                              <div className="space-y-6">
                                 {[
                                    { day: 1, emoji: '✈️', title: 'Bienvenida & Relax', desc: 'Llegada al destino, traslado al hospedaje y primer contacto con el entorno natural. Noche de bienvenida con cena de autor frente al paisaje.' },
                                    { day: 2, emoji: '🧭', title: 'Exploración Profunda', desc: 'Jornada completa explorando los rincones más espectaculares del destino con nuestros guías especializados. Picnic en plena naturaleza.' },
                                    { day: 3, emoji: '🌅', title: 'Retorno Inolvidable', desc: 'Tiempo libre para compras de artesanía local. Cena de despedida y traslado al aeropuerto con los mejores recuerdos.' },
                                 ].map(item => (
                                    <div key={item.day} className="flex gap-5 group">
                                       <div className="flex flex-col items-center shrink-0">
                                          <div className="w-12 h-12 rounded-2xl bg-brand-dark text-white flex flex-col items-center justify-center group-hover:bg-amber-500 transition-colors duration-500 shadow-lg">
                                             <span className="text-xs font-black">{String(item.day).padStart(2, '0')}</span>
                                          </div>
                                          {item.day < 3 && <div className="w-px flex-1 bg-slate-100 mt-3 mb-1"></div>}
                                       </div>
                                       <div className="pb-8">
                                          <div className="flex items-center gap-2 mb-2">
                                             <span className="text-xl">{item.emoji}</span>
                                             <h4 className="text-lg font-black text-brand-dark">{item.title}</h4>
                                          </div>
                                          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                             <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* INCLUYE */}
                           {activeTab === 'incluye' && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 {[
                                    { emoji: '🚐', t: 'Traslados VIP', d: 'Recogida exclusiva en aeropuerto' },
                                    { emoji: '🏨', t: 'Eco-Hospedaje', d: 'Suite con vista panorámica' },
                                    { emoji: '🍽️', t: 'Cena de Autor', d: 'Experiencia gastronómica incluida' },
                                    { emoji: '🤿', t: 'Equipamiento', d: 'Kit de seguridad y snorkeling' },
                                    { emoji: '🧑‍🏫', t: 'Guía Especialista', d: 'Experto en biodiversidad local' },
                                    { emoji: '🛡️', t: 'Seguro de Viaje', d: 'Paz mental en cada paso' },
                                 ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-md transition-all group">
                                       <span className="text-2xl">{item.emoji}</span>
                                       <div>
                                          <p className="font-black text-brand-dark text-sm">{item.t}</p>
                                          <p className="text-[11px] text-slate-400 font-semibold">{item.d}</p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* AGENCIAS */}
                           {activeTab === 'agencias' && (
                              <div className="space-y-4">
                                 <p className="text-sm text-slate-500 italic mb-6">Contacta directamente con alguna de estas agencias para organizar tu viaje a <strong>{tour.title}</strong>.</p>
                                 {AGENCIES.map((agency, i) => (
                                    <div key={i} className="flex items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-md transition-all">
                                       <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal font-black text-sm">
                                             {agency.name[0]}
                                          </div>
                                          <div>
                                             <p className="font-black text-brand-dark text-sm">{agency.name}</p>
                                             <p className="text-[11px] text-brand-teal font-black uppercase tracking-wide">{agency.tipo}</p>
                                             <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                                                <Phone className="w-2.5 h-2.5" /> {agency.tel}
                                             </p>
                                          </div>
                                       </div>
                                       <a
                                          href={`https://wa.me/${agency.tel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${agency.name}, me interesa un viaje a ${tour.title}.`)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="shrink-0 bg-[#25D366] text-white px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 transition-all flex items-center gap-1.5"
                                       >
                                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                                       </a>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* AEROLINEAS */}
                           {activeTab === 'aerolineas' && (
                              <div className="space-y-4">
                                 <p className="text-sm text-slate-500 italic mb-6">Opciones de vuelo directo o conexiones recomendadas para llegar a <strong>{tour.title}</strong>.</p>
                                 {(AIRLINE_MAPPINGS[tour.id] || []).length > 0 ? (
                                    (AIRLINE_MAPPINGS[tour.id] || []).map((airline, idx) => (
                                       <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-md transition-all">
                                          <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded-xl bg-brand-dark text-brand-teal flex items-center justify-center font-black tracking-widest text-[11px] shrink-0">
                                                {airline.logoText}
                                             </div>
                                             <div>
                                                <div className="flex items-center gap-2">
                                                   <p className="font-black text-brand-dark text-sm">{airline.name}</p>
                                                   <span className="bg-slate-50 border border-slate-100 text-slate-400 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">{airline.type}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 mt-1.5">
                                                   <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                                                      <Calendar className="w-3 h-3 text-brand-teal" /> {airline.freq}
                                                   </span>
                                                   <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                                                      <Clock className="w-3 h-3 text-brand-teal" /> {airline.duration}
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                          <a
                                             href={airline.url}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="shrink-0 inline-flex items-center gap-1 bg-brand-teal text-brand-dark px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all shadow-sm"
                                          >
                                             Reservar <ArrowUpRight className="w-3 h-3" />
                                          </a>
                                       </div>
                                    ))
                                 ) : (
                                    <div className="text-center py-10 border border-dashed border-slate-200 bg-white rounded-2xl">
                                       <Plane className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                       <p className="text-sm font-black text-brand-dark">Sin conexiones directas</p>
                                       <p className="text-xs text-slate-400 font-semibold mt-1">Este destino requiere principalmente transporte terrestre o acuático.</p>
                                    </div>
                                 )}
                              </div>
                           )}
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>

               {/* Sidebar */}
               <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28 space-y-5">

                     {/* Clima Actual */}
                     {weather && (
                        <div className="bg-gradient-to-br from-[#0e5c5a] to-[#0a3d3c] p-7 rounded-2xl text-white shadow-sm flex items-center justify-between border border-brand-teal/20">
                           <div>
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal mb-1 block">Clima Actual</span>
                              <div className="text-4xl font-black tracking-tighter">{weather.temperature}°C</div>
                              <div className="text-sm font-medium mt-1 text-white/70">{getWeatherDescription(weather.weathercode)}</div>
                           </div>
                           <div className="w-14 h-14 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                              {getWeatherIcon(weather.weathercode)}
                           </div>
                        </div>
                     )}

                     {/* Dato curioso */}
                     <div className="bg-gradient-to-br from-brand-dark to-[#0d2b26] p-7 rounded-2xl text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-2xl"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal mb-3 block">💡 Dato curioso</span>
                        <h3 className="text-xl font-black italic tracking-tight leading-snug mb-3">{tour.title}</h3>
                        <p className="text-white/55 font-medium text-sm leading-relaxed mb-5">{tour.description}</p>
                        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                           <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                           <span className="text-amber-400 font-black text-sm">{tour.rating} / 5.0</span>
                           <span className="text-white/30 text-xs">· 120 reseñas</span>
                        </div>
                     </div>

                     {/* Compartir */}
                     <button
                        onClick={handleShare}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-brand-dark py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:border-brand-teal hover:text-brand-teal transition-all shadow-sm"
                     >
                        <Share2 className="w-4 h-4" /> Compartir destino
                     </button>

                     {/* Favorito */}
                     <button
                        onClick={() => toggleFavorite(tour)}
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all border ${isFavorite(tour.id) ? 'bg-rose-500 text-white border-rose-400' : 'bg-white border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-500'}`}
                     >
                        <Heart className="w-4 h-4" fill={isFavorite(tour.id) ? 'currentColor' : 'none'} />
                        {isFavorite(tour.id) ? 'Guardado en favoritos' : 'Guardar en favoritos'}
                     </button>

                     {/* Tip de viaje */}
                     <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                           <Sun className="w-4 h-4 text-amber-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Consejo de viaje</span>
                        </div>
                        <p className="text-sm text-amber-800/70 font-medium leading-relaxed">
                           Contacta a las agencias con anticipación para asegurar disponibilidad, especialmente en temporada alta.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* ── RESEÑAS DE VIAJEROS ── */}
         <section className="py-16 px-5 md:px-8 bg-[#fdfaf6] border-t border-amber-100">
            <div className="max-w-7xl mx-auto">
               {/* Header */}
               <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                     <div className="flex items-center gap-3 mb-2">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
                           Reseñas de viajeros
                        </h2>
                     </div>
                     <p className="text-slate-500 text-sm font-medium">
                        Experiencias reales de clientes que viajaron a <strong>{tour.title}</strong> con nuestras agencias
                     </p>
                  </div>
                  {/* Resumen de rating */}
                  <div className="flex items-center gap-4 bg-white border border-amber-100 rounded-2xl px-6 py-4 shadow-sm shrink-0">
                     <div className="text-center">
                        <div className="text-4xl font-black text-brand-dark">{tour.rating}</div>
                        <div className="flex gap-0.5 justify-center my-1">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                           ))}
                        </div>
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-wider">120 reseñas</div>
                     </div>
                     <div className="w-px h-12 bg-amber-100"></div>
                     <div className="space-y-1">
                        {[5, 4, 3].map(n => (
                           <div key={n} className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 font-black w-2">{n}</span>
                              <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                 <div
                                    className="h-full bg-amber-400 rounded-full"
                                    style={{ width: n === 5 ? '70%' : n === 4 ? '20%' : '10%' }}
                                 ></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Grid de reseñas */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                     {
                        nombre: 'María Fernanda R.',
                        avatar: 'https://i.pravatar.cc/80?u=mfr',
                        agencia: 'Paradise Travel',
                        estrellas: 5,
                        fecha: 'Mayo 2026',
                        comentario: `Viaje a ${tour.title} fue una experiencia que no olvidaré. Paradise Travel organizó todo a la perfección: desde el traslado hasta las actividades diarias. Me sentí segura y acompañada en todo momento. ¡Totalmente recomendado!`
                     },
                     {
                        nombre: 'Carlos J. Morales',
                        avatar: 'https://i.pravatar.cc/80?u=cjm',
                        agencia: 'Trotamundos Tours',
                        estrellas: 4,
                        fecha: 'Abril 2026',
                        comentario: `Reservé con Trotamundos Tours y la experiencia fue muy buena. Los guías conocen muy bien ${tour.title}. Hubo un pequeño retraso al inicio pero luego todo fluyó perfecto. Volvería sin dudarlo.`
                     },
                     {
                        nombre: 'Luisa Torrealba',
                        avatar: 'https://i.pravatar.cc/80?u=lt99',
                        agencia: 'Venezuela Travels',
                        estrellas: 5,
                        fecha: 'Marzo 2026',
                        comentario: `Venezuela Travels superó mis expectativas. La logística para llegar a ${tour.title} es compleja, pero ellos lo manejaron todo sin complicaciones. Las fotos no le hacen justicia a lo que vivimos en persona.`
                     },
                     {
                        nombre: 'Andrés Salcedo',
                        avatar: 'https://i.pravatar.cc/80?u=as88',
                        agencia: 'Aventuras VZ',
                        estrellas: 5,
                        fecha: 'Junio 2026',
                        comentario: `Fui con un grupo de amigos a ${tour.title} con Aventuras VZ. El guía fue increíble, muy conocedor y simpático. Las actividades estuvieron bien organizadas y el hospedaje superó lo esperado.`
                     },
                     {
                        nombre: 'Gabriela Méndez',
                        avatar: 'https://i.pravatar.cc/80?u=gm55',
                        agencia: 'Caribe Expediciones',
                        estrellas: 4,
                        fecha: 'Febrero 2026',
                        comentario: `Caribe Expediciones nos llevó a conocer ${tour.title} de una forma muy especial. El recorrido en lancha fue lo mejor. Solo un pequeño inconveniente con el clima, pero eso escapa de su control.`
                     },
                     {
                        nombre: 'Roberto Palacios',
                        avatar: 'https://i.pravatar.cc/80?u=rp77',
                        agencia: 'Paradise Travel',
                        estrellas: 5,
                        fecha: 'Enero 2026',
                        comentario: `Segunda vez con Paradise Travel y de nuevo una experiencia 10/10. ${tour.title} es un destino mágico que hay que vivir al menos una vez. La atención, la comida y los paisajes: todo fue perfecto.`
                     },
                  ].map((review, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm hover:shadow-md hover:border-brand-teal/20 transition-all flex flex-col gap-4"
                     >
                        {/* Estrellas + fecha */}
                        <div className="flex items-center justify-between">
                           <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                 <Star key={j} className={`w-4 h-4 ${j < review.estrellas ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-100'}`} />
                              ))}
                           </div>
                           <span className="text-[10px] text-slate-400 font-semibold">{review.fecha}</span>
                        </div>

                        {/* Comentario */}
                        <p className="text-slate-600 text-sm font-medium leading-relaxed flex-1">
                           "{review.comentario}"
                        </p>

                        {/* Footer: avatar + nombre + agencia */}
                        <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                           <img
                              src={review.avatar}
                              alt={review.nombre}
                              className="w-10 h-10 rounded-full object-cover border-2 border-amber-100"
                           />
                           <div>
                              <p className="font-black text-brand-dark text-sm leading-tight">{review.nombre}</p>
                              <p className="text-[10px] text-brand-teal font-black uppercase tracking-wide">
                                 vía {review.agencia}
                              </p>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── TAMBIÉN TE RECOMENDAMOS ── */}
         <section className="py-16 border-t border-amber-100 bg-white">
            <div className="max-w-7xl mx-auto px-5 md:px-8">
               <div className="flex items-center gap-4 mb-10">
                  <Compass className="w-5 h-5 text-amber-500" />
                  <h2 className="text-2xl font-black text-brand-dark tracking-tight">También podría interesarte</h2>
                  <div className="flex-1 h-px bg-amber-100"></div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {TOURS.filter(t => t.id !== tour.id).slice(0, 4).map(t => (
                     <Link to={`/paquetes/${t.id}`} key={t.id} className="group block">
                        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-teal/20 transition-all">
                           <OptimizedImage
                              src={t.image}
                              alt={t.title}
                              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                              containerClassName="w-full h-44 overflow-hidden"
                           />
                           <div className="p-4">
                              <div className="flex items-center gap-1 mb-1">
                                 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                 <span className="text-[10px] font-black text-slate-500">{t.rating}</span>
                              </div>
                              <h3 className="text-sm font-black text-brand-dark group-hover:text-brand-teal transition-colors line-clamp-2">{t.title}</h3>
                              <p className="text-[10px] text-slate-400 font-semibold mt-1 flex items-center gap-1">
                                 <MapPin className="w-2.5 h-2.5" /> {t.location}
                              </p>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>

         {/* ── SHARE MODAL ── */}
         <AnimatePresence>
            {showShareModal && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setShowShareModal(false)}
                     className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.92, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.92, y: 20 }}
                     className="relative w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl"
                  >
                     <h3 className="text-xl font-black text-brand-dark mb-6 tracking-tight">Compartir destino</h3>
                     <div className="space-y-3">
                        <button
                           onClick={handleCopy}
                           className="w-full flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl hover:border-brand-teal transition-all"
                        >
                           <div className="w-9 h-9 bg-brand-dark rounded-lg flex items-center justify-center text-white text-sm">🔗</div>
                           <span className="font-black text-sm text-brand-dark">{copied ? '¡Enlace copiado!' : 'Copiar enlace'}</span>
                        </button>
                        <a
                           href={`https://wa.me/?text=${encodeURIComponent(`Mira este destino: ${tour?.title} - ${window.location.href}`)}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-full flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl hover:border-green-400 transition-all"
                        >
                           <div className="w-9 h-9 bg-[#25D366] rounded-lg flex items-center justify-center">
                              <MessageCircle className="w-5 h-5 text-white" />
                           </div>
                           <span className="font-black text-sm text-brand-dark">WhatsApp</span>
                        </a>
                     </div>
                     <button
                        onClick={() => setShowShareModal(false)}
                        className="w-full mt-6 py-3 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-brand-dark transition-colors"
                     >
                        Cerrar
                     </button>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

      </div>
   );
};

export default TourDetailsPage;
