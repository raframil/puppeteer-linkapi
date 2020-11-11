const { Router } = require('express');
const ComponentsController = require('./controllers/components-controller');

const routes = Router();

routes.get('/components', ComponentsController.list);

module.exports = routes;