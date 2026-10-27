import { useState } from 'react';

export default function AuthModal({ alIniciarSesion, alCerrar }) {
  const [nombrePiloto, setNombrePiloto] = useState('');

  const manejarLoginGoogle = (e) => {
    e.preventDefault();
    if (!nombrePiloto.trim()) return;

    // Guardamos los datos simulados del usuario conectado
    const usuarioSimulado = {
      nombre: nombrePiloto,
      correo: 'ingeniero.nexargt@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NexarGT',
      nivel: 'S',
      deportividad: 'S'
    };

    alIniciarSesion(usuarioSimulado);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 w-full max-w-md shadow-2xl relative text-white">
        
        <button onClick={alCerrar} className="absolute top-4 right-4 text-neutral-400 hover:text-white font-bold text-xl">&times;</button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-black italic tracking-wider text-blue-500">NEXAR GT HUB</h3>
          <p className="text-neutral-400 text-sm mt-1">Acceso exclusivo para miembros de la comunidad</p>
        </div>

        <form onSubmit={manejarLoginGoogle} className="space-y-4">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-center">
            <p className="text-xs text-neutral-400 mb-3">Conéctate utilizando tu cuenta de Google</p>
            <div className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-4 py-2 rounded-lg text-sm shadow">
              <span>🔵</span> Google Authentication
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1 font-semibold uppercase tracking-wider">Tu ID de PSN / Nombre en GT7</label>
            <input 
              type="text" 
              required 
              value={nombrePiloto}
              onChange={(e) => setNombrePiloto(e.target.value)}
              placeholder="Ej: Nexar_GT" 
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black py-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
          >
            Vincular Cuenta y Entrar
          </button>
        </form>

      </div>
    </div>
  );
}