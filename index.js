const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const path = require('path');
const fs = require('fs');

const routes = [];

const routesPath = path.join(__dirname, 'routes');

const routeFiles = fs
  .readdirSync(routesPath)
  .filter((file) => file.endsWith('.js'));

routeFiles.forEach((file) => {
  const fileRoutes = require(path.join(routesPath, file));
  routes.push(...fileRoutes);
});

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();