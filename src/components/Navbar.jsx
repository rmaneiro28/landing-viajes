import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ShoppingCart, Heart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavSearch = (e) => {
    if (e.key === 'Enter' && navSearch.trim()) {
      navigate(`/destinos?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    }
  };

  const isDarkText = isScrolled || location.pathname !== '/';
  const isNavTransparent = !isScrolled && location.pathname === '/';

  const openWhatsAppQuick = () => {
    const phoneNumber = '584123397066';
    const message = encodeURIComponent('Hola Jandy Tours, quiero consultar sobre un tour.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const navLinks = [
    { name: 'Destinos', href: '/destinos' },
    { name: 'Paquetes', href: '/paquetes' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700  ${
          isNavTransparent 
            ? 'py-6 bg-white/5 backdrop-blur-md border-b border-white/10' 
            : 'py-4 bg-white/4 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-10">
          <Link to="/" className="flex items-center group shrink-0 py-1">
            <img src="/logo.png" alt="Jandy Tours Logo" className="h-9 w-auto object-contain transition-transform group-hover:scale-110 group-hover:drop-shadow-2xl" />
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-[13px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-teal relative group/link ${
                  isDarkText ? 'text-brand-dark' : 'text-white'
                } ${location.pathname === link.href ? 'text-brand-teal' : ''}`}
              >
                {link.name}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-brand-teal transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></div>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
             <div className={`relative flex items-center max-w-xs w-full group transition-all duration-500 rounded-2xl border border-transparent hover:border-brand-teal/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${isDarkText ? 'bg-slate-100 shadow-inner' : 'bg-white/10 backdrop-blur-xl shadow-lg border-white/10'}`}>
                <Search className={`absolute left-4 w-4 h-4 transition-transform group-hover:scale-110 group-hover:rotate-6 ${isDarkText ? 'text-slate-400' : 'text-white/50'}`} />
                <input 
                  type="text" 
                  placeholder="Buscar destino..." 
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  onKeyDown={handleNavSearch}
                  className={`w-full py-2.5 pl-12 pr-4 bg-transparent text-sm font-bold focus:outline-none ${isDarkText ? 'text-brand-dark' : 'text-white placeholder:text-white/40'}`}
                />
             </div>
             
             <div className="flex items-center gap-2">
                <Link 
                   to="/favoritos"
                   className={`p-2.5 rounded-xl transition-all relative group ${isDarkText ? 'text-brand-dark hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                >
                   <Heart className="w-5 h-5" strokeWidth={2.5} />
                   {favorites.length > 0 && (
                     <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                     >
                       {favorites.length}
                     </motion.span>
                   )}
                </Link>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className={`p-2.5 rounded-xl transition-all relative group ${isDarkText ? 'text-brand-dark hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                >
                   <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
                   {cartCount > 0 && (
                     <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-brand-teal text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                     >
                       {cartCount}
                     </motion.span>
                   )}
                </button>
             </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              className={`p-2 transition-all flex items-center justify-center ${
                isDarkText ? 'text-brand-dark' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <button
        onClick={openWhatsAppQuick}
        className="fixed bottom-24 right-4 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-2xl border border-white/60 hover:scale-105 transition-all"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-99999 flex flex-col"
          >
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
               <div className="flex items-center justify-between mb-16 shrink-0">
                  <Link to="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                  </Link>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="w-14 h-14 flex items-center justify-center bg-slate-100 text-brand-dark rounded-2xl border border-slate-200 shadow-sm active:scale-90 transition-all"
                  >
                    <X className="w-8 h-8" />
                  </button>
               </div>

               <div className="flex flex-col gap-6 mb-12 shrink-0">
                 {navLinks.map((link, i) => (
                   <motion.div
                     key={link.name}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 + 0.2 }}
                   >
                     <Link
                       to={link.href}
                       className="text-4xl font-black text-brand-dark hover:text-brand-teal transition-colors tracking-tighter italic block leading-none"
                       onClick={() => setIsMobileMenuOpen(false)}
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 ))}
               </div>
               
               <div className="mt-auto space-y-6 pb-6 shrink-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col gap-4"
                  >
                     <Link
                        to="/destinos"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-brand-teal text-white py-6 rounded-[2.2rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl shadow-teal-500/30 text-center"
                     >
                        Explorar Destinos
                     </Link>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
