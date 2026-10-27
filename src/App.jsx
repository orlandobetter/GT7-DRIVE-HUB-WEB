import React, { useState } from 'react';
import { 
  Wrench, 
  Tv, 
  Calculator, 
  Timer, 
  Film, 
  Landmark, 
  Users, 
  Menu, 
  X, 
  Activity,
  ShieldCheck
} from 'lucide-react';

// Importa únicamente los módulos limpios y útiles
import ElGaraje from './ElGaraje';
import Gt7Hub from './Gt7Hub';
import Estrategia from './Estrategia';
import TimeAttack from './TimeAttack';
import ClipsComunidad from './ClipsComunidad';
import LegendaryTracker from './LegendaryTracker';
import PaddockComunitario from './PaddockComunitario';

export default function App() {
  const [currentTab, setCurrentTab] = useState('garaje');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('nexar_admin') === 'true');

  const toggleAdminMode = () => {
    const newStatus = !isAdmin;
    setIsAdmin(newStatus);
    localStorage.setItem('nexar_admin', newStatus ? 'true' : 'false');
  };

  // Menú limpio sin funciones basura o pesadas
  const menuItems = [
    { id: 'garaje', label: 'El Garaje & Setups', icon: <Wrench className="w-5 h-5" /> },
    { id: 'paddock', label: 'Paddock Comunitario', icon: <Users className="w-5 h-5" /> },
    { id: 'gt7-hub', label: 'GT7 Hub', icon: <Tv className="w-5 h-5" /> },
    { id: 'estrategia', label: 'Calculadora Pits', icon: <Calculator className="w-5 h-5" /> },
    { id: 'time-attack', label: 'Time Attack', icon: <Timer className="w-5 h-5" /> },
    { id: 'clips', label: 'Muro de Clips', icon: <Film className="w-5 h-5" /> },
    { id: 'hagerty', label: 'Hagerty Tracker', icon: <Landmark className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (currentTab) {
      case 'garaje': return <ElGaraje isAdmin={isAdmin} />;
      case 'paddock': return <PaddockComunitario isAdmin={isAdmin} />;
      case 'gt7-hub': return <Gt7Hub />;
      case 'estrategia': return <Estrategia />;
      case 'time-attack': return <TimeAttack />;
      case 'clips': return <ClipsComunidad />;
      case 'hagerty': return <LegendaryTracker />;
      default: return <ElGaraje isAdmin={isAdmin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row overflow-x-hidden">
      
      {/* BARRA SUPERIOR MÓVIL */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyan-400" />
          <span className="font-black tracking-wider text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            NEXAR GT
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAdminMode}
            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
              isAdmin ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'bg-slate-800 text-gray-400 border-slate-700'
            }`}
            title="Modo Admin"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-slate-800 rounded-xl text-cyan-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENÚ LATERAL / DESPLEGABLE */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-4
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        top-[65px] md:top-0 h-[calc(100vh-65px)] md:h-screen
      `}>
        <div>
          <div className="hidden md:flex items-center justify-between px-3 py-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
              <div>
                <h1 className="font-black text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  NEXAR GT
                </h1>
                <span className="text-xs text-gray-400 font-semibold tracking-widest">DRIVER HUB</span>
              </div>
            </div>
          </div>

          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
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

        {/* Panel de Control de Administrador (Oculto en móvil barra sup / Visible PC) */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={toggleAdminMode}
            className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
              isAdmin 
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/10' 
                : 'bg-slate-950 border-slate-800 text-gray-400 hover:border-slate-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Panel Admin NEXAR
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${isAdmin ? 'bg-amber-500 text-black' : 'bg-slate-800 text-gray-400'}`}>
              {isAdmin ? 'ACTIVO' : 'APAGADO'}
            </span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-950 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}
    </div>
  );
}