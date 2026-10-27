import { useState } from 'react';

export default function LegendaryTracker() {
  // Lista de coches legendarios con datos de rotación e historial
  const [coches, setCoches] = useState([
    { id: 1, nombre: 'McLaren F1 \'94', precio: '20,000,000 Cr', estadoEnStock: false, ultimaAparicion: 'Hace 45 días', rotacionEstimada: 'Próximamente (aprox. 12 días)', favorito: true },
    { id: 2, nombre: 'Ferrari F40 \'92', precio: '2,600,000 Cr', estadoEnStock: true, ultimaAparicion: 'Disponible Ahora', rotacionEstimada: 'Stock activo en Hagerty', favorito: true },
    { id: 3, nombre: 'Ford Mark IV Race Car \'67', precio: '4,600,000 Cr', estadoEnStock: false, ultimaAparicion: 'Hace 90 días', rotacionEstimada: 'Próximamente (aprox. 5 días)', favorito: false },
    { id: 4, nombre: 'Shelby G.T. 350 \'65', precio: '400,000 Cr', estadoEnStock: true, ultimaAparicion: 'Disponible Ahora', rotacionEstimada: 'Stock activo en Hagerty', favorito: false },
  ]);

  const [filtroFavoritos, setFiltroFavoritos] = useState(false);

  const toggleFavorito = (id) => {
    setCoches(coches.map(c => c.id === id ? { ...c, favorito: !c.favorito } : c));
  };

  const cochesFiltrados = filtroFavoritos ? coches.filter(c => c.favorito) : coches;

  return (
    <div className="w-full h-full p-8 flex flex-col gap-6 text-white overflow-y-auto">
      
      {/* Encabezado y Filtro */}
      <div className="flex flex-col md:flex-row justify-between items-end pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-3xl font-black italic tracking-wider">HAGERTY TRACKER</h2>
          <p className="text-neutral-400">Rastreador de rotación de Autos Legendarios y alertas de stock</p>
        </div>
        <button 
          onClick={() => setFiltroFavoritos(!filtroFavoritos)}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all mt-4 md:mt-0 border ${
            filtroFavoritos 
              ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
              : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
          }`}
        >
          ⭐ {filtroFavoritos ? 'Mostrando Mis Favoritos' : 'Filtrar Mis Favoritos'}
        </button>
      </div>

      {/* Cuadrícula de Coches */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cochesFiltrados.map((coche) => (
          <div 
            key={coche.id} 
            className={`bg-neutral-900 border rounded-xl p-5 flex flex-col justify-between transition-all ${
              coche.estadoEnStock ? 'border-green-500/50 shadow-[0_4px_20px_rgba(34,197,94,0.1)]' : 'border-neutral-800'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                  coche.estadoEnStock ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                }`}>
                  {coche.estadoEnStock ? '🟢 EN STOCK' : '🔴 AGOTADO'}
                </span>
                <button 
                  onClick={() => toggleFavorito(coche.id)}
                  className={`text-lg transition-transform hover:scale-125 ${coche.favorito ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                  title="Marcar como favorito para alertas"
                >
                  ⭐
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 truncate">{coche.nombre}</h3>
              <p className="text-yellow-500 font-mono font-bold text-sm mb-4">{coche.precio}</p>
            </div>

            <div className="bg-black/50 p-3 rounded-lg border border-neutral-800/50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Última vez:</span>
                <span className="text-neutral-300 font-mono">{coche.ultimaAparicion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimación:</span>
                <span className="text-blue-400 font-mono font-semibold">{coche.rotacionEstimada}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}