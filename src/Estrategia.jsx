import { useState } from 'react';

export default function Estrategia() {
  const [vueltasTotales, setVueltasTotales] = useState(30);
  const [consumoBaseVuelta, setConsumoBaseVuelta] = useState(2.0); // % por vuelta en Mapa 1
  const [mapaCombustible, setMapaCombustible] = useState(1); // 1 al 6
  const [compuesto, setCompuesto] = useState('Medio');
  const [multCarreraGas, setMultCarreraGas] = useState(5); // Multiplicador de la sala
  const [multCarreraNeum, setMultCarreraNeum] = useState(5);
  const [pitLaneLoss, setPitLaneLoss] = useState(20); // Segundos perdidos en pits

  // Factores del Mapa de Combustible
  const factoresMapa = {
    1: 1.00, // Potencia máxima
    2: 0.85, 
    3: 0.77, 
    4: 0.65, 
    5: 0.58, 
    6: 0.48  // Lean / Ahorro máximo
  };

  // Tasas de desgaste base por compuesto (referencia con Duro = 1.0)
  const factoresCompuesto = {
    'Duro': 1.0,
    'Medio': 1.6,
    'Blando': 2.8
  };

  // Cálculos matemáticos avanzados basados en física de GT7
  const consumoRealPorVuelta = consumoBaseVuelta * multCarreraGas * factoresMapa[mapaCombustible];
  const porcentajeTotalGasolina = consumoRealPorVuelta * vueltasTotales;
  const vueltasMaxTanque = consumoRealPorVuelta > 0 ? Math.floor(100 / consumoRealPorVuelta) : 0;
  const paradasGasolina = Math.max(0, Math.ceil(porcentajeTotalGasolina / 100) - 1);

  // Desgaste de neumáticos (100% de barra útil)
  const tasaDesgastePorVuelta = 1.2 * multCarreraNeum * factoresCompuesto[compuesto];
  const vueltasVidaNeumatico = tasaDesgastePorVuelta > 0 ? Math.floor(100 / tasaDesgastePorVuelta) : vueltasTotales;
  const paradasNeumaticos = Math.max(0, Math.ceil(vueltasTotales / vueltasVidaNeumatico) - 1);

  const paradasTotales = Math.max(paradasGasolina, paradasNeumaticos);
  const tiempoTotalPerdidoPits = paradasTotales * pitLaneLoss;

  return (
    <div className="w-full h-full p-8 flex flex-col gap-6 text-white overflow-y-auto font-sans">
      <div>
        <h2 className="text-3xl font-black italic tracking-wider">ESTRATEGIA TÁCTICA DE PITS</h2>
        <p className="text-neutral-400">Calculadora basada en el motor físico avanzado de Gran Turismo 7 (Fases de desgaste y mapas de motor)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        
        {/* PANEL DE CONFIGURACIÓN */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
          <h3 className="text-xl font-bold text-blue-400 border-b border-neutral-800 pb-2">Parámetros de Sala y Telemetría</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Vueltas Totales</label>
              <input type="number" value={vueltasTotales} onChange={e => setVueltasTotales(Number(e.target.value))} className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Pérdida Pit Lane (s)</label>
              <input type="number" value={pitLaneLoss} onChange={e => setPitLaneLoss(Number(e.target.value))} className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Mult. Gasolina (Sala)</label>
              <input type="number" value={multCarreraGas} onChange={e => setMultCarreraGas(Number(e.target.value))} className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Mult. Neumáticos (Sala)</label>
              <input type="number" value={multCarreraNeum} onChange={e => setMultCarreraNeum(Number(e.target.value))} className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Consumo Base / Vuelta (%)</label>
              <input type="number" step="0.1" value={consumoBaseVuelta} onChange={e => setConsumoBaseVuelta(Number(e.target.value))} className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Mapa de Combustible</label>
              <select value={mapaCombustible} onChange={e => setMapaCombustible(Number(e.target.value))} className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white font-bold">
                <option value={1}>Mapa 1 (Potencia 100%)</option>
                <option value={2}>Mapa 2 (Ahorro ligero)</option>
                <option value={3}>Mapa 3 (Moderado)</option>
                <option value={4}>Mapa 4 (Económico)</option>
                <option value={5}>Mapa 5 (Alto ahorro)</option>
                <option value={6}>Mapa 6 (Lean / Máximo ahorro)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Compuesto de Neumáticos Inicial</label>
            <select value={compuesto} onChange={e => setCompuesto(e.target.value)} className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white font-bold">
              <option value="Blando">Racing Soft (Blando) - Alto desgaste</option>
              <option value="Medio">Racing Medium (Medio) - Balanceado</option>
              <option value="Duro">Racing Hard (Duro) - Larga duración</option>
            </select>
          </div>
        </div>

        {/* PANEL DE RESULTADOS TÁCTICOS */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col justify-between">
          <h3 className="text-xl font-bold text-green-400 border-b border-neutral-800 pb-2">Planificador de Estrategia Óptima</h3>
          
          <div className="space-y-4 my-auto">
            <div className="bg-black/50 p-4 rounded-lg border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Consumo Estimado por Vuelta:</span>
              <span className="text-xl font-mono font-bold text-blue-400">{consumoRealPorVuelta.toFixed(2)}% del tanque</span>
            </div>

            <div className="bg-black/50 p-4 rounded-lg border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Autonomía Máxima (Combustible):</span>
              <span className="text-xl font-mono font-bold text-white">{vueltasMaxTanque} Vueltas</span>
            </div>

            <div className="bg-black/50 p-4 rounded-lg border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Vida Útil Estimada Gomas ({compuesto}):</span>
              <span className="text-xl font-mono font-bold text-yellow-400">~{vueltasVidaNeumatico} Vueltas</span>
            </div>

            <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-700 flex justify-between items-center shadow-inner">
              <div>
                <span className="block text-xs text-neutral-400 uppercase tracking-widest font-bold">Paradas Obligatorias (Pits)</span>
                <span className="text-xs text-neutral-500">Pérdida estimada en carril: {tiempoTotalPerdidoPits}s</span>
              </div>
              <span className="text-3xl font-mono font-black text-green-400">
                {paradasTotales} {paradasTotales === 1 ? 'Parada' : paradasTotales === 0 ? 'Sin Pits' : 'Paradas'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg text-xs text-blue-300 mt-4">
            🏁 <strong>Recomendación del Ingeniero:</strong> Con el mapa en posición <strong>{mapaCombustible}</strong> y gomas <strong>{compuesto}</strong>, tu ventana crítica de entrada a boxes se abre exactamente en la vuelta <strong>{vueltasVidaNeumatico}</strong> o cuando el tanque baje del 5%.
          </div>
        </div>

      </div>
    </div>
  );
}