import { useState } from 'react';

export default function ClipsComunidad() {
  const [clips, setClips] = useState([
    { id: 1, titulo: '¡Adelantamiento imposible en la última curva de Suzuka!', autor: 'Juan_Gamer', plataforma: 'YouTube', likes: 112 },
    { id: 2, titulo: 'Cuando calculas mal el frenaje en Nürburgring 😅', autor: 'CarlosGT', plataforma: 'TikTok', likes: 89 },
  ]);

  const [nuevoClip, setNuevoClip] = useState({ titulo: '', autor: '', url: '' });

  const enviarClip = (e) => {
    e.preventDefault();
    if (!nuevoClip.titulo || !nuevoClip.autor) return;

    setClips([{ id: Date.now(), ...nuevoClip, plataforma: 'Comunidad', likes: 1 }, ...clips]);
    setNuevoClip({ titulo: '', autor: '', url: '' });
  };

  return (
    <div className="w-full h-full p-8 flex flex-col gap-6 text-white overflow-y-auto">
      <div className="flex justify-between items-end pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-3xl font-black italic tracking-wider">MURO DE CLIPS</h2>
          <p className="text-neutral-400">Los mejores momentos, adelantamientos y fails de la comunidad</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Clips */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {clips.map((clip) => (
            <div key={clip.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold bg-neutral-800 text-neutral-300 px-2 py-1 rounded uppercase tracking-wider">
                  {clip.plataforma}
                </span>
                <h3 className="font-bold text-lg text-white mt-3 mb-2">{clip.titulo}</h3>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800 mt-4">
                <span className="text-xs text-neutral-400 font-semibold">Por @{clip.autor}</span>
                <button className="text-neutral-400 hover:text-red-500 text-sm flex items-center gap-1 transition-colors">
                  ❤️ {clip.likes}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enviar Clip */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl h-fit">
          <h3 className="text-xl font-bold text-white mb-2">Compartir Clip</h3>
          <p className="text-xs text-neutral-400 mb-6">Comparte tu mejor jugada ocurrida en los directos o partidas de NexarGT.</p>
          
          <form onSubmit={enviarClip} className="space-y-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Título del Clip</label>
              <input 
                type="text" 
                required 
                value={nuevoClip.titulo}
                onChange={(e) => setNuevoClip({...nuevoClip, titulo: e.target.value})}
                placeholder="Ej: ¡Victoria en el último segundo!" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Tu Nombre de Usuario</label>
              <input 
                type="text" 
                required 
                value={nuevoClip.autor}
                onChange={(e) => setNuevoClip({...nuevoClip, autor: e.target.value})}
                placeholder="Tu nick" 
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white text-sm"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-3 rounded-xl shadow-[0_0_15px_rgba(22,163,74,0.4)] transition-all"
            >
              Publicar en el Muro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}