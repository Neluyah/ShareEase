"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar'; 

export default function ProviderDashboard() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    
    if (!savedUser) {
      router.push('/login');
      return;
    }

    const currentUser = JSON.parse(savedUser);

    // PROTECTION RBAC : Seul le fournisseur accède à cette page
    if (currentUser.role !== 'provider') {
      alert("🛑 Accès Interdit : Cette page est réservée aux fournisseurs.");
      router.push('/services'); 
      return;
    }

    setUser(currentUser);

    const fetchDashboardData = async () => {
      try {
        const [resServices, resOrders] = await Promise.all([
          fetch('http://localhost:5000/api/services'),
          fetch(`http://localhost:5000/api/provider/orders/${currentUser.id}`)
        ]);

        const sData = await resServices.json();
        const oData = await resOrders.json();
        
        // Filtrage pour n'afficher que les services appartenant à ce fournisseur
        setServices(Array.isArray(sData) ? sData.filter(s => s.provider_id === currentUser.id) : []);
        setOrders(Array.isArray(oData) ? oData : []);
      } catch (error) {
        console.error("Erreur de récupération:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // FONCTION DE MISE À JOUR DU STATUT DES COMMANDES
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: status } : o));
        alert(`La commande est maintenant : ${status}`);
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  // --- FONCTION DE MODIFICATION RAPIDE DES SERVICES ---
  const handleQuickEdit = async (service) => {
    const newTitle = prompt("Modifier le titre :", service.title);
    const newPrice = prompt("Modifier le prix (€) :", service.price);
    const newImg = prompt("Modifier le lien de l'image (URL) :", service.image_url || "");
    
    if (newTitle && newPrice) {
      try {
        const res = await fetch(`http://localhost:5000/api/services/${service.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              ...service, 
              title: newTitle, 
              price: parseFloat(newPrice),
              image_url: newImg 
          })
        });
        
        if (res.ok) {
          alert("✅ Service mis à jour avec succès !");
          window.location.reload(); // Recharge pour synchroniser l'affichage
        }
      } catch (error) {
        alert("Erreur lors de la modification");
      }
    }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">Chargement de votre espace vendeur...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="w-full max-w-[1600px] mx-auto px-8 md:px-16 py-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight text-slate-900">Espace Fournisseur</h1>
            <p className="text-xl text-slate-400 font-medium italic underline decoration-blue-200">Session : {user?.name}</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/add-service')}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:shadow-xl transition-all shadow-lg shadow-blue-100"
          >
            + Ajouter un service
          </button>
        </div>

        {/* --- SECTION COMMANDES --- */}
        <section className="mb-20">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
            Commandes à traiter ({orders.filter(o => o.status === 'En attente').length})
          </h2>
          
          <div className="grid gap-4">
            {orders.length === 0 ? (
              <div className="p-10 bg-white rounded-[2rem] border border-dashed text-center text-slate-400 font-bold">
                Aucune commande client reçue.
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black shadow-sm">
                      {order.client_name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900">{order.title}</h3>
                      <p className="text-sm text-slate-400 font-medium tracking-tight">
                        Client: <span className="text-blue-600 font-bold">{order.client_name}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      order.status === 'Acceptée' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      order.status === 'Refusée' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {order.status}
                    </span>

                    {order.status === 'En attente' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => updateStatus(order.id, 'Acceptée')} 
                          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all shadow-lg"
                        >
                          Accepter
                        </button>
                        <button 
                          onClick={() => updateStatus(order.id, 'Refusée')} 
                          className="bg-white text-slate-400 px-5 py-2.5 rounded-xl font-bold text-xs border border-slate-100 hover:text-rose-600 hover:border-rose-100 transition-all"
                        >
                          Refuser
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* --- CATALOGUE AVEC IMAGES ET ÉDITION --- */}
        <section>
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
            Mon Catalogue ({services.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row hover:shadow-lg transition-all">
                {/* IMAGE */}
                <div className="w-full sm:w-48 h-48 bg-slate-50 flex items-center justify-center border-r overflow-hidden">
                  {service.image_url ? (
                    <img 
                      src={service.image_url} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = ""; e.target.style.display='none'; }} 
                    />
                  ) : (
                    <div className="text-blue-200 font-black text-5xl uppercase">{service.title.charAt(0)}</div>
                  )}
                </div>

                {/* INFOS */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{service.category}</p>
                    <p className="text-slate-500 text-sm mt-3 line-clamp-2">{service.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-2xl font-black text-slate-900">{service.price}€</span>
                    <button 
                      onClick={() => handleQuickEdit(service)}
                      className="text-blue-600 font-bold hover:underline italic text-sm flex items-center gap-1"
                    >
                      Modifier rapide ✏️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}