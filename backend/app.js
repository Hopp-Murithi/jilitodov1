const express = require("express");
/**
 * require swagger for api documentation
 */
const swagger = require("swagger-ui-express");
const swaggerUi = require("./swagger.json");

/**
 * require db-middleware for db mounting
 */
const { db_middleware } = require("./middlewares/db_middleware");

/**
 * configure application url
 */
const baseurl = "/api/jilitodo";

/**
 * require routes for mounting onto the server
 */
const { health } = require("./routes/health.route");
const { auth } = require("./routes/register.route");

/**
 * Initialize an express application
 */
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
app.use(baseurl, auth);

module.exports = app;
