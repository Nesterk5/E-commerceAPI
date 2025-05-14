const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const _ = require("lodash");

// Load the YAML file
const swaggerSchemas = YAML.load("./swagger.yaml");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Ecommerce API",
    version: "1.0.0",
    description: "API documentation for Ecommerce Platform",
  },
  servers: [
    {
      url: "https://e-commerceapi-b1pw.onrender.com",
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  // Paths to files with OpenAPI definitions
  apis: ["./**/controller.js", "./**/authController.js"], //reads JSDoc comments from your controller files
};

// Generate spec from JSDoc
const swaggerSpec = swaggerJSDoc(options);

// Merge the schemas from YAML under `components`
swaggerSpec.components = _.merge(
  {},
  swaggerSpec.components,
  swaggerSchemas.components
);

// Serve the Swagger UI
function setupSwagger(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1, // 👈 hides "Schemas"
      },
    })
  );
}

module.exports = setupSwagger;
