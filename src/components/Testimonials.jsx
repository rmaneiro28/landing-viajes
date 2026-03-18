import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Anna Martinez',
    role: 'AVENTURA LOVER',
    quote: 'La mejor experiencia de mi vida. Jandy Tours cuidó cada detalle del viaje al Salto Ángel. Altamente recomendados.',
    image: 'https://i.pravatar.cc/150?u=anna'
  },
  {
    name: 'Carlos Ruiz',
    role: 'LUXURY TRAVELER',
    quote: 'Increíble logística y guías muy preparados. Canaima es un lugar mágico y lo vivimos al máximo.',
    image: 'https://i.pravatar.cc/150?u=carlos'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-black text-brand-dark leading-tight mb-4 tracking-tight">
            Lo que dicen nuestros viajeros
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((test, i) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-teal p-0.5">
                  <img src={test.image} alt={test.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="text-left">
                  <h4 className="text-brand-dark font-black text-xl leading-none">{test.name}</h4>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#0ed3cf] text-[#0ed3cf]" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-slate-500 font-medium text-lg leading-relaxed italic">
                "{test.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
