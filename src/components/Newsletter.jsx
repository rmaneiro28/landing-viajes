import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-24 px-6 bg-[#0a141a]">
      <div className="max-w-4xl mx-auto text-center">
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight"
         >
           ¿Listo para la aventura?
         </motion.h2>
         
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-slate-400 font-medium text-lg mb-12 max-w-xl mx-auto"
         >
           Suscríbete para recibir ofertas exclusivas y guías de viaje.
         </motion.p>
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="flex flex-col gap-4 max-w-md mx-auto"
         >
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="w-full bg-[#1c2a33] border border-slate-700 rounded-2xl py-5 px-8 text-white font-semibold placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all"
            />
            <button className="w-full bg-brand-teal text-brand-dark py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-teal-400 transition-all shadow-2xl shadow-teal-500/20 active:scale-95">
               Suscribirme Ahora
            </button>
         </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
