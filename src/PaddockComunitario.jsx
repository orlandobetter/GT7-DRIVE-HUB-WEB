import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, Send, Trophy, Flame } from 'lucide-react';

export default function PaddockComunitario() {
  const [activeTab, setActiveTab] = useState('ayuda'); // 'ayuda' o 'retos'
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('nexargt_paddock_posts');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        type: 'ayuda',
        author: 'Carlos_SimRacing',
        car: 'Porsche 911 GT3 (992)',
        track: 'Circuit de Spa-Francorchamps',
        content: '¿Alguien tiene un setup que evite que el coche se vaya tanto de atrás en la salida de la curva Pouhon? Voy con blando.',
        responses: [
          { author: 'NEXAR GT', text: 'Prueba bajando un poco la altura trasera y subiendo el diferencial a aceleración. ¡Pronto subo guía!' }
        ],
        date: 'Hace 15 min'
      },
      {
        id: 2,
        type: 'reto',
        author: 'AndresG_99',
        car: 'Gr.4 (Cualquiera)',
        track: 'Nürburgring GP',
        content: 'Busco a 3 pilotos hoy a las 8:00 PM para una carrerita rápida de entrenamiento limpio. Agéntenme en PSN: AndresG_99',
        responses: [],
        date: 'Hace 1 hora'
      }
    ];
  });

  const [newAuthor, setNewAuthor] = useState('');
  const [newCar, setNewCar] = useState('');
  const [newTrack, setNewTrack] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    localStorage.setItem('nexargt_paddock_posts', JSON.stringify(posts));
  }, [posts]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const newEntry = {
      id: Date.now(),
      type: activeTab,
      author: newAuthor,
      car: newCar || 'Libre / Varios',
      track: newTrack || 'Cualquier circuito',
      content: newContent,
      responses: [],
      date: 'Justo ahora'
    };

    setPosts([newEntry, ...posts]);
    setNewAuthor('');
    setNewCar('');
    setNewTrack('');
    setNewContent('');
  };

  const handleAddResponse = (postId, responseText, authorName) => {
    if (!responseText.trim() || !authorName.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          responses: [...p.responses, { author: authorName, text: responseText }]
        };
      }
      return p;
    }));
  };

  const filteredPosts = posts.filter(p => p.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 text-white">
      {/* Cabecera de la sección */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-black p-6 rounded-2xl border border-blue-500/30 shadow-2xl mb-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-cyan-400" /> PADDOCK COMUNITARIO NEXAR GT
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          El espacio oficial para que la comunidad de simracing se ayude con setups, dudas y armar retos en pista.
        </p>

        {/* Pestañas de navegación limpias para celular */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveTab('ayuda')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm ${
              activeTab === 'ayuda'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 scale-105'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Ayuda & Setups
          </button>
          <button
            onClick={() => setActiveTab('reto')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm ${
              activeTab === 'reto'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/40 scale-105'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" /> Tablón de Retos & Lobbies
          </button>
        </div>
      </div>

      {/* Formulario para publicar */}
      <div className="bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl mb-8">
        <h2 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5" /> {activeTab === 'ayuda' ? '¿Tienes una duda o quieres ayudar con un setup?' + '' : '¿Quieres organizar una rodada o buscar rivales?'}
        </h2>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Tu Nombre o Gamertag *"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
              required
            />
            <input
              type="text"
              placeholder="Coche (Ej: Supra '20)"
              value={newCar}
              onChange={(e) => setNewCar(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
            />
            <input
              type="text"
              placeholder="Circuito (Ej: Interlagos)"
              value={newTrack}
              onChange={(e) => setNewTrack(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
          <textarea
            placeholder={activeTab === 'ayuda' ? 'Describe tu duda sobre el setup, neumáticos o trazada...' : 'Escribe los detalles de la sala, hora y cómo unirse...'}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows="3"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-400 resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" /> Publicar en el Paddock
          </button>
        </form>
      </div>

      {/* Lista de publicaciones */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 text-gray-500">
            No hay publicaciones en esta categoría todavía. ¡Sé el primero en escribir una!
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onAddResponse={handleAddResponse} />
          ))
        )}
      </div>
    </div>
  );
}

// Componente interno para cada tarjeta y sus respuestas
function PostCard({ post, onAddResponse }) {
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    onAddResponse(post.id, replyText, replyAuthor);
    setReplyText('');
    setReplyAuthor('');
    setShowReplyBox(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg transition-all hover:border-slate-700">
      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
        <div>
          <span className="font-bold text-cyan-400 text-sm">{post.author}</span>
          <span className="text-gray-500 text-xs ml-3">{post.date}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-lg border border-slate-700">🚗 {post.car}</span>
          <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-lg border border-slate-700">🏁 {post.track}</span>
        </div>
      </div>

      <p className="text-gray-200 text-sm md:text-base mb-4 leading-relaxed">{post.content}</p>

      {/* Sección de respuestas de la comunidad */}
      {post.responses.length > 0 && (
        <div className="mt-4 space-y-2 pl-4 border-l-2 border-cyan-500/40 bg-slate-950/50 p-3 rounded-r-xl">
          <p className="text-xs font-bold text-gray-400 mb-2">Respuestas de la comunidad:</p>
          {post.responses.map((resp, index) => (
            <div key={index} className="text-xs md:text-sm">
              <span className="font-semibold text-blue-400">{resp.author}: </span>
              <span className="text-gray-300">{resp.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Botón para responder */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center">
        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" /> {showReplyBox ? 'Cancelar respuesta' : 'Responder al piloto'}
        </button>
      </div>

      {/* Caja colapsable para responder */}
      {showReplyBox && (
        <form onSubmit={handleSubmitReply} className="mt-3 space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <input
            type="text"
            placeholder="Tu Nombre o Gamertag"
            value={replyAuthor}
            onChange={(e) => setReplyAuthor(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
            required
          />
          <input
            type="text"
            placeholder="Escribe tu consejo o respuesta..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all"
          >
            Enviar Respuesta
          </button>
        </form>
      )}
    </div>
  );
}