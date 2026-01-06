const allServices = [
  { id: 1, name: "Tutorat Math", price: 25, category: "E-Learning", img: "..." },
  { id: 2, name: "Plomberie", price: 45, category: "Réparation", img: "..." },
  // Tu peux en ajouter autant que tu veux ici
];

export default function ServicesPage() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-black mb-10">Catalogue des Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allServices.map(service => (
          <div key={service.id} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition">
            <span className="text-xs font-bold text-blue-600 uppercase">{service.category}</span>
            <h3 className="text-xl font-bold mt-2">{service.name}</h3>
            <p className="text-2xl font-black mt-4">{service.price}€</p>
            <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded-xl font-bold">Commander</button>
          </div>
        ))}
      </div>
    </div>
  );
}