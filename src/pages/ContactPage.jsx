import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Globe, Send, Search } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Contact Hero */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/merida.png" alt="Contact Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 text-center px-6">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
           >
             Contáctanos
           </motion.h1>
           <p className="text-xl text-white/70 italic font-medium">Estamos listos para hacer realidad tu próximo viaje. ¡Escríbenos!</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="flex flex-col lg:flex-row gap-24 items-start">
            
            {/* Contact Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
            >
               <div className="mb-12">
                  <h2 className="text-3xl font-black text-brand-dark mb-4 flex items-center gap-4">
                    <Mail className="w-8 h-8 text-brand-teal" /> Envíanos un mensaje
                  </h2>
                  <div className="w-16 h-1 bg-brand-teal rounded-full"></div>
               </div>

               <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase text-brand-teal tracking-widest ml-1">Nombre Completo</label>
                        <input type="text" placeholder="Ej. Juan Pérez" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all font-semibold italic shadow-sm" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase text-brand-teal tracking-widest ml-1">Correo Electrónico</label>
                        <input type="email" placeholder="juan@ejemplo.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all font-semibold italic shadow-sm" />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[11px] font-black uppercase text-brand-teal tracking-widest ml-1">Asunto</label>
                     <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all font-semibold italic shadow-sm">
                        <option>Información de Tours</option>
                        <option>Reserva de Fecha</option>
                        <option>Presupuesto Corporativo</option>
                        <option>Otro</option>
                     </select>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[11px] font-black uppercase text-brand-teal tracking-widest ml-1">Mensaje</label>
                     <textarea rows="5" placeholder="¿En qué podemos ayudarte?" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-8 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all font-semibold italic shadow-sm resize-none"></textarea>
                  </div>

                  <button className="w-full bg-brand-teal text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:translate-y-[-4px] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-teal-500/20 active:scale-95 group">
                     Enviar Mensaje <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
               </form>
            </motion.div>

            {/* Office Info Side */}
            <aside className="lg:w-1/3 space-y-16">
               <div className="space-y-12">
                  <h2 className="text-3xl font-black text-brand-dark mb-4">Nuestra Oficina</h2>
                  
                  {[
                    { icon: <MapPin />, t: 'Ubicación', v: 'Av. Francisco de Miranda, Edif. Parque Cristal, Caracas 1060, Venezuela.', c: 'bg-teal-50 text-brand-teal' },
                    { icon: <Phone />, t: 'Teléfonos', v: '+58 (412) 339-7066 \n +58 (414) 123-4567', c: 'bg-orange-50 text-orange-500' },
                    { icon: <Clock />, t: 'Horario de Atención', v: 'Lun - Vie: 8:00 AM - 6:00 PM \n Sáb: 9:00 AM - 2:00 PM', c: 'bg-indigo-50 text-indigo-500' }
                  ].map(item => (
                    <div key={item.t} className="flex gap-8 group">
                       <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${item.c}`}>
                          {item.icon}
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-brand-dark mb-2 tracking-tight">{item.t}</h4>
                          <p className="text-slate-500 font-semibold italic whitespace-pre-line leading-relaxed">
                             {item.v}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-16 border-t border-slate-200">
                  <h3 className="text-xl font-black text-brand-dark mb-8 uppercase tracking-widest">Síguenos en Redes</h3>
                  <div className="flex gap-6">
                    {[
                      { icon: <Globe />, href: '#' },
                      { icon: <Instagram />, href: '#' },
                      { icon: <Facebook />, href: '#' }
                    ].map((s, i) => (
                      <a key={i} href={s.href} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-xl shadow-slate-200/50 hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all hover:-translate-y-1">
                         {s.icon}
                      </a>
                    ))}
                  </div>
               </div>
            </aside>
         </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-40 max-w-7xl mx-auto">
         <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="w-full h-[500px] rounded-[4rem] overflow-hidden shadow-3xl shadow-slate-200 relative border border-slate-100"
         >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.155422849491!2d-66.8504486!3d10.4883445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a58fe3b15f5f5%3A0x19a86e9e4d588da6!2sEdificio%20Parque%20Cristal!5e0!3m2!1ses!2sve!4v1710719600000!5m2!1ses!2sve" 
              className="w-full h-full border-0 grayscale saturate-50 hover:grayscale-0 transition-all duration-700"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
         </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
