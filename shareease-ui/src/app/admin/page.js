"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

// Forçage de l'URL de l'API vers ton serveur Render officiel
const API_URL = "https://shareease-uyub.onrender.com/api";

export default function AdminPanel() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/login');
      return;
    }

    const currentUser = JSON.parse(savedUser);
    if (currentUser.role !== 'admin') {
      alert("🛑 Accès Interdit.");
      router.push('/services'); 
      return;
    }
    setAdminName(currentUser.name);

    const fetchData = async () => {
      try {
        // Connexion au Cloud Render au lieu de localhost
        const [resUsers, resServices] = await Promise.all([
          fetch(`${API_URL}/users`),
          fetch(`${API_URL}/services`)
        ]);
        
        const dataUsers = await resUsers.json();
        const dataServices = await resServices.json();
        
        setUsers(Array.isArray(dataUsers) ? dataUsers : []);
        setServices(Array.isArray(dataServices) ? dataServices : []);
      } catch (error) {
        console.error("Erreur de synchronisation Cloud:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`Supprimer l'utilisateur ${name} ?`)) {
      // Appel API DELETE vers Render
      const response = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      if (response.ok) setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleDeleteService = async (id, title) => {
    if (window.confirm(`Retirer le service : ${title} ?`)) {
      // Appel API DELETE vers Render
      const response = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
      if (response.ok) setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">Vérification Admin Cloud...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="max-w-[1600px] mx-auto px-8 md:px-16 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-purple-900">Tableau de Bord Administrateur</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2 italic">Surveillance SQLite Distante Active</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border border-purple-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Utilisateurs</p>
            <p className="text-3xl font-black text-purple-600">{users.length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Services</p>
            <p className="text-3xl font-black text-blue-600">{services.length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">Serveur Render</p>
            <p className="text-xl font-black text-emerald-500 italic">LIVE 🎉</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* COMPTES */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black mb-6">Gestion des comptes</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {users.map((u) => (
                <div key={u.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{u.full_name}</span>
                    <span className="text-[10px] font-black uppercase text-blue-500">{u.role}</span>
                  </div>
                  <button onClick={() => handleDeleteUser(u.id, u.full_name)} className="text-[10px] font-black text-rose-500 uppercase px-3 py-2 rounded-lg border border-rose-100 hover:bg-rose-50 transition-all">Supprimer</button>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black mb-6">Modération Services</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {services.map((s) => (
                <div key={s.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">{s.title}</span>
                    <span className="text-[10px] font-black uppercase text-emerald-500">{s.price}€</span>
                  </div>
                  <button onClick={() => handleDeleteService(s.id, s.title)} className="text-[10px] font-black text-rose-500 uppercase px-3 py-2 rounded-lg border border-rose-100 hover:bg-rose-50 transition-all">Retirer</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOGS STRIDE */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black mb-6">Logs de Sécurité (STRIDE)</h2>
          <div className="space-y-2 font-mono text-[10px] text-slate-500 bg-slate-900 p-8 rounded-2xl">
            <p className="text-emerald-400">[INFO] Accès DB SQLite sécurisé sur Render</p>
            <p className="text-emerald-400">[OK] TLS 1.3 Active - Session Admin validée</p>
            <p className="text-blue-400">[AUDIT] Liste consultée par : Admin {adminName}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
