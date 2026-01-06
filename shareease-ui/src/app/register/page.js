"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Forçage de l'URL de production Render
const API_URL = "https://shareease-uyub.onrender.com/api";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState('client');
  const [loading, setLoading] = useState(false);
  
  // États pour les champs du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Logique d'inscription réelle connectée au Cloud
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullName = `${firstName} ${lastName}`;

    try {
      // Utilisation de l'API distante au lieu de localhost
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          role, 
          name: fullName 
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("✨ Compte Cloud créé avec succès ! Connectez-vous maintenant.");
        router.push('/login');
      } else {
        alert(`🛑 Erreur : ${data.error}`);
      }
    } catch (error) {
      // Message mis à jour pour refléter l'état de la production
      alert("⚠️ Erreur : Impossible de contacter le serveur sécurisé ShareEase sur Render.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center font-sans px-6 py-12">
      
      {/* Bouton Retour Accueil */}
      <div 
        className="absolute top-10 left-10 flex items-center gap-2 cursor-pointer group"
        onClick={() => router.push('/')}
      >
        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:border-blue-600 transition-all">
          <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
        </div>
        <span className="font-black text-slate-400 group-hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">Accueil</span>
      </div>

      <div className="w-full max-w-[550px] bg-white p-12 rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-gray-50">
        
        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 bg-blue-600 rounded-2xl items-center justify-center shadow-lg shadow-blue-100 mb-6">
            <div className="w-6 h-6 bg-white rotate-45"></div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Créer un compte</h1>
          <p className="text-slate-400 font-medium mt-3 italic">Hébergé sur architecture Cloud sécurisée</p>
        </div>

        {/* Sélecteur de Rôle */}
        <div className="grid grid-cols-2 p-2 bg-slate-50 rounded-[2rem] mb-10 border border-gray-100">
          <button 
            type="button"
            onClick={() => setRole('client')}
            className={`py-4 rounded-[1.5rem] font-black transition-all ${role === 'client' ? 'bg-white text-blue-600 shadow-xl shadow-blue-100/50 scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Je suis Client
          </button>
          <button 
            type="button"
            onClick={() => setRole('provider')}
            className={`py-4 rounded-[1.5rem] font-black transition-all ${role === 'provider' ? 'bg-white text-blue-600 shadow-xl shadow-blue-100/50 scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Fournisseur
          </button>
        </div>

        {/* Formulaire Multi-champs */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Prénom</label>
              <input 
                type="text" 
                placeholder="Jean" 
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nom</label>
              <input 
                type="text" 
                placeholder="Dupont" 
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Adresse Email</label>
            <input 
              type="email" 
              placeholder="jean@exemple.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mot de passe</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold" 
            />
          </div>

          <div className="flex items-start gap-3 px-1 pt-2">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-600" required />
            <p className="text-sm text-slate-500 font-medium leading-snug">
              J'accepte les <span className="text-blue-600 font-bold hover:underline cursor-pointer">Conditions Générales</span>.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all duration-300 mt-6 active:scale-[0.98] ${
                loading ? 'bg-slate-300' : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-100'
            }`}
          >
            {loading ? "Déploiement des données..." : "Créer mon compte →"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-slate-500 font-medium">
            Déjà membre ? <button onClick={() => router.push('/login')} className="text-blue-600 font-black hover:underline ml-1">Se connecter</button>
          </p>
        </div>

      </div>

      <footer className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
        ShareEase © 2026 • SSL / TLS 1.3 Sécurisé
      </footer>
    </div>
  );
}
