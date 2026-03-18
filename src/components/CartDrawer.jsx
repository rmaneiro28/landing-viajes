import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Send, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, checkoutWithWhatsApp } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                     <ShoppingCart className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-brand-dark">Mi Carrito</h3>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cartItems.length} Planes seleccionados</p>
                  </div>
               </div>
               <button 
                 onClick={() => setIsCartOpen(false)}
                 className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all"
               >
                 <X className="w-6 h-6 text-brand-dark" />
               </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
               {cartItems.length > 0 ? (
                 cartItems.map((item) => (
                   <motion.div 
                     layout
                     key={item.id} 
                     className="flex gap-6 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 group"
                   >
                     <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                           <div className="flex justify-between gap-4">
                              <h4 className="text-sm font-black text-brand-dark line-clamp-1 italic">{item.title}</h4>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                           <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mt-1">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                           <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-10 text-center text-xs font-black text-brand-dark">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                           </div>
                           <p className="text-sm font-black text-brand-dark">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                     </div>
                   </motion.div>
                 ))
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center pb-20">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                       <ShoppingCart className="w-10 h-10 text-slate-200" />
                    </div>
                    <h4 className="text-xl font-black text-brand-dark mb-2 italic">Tu carrito está vacío</h4>
                    <p className="text-slate-400 text-sm italic mb-10 max-w-[200px]">¡Aún no has agregado ninguna aventura a tu lista!</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-brand-teal text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-teal-500/10 active:scale-95 transition-all"
                    >
                      Explorar Destinos
                    </button>
                 </div>
               )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-slate-50/50 border-t border-slate-100 space-y-6">
                 <div className="space-y-3">
                    <div className="flex justify-between text-slate-400 text-xs font-bold uppercase tracking-widest italic">
                       <span>Subtotal</span>
                       <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-brand-dark text-lg font-black italic">
                       <span>Total Estimado</span>
                       <span className="text-brand-dark tracking-tighter text-2xl">${cartTotal.toLocaleString()}</span>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Nombre completo</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Ana María"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Teléfono</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+58 412 339 7066"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
                      />
                    </div>
                 </div>
                 <button 
                   onClick={() => checkoutWithWhatsApp({ name, phone })}
                   disabled={!name.trim() || !phone.trim()}
                   className="w-full bg-[#25D366] disabled:opacity-50 disabled:cursor-not-allowed text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20 active:translate-y-px transition-all flex items-center justify-center gap-4 group"
                 >
                   <Send className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                   Finalizar pedido por WhatsApp
                 </button>
                 <p className="text-[10px] text-center text-slate-400 italic">
                    Solo necesitas nombre y teléfono para enviar tu pedido rápido.
                 </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
