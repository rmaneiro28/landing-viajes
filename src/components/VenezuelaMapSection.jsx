import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { geoPath, geoMercator } from 'd3-geo';
import { TOURS } from '../data/tours';

const PINS_DATA = [
  { id: 'canaima-salto-angel',      coords: [-62.5333, 5.9666],  color: '#10b981' },
  { id: 'los-roques-paraiso',       coords: [-66.7500, 11.8500], color: '#06b6d4', offshore: true },
  { id: 'cumbres-de-merida',        coords: [-71.0500, 8.5333],  color: '#f59e0b' },
  { id: 'misterios-gran-sabana',    coords: [-60.7333, 5.1833],  color: '#10b981' },
  { id: 'morrocoy-cayos-exclusive', coords: [-68.2500, 10.8333], color: '#06b6d4' },
  { id: 'coro-dunas-patrimonio',    coords: [-69.6666, 11.4166], color: '#f59e0b' },
  { id: 'la-tortuga-expedition',    coords: [-65.3166, 10.9333], color: '#06b6d4', offshore: true },
  { id: 'mochima-bahia-lujo',       coords: [-64.5000, 10.3333], color: '#06b6d4' },
  { id: 'margarita-perla-caribe',   coords: [-63.9113, 10.9971], color: '#06b6d4', offshore: true },
];

const VenezuelaMapSection = () => {
  const [activePin, setActivePin] = useState(null);
  const [floatingPin, setFloatingPin] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const unshownPins = useRef([]);

  useEffect(() => {
    fetch('/venezuela.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading geojson", err));
  }, []);

  const { pathGenerator, projectedPins } = useMemo(() => {
    if (!geoData) return { pathGenerator: null, projectedPins: [] };
    
    // fitExtent baja el mapa dejando padding arriba para que no se corten las burbujas
    const projection = geoMercator().fitExtent([[40, 110], [860, 600]], geoData);
    const pathGen = geoPath().projection(projection);
    
    const pins = PINS_DATA.map(pin => {
      const [x, y] = projection(pin.coords);
      return { ...pin, x, y };
    });

    return { pathGenerator: pathGen, projectedPins: pins };
  }, [geoData]);

  // Floating Minifotos logic sin repetir hasta que pasen todas
  useEffect(() => {
    if (!projectedPins || projectedPins.length === 0) return;
    
    const interval = setInterval(() => {
      if (activePin) return; // Pausar si el usuario está interactuando
      
      // Si ya mostramos todas, recargamos la lista y la barajamos
      if (unshownPins.current.length === 0) {
        unshownPins.current = [...projectedPins].sort(() => Math.random() - 0.5);
      }
      
      const nextPin = unshownPins.current.pop();
      setFloatingPin(nextPin.id);
      
      // Ocultar la foto después de 2.8 segundos (intervalo total de 3.5s)
      setTimeout(() => setFloatingPin(null), 2800);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [projectedPins, activePin]);

  const activeTour = activePin ? TOURS.find(t => t.id === activePin) : null;
  const activePinData = activePin ? PINS_DATA.find(p => p.id === activePin) : null;

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0ed3cf" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand-teal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-teal font-black uppercase tracking-[0.28em] text-[10px] mb-4 block">
            Directorio interactivo
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-tight mb-5">
            Explora Venezuela <br className="hidden md:block"/>
            <span className="text-brand-teal">destino a destino</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto font-medium text-base">
            Haz clic en cualquier marcador para ver las agencias disponibles y experiencias únicas en ese destino.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="relative w-full lg:w-[65%] min-h-[400px]">
            {geoData && pathGenerator ? (
              <svg
                viewBox="0 0 900 640"
                className="w-full drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 40px rgba(14,211,207,0.08))' }}
              >
                <defs>
                  <linearGradient id="venGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a3a35" />
                    <stop offset="100%" stopColor="#0f2420" />
                  </linearGradient>
                  <filter id="pinGlow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                  <clipPath id="circle-clip" clipPathUnits="objectBoundingBox">
                    <circle cx="0.5" cy="0.5" r="0.5" />
                  </clipPath>
                </defs>

                <path
                  d={pathGenerator(geoData)}
                  fill="url(#venGrad)"
                  stroke="#0ed3cf"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  className="transition-all duration-1000"
                />

                <text
                  x="450"
                  y="320"
                  textAnchor="middle"
                  fill="#0ed3cf"
                  fillOpacity="0.08"
                  fontSize="80"
                  fontWeight="900"
                  fontStyle="italic"
                  letterSpacing="-3"
                  className="pointer-events-none"
                >
                  VENEZUELA
                </text>

                <text x="450" y="80" textAnchor="middle" fill="#06b6d4" fillOpacity="0.4" fontSize="14" fontWeight="700" fontStyle="italic" className="pointer-events-none">MAR CARIBE</text>

                {projectedPins.map((pin) => {
                  const tour = TOURS.find(t => t.id === pin.id);
                  if (!tour) return null;
                  const isActive = activePin === pin.id;

                  return (
                    <g key={pin.id}>
                      {/* Interactive Pin */}
                      <g onClick={() => setActivePin(isActive ? null : pin.id)} style={{ cursor: 'pointer' }}>
                        {pin.offshore && (
                          <line
                            x1={pin.x}
                            y1={pin.y + 14}
                            x2={pin.x}
                            y2={pin.y + 35}
                            stroke={pin.color}
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                            strokeOpacity="0.5"
                          />
                        )}

                        <circle cx={pin.x} cy={pin.y} r={isActive ? 22 : 16} fill={pin.color} fillOpacity={isActive ? 0.15 : 0.08}>
                          <animate attributeName="r" values={`${isActive ? 22 : 14};${isActive ? 30 : 20};${isActive ? 22 : 14}`} dur="2.5s" repeatCount="indefinite"/>
                          <animate attributeName="fill-opacity" values="0.15;0.04;0.15" dur="2.5s" repeatCount="indefinite"/>
                        </circle>

                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r={isActive ? 9 : 7}
                          fill={isActive ? pin.color : '#0f2420'}
                          stroke={pin.color}
                          strokeWidth={isActive ? 2.5 : 1.5}
                          filter="url(#pinGlow)"
                          style={{ transition: 'all 0.2s ease' }}
                        />

                        <circle cx={pin.x} cy={pin.y} r={isActive ? 4 : 3} fill={pin.color} />

                        <text
                          x={pin.x}
                          y={pin.y - 14}
                          textAnchor="middle"
                          fill="white"
                          fillOpacity={isActive ? 1 : 0.65}
                          fontSize={isActive ? "13" : "11"}
                          fontWeight="700"
                          letterSpacing="0.5"
                          style={{ transition: 'all 0.2s ease', pointerEvents: 'none' }}
                          filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.8))"
                        >
                          {tour.region}
                        </text>
                      </g>

                      {/* Random Floating Mini Photo */}
                      <AnimatePresence>
                        {floatingPin === pin.id && !activePin && (
                          <motion.g
                            initial={{ opacity: 0, y: 15, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.5 }}
                            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                            className="pointer-events-none"
                          >
                            <circle cx={pin.x} cy={pin.y - 55} r="33" fill="#0f2420" stroke={pin.color} strokeWidth="3" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.5))" />
                            <image 
                              href={tour.image} 
                              x={pin.x - 30} 
                              y={pin.y - 85} 
                              width="60" 
                              height="60" 
                              clipPath="url(#circle-clip)" 
                              preserveAspectRatio="xMidYMid slice"
                            />
                            {/* Line connecting the bubble to the pin */}
                            <path 
                              d={`M ${pin.x} ${pin.y - 22} L ${pin.x} ${pin.y - 10}`} 
                              stroke={pin.color} 
                              strokeWidth="2" 
                              strokeDasharray="2 2"
                            />
                          </motion.g>
                        )}
                      </AnimatePresence>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[35%]">
            <AnimatePresence mode="wait">
              {activeTour ? (
                <motion.div
                  key={activeTour.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activeTour.image}
                      alt={activeTour.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"/>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-2 h-2 rounded-full shadow-md"
                          style={{ background: activePinData?.color }}
                        />
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/60">
                          {activeTour.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                        {activeTour.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400"/>
                        <span className="text-white font-black text-sm">{activeTour.rating}</span>
                        <span className="text-white/30 text-xs">· 120 reseñas</span>
                      </div>
                      <span className="px-3 py-1 bg-brand-teal/15 text-brand-teal text-[10px] font-black uppercase tracking-wider rounded-full border border-brand-teal/20">
                        {activeTour.tag || activeTour.category}
                      </span>
                    </div>

                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                      {activeTour.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeTour.activities.map(act => (
                        <span key={act} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/50 font-semibold">
                          {act}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/paquetes/${activeTour.id}`}
                      className="flex items-center justify-between w-full bg-brand-teal text-white px-5 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs hover:bg-teal-400 transition-all group"
                    >
                      Ver agencias disponibles
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-6 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    <MapPin className="w-7 h-7 text-brand-teal/50"/>
                  </div>
                  <div>
                    <p className="text-white/40 font-black uppercase tracking-wider text-xs mb-2">
                      {PINS_DATA.length} destinos disponibles
                    </p>
                    <p className="text-white/20 text-sm font-medium">
                      Haz clic en un marcador del mapa para explorar ese destino
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2 mt-2">
                    {TOURS.slice(0, 8).map((t, index) => {
                       const pin = PINS_DATA.find(p => p.id === t.id);
                       if(!pin) return null;
                       return (
                         <button
                           key={t.id}
                           onClick={() => setActivePin(t.id)}
                           className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 transition-all text-left"
                         >
                           <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: pin.color }}/>
                           <span className="text-white/60 text-[11px] font-black truncate">{t.region}</span>
                         </button>
                       )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenezuelaMapSection;
