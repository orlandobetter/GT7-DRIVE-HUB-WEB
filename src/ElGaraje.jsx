import { useState } from 'react';

export default function ElGaraje() {
  const [setups, setSetups] = useState([
    { 
      id: 1, coche: 'Chevrolet Corvette C7 \'14', circuito: 'Cualquiera', pr: '582.69', hp: '488', peso: '1500', autor: 'NexarGT', oficial: true, likes: 890,
      detalles: {
        neumaticoDel: 'Deportivos: duros', neumaticoTras: 'Deportivos: duros',
        suspension: { alturaF: '127', alturaR: '132', antivuelcoF: '1', antivuelcoR: '1', compF: '35', compR: '35', expF: '45', expR: '45', frecF: '1.90', frecR: '2.10', caidaF: '0.5', caidaR: '1.5', convF: '0.00', convR: '0.20' },
        diferencial: { parF: '0', parR: '7', acelF: '0', acelR: '30', frenoF: '0', frenoR: '15' },
        aero: { del: '40', tras: '40' },
        rendimiento: { ecu: '100', lastre: '0', posLastre: '0', limitador: '100' }
      }
    }
  ]);

  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [setupViendo, setSetupViendo] = useState(null);

  // Estado del formulario mapeado 1:1 con la hoja de configuración de GT7
  const [nuevo, setNuevo] = useState({
    coche: '', circuito: '', pr: '', hp: '', peso: '', autor: '',
    neumaticoDel: 'Deportivos: duros', neumaticoTras: 'Deportivos: duros',
    alturaF: '', alturaR: '', antivuelcoF: '', antivuelcoR: '', compF: '', compR: '', expF: '', expR: '', frecF: '', frecR: '', caidaF: '', caidaR: '', convF: '', convR: '',
    parF: '', parR: '', acelF: '', acelR: '', frenoF: '', frenoR: '',
    aeroDel: '', aeroTras: '', ecu: '100', lastre: '0', posLastre: '0', limitador: '100'
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nuevo.coche || !nuevo.pr || !nuevo.autor) return;
    
    const setupAgregado = {
      id: Date.now(),
      coche: nuevo.coche, circuito: nuevo.circuito, pr: nuevo.pr, hp: nuevo.hp, peso: nuevo.peso, autor: nuevo.autor, oficial: false, likes: 0,
      detalles: {
        neumaticoDel: nuevo.neumaticoDel, neumaticoTras: nuevo.neumaticoTras,
        suspension: { alturaF: nuevo.alturaF||'0', alturaR: nuevo.alturaR||'0', antivuelcoF: nuevo.antivuelcoF||'0', antivuelcoR: nuevo.antivuelcoR||'0', compF: nuevo.compF||'0', compR: nuevo.compR||'0', expF: nuevo.expF||'0', expR: nuevo.expR||'0', frecF: nuevo.frecF||'0', frecR: nuevo.frecR||'0', caidaF: nuevo.caidaF||'0', caidaR: nuevo.caidaR||'0', convF: nuevo.convF||'0', convR: nuevo.convR||'0' },
        diferencial: { parF: nuevo.parF||'0', parR: nuevo.parR||'0', acelF: nuevo.acelF||'0', acelR: nuevo.acelR||'0', frenoF: nuevo.frenoF||'0', frenoR: nuevo.frenoR||'0' },
        aero: { del: nuevo.aeroDel||'0', tras: nuevo.aeroTras||'0' },
        rendimiento: { ecu: nuevo.ecu||'100', lastre: nuevo.lastre||'0', posLastre: nuevo.posLastre||'0', limitador: nuevo.limitador||'100' }
      }
    };
    
    setSetups([setupAgregado, ...setups]);
    setMostrarModalNuevo(false);
  };

  return (
    <div className="w-full h-full p-8 flex flex-col gap-6 text-white overflow-y-auto relative bg-[#0a0a0a]">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-3xl font-black italic tracking-wider">EL GARAJE</h2>
          <p className="text-neutral-400">Base de datos de reglajes de la comunidad</p>
        </div>
        <button onClick={() => setMostrarModalNuevo(true)} className="bg-green-600 hover:bg-green-500 font-bold px-6 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(22,163,74,0.4)] mt-4 md:mt-0">
          + Compartir Setup
        </button>
      </div>

      {/* TARJETAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-2">
        {setups.map((setup) => (
          <div key={setup.id} className={`relative bg-neutral-900 rounded-xl p-6 flex flex-col gap-4 border transition-all hover:scale-[1.02] ${setup.oficial ? 'border-yellow-500/50 shadow-[0_4px_20px_rgba(234,179,8,0.1)]' : 'border-neutral-800'}`}>
            {setup.oficial && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] border border-yellow-200 uppercase tracking-wider">
                ⭐ Aprobado por NexarGT
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-white truncate">{setup.coche}</h3>
              <p className="text-neutral-400 text-sm mt-1">PR {setup.pr} • {setup.hp} HP • {setup.peso} kg</p>
            </div>
            <button onClick={() => setSetupViendo(setup)} className="w-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 font-bold py-2 rounded border border-blue-500/30 transition-colors text-sm">
              📋 Ver Hoja de Configuración
            </button>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-800">
              <span className="text-sm font-bold text-neutral-300">Por {setup.autor}</span>
              <span className="text-red-500 text-sm">❤️ {setup.likes}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: VER HOJA DE CONFIGURACIÓN */}
      {setupViendo && (
        <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="bg-[#111] border border-neutral-700 rounded-xl w-full max-w-5xl shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Header del Modal */}
            <div className="bg-[#1a1a1a] p-4 flex justify-between items-center border-b border-neutral-700 sticky top-0 z-10">
              <div>
                <h3 className="text-2xl font-bold text-white">{setupViendo.coche}</h3>
                <p className="text-neutral-400 text-sm">PR {setupViendo.pr} • {setupViendo.hp} HP • Setup por {setupViendo.autor}</p>
              </div>
              <button onClick={() => setSetupViendo(null)} className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded font-bold">Cerrar</button>
            </div>

            {/* Hoja de Setup Réplica GT7 */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
              
              {/* Columna Izquierda: Suspensión y Diferencial */}
              <div className="space-y-6">
                
                {/* Neumáticos */}
                <div className="border border-neutral-800 rounded bg-[#0a0a0a]">
                  <div className="bg-[#1a1a1a] px-3 py-1 text-xs text-neutral-400 font-bold border-b border-neutral-800">Neumáticos</div>
                  <div className="p-3 grid grid-cols-2 gap-2">
                    <div className="text-neutral-400 text-right">Delantera</div><div className="font-bold text-white">{setupViendo.detalles.neumaticoDel}</div>
                    <div className="text-neutral-400 text-right">Trasera</div><div className="font-bold text-white">{setupViendo.detalles.neumaticoTras}</div>
                  </div>
                </div>

                {/* Suspensión */}
                <div className="border border-neutral-800 rounded bg-[#0a0a0a]">
                  <div className="bg-[#1a1a1a] px-3 py-1 text-xs text-neutral-400 font-bold border-b border-neutral-800 flex justify-between">
                    <span>Suspensión</span>
                    <div className="flex gap-12 mr-8"><span>Delantera</span><span>Trasera</span></div>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      {label: 'Ajuste de altura de carrocería', uni: 'mm', vF: setupViendo.detalles.suspension.alturaF, vR: setupViendo.detalles.suspension.alturaR},
                      {label: 'Barra antivuelco', uni: 'Nivel', vF: setupViendo.detalles.suspension.antivuelcoF, vR: setupViendo.detalles.suspension.antivuelcoR},
                      {label: 'Amortiguación (compresión)', uni: '%', vF: setupViendo.detalles.suspension.compF, vR: setupViendo.detalles.suspension.compR},
                      {label: 'Amortiguación (expansión)', uni: '%', vF: setupViendo.detalles.suspension.expF, vR: setupViendo.detalles.suspension.expR},
                      {label: 'Frecuencia natural', uni: 'Hz', vF: setupViendo.detalles.suspension.frecF, vR: setupViendo.detalles.suspension.frecR},
                      {label: 'Ángulo de caída negativo', uni: 'Grados', vF: setupViendo.detalles.suspension.caidaF, vR: setupViendo.detalles.suspension.caidaR},
                      {label: 'Ángulo de convergencia', uni: 'Grados', vF: setupViendo.detalles.suspension.convF, vR: setupViendo.detalles.suspension.convR},
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-neutral-900 pb-1">
                        <span className="text-neutral-400 w-1/2">{item.label} <span className="text-[10px] ml-1">{item.uni}</span></span>
                        <div className="w-1/2 flex justify-end gap-12 font-mono font-bold text-white">
                          <span className="w-10 text-right bg-neutral-900 px-1 rounded">{item.vF}</span>
                          <span className="w-10 text-right bg-neutral-900 px-1 rounded">{item.vR}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diferencial */}
                <div className="border border-neutral-800 rounded bg-[#0a0a0a]">
                  <div className="bg-[#1a1a1a] px-3 py-1 text-xs text-neutral-400 font-bold border-b border-neutral-800 flex justify-between">
                    <span>Engranaje diferencial</span>
                    <div className="flex gap-12 mr-8"><span>Delantera</span><span>Trasera</span></div>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      {label: 'Par motor inicial', uni: 'Nivel', vF: setupViendo.detalles.diferencial.parF, vR: setupViendo.detalles.diferencial.parR},
                      {label: 'Sensibilidad de aceleración', uni: 'Nivel', vF: setupViendo.detalles.diferencial.acelF, vR: setupViendo.detalles.diferencial.acelR},
                      {label: 'Sensibilidad de frenado', uni: 'Nivel', vF: setupViendo.detalles.diferencial.frenoF, vR: setupViendo.detalles.diferencial.frenoR},
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-neutral-900 pb-1">
                        <span className="text-neutral-400 w-1/2">{item.label} <span className="text-[10px] ml-1">{item.uni}</span></span>
                        <div className="w-1/2 flex justify-end gap-12 font-mono font-bold text-white">
                          <span className="w-10 text-right bg-neutral-900 px-1 rounded">{item.vF}</span>
                          <span className="w-10 text-right bg-neutral-900 px-1 rounded">{item.vR}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Columna Derecha: Aerodinámica y Rendimiento */}
              <div className="space-y-6">
                
                {/* Aerodinámica */}
                <div className="border border-neutral-800 rounded bg-[#0a0a0a]">
                  <div className="bg-[#1a1a1a] px-3 py-1 text-xs text-neutral-400 font-bold border-b border-neutral-800 flex justify-between">
                    <span>Aerodinámica</span>
                    <div className="flex gap-12 mr-8"><span>Delantera</span><span>Trasera</span></div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 w-1/2">Carga aerodinámica <span className="text-[10px] ml-1">Nivel</span></span>
                      <div className="w-1/2 flex justify-end gap-12 font-mono font-bold text-white">
                        <span className="w-10 text-right bg-neutral-900 px-1 rounded">{setupViendo.detalles.aero.del}</span>
                        <span className="w-10 text-right bg-neutral-900 px-1 rounded">{setupViendo.detalles.aero.tras}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ECU & Rendimiento */}
                <div className="border border-neutral-800 rounded bg-[#0a0a0a]">
                  <div className="bg-[#1a1a1a] px-3 py-1 text-xs text-neutral-400 font-bold border-b border-neutral-800">ECU & Ajuste de Rendimiento</div>
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-1">
                      <span className="text-neutral-400">Ajuste de salida (ECU) <span className="text-[10px] ml-1">%</span></span>
                      <span className="font-mono font-bold text-white bg-neutral-900 px-2 py-0.5 rounded">{setupViendo.detalles.rendimiento.ecu}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-1">
                      <span className="text-neutral-400">Lastre <span className="text-[10px] ml-1">kg</span></span>
                      <span className="font-mono font-bold text-white bg-neutral-900 px-2 py-0.5 rounded">{setupViendo.detalles.rendimiento.lastre}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-1">
                      <span className="text-neutral-400">Posición del lastre</span>
                      <span className="font-mono font-bold text-white bg-neutral-900 px-2 py-0.5 rounded">{setupViendo.detalles.rendimiento.posLastre}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-neutral-900 pb-1">
                      <span className="text-neutral-400">Limitador de potencia <span className="text-[10px] ml-1">%</span></span>
                      <span className="font-mono font-bold text-white bg-neutral-900 px-2 py-0.5 rounded">{setupViendo.detalles.rendimiento.limitador}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUBIR REGLAJE COMPLETO */}
      {mostrarModalNuevo && (
        <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="bg-[#111] border border-neutral-700 rounded-xl w-full max-w-4xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="bg-[#1a1a1a] p-4 flex justify-between items-center border-b border-neutral-700 sticky top-0 z-10">
              <h3 className="text-xl font-bold text-white">Editor de Hoja de Configuración</h3>
              <button onClick={() => setMostrarModalNuevo(false)} className="text-neutral-400 hover:text-white font-bold">&times; Cancelar</button>
            </div>
            
            <form onSubmit={manejarEnvio} className="p-6 space-y-6">
              
              {/* Rendimiento Básico */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1a1a1a] p-4 rounded border border-neutral-800">
                <input type="text" placeholder="Coche *" required onChange={e=>setNuevo({...nuevo, coche: e.target.value})} className="col-span-2 md:col-span-4 bg-black border border-neutral-700 rounded p-2 text-white text-sm" />
                <input type="number" placeholder="PR *" step="0.01" required onChange={e=>setNuevo({...nuevo, pr: e.target.value})} className="bg-black border border-neutral-700 rounded p-2 text-white text-sm" />
                <input type="number" placeholder="Potencia (HP)" onChange={e=>setNuevo({...nuevo, hp: e.target.value})} className="bg-black border border-neutral-700 rounded p-2 text-white text-sm" />
                <input type="number" placeholder="Peso (kg)" onChange={e=>setNuevo({...nuevo, peso: e.target.value})} className="bg-black border border-neutral-700 rounded p-2 text-white text-sm" />
                <input type="text" placeholder="Tu Nombre *" required onChange={e=>setNuevo({...nuevo, autor: e.target.value})} className="bg-black border border-neutral-700 rounded p-2 text-white text-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs Suspensión */}
                <div className="space-y-3 bg-[#0a0a0a] p-4 rounded border border-neutral-800">
                  <h4 className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-1">Suspensión (Del / Tras)</h4>
                  {[
                    { label: 'Altura (mm)', kF: 'alturaF', kR: 'alturaR' },
                    { label: 'Barra Antivuelco', kF: 'antivuelcoF', kR: 'antivuelcoR' },
                    { label: 'Amort. Compresión %', kF: 'compF', kR: 'compR' },
                    { label: 'Amort. Expansión %', kF: 'expF', kR: 'expR' },
                    { label: 'Frec. Natural (Hz)', kF: 'frecF', kR: 'frecR' },
                    { label: 'Ángulo Caída (-)', kF: 'caidaF', kR: 'caidaR' },
                    { label: 'Convergencia', kF: 'convF', kR: 'convR' }
                  ].map((field, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <label className="text-xs text-neutral-400 w-1/2">{field.label}</label>
                      <div className="w-1/2 flex gap-2">
                        <input type="text" onChange={e=>setNuevo({...nuevo, [field.kF]: e.target.value})} className="w-1/2 bg-black border border-neutral-700 rounded p-1 text-center text-white text-xs font-mono" placeholder="Del" />
                        <input type="text" onChange={e=>setNuevo({...nuevo, [field.kR]: e.target.value})} className="w-1/2 bg-black border border-neutral-700 rounded p-1 text-center text-white text-xs font-mono" placeholder="Tras" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inputs Diferencial y Aero */}
                <div className="space-y-6">
                  <div className="space-y-3 bg-[#0a0a0a] p-4 rounded border border-neutral-800">
                    <h4 className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-1">Diferencial (Del / Tras)</h4>
                    {[
                      { label: 'Par inicial', kF: 'parF', kR: 'parR' },
                      { label: 'Sens. Aceleración', kF: 'acelF', kR: 'acelR' },
                      { label: 'Sens. Frenado', kF: 'frenoF', kR: 'frenoR' }
                    ].map((field, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <label className="text-xs text-neutral-400 w-1/2">{field.label}</label>
                        <div className="w-1/2 flex gap-2">
                          <input type="number" onChange={e=>setNuevo({...nuevo, [field.kF]: e.target.value})} className="w-1/2 bg-black border border-neutral-700 rounded p-1 text-center text-white text-xs font-mono" placeholder="0" />
                          <input type="number" onChange={e=>setNuevo({...nuevo, [field.kR]: e.target.value})} className="w-1/2 bg-black border border-neutral-700 rounded p-1 text-center text-white text-xs font-mono" placeholder="0" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 bg-[#0a0a0a] p-4 rounded border border-neutral-800">
                    <h4 className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-1">Aero & Rendimiento</h4>
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-neutral-400 w-1/2">Carga Aero (Del/Tras)</label>
                      <div className="w-1/2 flex gap-2">
                        <input type="number" onChange={e=>setNuevo({...nuevo, aeroDel: e.target.value})} className="w-1/2 bg-black border border-neutral-700 rounded p-1 text-center text-white text-xs font-mono" placeholder="Del" />
                        <input type="number" onChange={e=>setNuevo({...nuevo, aeroTras: e.target.value})} className="w-1/2 bg-black border border-neutral-700 rounded p-1 text-center text-white text-xs font-mono" placeholder="Tras" />
                      </div>
                    </div>
                    <div className="flex justify-between gap-4 mt-4">
                      <div className="w-1/2">
                        <label className="block text-[10px] text-neutral-500 mb-1">Limitador Potencia %</label>
                        <input type="number" onChange={e=>setNuevo({...nuevo, limitador: e.target.value})} className="w-full bg-black border border-neutral-700 rounded p-1 text-white text-sm font-mono text-center" placeholder="100" />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-[10px] text-neutral-500 mb-1">Lastre (kg)</label>
                        <input type="number" onChange={e=>setNuevo({...nuevo, lastre: e.target.value})} className="w-full bg-black border border-neutral-700 rounded p-1 text-white text-sm font-mono text-center" placeholder="0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  Guardar Hoja de Configuración
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}