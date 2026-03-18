import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Instagram, Facebook, Mail, Phone, MapPin, Send, MessageCircle, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Logo & Intro */}
          <div className="space-y-10">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
               <img src="/logo.png" alt="Jandy Tours Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-slate-500 font-semibold italic text-sm leading-relaxed max-w-[280px]">
               Creamos experiencias inolvidables alrededor del mundo desde 2010. Tu aventura comienza aquí.
            </p>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-brand-dark font-black text-xs uppercase tracking-[0.2em] mb-10">Empresa</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-400 italic">
               <li><Link to="/nosotros" className="hover:text-brand-teal transition-colors">Sobre nosotros</Link></li>
               <li><Link to="/nosotros" className="hover:text-brand-teal transition-colors">Blog de viajes</Link></li>
               <li><Link to="/contacto" className="hover:text-brand-teal transition-colors">Trabaja con nosotros</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-brand-dark font-black text-xs uppercase tracking-[0.2em] mb-10">Soporte</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-400 italic">
               <li><Link to="/contacto" className="hover:text-brand-teal transition-colors">Centro de ayuda</Link></li>
               <li><Link to="/nosotros" className="hover:text-brand-teal transition-colors">Términos y condiciones</Link></li>
               <li><Link to="/nosotros" className="hover:text-brand-teal transition-colors">Política de privacidad</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-brand-dark font-black text-xs uppercase tracking-[0.2em] mb-10">Newsletter</h4>
            <div className="relative group">
               <input 
                 type="email" 
                 placeholder="Email" 
                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-6 pr-16 text-sm font-bold text-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal/20 transition-all italic"
               />
               <button className="absolute right-2 top-2 bottom-2 bg-brand-teal text-white px-5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-95 transition-all shadow-xl shadow-teal-500/10 active:translate-y-px">
                  OK
               </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[11px] font-bold text-slate-300 italic">
              © 2024 Jandy Tours. Todos los derechos reservados.
           </p>

           <div className="flex items-center gap-8">
              <a href="#" className="text-[11px] font-bold text-slate-300 hover:text-brand-teal transition-all italic">Instagram</a>
              <a href="#" className="text-[11px] font-bold text-slate-300 hover:text-brand-teal transition-all italic">Facebook</a>
              <a href="#" className="text-[11px] font-bold text-slate-300 hover:text-brand-teal transition-all italic">Twitter</a>
           </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
