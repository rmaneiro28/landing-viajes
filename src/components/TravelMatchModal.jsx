import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Compass, Users, Wallet, ArrowRight, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOURS } from '../data/tours';

const QUESTIONS = [
  {
    id: 'vibe',
    title: '¿Qué vibra buscas en este viaje?',
    icon: <Compass className="w-5 h-5 text-amber-500" />,
    options: [
      { label: 'Playa y Relax', value: 'playa' },
      { label: 'Aventura Extrema', value: 'aventura' },
      { label: 'Naturaleza y Eco', value: 'naturaleza' },
      { label: 'Cultura e Historia', value: 'cultura' },
    ]
  },
  {
    id: 'companion',
    title: '¿Con quién viajas?',
    icon: <Users className="w-5 h-5 text-brand-teal" />,
    options: [
      { label: 'Viajo solo/a', value: 'solo' },
      { label: 'En pareja (Romance)', value: 'pareja' },
      { label: 'En familia (Niños)', value: 'familia' },
      { label: 'Con amigos', value: 'amigos' },
    ]
  },
  {
    id: 'budget',
    title: '¿Cuál es tu presupuesto por persona?',
    icon: <Wallet className="w-5 h-5 text-emerald-500" />,
    options: [
      { label: 'Económico (Bajo $300)', value: 'low' },
      { label: 'Moderado ($300 - $700)', value: 'mid' },
      { label: 'Premium / Lujo (Más de $700)', value: 'high' },
    ]
  }
];

// Lógica simple de scoring
const calculateMatch = (answers) => {
  let scores = TOURS.map(t => ({ tour: t, score: 0 }));

  scores.forEach(s => {
    const id = s.tour.id;

    // --- Scoring por Vibra ---
    if (answers.vibe === 'playa') {
      if (['los-roques-paraiso', 'la-tortuga-expedition'].includes(id)) s.score += 40;
      if (['morrocoy-cayos-exclusive', 'mochima-bahia-lujo'].includes(id)) s.score += 30;
    } else if (answers.vibe === 'aventura') {
      if (['misterios-gran-sabana', 'cumbres-de-merida'].includes(id)) s.score += 40;
      if (id === 'canaima-salto-angel') s.score += 25;
    } else if (answers.vibe === 'naturaleza') {
      if (['misterios-gran-sabana', 'cumbres-de-merida'].includes(id)) s.score += 40;
      if (id === 'canaima-salto-angel') s.score += 30;
    } else if (answers.vibe === 'cultura') {
      if (['coro-dunas-patrimonio'].includes(id)) s.score += 45;
      if (id === 'cumbres-de-merida') s.score += 35;
    }

    // --- Scoring por Compañía ---
    if (answers.companion === 'pareja') {
      if (['los-roques-paraiso', 'cumbres-de-merida'].includes(id)) s.score += 30;
      else if (id === 'canaima-salto-angel') s.score += 20;
      else s.score += 15;
    } else if (answers.companion === 'familia') {
      if (['morrocoy-cayos-exclusive', 'mochima-bahia-lujo', 'coro-dunas-patrimonio', 'cumbres-de-merida'].includes(id)) s.score += 30;
    } else if (answers.companion === 'amigos') {
      if (['la-tortuga-expedition', 'misterios-gran-sabana', 'mochima-bahia-lujo'].includes(id)) s.score += 35;
      else s.score += 15;
    } else if (answers.companion === 'solo') {
      if (['misterios-gran-sabana', 'cumbres-de-merida'].includes(id)) s.score += 30;
      else s.score += 15;
    }

    // --- Scoring por Presupuesto ---
    if (answers.budget === 'high') {
      if (['los-roques-paraiso', 'canaima-salto-angel'].includes(id)) s.score += 35;
      else s.score += 10;
    } else if (answers.budget === 'mid') {
      if (['la-tortuga-expedition', 'misterios-gran-sabana', 'morrocoy-cayos-exclusive'].includes(id)) s.score += 35;
      else s.score += 15;
    } else if (answers.budget === 'low') {
      if (['mochima-bahia-lujo', 'coro-dunas-patrimonio', 'cumbres-de-merida'].includes(id)) s.score += 35;
    }

    // Añadir un factor fuerte de suerte (aleatoriedad) entre 0 y 20 puntos adicionales
    s.score = Math.min(99, Math.max(70, s.score + Math.floor(Math.random() * 20)));
  });

  // Ordenar de mayor a menor score
  scores.sort((a, b) => b.score - a.score);
  
  // Devolvemos el top 3 para mostrar alternativas
  return scores.slice(0, 3);
};

const DESTINATION_COORDS = {
  'canaima-salto-angel': { lat: 5.9666, lon: -62.5333 },
  'los-roques-paraiso': { lat: 11.8500, lon: -66.7500 },
  'cumbres-de-merida': { lat: 8.5333, lon: -71.0500 },
  'misterios-gran-sabana': { lat: 5.1833, lon: -60.7333 },
  'morrocoy-cayos-exclusive': { lat: 10.8333, lon: -68.2500 },
  'coro-dunas-patrimonio': { lat: 11.4166, lon: -69.6666 },
  'la-tortuga-expedition': { lat: 10.9333, lon: -65.3166 },
  'mochima-bahia-lujo': { lat: 10.3333, lon: -64.5000 },
};

const TravelMatchModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchResult, setMatchResult] = useState(null); // Ahora será un array de 3
  const [visitorInfo, setVisitorInfo] = useState({ loading: true, city: '', temp: null, error: false });
  const [destWeather, setDestWeather] = useState(null);

  useEffect(() => {
    if (isOpen && visitorInfo.loading && !visitorInfo.city) {
      const getVisitorData = async () => {
        try {
          const ipRes = await fetch('https://ipapi.co/json/');
          const ipData = await ipRes.json();
          if (ipData.error || !ipData.latitude) throw new Error('Location not found');
          
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ipData.latitude}&longitude=${ipData.longitude}&current_weather=true`);
          const weatherData = await weatherRes.json();
          
          setVisitorInfo({
            loading: false,
            city: ipData.city || ipData.region,
            temp: weatherData.current_weather?.temperature,
            error: false
          });
        } catch (err) {
          console.error("Error fetching visitor data:", err);
          setVisitorInfo({ loading: false, city: '', temp: null, error: true });
        }
      };
      
      getVisitorData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setAnswers({});
        setMatchResult(null);
        setDestWeather(null);
      }, 300);
    }
  }, [isOpen]);

  const handleAnswer = async (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length) {
      setStep(prev => prev + 1);
    } else {
      setStep(4);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const results = calculateMatch(newAnswers);
      setMatchResult(results);

      try {
        const coords = DESTINATION_COORDS[results[0].tour.id];
        if (coords) {
          const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`);
          const wData = await wRes.json();
          setDestWeather(wData.current_weather?.temperature);
        }
      } catch (e) {
        console.error("Error fetching destination weather:", e);
      }

      setStep(5);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10 custom-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {step > 0 && step <= QUESTIONS.length && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
              <motion.div
                className="h-full bg-brand-teal"
                initial={{ width: 0 }}
                animate={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-amber-500" />
                  </div>
                  <h2 className="text-3xl font-black text-brand-dark tracking-tight mb-3">
                    Travel Match Inteligente
                  </h2>
                  
                  <div className="min-h-[40px] mb-4">
                    {!visitorInfo.loading && !visitorInfo.error && visitorInfo.city && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 text-brand-teal px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      >
                        📍 {visitorInfo.city} <span className="text-slate-300">|</span> 🌡️ {visitorInfo.temp}°C
                      </motion.p>
                    )}
                  </div>

                  <p className="text-slate-500 font-medium mb-8">
                    {!visitorInfo.loading && !visitorInfo.error && visitorInfo.temp >= 25 
                      ? `¡Hace calor en tu zona! ¿Buscando algo refrescante? Responde 3 preguntas y encontraremos el destino perfecto.`
                      : !visitorInfo.loading && !visitorInfo.error && visitorInfo.temp <= 20
                      ? `¿Buscando escapar del frío? Responde 3 preguntas y encontraremos un destino cálido ideal para ti.`
                      : !visitorInfo.loading && !visitorInfo.error && visitorInfo.temp > 20 && visitorInfo.temp < 25
                      ? `El clima está agradable en tu zona, ¡pero un viaje lo haría aún mejor! Responde 3 preguntas y descubre tu próximo destino.`
                      : `Responde 3 preguntas rápidas y nuestro algoritmo encontrará el destino perfecto en Venezuela para tu próximo viaje.`
                    }
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full bg-brand-dark hover:bg-brand-teal text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors"
                  >
                    Empezar el Test
                  </button>
                </motion.div>
              )}

              {step > 0 && step <= QUESTIONS.length && (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="py-4"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      {QUESTIONS[step - 1].icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                        Pregunta {step} de {QUESTIONS.length}
                      </span>
                      <h3 className="text-xl font-black text-brand-dark leading-tight">
                        {QUESTIONS[step - 1].title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {QUESTIONS[step - 1].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(QUESTIONS[step - 1].id, opt.value)}
                        className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-brand-teal hover:bg-teal-50 transition-all font-bold text-slate-600 hover:text-brand-dark group flex items-center justify-between"
                      >
                        {opt.label}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-teal" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center flex flex-col items-center justify-center"
                >
                  <div className="relative w-24 h-24 mb-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-brand-teal"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <HeartPulse className="w-8 h-8 text-brand-teal animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-brand-dark mb-2">Analizando opciones...</h3>
                  <p className="text-slate-500 font-medium">Conectando con satélites para revisar el clima...</p>
                </motion.div>
              )}

              {step === 5 && matchResult && matchResult.length > 0 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-2 text-center"
                >
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full mb-4 border border-emerald-100">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-wider">Tu Mejor Opción</span>
                  </div>

                  {/* MAIN MATCH */}
                  <div className="relative rounded-3xl overflow-hidden mb-4 group border border-slate-100 shadow-sm">
                    <img 
                      src={matchResult[0].tour.image} 
                      alt={matchResult[0].tour.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                    
                    <div className="absolute inset-0 p-5 flex flex-col justify-end text-left">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <span className="text-amber-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1 block">
                            {matchResult[0].tour.location}
                          </span>
                          <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
                            {matchResult[0].tour.title}
                          </h3>
                        </div>
                        <div className="shrink-0 text-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-2 min-w-[65px]">
                          <div className="text-lg font-black text-white">{matchResult[0].score}%</div>
                          <div className="text-[8px] font-black text-white/80 uppercase tracking-wider">Afín</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {destWeather !== null && (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 mb-4 flex items-center justify-between text-left">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5">Clima actual allá</p>
                        <p className="text-brand-dark font-medium text-xs">
                          Prepárate para <strong>{destWeather}°C</strong> en {matchResult[0].tour.title.split(',')[0]}.
                        </p>
                      </div>
                      <div className="text-2xl">
                        {destWeather > 26 ? '☀️' : destWeather > 20 ? '⛅' : '❄️'}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/paquetes/${matchResult[0].tour.id}`}
                    onClick={onClose}
                    className="w-full bg-brand-teal hover:bg-teal-400 text-white py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mb-6"
                  >
                    Ver detalles del destino principal <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* ALTERNATIVES */}
                  <div className="text-left">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 border-t border-slate-100 pt-4">
                      Otras excelentes opciones para ti
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {matchResult.slice(1, 3).map((alt, idx) => (
                        <Link
                          key={idx}
                          to={`/paquetes/${alt.tour.id}`}
                          onClick={onClose}
                          className="flex flex-col bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl p-3 transition-colors text-left group"
                        >
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-1 flex justify-between items-center">
                            {alt.tour.region}
                            <span className="text-slate-400">{alt.score}% afín</span>
                          </span>
                          <h4 className="font-black text-brand-dark text-xs leading-tight mb-2 group-hover:text-brand-teal transition-colors line-clamp-1">
                            {alt.tour.title}
                          </h4>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-auto">
                            Ver más <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => { setStep(1); setAnswers({}); setDestWeather(null); }}
                    className="mt-6 text-[10px] font-bold text-slate-400 hover:text-slate-600 underline uppercase tracking-wider"
                  >
                    Volver a hacer el test
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TravelMatchModal;
