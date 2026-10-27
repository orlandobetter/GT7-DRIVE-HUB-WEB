import { useState } from 'react'
import RaceCentral from './RaceCentral'
import ElGaraje from './ElGaraje'
import Gt7Hub from './Gt7Hub'
import Estrategia from './Estrategia'
import TimeAttack from './TimeAttack'
import ClipsComunidad from './ClipsComunidad'
import AuthModal from './AuthModal'
import LegendaryTracker from './LegendaryTracker'

function App() {
  const [pantallaActiva, setPantallaActiva] = useState('telemetria');
  const [usuario, setUsuario] = useState(null);
  const [mostrarAuth, setMostrarAuth] = useState(false);

  // Opciones del menú actualizadas con las adiciones
  const menu = [
    { id: 'telemetria', titulo: 'Race Central', icono: '🏎️' },
    { id: 'garaje', titulo: 'El Garaje', icono: '🔧' },
    { id: 'hub', titulo: 'GT7 Hub', icono: '🎰' },
    { id: 'estrategia', titulo: 'Calculadora Pits', icono: '⛽' },
    { id: 'ranking', titulo: 'Time Attack', icono: '⏱️' },
    { id: 'clips', titulo: 'Muro de Clips', icono: '🎬' },
    { id: 'hagerty', titulo: 'Hagerty Tracker', icono: '🏛️' },
  ];

  return (
    <div className="flex h-screen bg-neutral-950 text-white font-sans overflow-hidden">
      
      {/* 1. BARRA DE NAVEGACIÓN LATERAL */}
      <aside className="w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-10 overflow-y-auto">
        <div className="p-6 border-b border-neutral-800 bg-neutral-950/50">
          <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-red-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            NEXAR GT
          </h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-[0.3em] font-semibold">Driver Hub</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setPantallaActiva(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                pantallaActiva === item.id
                  ? 'bg-gradient-to-r from-blue-900/40 to-transparent text-blue-400 border-l-4 border-blue-500 shadow-[inset_4px_0_15px_rgba(59,130,246,0.2)]'
                  : 'text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200 border-l-4 border-transparent'
              }`}
            >
              <span className="text-xl">{item.icono}</span>
              {item.titulo}
            </button>
          ))}
        </nav>

        {/* Perfil del Usuario / Botón de Login */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950/30">
          {usuario ? (
            <div className="flex items-center justify-between bg-neutral-950 px-3 py-2.5 rounded-xl border border-neutral-800">
              <div className="flex items-center gap-3">
                <img src={usuario.avatar} alt="Avatar" className="w-9 h-9 rounded-full bg-blue-500/20 p-1 border border-blue-500" />
                <div>
                  <p className="text-sm font-bold text-white truncate max-w-[110px]">{usuario.nombre}</p>
                  <div className="flex gap-1 text-[10px] font-mono">
                    <span className="text-blue-400 font-bold">DR: {usuario.nivel}</span>
                    <span className="text-neutral-500">|</span>
                    <span className="text-green-400 font-bold">SR: {usuario.deportividad}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setUsuario(null)} title="Cerrar Sesión" className="text-neutral-500 hover:text-red-500 text-xs font-bold px-2 py-1">
                Salir
              </button>
            </div>
          ) : (
            <button onClick={() => setMostrarAuth(true)} className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow">
              <span>🔑</span> Iniciar Sesión
            </button>
          )}
        </div>
      </aside>

      {/* 2. ÁREA PRINCIPAL */}
      <main className="flex-1 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative h-full w-full flex flex-col items-center justify-center">
          {pantallaActiva === 'telemetria' && <RaceCentral />}
          {pantallaActiva === 'garaje' && <ElGaraje />}
          {pantallaActiva === 'hub' && <Gt7Hub />}
          {pantallaActiva === 'estrategia' && <Estrategia />}
          {pantallaActiva === 'ranking' && <TimeAttack />}
          {pantallaActiva === 'clips' && <ClipsComunidad />}
          {pantallaActiva === 'hagerty' && <LegendaryTracker />}
        </div>
      </main>

      {mostrarAuth && (
        <AuthModal 
          alIniciarSesion={(datosUser) => { setUsuario(datosUser); setMostrarAuth(false); }} 
          alCerrar={() => setMostrarAuth(false)} 
        />
      )}
    </div>
  )
}

export default App