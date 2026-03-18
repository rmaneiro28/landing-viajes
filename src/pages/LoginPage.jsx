import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes conectar con tu API o WhatsApp si lo deseas
    alert(`Pedido enviado! Nombre: ${name}, Teléfono: ${phone}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_40px_80px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="p-10 text-center">
          <h1 className="text-4xl font-black text-brand-dark leading-tight italic tracking-tighter">Reserva rápida</h1>
          <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-[0.3em]">Solo nombre y teléfono para completar tu pedido</p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-5">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Nombre completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Ana Pérez"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Teléfono</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+58 412 339 7066"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-dark text-white py-4 rounded-[1.6rem] font-black uppercase text-sm tracking-[0.2em] shadow-lg hover:bg-brand-teal transition-all flex items-center justify-center gap-2"
          >
            Enviar Pedido
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="bg-slate-50 p-5 text-center text-[11px] text-slate-500 font-bold uppercase tracking-widest">
          <Link to="/" className="text-brand-teal hover:underline">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
