import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOURS } from '../data/tours';
import OptimizedImage from './OptimizedImage';

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const suggestions = useMemo(() => {
    if (search.trim().length <= 1) return [];
    return TOURS.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.region.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const handleSearch = (term = search) => {
    if (!term.trim()) return;
    navigate(`/destinos?q=${term}`);
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-brand-dark text-white">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/salto_angel.png"
          alt="Salto Angel"
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-dark/35 via-transparent to-brand-dark/80" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
        <p className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-xs uppercase tracking-widest mb-4">Aventura premium en Venezuela</p>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">Explora el <span className="text-brand-teal">Salto Ángel</span></h1>
        <p className="text-base md:text-xl text-white/80 mb-8">Viajes personalizados con guías expertos en los destinos más impactantes de Venezuela.</p>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-3 md:p-4">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2 md:gap-3 items-end">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/70">Destino</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                placeholder="¿A dónde quieres ir?"
                className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              className="rounded-xl bg-brand-teal text-brand-dark font-black uppercase tracking-[0.12em] py-2 hover:bg-teal-300 transition"
            >
              Buscar <ArrowRight className="w-4 h-4 inline" />
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-2 rounded-xl bg-brand-dark/90 border border-white/10 p-2 text-left">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(s.title)}
                  className="w-full text-left px-2 py-1 text-sm hover:bg-white/10"
                >
                  {s.title} - {s.region}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
