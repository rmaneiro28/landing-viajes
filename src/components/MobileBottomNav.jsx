import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, User, Briefcase, Info, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Compass, label: 'Explorar', path: '/destinos' },
    { icon: Heart, label: 'Favoritos', path: '/favoritos' },
    { icon: Mail, label: 'Contacto', path: '/contacto' },
  ];

  // Logic to show different tabs based on current page if needed
  // For now let's use a standard set that covers the basic needs
  
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-100 bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-[0_-8px_18px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.label} 
            to={item.path} 
            className="flex flex-col items-center gap-1 group relative"
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'text-brand-teal bg-teal-50' : 'text-slate-400 group-active:scale-95'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'fill-brand-teal/10' : ''}`} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wide leading-none ${isActive ? 'text-brand-teal' : 'text-slate-400'}`}>
              {item.label}
            </span>
            {isActive && (
              <motion.div 
                layoutId="nav-active-mobile"
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-teal rounded-full"
              />
            )}
          </Link>
        )
      })}
    </div>
  );
};

export default MobileBottomNav;
