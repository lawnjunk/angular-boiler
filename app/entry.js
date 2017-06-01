'use strict';

require('./style/main.scss');

// require anuglar 
const angular = require('angular');
// require 3rd party angular modules
require('@uirouter/angularjs');

// create modules and inject dependencies 
angular.module('demoApp', ['ui.router'])
// add config
.config(['$stateProvider', '$urlRouterProvider', 
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when('', '/');
    let routes = [
      {
        name: 'landing', 
        url: '/', 
        template: '<landing></landing>'
      },
    ];
    routes.forEach($stateProvider.state);
  }
])

// services 
// views
require('./view/landing');

// components
require('./component/navbar');

