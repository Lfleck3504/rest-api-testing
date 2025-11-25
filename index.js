const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    // Enable CORS so you can hit it from a browser client easily
    routes: { cors: true },
  });

  // GET /
  // Responds with plain text; includes query string if present.
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const q = request.query || {};
      const qs = new URLSearchParams(q).toString();
      const msg = qs
        ? `Hello from Hapi! You sent query: ${qs}`
        : 'Hello from Hapi! (no query params)';
      // Return text
      return h.response(msg).type('text/plain');
    },
  });

  // POST /echo
  // Logs the request body and replies with a short JSON message.
  server.route({
    method: 'POST',
    path: '/echo',
    options: {
      // Hapi will parse JSON and urlencoded payloads by default
      // but this shows you can control size/parse if needed.
      payload: {
        parse: true,
        allow: 'application/json',
      },
    },
    handler: (request, h) => {
      console.log('POST /echo payload:', request.payload);
      return {
        ok: true,
        message: 'Received your payload',
        payload: request.payload,
      };
    },
  });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

// Handle unhandled rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
