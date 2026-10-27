import { useState, useEffect } from 'react';

export default function Gt7Hub() {
  const [girando, setGirando] = useState(false);
  const [premio, setPremio] = useState(null);
  const [activo, setActivo] = useState(0);
  
  // Estado para las carreras diarias reales
  const [carreras, setCarreras] = useState([]);
  const [cargandoCarreras, setCargandoCarreras] = useState(true);

  // Obtener datos reales de las Daily Races desde la API de la comunidad
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ddm999/gt7info/web-new/data.json')
      .then(res => res.json())
      .then(data => {
        // Filtramos solo las carreras diarias (A, B, C)
        const dailies = data.dailies || [];
        setCarreras(dailies);
        setCargandoCarreras(false);
      })
      .catch(err => {
        console.error("Error cargando carreras reales:", err);
        setCargandoCarreras(false);
      });
  }, []);

  const premios = [
    { id: 0, tipo: 'Créditos', valor: '1,000,000 Cr', color: 'from-yellow-600 to-yellow-400', icono: '💰' },
    { id: 1, tipo: 'Pieza', valor: 'Suspensión Extrema', color: 'from-blue-600 to-blue-400', icono: '⚙️' },
    { id: 2, tipo: 'Motor', valor: 'Engine Swap', color: 'from-purple-600 to-purple-400', icono: '🔥' },
    { id: 3, tipo: 'Créditos', valor: '500,000 Cr', color: 'from-yellow-600 to-yellow-400', icono: '💰' },
    { id: 4, tipo: 'Coche', valor: 'Invitación Especial', color: 'from-red-600 to-red-400', icono: '🏎️' },
    { id: 5, tipo: 'Créditos', valor: '100,000 Cr', color: 'from-yellow-600 to-yellow-400', icono: '💰' },
  ];

  const tirarRuleta = () => {
    if (girando) return;
    setGirando(true);
    setPremio(null);

    const vueltasMinimas = 24; 
    const indexGanador = Math.floor(Math.random() * premios.length);
    const totalPasos = vueltasMinimas + indexGanador;

    let pasoActual = 0;
    let tiempo = 50; 

    const iterar = () => {
      setActivo((prev) => (prev + 1) % premios.length);
      pasoActual++;

      if (pasoActual < totalPasos) {
        if (pasoActual > totalPasos - 10) tiempo += 35;
        setTimeout(iterar, tiempo);
      } else {
        setGirando(false);
        setPremio(premios[indexGanador]);
      }
    };
    setTimeout(iterar, tiempo);
  };

  const getLetraCarrera = (index) => {
    if (index === 0) return { letra: 'A', color: 'text-blue-500' };
    if (index === 1) return { letra: 'B', color: 'text-green-500' };
    return { letra: 'C', color: 'text-red-500' };
  };

  return (
    <div className="w-full h-full p-8 flex flex-col xl:flex-row gap-8 text-white overflow-y-auto">
      
      {/* COLUMNA IZQUIERDA */}
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-black italic tracking-wider">GT7 HUB</h2>
          <p className="text-neutral-400">Estado de servidores y carreras en vivo</p>
        </div>

        {/* Daily Races Reales */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex-1">
          <h3 className="text-lg font-bold text-neutral-300 mb-4 border-b border-neutral-800 pb-2">
            Carreras Diarias Oficiales (Modo Sport)
          </h3>
          <div className="space-y-4">
            {cargandoCarreras ? (
              <div className="text-center p-8 text-neutral-500 animate-pulse">
                Conectando con servidores de GT7...
              </div>
            ) : carreras.length > 0 ? (
              carreras.map((carrera, index) => {
                const infoLetra = getLetraCarrera(index);
                return (
                  <div key={index} className="bg-black/50 p-4 rounded-lg border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center">
                      <span className={`${infoLetra.color} font-black text-2xl mr-4`}>{infoLetra.letra}</span>
                      <div>
                        <span className="font-bold text-lg">{carrera.Track.BoardName}</span>
                        <p className="text-xs text-neutral-400">{carrera.Category} / {carrera.LimitLaps} Vueltas</p>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400 md:text-right bg-neutral-900/50 p-2 rounded">
                      <p>Neumáticos: {carrera.LimitTireRequire?.join(', ') || 'Por defecto'}</p>
                      <p>BOP: {carrera.BopType === 0 ? 'Desactivado' : 'Activado'}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center p-8 text-red-500">Error al obtener las carreras diarias reales.</div>
            )}
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Ruleta */}
      <div className="w-full xl:w-[450px] bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <h3 className="text-2xl font-black italic text-center mb-1">TICKET DE RULETA</h3>
        <p className="text-yellow-500 font-bold text-sm tracking-widest mb-8">⭐⭐⭐⭐⭐⭐</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] mb-8">
          {premios.map((p, i) => (
            <div key={p.id} className={`h-24 rounded-xl flex flex-col items-center justify-center border-2 transition-all duration-75 ${
                activo === i ? 'border-white bg-white/20 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10' : 'border-neutral-700 bg-black/50 opacity-50'
              }`}>
              <span className="text-3xl mb-1">{p.icono}</span>
              <span className="text-xs font-bold text-center px-2">{p.tipo}</span>
            </div>
          ))}
        </div>

        <div className="h-24 w-full flex flex-col items-center justify-center">
          {!girando && !premio && (
            <button onClick={tirarRuleta} className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black px-8 py-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all hover:scale-105">
              CANJEAR TICKET
            </button>
          )}
          {girando && <div className="text-neutral-400 font-bold animate-pulse tracking-widest">GIRANDO...</div>}
          {premio && !girando && (
            <div className="text-center animate-[bounce_0.5s_ease-in-out]">
              <p className="text-sm font-bold text-neutral-400 mb-1">¡HAS GANADO!</p>
              <div className={`inline-block px-6 py-2 rounded-lg bg-gradient-to-r ${premio.color} text-black font-black text-xl shadow-lg border border-white/30`}>
                {premio.valor}
              </div>
              <button onClick={() => setPremio(null)} className="block mx-auto mt-4 text-xs text-neutral-500 hover:text-white underline underline-offset-4">
                Tirar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}