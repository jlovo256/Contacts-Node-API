'use strict';

const { Router } = require('express');
// middleware
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const devLogger = require('./middleware/devLogger');

const swaggerDocument = YAML.load('./public/swagger.yaml'); // root
// error handlers
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');
const devErrorHandler = require('./errors/devErrorHandler');
const testErrorHandler = require('./errors/testErrorHandler');
const onlyTheseMethods = require('./errors/onlyTheseMethods');
// controllers
const {
  helloContacts,
} = require('./controllers');
// sub-routers
const apiRouter = require('./routers');

module.exports = ((logger) => {
  const router = Router();

  if (process.env.NODE_ENV === 'development') {
    router.use(devLogger(logger));
  }

  // express limits request size to 100kb by default
  router
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json()) // middleware for parsing json
    .use(bodyParser.urlencoded({ extended: true })) // maybe will get form data at some point
    .use(xmlparser({ explicitArray: false }));

  router.route('/')
    .get(helloContacts)
    .all(onlyTheseMethods('GET'));

  router.use('/api/v1.0', apiRouter);

  // 404 routes
  router.use(notFound);

  // dev error handler
  if (process.env.NODE_ENV === 'test') {
    router.use(testErrorHandler());
  }

  // dev error handler
  if (process.env.NODE_ENV === 'development') {
    router.use(devErrorHandler(logger));
  }

  // production error handler
  router.use(errorHandler(logger));

  return router;
});
