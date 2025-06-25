import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

import helloRoutes from './routes/helloRoutes.js';

const app = express();
const PORT = 3001;

app.use(express.json());

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PrijaviProblem API",
      version: "1.0.0",
      description: "API documentation for PrijaviProblem backend",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
      },
    ],
  },
  apis: [path.join(process.cwd(), 'backend/routes/*.js')],
};


const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use your routes
app.use('/api', helloRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
