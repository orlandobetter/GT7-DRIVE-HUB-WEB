import { useState } from 'react';

export default function TimeAttack() {
  const [ranking, setRanking] = useState([
    { posicion: 1, piloto: 'NexarGT', tiempo: '01:52.410', coche: 'Porsche 911 RSR', insignia: '⭐ Oficial' },
    { posicion: 2, piloto: 'Vortex_Sim', tiempo: '01:52.890', coche: 'Porsche 911 RSR', insignia: 'Platino' },
    { posicion: 3, piloto: 'GT_Colombia', tiempo: '01:53.320', coche: 'BMW M6 GT3', insignia: 'Oro' },
  ]);

  const [nuevoTiempo, setNuevoTiempo] = useState('');
  const [nombrePiloto, setNombrePiloto] = useState('');

  const agregarRecord = (e) => {
    e.preventDefault();
    if (!nuevoTiempo || !nombrePiloto) return;

    const nuevoRegistro = {
      posicion: ranking.length + 1,
      piloto: nombrePiloto,
      tiempo: nuevoTiempo,
      coche: 'Coche Libre',
      insignia: 'Comunidad'
    };

    const actualizado = [...ranking, nuevoRegistro].sort((a, b) => a.tiempo.localeCompare(b.tiempo));
    // Reasignar posiciones ordenadas
    const ordenadosConPosicion = actualizado.map((item, index) => ({ ...item, posicion: index + 1 }));
    
    setRanking(ordenadosConPosicion);
    setNuevoTiempo('');
    setNombrePiloto('');
  };

  return (
    <div className="w-full h-full p-8 flex flex-col gap-6 text-white overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black italic tracking-wider">TIME ATTACK COMUNITARIO</h2>
        <p className="text-neutral-400">Circuito activo de la semana: <span className="text-white font-bold">Spa-Francorchamps</span></p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Tabla de Clasificación */}
        <div className="xl:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
            <h3 className="font-bold text-lg">Tabla de Líderes Global</h3>
            <span className="text-xs font-mono bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">ACTIVO</span>
          </div>

          <div className="divide-y divide-neutral-800">
            {ranking.map((row) => (
              <div key={row.posicion} className={`flex items-center justify-between px-6 py-4 ${row.posicion === 1 ? 'bg-yellow-500/10 border-l-4 border-yellow-500' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${row.posicion === 1 ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-neutral-300'}`}>
                    #{row.posicion}
                  </span>
                  <div>
                    <p className="font-bold text-white">{row.piloto}</p>
                    <p className="text-xs text-neutral-400">{row.coche}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl font-black text-blue-400">{row.tiempo}</span>
                  <span className="block text-[10px] text-neutral-500">{row.insignia}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario para enviar marca */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Registrar Tu Vuelta</h3>
            <p className="text-xs text-neutral-400 mb-6">Sube tu tiempo personal para competir en el ranking semanal de NexarGT.</p>
            
            <form onSubmit={agregarRecord} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Nombre de Piloto / PSN</label>
                <input 
                  type="text" 
                  required 
                  value={nombrePiloto}
                  onChange={(e) => setNombrePiloto(e.target.value)}
                  placeholder="Ej: SpeedMaster_07" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Mejor Tiempo (Ej: 01:52.500)</label>
                <input 
                  type="text" 
                  required 
                  value={nuevoTiempo}
                  onChange={(e) => setNuevoTiempo(e.target.value)}
                  placeholder="01:00.000" 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white text-sm font-mono"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black py-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all"
              >
                Enviar Mi Tiempo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}