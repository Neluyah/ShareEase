import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
      <div className="text-2xl font-black text-blue-600">ShareEase</div>
      <div className="space-x-6 font-bold text-gray-600">
        <Link href="/" className="hover:text-blue-600">Accueil</Link>
        <Link href="/services" className="hover:text-blue-600">Services</Link>
        <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-xl">Connexion</Link>
      </div>
    </nav>
  );
}