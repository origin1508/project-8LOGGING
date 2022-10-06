const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "8LOGGING API DOCS",
      version: "1.0.0",
      description: "팔로깅 API 문서",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["../routes/*.js", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUI,
  specs,
};
