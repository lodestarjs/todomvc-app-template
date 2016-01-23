// Controllers
import IndexController from './controllers/IndexController';
import StateController from './controllers/StateController';

// Views
import IndexView from './views/IndexView';

// Helpers
import * as helpers from './helpers/ractiveHelpers';

// Main - init and routes
let App = new LodeRactive({ DEBUG: false });
Ractive.defaults.data = helpers;

App.createRoute({
  path: '/',
  controller: IndexController,
  view: IndexView
});

App.createRoute({
  path: '[/]:state',
  controller: StateController
});