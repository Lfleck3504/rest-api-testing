const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const path = require('path');
const fs = require('fs');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    // Enable CORS so you can hit it from a browser client easily
    routes: { cors: true },
  });

 
  const routes = [];


  const routesPath = path.join(__dirname, 'routes');


  const routeFiles = fs
    .readdirSync(routesPath)
    .filter((file) => file.endsWith('.js')); 

  
  routeFiles.forEach((file) => {
    const filePath = path.join(routesPath, file);
    const fileRoutes = require(filePath); 
    routes.push(...fileRoutes);  
  });

  server.route(routes);
  

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

// Handle unhandled rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
