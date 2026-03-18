import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ChevronRight, 
  Briefcase, 
  Ticket,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-white">
         <div className="w-10 h-10 border-4 border-brand-teal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const menuItems = [
    { icon: <Briefcase size={22} />, label: 'Mis Viajes' },
    { icon: <Heart size={22} />, label: 'Favoritos' },
    { icon: <Ticket size={22} />, label: 'Mis Cupones' },
    { icon: <Settings size={22} />, label: 'Configuración' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Profile Header */}
      <div className="px-6 pt-16 pb-12 border-b border-slate-50">
        <div className="flex items-center gap-6 mb-8">
           <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-teal p-0.5">
             <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-brand-dark leading-none mb-2 uppercase">{user.name}</h2>
              <p className="text-slate-400 font-bold text-sm tracking-tight">{user.email}</p>
           </div>
        </div>
      </div>

      {/* Profile Menu */}
      <div className="px-6 py-8 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-50 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-5">
               <div className="text-brand-teal">
                 {item.icon}
               </div>
               <span className="font-bold text-brand-dark text-lg">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-5 p-5 rounded-2xl bg-rose-50/50 text-rose-500 mt-12 active:scale-[0.98] transition-all"
        >
          <LogOut size={22} />
          <span className="font-bold text-lg">Cerrar Sesión</span>
        </button>
      </div>

      {/* Decorative Info Card */}
      <div className="px-6 mt-8">
         <div className="bg-brand-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 text-center">
               <h3 className="text-xl font-black mb-2 uppercase">Jandy Explorer</h3>
               <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Membresía Activa</p>
               <div className="w-full h-1 bg-white/10 rounded-full mb-2">
                  <div className="w-3/4 h-full bg-brand-teal"></div>
               </div>
               <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest text-right">75% para Nivel Gold</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProfilePage;
