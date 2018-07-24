'use strict';

const { Router } = require('express');
// middleware
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const devLogger = require('../middleware/devLogger');
const swaggerDocument = require('../swagger/swagger.json');
// error handlers
const notFound = require('../errors/notFound');
const errorHandler = require('../errors/errorHandler');
const devErrorHandler = require('../errors/devErrorHandler');
const testErrorHandler = require('../errors/testErrorHandler');
// controllers
const {
  helloContacts,
  onlyTheseMethods,
} = require('../controllers').ContactController;
// sub-routers
const apiRouter = require('./apiRoutes');


module.exports = ((logger) => {
  const router = Router();

  if (process.env.NODE_ENV === 'development') {
    router.use(devLogger(logger));
  }

  // express limits request size to 100kb by default
  router
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json()) // middleware for parsing json
    .use(bodyParser.urlencoded({ extended: true })); // maybe will get form data at some point

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
