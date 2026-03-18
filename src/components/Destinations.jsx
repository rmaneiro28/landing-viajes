import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

const destinations = [
  {
    id: 'canaima-salto-angel',
    title: 'Laguna de Canaima',
    description: 'Naturaleza pura y paisajes ancestrales. Descubre los tepuyes desde una curiara tradicional.',
    image: '/canaima.png',
    label: 'AVENTURA',
    price: '$350',
  },
  {
    id: 'los-roques-paraiso',
    title: 'Los Roques',
    description: 'Aguas cristalinas y arena blanca en el caribe venezolano. El paraíso del snorkel.',
    image: '/los_roques.png',
    label: 'RELAX',
    price: '$420',
  },
  {
    id: 'merida-sierra-nevada',
    title: 'Pico Bolívar',
    description: 'La cumbre más alta de Venezuela. Una expedición hacia las nieves eternas de los Andes.',
    image: '/merida.png',
    label: 'AVENTURA',
    price: '$280',
  }
];

const Destinations = () => {
  return (
    <section id="destinos" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-row items-end justify-between mb-12 relative">
         <h2 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tight">
          Destinos Populares
         </h2>
         <Link to="/destinos" className="flex items-center gap-2 text-slate-400 font-bold hover:text-brand-teal transition-all text-sm">
          Ver todos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-100 border border-slate-50 flex flex-col h-full hover:shadow-2xl transition-all duration-500">
               {/* Image Container */}
               <div className="h-[280px] relative overflow-hidden">
                  <OptimizedImage 
                    src={dest.image} 
                    alt={dest.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                  {/* Floating Tag Top Right */}
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-brand-teal/90 backdrop-blur-md rounded-full shadow-lg">
                    <span className="text-brand-dark text-[10px] font-black uppercase tracking-widest">{dest.label}</span>
                  </div>
               </div>

               {/* Content */}
               <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-brand-dark mb-3 leading-tight tracking-tight uppercase">{dest.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                    {dest.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                       <p className="text-brand-dark font-black text-xl tracking-tighter italic">
                         {dest.price} <span className="text-[10px] text-slate-400 not-italic ml-1 uppercase tracking-widest">/ pers</span>
                       </p>
                    </div>
                    <Link 
                      to={`/paquetes/${dest.id}`}
                      className="px-6 py-2.5 bg-[#e2f9f8] text-brand-teal font-black text-[11px] rounded-xl hover:bg-brand-teal hover:text-white transition-all uppercase tracking-widest"
                    >
                       Ver más
                    </Link>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Destinations;
