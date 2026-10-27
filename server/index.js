const dgram = require('dgram');
const WebSocket = require('ws');

// Puertos dinámicos para la nube o locales por defecto
const GT7_PORT = process.env.GT7_PORT || 33740;
const WS_PORT = process.env.PORT || 8080;

// Servidor WebSocket público
const wss = new WebSocket.Server({ port: WS_PORT });
console.log(`[WebSocket] Servidor en la nube corriendo en puerto ${WS_PORT}`);

// Servidor UDP para recibir telemetría
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`Error en servidor UDP:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  // Aquí procesaremos los paquetes de telemetría de las consolas conectadas
  const datosTelemetria = JSON.stringify({
    speed: Math.floor(Math.random() * 250),
    rpm: Math.floor(Math.random() * 8500),
    gear: Math.floor(Math.random() * 6) + 1,
    throttle: Math.floor(Math.random() * 100),
    brake: Math.floor(Math.random() * 100)
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(datosTelemetria);
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`[UDP] Escuchando paquetes en ${address.address}:${address.port}`);
});

server.bind(GT7_PORT);