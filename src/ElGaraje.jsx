import React, { useState, useEffect } from 'react';
import { Wrench, ShieldCheck, Plus, Trash2, CheckCircle2, Car } from 'lucide-react';

export default function ElGaraje({ isAdmin }) {
  const [setups, setSetups] = useState(() => {
    const saved = localStorage.getItem('nexargt_garaje_setups');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        author: 'NEXAR GT',
        car: 'Mazda RX-7 Gr.3',
        track: 'Interlagos',
        tyres: 'Racing Suaves',
        details: 'Diferencial: 10 / 30 / 15. Suspensión rebajada con rebote firme para las eses.',
        verified: true,
        date: 'Oficial'
      },
      {
        id: 2,
        author: 'SimRacer_Col',
        car: 'Porsche 911 RSR',
        track: 'Spa-Francorchamps',
        tyres: 'Racing Medias',
        details: 'Alineación delantera -0.15, trasera 0.20. Excelente tracción en la salida de La Source.',
        verified: false,
        date: 'Hace 2 días'
      }
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [car, setCar] = useState('');
  const [track, setTrack] = useState('');
  const [tyres, setTyres] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    localStorage.setItem('nexargt_garaje_setups', JSON.stringify(setups));
  }, [setups]);

  const handleAddSetup = (e) => {
    e.preventDefault();
    if (!author.trim() || !car.trim() || !details.trim()) return;

    const newSetup = {
      id: Date.now(),
      author: author,
      car: car,
      track: track || 'General / Varios',
      tyres: tyres || 'Libre',
      details: details,
      verified: false,
      date: 'Justo ahora'
    };

    setSetups([newSetup, ...setups]);
    setAuthor('');
    setCar('');
    setTrack('');
    setTyres('');
    setDetails('');
    setShowForm(false);
  };

  // Función exclusiva del Administrador para certificar un setup
  const toggleVerifySetup = (id) => {
    setSetups(setups.map(s => {
      if (s.id === id) {
        return { ...s, verified: !s.verified };
      }
      return s;
    }));
  };

  const handleDeleteSetup = (id) => {
    setSetups(setups.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 text-white">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-black p-6 rounded-2xl border border-blue-500/30 shadow-2xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center gap-2">
            <Wrench className="w-8 h-8 text-cyan-400" /> EL GARAJE & SETUPS
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Configuraciones de suspensión, diferencial y neumáticos compartidas por la comunidad y validadas por NEXAR GT.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-600/30 flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> {showForm ? 'Cancelar' : 'Compartir Setup'}
        </button>
      </div>

      {/* Formulario para subir setup */}
      {showForm && (
        <div className="bg-slate-900/95 border border-cyan-500/30 p-6 rounded-2xl shadow-xl mb-8">
          <h2 className="text-lg font-bold text-cyan-400 mb-4">Publicar un nuevo Setup en El Garaje</h2>
          <form onSubmit={handleAddSetup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu Nombre o Gamertag *"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
                required
              />
              <input
                type="text"
                placeholder="Coche (Ej: Porsche 911 GT3) *"
                value={car}
                onChange={(e) => setCar(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
                required
              />
              <input
                type="text"
                placeholder="Circuito (Ej: Nürburgring)"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                placeholder="Neumáticos (Ej: Racing Suaves)"
                value={tyres}
                onChange={(e) => setTyres(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <textarea
              placeholder="Detalles del setup (Presiones, relaciones de marcha, suspensión, diferencial...)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows="4"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-400 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 font-bold py-3 rounded-xl transition-all shadow-lg text-sm"
            >
              Guardar y Publicar Setup
            </button>
          </form>
        </div>
      )}

      {/* Lista de Setups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {setups.map((setup) => (
          <div 
            key={setup.id} 
            className={`bg-slate-900/90 border rounded-2xl p-5 shadow-xl transition-all relative flex flex-col justify-between ${
              setup.verified ? 'border-amber-500/60 shadow-amber-500/5' : 'border-slate-800'
            }`}
          >
            <div>
              {/* Insignia de Aprobado por Nexar si está verificado */}
              {setup.verified && (
                <div className="absolute top-4 right-4 bg-amber-500/10 border border-amber-500/40 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Aprobado por NEXAR GT
                </div>
              )}

              <div className="flex items-center gap-2 mb-2 pr-24">
                <Car className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg text-white">{setup.car}</h3>
              </div>

              <div className="flex flex-wrap gap-2 text-xs mb-3">
                <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-lg border border-slate-700">🏁 {setup.track}</span>
                <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-lg border border-slate-700">🛞 {setup.tyres}</span>
              </div>

              <p className="text-gray-300 text-sm bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-4 whitespace-pre-line leading-relaxed">
                {setup.details}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-gray-400">Por: <strong className="text-cyan-400">{setup.author}</strong></span>
              
              {/* Controles de Administrador */}
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={() => toggleVerifySetup(setup.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                      setup.verified 
                        ? 'bg-amber-500 text-black hover:bg-amber-400' 
                        : 'bg-slate-800 text-amber-400 border border-amber-500/30 hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> {setup.verified ? 'Certificado' : 'Aprobar'}
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteSetup(setup.id)}
                    className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                    title="Eliminar setup"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}