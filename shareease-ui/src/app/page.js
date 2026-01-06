"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // RÉCUPÉRATION DE L'UTILISATEUR (Session)
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

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-blue-100">
      
      {/* 1. NAVBAR DYNAMIQUE */}
      <nav className="w-full max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex justify-between items-center border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => router.push('/')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 bg-white rotate-45"></div>
          </div>
          <span className="text-2xl font-black text-blue-900 tracking-tighter">ShareEase</span>
        </div>

        <div className="flex gap-6 items-center font-bold text-slate-600">
          <button onClick={() => router.push('/services')} className="hover:text-blue-600 transition">Explorer</button>
          
          {/* --- LOGIQUE DYNAMIQUE ADMIN / CONNEXION --- */}
          {user && user.role === 'admin' && (
             <button 
                onClick={() => router.push('/admin')}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all shadow-md flex items-center gap-2 border-2 border-slate-800"
              >
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
                Dashboard ⚙️
              </button>
          )}

          {!user ? (
            <button 
              onClick={() => router.push('/login')} 
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95 text-sm"
            >
              Connexion
            </button>
          ) : (
            <div className="flex items-center gap-4">
               <span className="text-xs font-black text-slate-400 uppercase hidden md:block">{user.name}</span>
               <button 
                onClick={handleLogout} 
                className="bg-rose-50 text-rose-500 px-6 py-2.5 rounded-full hover:bg-rose-100 transition font-black text-xs border border-rose-100"
              >
                Quitter
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="w-full max-w-[1600px] mx-auto px-8 md:px-16 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>
        
        {/* 2. SECTION HERO */}
        <section className="pt-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-8">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
              ✨ Nouvelle génération de services
            </div>
            <h1 className="text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
              L'économie du <br />
              <span className="text-blue-600 italic">partage</span> réinventée.
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              Que vous soyez un <strong className="text-slate-900 font-bold">fournisseur</strong> souhaitant proposer ses talents ou un <strong className="text-slate-900 font-bold">client</strong> à la recherche d'un service.
            </p>
            <div className="flex flex-wrap gap-5 pt-6">
              <button onClick={() => router.push('/services')} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                Consulter les offres →
              </button>
              <button 
                onClick={() => router.push(user ? '/services' : '/login')} 
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                {user?.role === 'provider' ? 'Mon Espace' : 'Devenir Fournisseur'}
              </button>
            </div>
            <div className="flex items-center gap-6 pt-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full"></div> Sécurisé par STRIDE</span>
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
              <span>Multi-Rôles RBAC</span>
            </div>
          </div>

          {/* IMAGE HERO */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rotate-2 border-[8px] border-white ring-1 ring-gray-100 w-full max-w-[550px]">
              <img 
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800" 
                className="w-full h-[450px] object-cover"
                alt="Marketplace"
              />
            </div>
            <div className="absolute -bottom-6 left-10 lg:left-20 bg-blue-600 text-white px-8 py-6 rounded-3xl shadow-2xl -rotate-3 border-4 border-white z-20">
                <p className="text-xl font-black italic tracking-tighter">"Simple. Sûr. Partagé."</p>
            </div>
          </div>
        </section>

        {/* 3. SECTION COMMENT ÇA MARCHE */}
        <div style={{ height: '220px', width: '100%', display: 'block' }}></div>

        <section className="mb-40">
          <div className="flex flex-col items-center mb-24">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-widest text-center">
              Comment ça marche ?
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Cartes (gardées telles quelles) */}
            <div className="group bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left h-full">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Créez un compte</h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">Choisissez votre rôle : <span className="text-blue-600">Client</span> pour acheter ou <span className="text-blue-600">Fournisseur</span> pour vendre.</p>
            </div>

            <div className="group bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left h-full">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Échange Sécurisé</h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">Transactions protégées par nos protocoles <span className="text-emerald-600 font-bold">SSL et MFA</span> certifiés.</p>
            </div>

            <div className="group bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left h-full">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Évaluez la qualité</h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">L'administrateur surveille l'activité pour garantir votre <span className="text-purple-600 font-bold">satisfaction maximale</span>.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center border-t border-gray-100 bg-slate-50">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          SHAREEASE • SÉCURISÉ PAR STRIDE • 2025/2026
        </p>
      </footer>
    </div>
  );
}