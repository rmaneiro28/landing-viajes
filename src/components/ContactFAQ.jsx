import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '584124268656';

const faqs = [
  {
    q: '¿Cómo sé si una agencia es segura?',
    a: 'Todas las agencias listadas en nuestra plataforma han pasado por un proceso de verificación básica. Además, puedes leer las reseñas de otros viajeros y consultar sus redes sociales antes de hacer una reserva directa.'
  },
  {
    q: '¿Cómo puedo contactar a una agencia en específico?',
    a: 'Cada agencia listada cuenta con su información de contacto (WhatsApp, correo electrónico o teléfono). Puedes comunicarte directamente con ellos a través de los datos que aparecen en su perfil dentro de la plataforma.'
  },
  {
    q: '¿La plataforma organiza los viajes directamente?',
    a: 'No. Caramelo Tours es un directorio turístico. Nuestro rol es conectarte con las mejores operadoras y agencias de viajes en Venezuela. La organización y reserva del viaje la gestionas directamente con la agencia de tu elección.'
  },
  {
    q: '¿Qué tipo de agencias aparecen en la plataforma?',
    a: 'Encontrarás operadoras de turismo, hoteles y posadas, guías certificados, empresas de transporte turístico y agencias de viajes. Todas orientadas al turismo dentro de Venezuela.'
  }
];

const ContactFAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoServicio, setTipoServicio] = useState('Operadora');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = `¡Hola! Solicito registro en la plataforma Caramelo Tours 🌴

👤 *Nombre / Empresa:* ${nombre}
📧 *Correo:* ${correo}
🏢 *Tipo de Servicio:* ${tipoServicio}
📝 *Mensaje:* ${mensaje}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
            <h3 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tight">Únete a nuestra plataforma turística</h3>
            <p className="text-slate-500 font-semibold mb-10 italic">¿Eres operadora, guía, hotel o empresa de transporte? Registra tu servicio y llega a más viajeros.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Nombre Completo o Empresa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez / Aventuras VZ"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="contacto@empresa.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Tipo de Servicio</label>
                <select
                  value={tipoServicio}
                  onChange={(e) => setTipoServicio(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold italic"
                >
                  <option>Operadora</option>
                  <option>Transporte</option>
                  <option>Hospedaje</option>
                  <option>Guía</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-brand-teal px-1">Mensaje</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Cuéntanos sobre tus servicios, ubicación y experiencia en el sector turístico."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/20 transition-all font-semibold italic resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:translate-y-[-4px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
              </button>

              <p className="text-center text-xs text-slate-400 italic font-medium">
                Al recibir tu información, te contactaremos para poder determinar la inclusión en la plataforma.
              </p>
            </form>
         </div>
      </div>

    </section>
  );
};

export default ContactFAQ;
