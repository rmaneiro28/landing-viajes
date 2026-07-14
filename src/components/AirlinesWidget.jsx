import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Calendar, Clock, ArrowUpRight, MapPin, AlertCircle, Compass } from 'lucide-react';
import { TOURS } from '../data/tours';

// Mapeo detallado de destinos a aerolíneas que vuelan allí
export const AIRLINE_MAPPINGS = {
  'canaima-salto-angel': [
    { name: 'Conviasa', logoText: 'V0', freq: 'Jueves y Domingos', duration: '1h 00m', type: 'Comercial Regular', url: 'https://www.conviasa.aero' },
    { name: 'Rutaca Airlines', logoText: 'RU', freq: 'Jueves y Domingos', duration: '1h 05m', type: 'Chárter Especial', url: 'https://www.flyrutaca.com' },
    { name: 'Sasca Airlines', logoText: 'SS', freq: 'Bajo Demanda / Diarios', duration: '50m', type: 'Chárter Privado', url: 'https://www.sascaairlines.com' }
  ],
  'los-roques-paraiso': [
    { name: 'Conviasa', logoText: 'V0', freq: 'Diarios (Mañana/Tarde)', duration: '35m', type: 'Comercial Regular', url: 'https://www.conviasa.aero' },
    { name: 'Sasca Airlines', logoText: 'SS', freq: 'Diarios', duration: '30m', type: 'Comercial/Chárter', url: 'https://www.sascaairlines.com' },
    { name: 'Albatros Airlines', logoText: 'G2', freq: 'Viernes a Lunes', duration: '35m', type: 'Comercial Regular', url: 'https://albatrosair.com.ve' }
  ],
  'cumbres-de-merida': [
    { name: 'Laser Airlines', logoText: 'QL', freq: 'Diarios (Vía El Vigía)', duration: '1h 15m', type: 'Comercial Regular', url: 'https://www.laserairlines.com' },
    { name: 'Avior Airlines', logoText: '9V', freq: 'Lunes, Miércoles, Viernes (Vía El Vigía)', duration: '1h 15m', type: 'Comercial Regular', url: 'https://avior.com.ve' },
    { name: 'Conviasa', logoText: 'V0', freq: 'Jueves y Domingos (Directo Mérida)', duration: '1h 30m', type: 'Comercial Regular', url: 'https://www.conviasa.aero' }
  ],
  'misterios-gran-sabana': [
    { name: 'Conviasa', logoText: 'V0', freq: 'Sábados (Vía Santa Elena)', duration: '2h 15m', type: 'Comercial Regular', url: 'https://www.conviasa.aero' },
    { name: 'Rutaca Airlines', logoText: 'RU', freq: 'Viernes (Vía Puerto Ordaz + Terrestre)', duration: '1h 10m (+ traslado)', type: 'Comercial Regular', url: 'https://www.flyrutaca.com' }
  ],
  'morrocoy-cayos-exclusive': [
    { name: 'Conviasa', logoText: 'V0', freq: 'Viernes y Domingos (Vía Puerto Cabello)', duration: '40m', type: 'Comercial Regular', url: 'https://www.conviasa.aero' },
    { name: 'Turpial Airlines', logoText: 'T9', freq: 'Jueves a Domingos (Vía Valencia)', duration: '35m', type: 'Comercial Regular', url: 'https://www.turpialairlines.com' }
  ],
  'coro-dunas-patrimonio': [
    { name: 'Conviasa', logoText: 'V0', freq: 'Martes y Sábados', duration: '1h 10m', type: 'Comercial Regular', url: 'https://www.conviasa.aero' },
    { name: 'Rutaca Airlines', logoText: 'RU', freq: 'Lunes y Viernes', duration: '1h 15m', type: 'Comercial Regular', url: 'https://www.flyrutaca.com' }
  ],
  'la-tortuga-expedition': [
    { name: 'Sasca Airlines', logoText: 'SS', freq: 'Viernes a Domingo (Vuelos Chárter)', duration: '25m', type: 'Chárter Privado', url: 'https://www.sascaairlines.com' },
    { name: 'Servicios Charter VIP', logoText: 'VIP', freq: 'Bajo Solicitud (Helicóptero/Avioneta)', duration: '30m', type: 'Chárter Especial', url: '#' }
  ],
  'mochima-bahia-lujo': [
    { name: 'Laser Airlines', logoText: 'QL', freq: 'Diarios (Vía Barcelona)', duration: '45m', type: 'Comercial Regular', url: 'https://www.laserairlines.com' },
    { name: 'Avior Airlines', logoText: '9V', freq: 'Diarios (Vía Barcelona)', duration: '45m', type: 'Comercial Regular', url: 'https://avior.com.ve' },
    { name: 'Rutaca Airlines', logoText: 'RU', freq: 'Diarios (Vía Barcelona)', duration: '50m', type: 'Comercial Regular', url: 'https://www.flyrutaca.com' }
  ],
  'margarita-perla-caribe': [
    { name: 'Conviasa', logoText: 'V0', freq: 'Diarios (Múltiples Frecuencias)', duration: '45m', type: 'Comercial Regular', url: 'https://www.conviasa.aero' },
    { name: 'Laser Airlines', logoText: 'QL', freq: 'Diarios', duration: '45m', type: 'Comercial Regular', url: 'https://www.laserairlines.com' },
    { name: 'Avior Airlines', logoText: '9V', freq: 'Diarios', duration: '45m', type: 'Comercial Regular', url: 'https://avior.com.ve' },
    { name: 'Turpial Airlines', logoText: 'T9', freq: 'Miércoles, Viernes y Domingos', duration: '45m', type: 'Comercial Regular', url: 'https://www.turpialairlines.com' }
  ]
};

const AirlinesWidget = ({ favoriteTours = [] }) => {
  // Si no hay favoritos, usamos la lista de todos los tours disponibles
  const hasFavorites = favoriteTours.length > 0;
  const toursToUse = hasFavorites ? favoriteTours : TOURS;
  
  const [selectedTourId, setSelectedTourId] = useState('');

  // Sincronizar el tour seleccionado cuando cambian los favoritos
  useEffect(() => {
    if (toursToUse.length > 0) {
      setSelectedTourId(toursToUse[0].id);
    } else {
      setSelectedTourId('');
    }
  }, [favoriteTours, toursToUse]);

  const selectedTour = TOURS.find(t => t.id === selectedTourId) || toursToUse[0];
  const airlines = selectedTour ? (AIRLINE_MAPPINGS[selectedTour.id] || []) : [];

  if (!selectedTour) return null;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-200/40 mt-16">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-[10px] font-black uppercase tracking-[0.2em] mb-2 italic">
            <Plane className="w-3.5 h-3.5" />
            Conexiones Aéreas
          </div>
          <h2 className="text-3xl font-black text-brand-dark tracking-tight italic">
            ¿Cómo llegar a tu <span className="text-brand-teal">destino</span>?
          </h2>
          <p className="text-slate-400 font-medium text-sm mt-1">
            {hasFavorites 
              ? 'Aerolíneas con vuelos comerciales y chárteres hacia tus destinos guardados.' 
              : 'Explora las opciones de vuelo disponibles para planificar tu próxima aventura.'}
          </p>
        </div>

        {/* Destinos selector */}
        <div className="flex items-center gap-3 shrink-0">
          <label htmlFor="tour-select" className="text-xs font-black text-slate-500 uppercase tracking-wider">
            Destino:
          </label>
          <select
            id="tour-select"
            value={selectedTourId}
            onChange={(e) => setSelectedTourId(e.target.value)}
            className="bg-[#f8fafc] border border-slate-200 text-brand-dark px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider focus:outline-none focus:border-brand-teal transition-all cursor-pointer"
          >
            {toursToUse.map(tour => (
              <option key={tour.id} value={tour.id}>
                {tour.region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Info del Destino */}
        <div className="lg:col-span-4 bg-[#f8fafc] rounded-3xl p-6 border border-slate-50">
          <div className="relative h-44 rounded-2xl overflow-hidden mb-6 shadow-sm">
            <img 
              src={selectedTour.image} 
              alt={selectedTour.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] block">
                {selectedTour.region}
              </span>
              <h3 className="text-lg font-black text-white italic leading-tight">
                {selectedTour.title}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
              <MapPin className="w-4 h-4 text-brand-teal shrink-0" />
              <span>{selectedTour.location}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
              <Compass className="w-4 h-4 text-brand-teal shrink-0" />
              <span>Categoría: {selectedTour.category}</span>
            </div>
            
            <div className="bg-teal-50/50 border border-teal-100/50 rounded-2xl p-4 mt-6">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-black text-brand-dark uppercase tracking-wider">Nota de viaje</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">
                    Los tiempos de vuelo son referenciales saliendo desde el Aeropuerto de Maiquetía (CCS). Te recomendamos contactar directamente a la aerolínea para reconfirmar itinerarios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de Aerolíneas */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTourId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {airlines.length > 0 ? (
                airlines.map((airline, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Logo aerolínea simulado */}
                      <div className="w-12 h-12 bg-brand-dark text-brand-teal rounded-2xl flex items-center justify-center font-black tracking-widest text-sm shadow-inner shrink-0">
                        {airline.logoText}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-brand-dark text-base leading-tight">
                            {airline.name}
                          </h4>
                          <span className="bg-slate-50 border border-slate-100 text-slate-400 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                            {airline.type}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-2">
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-brand-teal" />
                            <span>{airline.freq}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                            <Clock className="w-3.5 h-3.5 text-brand-teal" />
                            <span>{airline.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <a 
                      href={airline.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-brand-teal text-brand-dark hover:bg-brand-dark hover:text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:shadow-brand-teal/10 shrink-0 self-start sm:self-auto"
                    >
                      Reservar <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-slate-100 bg-[#f8fafc] rounded-3xl">
                  <Plane className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-black text-brand-dark">Sin conexiones directas</p>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Este destino requiere principalmente transporte terrestre o acuático.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AirlinesWidget;
