import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, ShieldCheck, Leaf, Users, Headphones, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Años Exp.', value: '15+' },
  { label: 'Rutas Únicas', value: '200+' },
  { label: 'Viajeros Felices', value: '10k+' }
];

const values = [
  {
    icon: <Target className="w-8 h-8 text-brand-teal" />,
    title: 'Nuestra Misión',
    desc: 'Facilitar experiencias de viaje transformadoras que promuevan la conservación del patrimonio natural de Venezuela y el desarrollo sostenible de sus comunidades.'
  },
  {
    icon: <Eye className="w-8 h-8 text-brand-teal" />,
    title: 'Nuestra Visión',
    desc: 'Ser reconocidos globalmente como el puente principal hacia la magia natural de Venezuela, liderando el camino en turismo responsable y ecológico.'
  },
  {
    icon: <Heart className="w-8 h-8 text-brand-teal" />,
    title: 'Valores',
    desc: 'Integridad, pasión por la naturaleza, compromiso social y excelencia en el servicio son los pilares que sostienen cada una de nuestras expediciones.'
  }
];

const guides = [
  { name: 'Ana García', role: 'Especialista en Selva', image: '/guide1.png' },
  { name: 'Carlos Ruiz', role: 'Guía de Alta Montaña', image: '/guide2.png' },
  { name: 'Elena Méndez', role: 'Especialista en Costas', image: '/guide3.png' },
  { name: 'Luis Vargas', role: 'Fotógrafo de Expedición', image: '/guide1.png' } // Reused due to quota
];

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* About Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/gran_sabana.png" alt="About Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
           >
             Nuestra Pasión por <br /> <span className="text-brand-teal italic">Venezuela</span>
           </motion.h1>
           <p className="text-xl text-white/80 font-medium italic">
             Conectando al mundo con la belleza indómita del Amazonas, los Tepuyes y el Caribe.
           </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
               <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl shadow-slate-200">
                  <img src="/canaima.png" alt="Our Story" className="w-full h-full object-cover" />
               </div>
               {/* Stats Floating */}
               <div className="absolute -bottom-12 -right-12 bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 grid grid-cols-1 gap-8 min-w-[200px]">
                  {stats.map(s => (
                    <div key={s.label}>
                       <p className="text-4xl font-black text-brand-teal mb-1 italic">{s.value}</p>
                       <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{s.label}</p>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="space-y-8">
               <span className="text-brand-teal font-black uppercase tracking-[0.2em] text-[11px] block animate-bounce-horizontal">Nuestra Historia</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight">Desde el corazón de <br /> <span className="text-brand-teal italic">los Tepuyes</span></h2>
               <div className="space-y-6 text-slate-500 font-semibold text-lg italic leading-relaxed">
                  <p>
                    Jandy Tours nació hace más de una década con un sueño simple: mostrar al mundo el tesoro escondido que es Venezuela. Comenzamos como un pequeño grupo de exploradores apasionados por la Gran Sabana y hoy nos hemos convertido en la agencia referente de ecoturismo en la región.
                  </p>
                  <p>
                    Creemos que viajar no es solo ver paisajes, sino transformarse a través del contacto directo con la tierra y las comunidades locales. Cada tour que diseñamos es un compromiso con la conservación y el respeto por nuestra biodiversidad.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Mission Vision Values Cards */}
      <section className="py-32 bg-slate-50 px-6">
         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[4rem] shadow-xl shadow-slate-200/50 border border-slate-100/50"
              >
                 <div className="w-16 h-16 rounded-3xl bg-teal-50 flex items-center justify-center mb-10">
                    {v.icon}
                 </div>
                 <h3 className="text-2xl font-black text-brand-dark mb-6">{v.title}</h3>
                 <p className="text-slate-500 font-semibold italic leading-relaxed">
                   {v.desc}
                 </p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Why Us Section Reuse */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
         <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-24">¿Por qué elegirnos?</h2>
         <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, t: 'Seguridad' },
              { icon: <Leaf className="w-8 h-8" />, t: 'Ecológico' },
              { icon: <Users className="w-8 h-8" />, t: 'Guías Expertos' },
              { icon: <Headphones className="w-8 h-8" />, t: 'Soporte 24/7' }
            ].map(item => (
              <div key={item.t} className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-brand-teal flex items-center justify-center text-white mb-6 shadow-xl shadow-teal-500/20">
                    {item.icon}
                 </div>
                 <h4 className="text-lg font-black text-brand-dark">{item.t}</h4>
              </div>
            ))}
         </div>
      </section>

      {/* Our Guides Grid */}
      <section className="py-32 px-6 bg-brand-dark overflow-hidden relative">
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
               <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Nuestros Guías</h2>
                  <p className="text-white/50 text-xl italic font-medium">El alma de Jandy Tours. Personas apasionadas que <br /> dedican su vida a compartir la belleza de nuestra tierra.</p>
               </div>
               <button className="bg-white text-brand-dark px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-brand-teal hover:text-white transition-all shadow-xl shadow-black/20">
                  Conoce al equipo completo
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               {guides.map((g, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="group relative h-[450px] rounded-[3rem] overflow-hidden"
                 >
                    <img src={g.image} alt={g.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10">
                       <h4 className="text-2xl font-black text-white mb-1 tracking-tight">{g.name}</h4>
                       <span className="text-brand-teal font-black uppercase tracking-widest text-[10px] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          {g.role}
                       </span>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-40 px-6 text-center max-w-4xl mx-auto">
         <h2 className="text-4xl md:text-6xl font-black text-brand-dark mb-10 leading-tight">¿Listo para tu próxima aventura?</h2>
         <p className="text-xl text-slate-500 font-semibold italic mb-16 leading-relaxed">Únete a nosotros y descubre por qué Venezuela es el paraíso mejor guardado del mundo.</p>
         <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-brand-teal text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-sm hover:scale-95 transition-all shadow-2xl shadow-teal-500/20">Ver Tours Disponibles</button>
            <button className="bg-brand-dark text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-sm hover:scale-95 transition-all shadow-2xl shadow-black/20">Contáctanos</button>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;
