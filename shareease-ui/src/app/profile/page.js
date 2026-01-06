"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

// Forçage de l'URL vers ton serveur Render officiel
const API_URL = "https://shareease-uyub.onrender.com/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [myOrders, setMyOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      setUser(currentUser);
      
      setFormData({ 
        name: currentUser.name || '', 
        email: currentUser.email || '' 
      });

      // Seuls les clients récupèrent leurs commandes ici
      if (currentUser.role === 'client') {
        fetchOrders(currentUser.id);
      }
    }
  }, []);

  const fetchOrders = (clientId) => {
    // Connexion au Cloud Render au lieu de localhost
    fetch(`${API_URL}/client/orders/${clientId}`)
      .then(res => res.json())
      .then(data => setMyOrders(Array.isArray(data) ? data : []))
      .catch(err => console.error("Erreur notifications Cloud:", err));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Mise à jour sur le serveur distant
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: formData.name, email: formData.email })
      });

      if (response.ok) {
        const updatedUser = { ...user, name: formData.name, email: formData.email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        alert("✅ Profil Cloud mis à jour avec succès !");
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour distante");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!confirm("Voulez-vous supprimer cette notification ?")) return;
    try {
      // Suppression sur le serveur Render
      const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setMyOrders(myOrders.filter(o => o.id !== orderId));
      }
    } catch (error) {
      alert("Erreur lors de la suppression Cloud");
    }
  };

  if (!user) return <div className="p-20 text-center font-black animate-pulse">Chargement sécurisé depuis Render...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-8 py-16 flex flex-col md:flex-row gap-12">
        
        {/* CARTE IDENTITÉ */}
        <div className="w-full md:w-1/3 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center h-fit">
          <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-5xl font-black text-white mb-6 shadow-lg shadow-blue-100">
            {user.name?.charAt(0)}
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">{user.name}</h2>
          <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-8 font-mono">Role: {user.role}</p>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
          >
            {isEditing ? "Annuler" : "Modifier le profil"}
          </button>
        </div>

        {/* CONTENU PRINCIPAL */}
        <div className="flex-1 space-y-8">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
            <h3 className="text-2xl font-black mb-10 text-slate-900 italic">
              {isEditing ? "Édition du profil Cloud" : "Informations personnelles"}
            </h3>

            {/* --- ACCÈS DASHBOARD POUR FOURNISSEUR UNIQUEMENT --- */}
            {user.role === 'provider' && (
              <div className="mb-8 p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-center sm:text-left">
                  <p className="font-black text-emerald-900 text-lg">Votre Espace Pro</p>
                  <p className="text-sm text-emerald-600 font-bold">Gérez vos services sur le Cloud Render.</p>
                </div>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 hover:shadow-xl transition-all shadow-lg shadow-emerald-100"
                >
                  Aller au Dashboard 🚀
                </button>
              </div>
            )}
            
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Nom Complet</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Email</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900"
                  />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-xl transition-all">
                  Sauvegarder les changements
                </button>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Adresse Email</p>
                  <p className="font-bold text-slate-700">{user.email || "Non renseigné"}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Type de compte</p>
                  <p className="font-black text-blue-600 uppercase italic tracking-tighter">{user.role}</p>
                </div>
              </div>
            )}
          </div>

          {/* SECTION CLIENT (Suivi Commandes) */}
          {user.role === 'client' && (
            <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
              <h3 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-4">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                Suivi de mes commandes (Cloud Render)
              </h3>
              <div className="space-y-4">
                {myOrders.length === 0 ? (
                  <p className="italic text-slate-400 font-medium text-center py-4">Aucune commande reçue depuis le serveur.</p>
                ) : (
                  myOrders.map(order => (
                    <div key={order.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex justify-between items-center group hover:bg-white hover:shadow-md transition-all">
                      <div>
                        <p className="font-black text-slate-800">{order.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Ref Cloud: #{order.id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                          order.status === 'Acceptée' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          order.status === 'Refusée' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {order.status}
                        </span>
                        {order.status === 'Refusée' && (
                          <button 
                            onClick={() => deleteOrder(order.id)}
                            className="text-slate-300 hover:text-rose-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
