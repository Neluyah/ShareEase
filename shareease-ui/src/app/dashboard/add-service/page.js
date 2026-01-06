"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'; 

// Forçage de l'URL de l'API vers ton serveur Render officiel
const API_URL = "https://shareease-uyub.onrender.com/api";

export default function AddServicePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // MISE À JOUR : Ajout de image_url dans l'état initial
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Maison',
    image_url: '' 
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    
    if (!savedUser) {
      router.push('/login');
      return;
    }

    const currentUser = JSON.parse(savedUser);

    // PROTECTION RBAC : Seul un fournisseur peut ajouter un service
    if (currentUser.role !== 'provider') {
      alert("🛑 Accès Refusé : Vous n'avez pas l'autorisation de créer un service.");
      router.push('/services');
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }

    // On attache l'ID du fournisseur authentifié aux données transmises au backend
    const serviceData = { ...formData, provider_id: user.id };

    try {
      // Connexion à l'API Render au lieu de localhost
      const response = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        alert("🎉 Service ajouté avec succès dans ShareEase Cloud !");
        router.push('/dashboard'); 
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur de connexion au serveur Render.");
    }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">Initialisation du formulaire sécurisé...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main className="max-w-2xl mx-auto py-16 px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Créer une offre</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Cloud Publishing (ID Vendeur : #{user?.id})</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Titre du service</label>
            <input 
              required
              placeholder="Ex: Ménage express, Cours de Maths..."
              className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-900 transition-all"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* NOUVEAU CHAMP : URL DE L'IMAGE */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Lien de l'image (URL)</label>
            <input 
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-900 transition-all"
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Prix (€)</label>
              <input 
                type="number" 
                required
                placeholder="0.00"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-900 transition-all"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Catégorie</label>
              <select 
                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-900 transition-all appearance-none"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Maison</option>
                <option>E-Learning</option>
                <option>Artisanat</option>
                <option>Livraison</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 ml-1">Description détaillée</label>
            <textarea 
              required 
              rows="4"
              placeholder="Décrivez votre service en quelques lignes..."
              className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-900 transition-all"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-700 hover:shadow-2xl shadow-blue-200 transition-all transform hover:-translate-y-1"
          >
            Publier mon service en ligne
          </button>
        </form>
      </main>
    </div>
  );
}
