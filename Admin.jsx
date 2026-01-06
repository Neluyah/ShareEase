import React, { useState } from 'react';

export default function AdminDashboard() {
  // Simulation de données provenant de la DB [cite: 100, 104]
  const [users] = useState([
    { id: 1, name: "Alice", role: "Fournisseur", status: "Actif" },
    { id: 2, name: "Bob", role: "Client", status: "Actif" }
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-6 font-bold">
        <h2 className="mb-10 text-xl">Admin Panel</h2>
        <p className="text-blue-400">Utilisateurs</p>
        <p className="mt-4 text-gray-400">Sécurité (STRIDE)</p>
      </aside>
      
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-black mb-8">Gestion des Comptes</h1>
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 uppercase text-xs font-black text-gray-400">
              <tr><th className="p-6">Nom</th><th>Rôle</th><th>Actions</th></tr>
            </thead>
            <tbody className="divide-y">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="p-6 font-bold">{user.name}</td>
                  <td><span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-black">{user.role}</span></td>
                  <td><button className="text-red-500 font-bold">Bannir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}