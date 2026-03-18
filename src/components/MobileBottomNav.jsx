import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, User, Briefcase, Info, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Compass, label: 'Explorar', path: '/destinos' },
    { icon: Heart, label: 'Favoritos', path: '#' }, // Placeholder for favs
    { icon: User, label: 'Perfil', path: '/cuenta' },
  ];

  // Logic to show different tabs based on current page if needed
  // For now let's use a standard set that covers the basic needs
  
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-100 px-6 py-3 pb-6 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.label} 
            to={item.path} 
            className="flex flex-col items-center gap-1.5 group relative"
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'text-brand-teal bg-teal-50' : 'text-slate-400 group-active:scale-95'}`}>
              <Icon className={`w-6 h-6 ${isActive ? 'fill-brand-teal/10' : ''}`} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${isActive ? 'text-brand-teal' : 'text-slate-400'}`}>
              {item.label}
            </span>
            {isActive && (
              <motion.div 
                layoutId="nav-active-mobile"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-teal rounded-full"
              />
            )}
          </Link>
        )
      })}
    </div>
  );
};

export default MobileBottomNav;
