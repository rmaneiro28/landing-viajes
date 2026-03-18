import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Send, Phone, Mail, MapPin } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué paquetes incluyen el Salto Ángel?',
    a: 'Nuestra expedición Canaima Premium incluye sobrevuelo al Salto Ángel, alojamiento frente a la laguna y tour guiado de 3 días / 2 noches.'
  },
  {
    q: '¿Cómo reservo mi viaje a Los Roques?',
    a: 'Puedes reservar directamente por nuestro WhatsApp o haciendo clic en "Reservar Ahora". Requerimos un 30% de adelanto para asegurar la habitación en la posada.'
  },
  {
    q: '¿Los recorridos incluyen seguro de viaje?',
    a: 'Sí, todas nuestras expediciones incluyen un seguro básico de accidentes y asistencia al viajero en todo el territorio nacional.'
  },
  {
    q: '¿Tienen paquetes para grupos grandes?',
    a: '¡Claro! Ofrecemos descuentos especiales para grupos de más de 8 personas y tours corporativos personalizados.'
  }
];

const ContactFAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
      
      {/* FAQ Left Column */}
      <div className="flex-1">
         <span className="text-brand-teal font-black uppercase tracking-[0.2em] text-[11px] mb-4 block">Preguntas Comunes</span>
         <h2 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight mb-12">
            Estamos aquí para <span className="text-brand-teal italic">ayudarte</span>
         </h2>
         
         <div className="space-y-4">
           {faqs.map((faq, i) => (
             <div key={i} className="border-b border-slate-100 last:border-0 pb-4">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="text-lg font-black text-brand-dark group-hover:text-brand-teal transition-colors">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center transition-all ${activeFaq === i ? 'bg-brand-teal border-brand-teal text-white rotate-180' : 'text-slate-400'}`}>
                    {activeFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-slate-500 font-medium italic text-lg leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ))}
         </div>
      </div>

      {/* Contact Right Column */}
      <div id="contacto" className="flex-1">
         <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
            <h3 className="text-3xl font-black text-brand-dark mb-4">Envíanos un mensaje</h3>
            <p className="text-slate-500 font-semibold mb-10 italic">Estamos listos para hacer realidad tu próximo viaje. ¡Escríbenos!</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Nombre Completo</label>
                  <input type="text" placeholder="Ej. Juan Pérez" className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Correo Electrónico</label>
                  <input type="email" placeholder="juan@ejemplo.com" className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Asunto</label>
                <select className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold italic">
                  <option>Información de Tours</option>
                  <option>Reserva de Fecha</option>
                  <option>Presupuesto Corporativo</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Mensaje</label>
                <textarea rows="4" placeholder="¿En qué podemos ayudarte?" className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold italic resize-none"></textarea>
              </div>

              <button className="w-full bg-brand-teal text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:translate-y-[-4px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-teal-500/20 active:scale-95">
                 Enviar Mensaje <Send className="w-4 h-4" />
              </button>
            </form>
         </div>
      </div>

    </section>
  );
};

export default ContactFAQ;
