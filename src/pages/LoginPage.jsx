import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: formData.name || 'Viajero Jandy',
      email: formData.email,
    });
    navigate(from, { replace: true });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-dark/5 rounded-full blur-[100px] -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="p-10 pb-6 text-center">
             <Link to="/" className="inline-block mb-8">
                <img src="/logo.png" alt="Jandy Tours" className="h-10 w-auto mx-auto" />
             </Link>
             <h1 className="text-4xl font-black text-brand-dark leading-tight italic tracking-tighter">
                {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
             </h1>
             <p className="text-slate-400 mt-3 font-bold uppercase text-[10px] tracking-[0.3em]">
                {isLogin ? 'Accede a tus aventuras guardadas' : 'Empieza a explorar el paraíso hoy'}
             </p>
          </div>

          {/* Social Logins */}
          <div className="px-10 flex gap-4 mb-4">
             <button className="flex-1 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center gap-3 hover:bg-slate-100 transition-all font-black text-[11px] uppercase tracking-widest text-brand-dark">
                <Chrome className="w-4 h-4 text-[#4285F4]" />
                Google
             </button>
             <button className="flex-1 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center gap-3 hover:bg-slate-100 transition-all font-black text-[11px] uppercase tracking-widest text-brand-dark">
                <Github className="w-4 h-4" />
                GitHub
             </button>
          </div>

          <div className="px-10 flex items-center gap-4 mb-8">
             <div className="h-[1px] bg-slate-100 flex-1"></div>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">O con tu correo</span>
             <div className="h-[1px] bg-slate-100 flex-1"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-5">
             <AnimatePresence mode="wait">
                {!isLogin && (
                   <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                   >
                      <label className="text-[10px] font-black text-brand-dark uppercase tracking-widest px-2">Nombre Completo</label>
                      <div className="relative group">
                         <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                         <input 
                            type="text" 
                            required
                            placeholder="Ej. Juan Pérez"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/50 transition-all font-semibold text-brand-dark text-[15px]" 
                         />
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-dark uppercase tracking-widest px-2">Dirección de Email</label>
                <div className="relative group">
                   <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                   <input 
                      type="email" 
                      required
                      placeholder="hola@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/50 transition-all font-semibold text-brand-dark text-[15px]" 
                   />
                </div>
             </div>

             <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                   <label className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Contraseña</label>
                   {isLogin && <button type="button" className="text-[10px] font-black text-brand-teal uppercase tracking-widest hover:underline">¿La olvidaste?</button>}
                </div>
                <div className="relative group">
                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                   <input 
                      type={showPassword ? 'text' : 'password'} 
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal/50 transition-all font-semibold text-brand-dark text-[15px]" 
                   />
                   <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                   >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                </div>
             </div>

             <button 
                type="submit"
                className="w-full bg-brand-dark text-white py-6 rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] shadow-2xl shadow-brand-dark/20 hover:bg-brand-teal transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
             >
                <span className="relative z-10">{isLogin ? 'Entrar ahora' : 'Crear mi cuenta'}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-brand-teal opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </button>
          </form>

          {/* Footer Toggle */}
          <div className="bg-slate-50 p-8 text-center">
             <p className="text-slate-500 font-bold text-[12px] uppercase tracking-widest">
                {isLogin ? '¿No eres miembro aún?' : '¿Ya tienes una cuenta?'}
                <button 
                   onClick={toggleAuthMode}
                   className="ml-2 text-brand-teal font-black hover:underline"
                >
                   {isLogin ? 'Únete aquí' : 'Inicia sesión'}
                </button>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
