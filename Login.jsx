import React, { useState } from 'react';

const Login = () => {
  // 1. MÉMOIRE DU COMPOSANT (State)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. LOGIQUE DE SÉCURITÉ (Validation)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Protection contre les injections simples (XSS)
    const dangerousChars = /[<>/{}]/;
    if (dangerousChars.test(email) || dangerousChars.test(password)) {
      setError("Caractères interdits détectés ! (Protection Injection)");
      return;
    }

    // Simulation de redirection RBAC (comme on a dit)
    if (email === "admin@shareease.com") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10">
        <h1 className="text-3xl font-black text-center mb-8">Connexion React</h1>
        
        {/* Affichage de l'erreur de sécurité si besoin */}
        {error && <p className="bg-red-100 text-red-600 p-3 rounded-xl text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="email" 
            placeholder="Email"
            className="w-full p-4 rounded-2xl bg-gray-50 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // React met à jour la mémoire ici
            required 
          />
          <input 
            type="password" 
            placeholder="Mot de passe"
            className="w-full p-4 rounded-2xl bg-gray-50 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;