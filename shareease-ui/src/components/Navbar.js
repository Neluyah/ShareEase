"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  // Détermine le rôle à afficher selon la page ou l'utilisateur
  const displayRole = user ? (pathname.startsWith('/admin') ? 'admin' : user.role) : 'client';

  const roleColors = {
    admin: "border-purple-500 text-purple-600 bg-purple-50",
    provider: "border-emerald-500 text-emerald-600 bg-emerald-50",
    client: "border-blue-500 text-blue-600 bg-blue-50"
  };

  return (
    <nav className="w-full max-w-[1600px] mx-auto px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      
      {/* LOGO */}
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push('/')}>
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <div className="w-4 h-4 bg-white rotate-45"></div>
        </div>
        <span className="text-2xl font-black text-blue-900 tracking-tighter">ShareEase</span>
      </div>

      <div className="flex gap-6 items-center">
        <button 
          onClick={() => router.push('/services')} 
          className="font-bold text-slate-600 hover:text-blue-600 transition-colors px-2"
        >
          Explorer
        </button>

        {/* --- LIEN DYNAMIQUE FOURNISSEUR : AJOUTER SERVICE --- */}
        {user?.role === 'provider' && (
          <button 
            onClick={() => router.push('/dashboard/add-service')}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group"
          >
            <span className="text-xl group-hover:scale-125 transition-transform">+</span> 
            Ajouter un service
          </button>
        )}

        {/* --- BOUTON DASHBOARD ADMIN RÉDUIT --- */}
        {user?.role === 'admin' && pathname !== '/admin' && (
          <button 
            onClick={() => router.push('/admin')}
            className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl font-black text-[8px] uppercase tracking-widest hover:bg-purple-600 transition-all flex items-center gap-2 border-2 border-slate-800 shadow-md"
          >
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
            Dashboard ⚙️
          </button>
        )}

        {/* --- ACCÈS DASHBOARD VENDEUR --- */}
        {user?.role === 'provider' && (
          <button 
            onClick={() => router.push('/dashboard')} 
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md"
          >
            Mes Ventes
          </button>
        )}

        {!user ? (
          <button onClick={() => router.push('/login')} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-blue-700 transition-all">
            Se connecter
          </button>
        ) : (
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-100">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${roleColors[displayRole]}`}>
              {displayRole}
            </span>
            <span className="font-bold text-slate-900 hidden md:block">{user.name}</span>
            <div 
              onClick={() => router.push('/profile')} 
              className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center font-black text-blue-600 cursor-pointer hover:border-blue-600 transition-all"
            >
              {user.name?.charAt(0)}
            </div>
            <button onClick={handleLogout} className="text-xs font-bold text-rose-500 hover:underline ml-2">Quitter</button>
          </div>
        )}
      </div>
    </nav>
  );
}