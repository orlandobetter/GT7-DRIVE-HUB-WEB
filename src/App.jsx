import React, { useState } from 'react';
import { 
  Gauge, 
  Wrench, 
  Tv, 
  Calculator, 
  Timer, 
  Film, 
  Landmark, 
  Users, 
  Menu, 
  X, 
  Activity 
} from 'lucide-react';

// Importa tus componentes (asegúrate de que los nombres coincidan con tus archivos)
import RaceCentral from './RaceCentral';
import ElGaraje from './ElGaraje';
import Gt7Hub from './Gt7Hub';
import Estrategia from './Estrategia';
import TimeAttack from './TimeAttack';
import ClipsComunidad from './ClipsComunidad';
import LegendaryTracker from './LegendaryTracker';
import PaddockComunitario from './PaddockComunitario'; // El nuevo módulo de comunidad
import PaddockComunitario from './PaddockComunitario';

export default function App() {
  const [currentTab, setCurrentTab] = useState('race-central');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lista de secciones del Driver Hub
  const menuItems = [
    { id: 'race-central', label: 'Race Central', icon: <Gauge className="w-5 h-5" /> },
    { id: 'garaje', label: 'El Garaje & Setups', icon: <Wrench className="w-5 h-5" /> },
    { id: 'gt7-hub', label: 'GT7 Hub', icon: <Tv className="w-5 h-5" /> },
    { id: 'estrategia', label: 'Calculadora Pits', icon: <Calculator className="w-5 h-5" /> },
    { id: 'time-attack', label: 'Time Attack', icon: <Timer className="w-5 h-5" /> },
    { id: 'clips', label: 'Muro de Clips', icon: <Film className="w-5 h-5" /> },
    { id: 'hagerty', label: 'Hagerty Tracker', icon: <Landmark className="w-5 h-5" /> },
    { id: 'paddock', label: 'Paddock Comunitario', icon: <Users className="w-5 h-5" /> },
  ];

  // Renderizador dinámico de la pestaña activa
  const renderContent = () => {
    switch (currentTab) {
      case 'race-central': return <RaceCentral />;
      case 'garaje': return <ElGaraje />;
      case 'gt7-hub': return <Gt7Hub />;
      case 'estrategia': return <Estrategia />;
      case 'time-attack': return <TimeAttack />;
      case 'clips': return <ClipsComunidad />;
      case 'hagerty': return <LegendaryTracker />;
      case 'paddock': return <PaddockComunitario />;
      default: return <RaceCentral />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row overflow-x-hidden">
      
      {/* 📱 BARRA SUPERIOR MÓVIL (Solo visible en celulares y tablets pequeñas) */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyan-400" />
          <span className="font-black tracking-wider text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            NEXAR GT
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-slate-800 rounded-xl text-cyan-400 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MENÚ LATERAL DESPLEGABLE EN MÓVIL / FIJO EN PC Y TABLET */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-4
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        top-[65px] md:top-0 h-[calc(100vh-65px)] md:h-screen
      `}>
        {/* Cabecera del Menú (Oculta en móvil porque ya está arriba la barra) */}
        <div>
          <div className="hidden md:flex items-center gap-3 px-3 py-4 mb-4 border-b border-slate-800">
            <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
            <div>
              <h1 className="font-black text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                NEXAR GT
              </h1>
              <span className="text-xs text-gray-400 font-semibold tracking-widest">DRIVER HUB</span>
            </div>
          </div>

          {/* Lista de Navegación */}
          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false); // Cierra el menú en móvil al hacer clic
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-400 hover:bg-slate-800/60 hover:text-gray-200'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Estado del Sistema Inferior */}
        <div className="hidden md:block pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Cloud Sync
            </span>
            <span className="text-cyan-400 font-bold">ONLINE</span>
          </div>
        </div>
      </aside>

      {/* 🖥️ CONTENIDO PRINCIPAL DINÁMICO */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-950 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>

      {/* Overlay oscuro para cuando el menú móvil esté abierto */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}
    </div>
  );
}