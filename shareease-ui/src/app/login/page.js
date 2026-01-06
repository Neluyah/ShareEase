"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Forçage de l'URL de l'API vers ton serveur Render
const API_URL = "https://shareease-uyub.onrender.com/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Connexion au serveur distant au lieu du port 5000 local
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // --- SAUVEGARDE DE LA SESSION ---
        localStorage.setItem('user', JSON.stringify(data));

        alert(`🔐 Connexion sécurisée établie !\nBienvenue ${data.name}.`);
        
        // --- REDIRECTION DYNAMIQUE BASÉE SUR LE RÔLE (RBAC) ---
        if (data.role === 'admin') {
          router.push('/admin');
        } else if (data.role === 'provider') {
          router.push('/dashboard');
        } else {
          router.push('/services');
        }
        
      } else {
        alert(`🛑 Erreur : ${data.error}`);
      }
    } catch (error) {
      // Message mis à jour pour ton oral demain
      alert("⚠️ Erreur : Impossible de contacter le serveur sécurisé sur Render.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sans px-6 relative">
      
      {/* Bouton Retour Accueil */}
      <button 
        onClick={() => router.push('/')}
        className="absolute top-10 left-10 flex items-center gap-2 group px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-600 transition-all z-10"
      >
        <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
        <span className="text-xs font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-widest">Accueil</span>
      </button>

      <div className="w-full max-w-[450px] bg-white p-12 rounded-[3.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-gray-50 animate-in fade-in zoom-in duration-500">
        
        <div className="flex flex-col items-center mb-12">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-6">
            <div className="w-6 h-6 bg-white rotate-45"></div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ravi de vous revoir</h1>
          <p className="text-slate-400 font-medium mt-2">Accédez à votre espace Cloud ShareEase</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@shareease.com" 
              required
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" 
            />
          </div>

          <div className="text-right">
            <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Mot de passe oublié ?</button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 active:scale-95 shadow-xl ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600 shadow-slate-100'
            }`}
          >
            {loading ? "Vérification Cloud..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-slate-500 font-medium mt-10">
          Pas encore de compte ? <button onClick={() => router.push('/register')} className="text-blue-600 font-black hover:underline underline-offset-4">Inscrivez-vous</button>
        </p>
      </div>

      <footer className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
        SÉCURISÉ PAR STRIDE • SHARE EASE 2026
      </footer>
    </div>
  );
}
