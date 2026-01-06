"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'; 

// Forçage de l'URL de production pour éviter l'erreur localhost:5000
const API_URL = "https://shareease-uyub.onrender.com/api";

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tous');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const fetchServices = async () => {
      try {
        // Remplacement de localhost par l'URL Render
        const response = await fetch(`${API_URL}/services`);
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur de chargement des services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleOrder = async (service) => {
    if (!user) {
      alert("⚠️ Sécurité : Vous devez être connecté pour passer une commande.");
      router.push('/login');
      return;
    }

    try {
      // Utilisation de l'URL Render pour les commandes
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: service.id,
          client_id: user.id,
          provider_id: service.provider_id 
        })
      });

      if (response.ok) {
        alert(`🎉 Félicitations !\nVotre commande pour "${service.title}" a été envoyée.`);
      } else {
        alert("Erreur lors de l'enregistrement de la commande.");
      }
    } catch (error) {
      alert("⚠️ Erreur : Impossible de contacter le serveur de production.");
    }
  };

  const categories = ['Tous', 'E-Learning', 'Maison', 'Artisanat', 'Livraison'];
  const filteredServices = filter === 'Tous' 
    ? services 
    : services.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-8 md:px-16 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tight mb-4 text-slate-900">Découvrez nos Services</h1>
          <p className="text-xl text-slate-400 font-medium italic underline decoration-blue-100">
            Connecté au Cloud Render via API sécurisée.
          </p>
        </div>

        {/* FILTRES */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-2xl font-black transition-all ${
                filter === cat 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLE DE SERVICES */}
        {loading ? (
          <div className="text-center py-20 font-bold text-slate-300 animate-pulse">
            Chargement sécurisé depuis Render...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {service.image_url ? (
                    <img 
                      src={service.image_url} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = ""; e.target.style.display='none'; }}
                    />
                  ) : (
                    <span className="text-4xl font-black text-blue-100">{service.title.charAt(0)}</span>
                  )}
                  
                  <div className="absolute top-6 left-6 bg-white/90 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-blue-600 border border-blue-50">
                    {service.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1">{service.title}</h3>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">ID Fournisseur: {service.provider_id}</p>
                    </div>
                    <span className="text-2xl font-black text-blue-600">{service.price}€</span>
                  </div>
                  
                  <p className="text-slate-500 font-medium leading-relaxed mb-8 h-20 overflow-hidden">
                    {service.description}
                  </p>

                  <button 
                    onClick={() => handleOrder(service)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-100"
                  >
                    Commander ce service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black italic">Aucun service trouvé sur le serveur Render.</p>
          </div>
        )}
      </main>
    </div>
  );
}
