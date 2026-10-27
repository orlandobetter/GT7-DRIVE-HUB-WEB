import { useState, useEffect } from 'react';

export default function RaceCentral() {
  const [telemetria, setTelemetria] = useState({
    gear: 'N',
    rpm: '0',
    speed: '0',
    lapTime: '01:24.350',
    bestTime: '01:23.900',
    delta: '-0.150',
    lap: 5,
    pos: 1,
    fuel: 98,
    throttle: 0,
    brake: 0,
  });

  const [estadoConexion, setEstadoConexion] = useState('Conectando...');

  // Conexión en tiempo real con el servidor Node.js (WebSocket)
  useEffect(() => {
    const ws = new WebSocket('wss://nexar-gt-driver-hub.onrender.com');

    ws.onopen = () => {
      setEstadoConexion('CONECTADO');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setTelemetria(prev => ({
          ...prev,
          speed: data.speed?.toString() || '0',
          rpm: data.rpm?.toString() || '0',
          gear: data.gear?.toString() || 'N',
          throttle: data.throttle || 0,
          brake: data.brake || 0,
        }));
      } catch (err) {
        console.error("Error al procesar telemetría:", err);
      }
    };

    ws.onerror = () => {
      setEstadoConexion('ERROR DE RED');
    };

    ws.onclose = () => {
      setEstadoConexion('DESCONECTADO');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-full h-full bg-black text-white flex flex-col items-center justify-center p-8 font-sans select-none relative">
      
      {/* Indicador de Estado del Servidor en la esquina */}
      <div className="absolute top-4 left-6 flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
        <span className={`w-2.5 h-2.5 rounded-full ${estadoConexion === 'CONECTADO' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 animate-pulse'}`}></span>
        <span className="text-[10px] font-mono text-neutral-400">ESTADO: {estadoConexion}</span>
      </div>

      {/* Íconos superiores */}
      <div className="w-full max-w-5xl flex justify-end px-4 mb-4 text-neutral-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
      </div>

      {/* LEDs de RPM (Shift Lights) */}
      <div className="flex gap-3 mb-3">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`w-5 h-5 rounded-full border-2 border-neutral-800 ${
            (Number(telemetria.rpm) / 8500) * 15 > i ? 'bg-red-500 border-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-[#111]'
          }`}></div>
        ))}
      </div>

      {/* CONTENEDOR PRINCIPAL DEL MOTEC */}
      <div className="relative border-2 border-[#1a1a1a] rounded-xl p-1.5 bg-black w-full max-w-5xl">
        
        <div className="absolute -left-5 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#1a1a1a] border border-black shadow-[-2px_0_4px_rgba(255,255,255,0.1)_inset]"></div>)}
        </div>

        {/* PANTALLA LCD */}
        <div className="border border-[#333] flex flex-col bg-black text-[#ccc] text-xs font-bold font-mono tracking-wider">
          
          <div className="flex border-b border-[#333] h-24">
            <div className="w-[30%] border-r border-[#333] p-2 pl-3 flex flex-col justify-between">
              <span>LAPTIME</span>
              <span className="text-[#3b82f6] text-5xl font-bold font-mono pb-1 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">{telemetria.lapTime}</span>
            </div>
            <div className="w-[40%] border-r border-[#333] p-2 pl-3 flex flex-col justify-between">
              <span>RPM</span>
              <span className="text-4xl text-center text-white">{telemetria.rpm}</span>
            </div>
            <div className="w-[30%] p-2 pl-3 flex flex-col justify-between">
              <span>DELTA</span>
              <span className="text-4xl text-center text-white">{telemetria.delta}</span>
            </div>
          </div>

          <div className="flex border-b border-[#333] h-44">
            <div className="w-[30%] flex">
              <div className="w-1/2 flex flex-col">
                <div className="h-1/2 border-b border-[#333] border-r p-2 pl-3 flex flex-col justify-between">
                  <span>SPEED</span>
                  <span className="text-3xl text-center text-white pb-1">{telemetria.speed}</span>
                </div>
                <div className="h-1/2 border-r border-[#333] p-2 pl-3 flex flex-col justify-between">
                  <span>LAP</span>
                  <span className="text-3xl text-center text-white pb-1">{telemetria.lap}</span>
                </div>
              </div>
              <div className="w-1/2 border-r border-[#333] flex flex-col">
                <div className="h-1/2 border-b border-[#333] flex items-center justify-center gap-1">
                  <div className="w-3 h-1.5 bg-red-600"></div><div className="w-3 h-1.5 bg-red-600"></div>
                </div>
                <div className="h-1/2 flex items-center justify-center gap-1">
                  <div className="w-3 h-1.5 bg-red-600"></div><div className="w-3 h-1.5 bg-red-600"></div>
                </div>
              </div>
            </div>

            <div className="w-[40%] border-r border-[#333] p-2 pl-3 flex flex-col relative overflow-hidden">
              <span>GEAR</span>
              <div className="absolute inset-0 flex items-center justify-center mt-4">
                <span className="text-[12rem] leading-none font-sans font-bold text-white tracking-tighter">{telemetria.gear}</span>
              </div>
            </div>

            <div className="w-[30%] flex">
              <div className="w-1/2 border-r border-[#333] flex flex-col">
                <div className="h-1/2 border-b border-[#333] flex items-center justify-center gap-1">
                  <div className="w-3 h-1.5 bg-red-600"></div><div className="w-3 h-1.5 bg-red-600"></div>
                </div>
                <div className="h-1/2 flex items-center justify-center gap-1">
                  <div className="w-3 h-1.5 bg-red-600"></div><div className="w-3 h-1.5 bg-red-600"></div>
                </div>
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="h-1/2 border-b border-[#333] p-2 pl-3 flex flex-col justify-between">
                  <span>THR</span>
                  <span className="text-3xl text-center text-white pb-1">{telemetria.throttle}%</span>
                </div>
                <div className="h-1/2 p-2 pl-3 flex flex-col justify-between">
                  <span>BRAKE</span>
                  <span className="text-3xl text-center text-neutral-400 pb-1">{telemetria.brake}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b border-[#333] h-20">
            <div className="w-[15%] border-r border-[#333] p-2 pl-3 flex flex-col justify-between">
              <span>POS</span>
              <span className="text-3xl text-center text-white">{telemetria.pos}</span>
            </div>
            <div className="w-[15%] border-r border-[#333] p-2 pl-3 flex flex-col justify-between">
              <span>FUEL</span>
              <span className="text-3xl text-center text-white">{telemetria.fuel}</span>
            </div>
            <div className="w-[40%] border-r border-[#333] p-2 pl-3 flex flex-col justify-between">
              <span>BEST</span>
              <span className="text-[#fbbf24] text-5xl font-bold font-mono pb-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">{telemetria.bestTime}</span>
            </div>
            <div className="w-[30%] p-2 pl-3 flex flex-col">
              <span>FLAG</span>
            </div>
          </div>

          <div className="flex h-8">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="flex-1 border-r border-[#333] last:border-r-0"></div>
            ))}
          </div>

        </div>

        <div className="absolute -right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#1a1a1a] border border-black shadow-[2px_0_4px_rgba(255,255,255,0.1)_inset]"></div>)}
        </div>

      </div>
    </div>
  );
}