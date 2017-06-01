'use strict';

require('angular').module('demoApp')
.component('navbar', {
  template: require('./navbar.html'),
  controllerAs: 'navbarCtrl',
  bindings: {
    title: '@',
  },
  controller: ['$log', NavbarController],
});

function NavbarController($log){
  this.$onInit = () => {
    this.routes = [
      {
        name: 'home', 
        url: '/#!/',
      },
    ];
  }
}

