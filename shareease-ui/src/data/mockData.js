// src/data/mockData.js

export const MOCK_SERVICES = [
  {
    id: 1,
    title: "Tutorat Mathématiques",
    category: "E-Learning",
    price: 30,
    provider: "Alice Tech",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800",
    description: "Soutien scolaire personnalisé pour lycéens et étudiants. Préparation aux examens."
  },
  {
    id: 2,
    title: "Réparation Plomberie",
    category: "Maison",
    price: 75,
    provider: "Jean Dépannage",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800",
    description: "Intervention rapide pour fuites, débouchage et installation de robinetterie."
  },
  {
    id: 3,
    title: "Logo & Identité Visuelle",
    category: "Artisanat",
    price: 250,
    provider: "Creative Studio",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
    description: "Création de logos uniques et charte graphique complète pour votre entreprise."
  },
  {
    id: 4,
    title: "Livraison Courses Express",
    category: "Livraison",
    price: 15,
    provider: "FastDelivery",
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800",
    description: "Vos courses livrées à domicile en moins de 30 minutes dans tout le centre-ville."
  },
  {
    id: 5,
    title: "Cours de Poterie",
    category: "Artisanat",
    price: 45,
    provider: "L'Atelier de Terre",
    image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800",
    description: "Initiation au tournage et au modelage pour débutants. Matériel fourni."
  },
  // Remplace la ligne image de l'ID 6 dans ton mockData.js
 {
    id: 6,
    title: "Nettoyage de Printemps",
    category: "Maison",
    price: 120,
    provider: "CleanHome",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800", // Nouveau lien plus fiable
    description: "Nettoyage complet de votre domicile : vitres, sols et désinfection totale."
 }
];

export const CURRENT_USER = {
  name: "Jean Dupont",
  role: "provider", // Teste avec 'admin', 'provider', ou 'client'
  isLoggedIn: false
};