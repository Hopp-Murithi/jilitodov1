const express = require("express");
const swagger = require("swagger-ui-express");
const swaggerUi = require("./swagger.json");
const { db_middleware } = require("./middlewares/db_middleware");
const baseurl = "/api/jilitodo";
const { health } = require("./routes/health.route");
const app = express();
/**
 * allow json & url encoded payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * mount custom middleware
 */

app.use(db_middleware);

/**
 * mount swagger
 */
app.use(baseurl + "/swagger", swagger.serve, swagger.setup(swaggerUi));

/**
 * mount routes
 */
app.use(baseurl, health);
module.exports = app;
