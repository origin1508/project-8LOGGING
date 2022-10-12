const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "8LOGGING API DOCS",
      description: "팔로깅 API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:3002/",
        description: "로컬 서버",
      },
    ],
  },
  apis: [__dirname + '/../routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUI,
  specs,
};
