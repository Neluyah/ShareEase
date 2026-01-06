import React, { useState } from 'react';

export default function ProviderDashboard() {
  // Liste des commandes reçues (Simulation Backend)
  const [orders, setOrders] = useState([
    { id: 101, client: "Jean Martin", service: "Tutorat Math", status: "En attente" }
  ]);

  // État pour le nouveau service (Sécurisation des entrées)
  const [newService, setNewService] = useState({ name: '', price: '' });

  const handleAddService = (e) => {
    e.preventDefault();
    // Validation de sécurité : pas de caractères spéciaux
    const regex = /^[a-zA-Z0-9 ]+$/;
    if (!regex.test(newService.name)) {
      alert("Format de nom invalide (Sécurité : Protection Injection)");
      return;
    }
    console.log("Service ajouté avec succès !", newService);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-black text-gray-900">Espace Fournisseur</h1>
        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold text-sm">
          Rôle : Fournisseur
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 1. FORMULAIRE DE CRÉATION (Exigence : Liste/Création de services) */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <h2 className="text-xl font-black mb-6">Proposer un nouveau service</h2>
          <form onSubmit={handleAddService} className="space-y-4">
            <input 
              type="text" 
              placeholder="Nom du service (ex: Ménage)"
              className="w-full p-4 rounded-2xl bg-gray-50 border outline-none focus:border-blue-500"
              value={newService.name}
              onChange={(e) => setNewService({...newService, name: e.target.value})}
              required
            />
            <input 
              type="number" 
              placeholder="Prix (€)"
              className="w-full p-4 rounded-2xl bg-gray-50 border outline-none"
              value={newService.price}
              onChange={(e) => setNewService({...newService, price: e.target.value})}
              required
            />
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition">
              Publier le service
            </button>
          </form>
        </section>

        {/* 2. GESTION DES COMMANDES (Exigence : Flux de travail) */}
        <section className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-xl">
          <h2 className="text-xl font-black mb-6">Commandes à valider</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-800 p-6 rounded-3xl flex justify-between items-center">
                <div>
                  <p className="font-bold">{order.client}</p>
                  <p className="text-xs text-gray-400">{order.service}</p>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-black">
                  Accepter
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}