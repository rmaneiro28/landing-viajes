import React from 'react';
import { ShieldCheck, Leaf, Users, Headphones, Plane, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-brand-teal" />,
    title: 'Seguridad Primero',
    desc: 'Protocolos de seguridad y guías certificados en todas las rutas.'
  },
  {
    icon: <Leaf className="w-10 h-10 text-brand-teal" />,
    title: 'Turismo Consciente',
    desc: 'Mínimo impacto ambiental y apoyo a comunidades locales.'
  },
  {
    icon: <Users className="w-10 h-10 text-brand-teal" />,
    title: 'Expertos Locales',
    desc: 'Guías que conocen cada rincón y secreto de la tierra.'
  },
  {
    icon: <Headphones className="w-10 h-10 text-brand-teal" />,
    title: 'Soporte 24/7',
    desc: 'Acompañamiento personalizado antes y durante su viaje.'
  }
];

const WhyUs = () => {
  return (
    <section id="nosotros" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
       {/* Background graphic */}
       <div className="absolute top-0 right-0 p-20 opacity-5">
          <Plane className="w-96 h-96 -rotate-45" />
       </div>

       <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-[56px] font-black text-brand-dark leading-tight mb-8 tracking-tight">
               ¿Por qué <span className="text-brand-teal italic">elegirnos?</span>
             </h2>
             <div className="w-24 h-1.5 bg-brand-teal rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-100 hover:-translate-y-2 transition-transform duration-500 border border-slate-50 group flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center mb-8 group-hover:bg-brand-teal transition-colors duration-500">
                   <div className="group-hover:text-white group-hover:scale-110 transition-all duration-500">
                     {reason.icon}
                   </div>
                </div>
                <h3 className="text-2xl font-black text-brand-dark mb-4">{reason.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed italic">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
       </div>
    </section>
  );
};

export default WhyUs;
