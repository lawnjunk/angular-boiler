'use strict';

require('angular');
require('angular-mocks');

describe('example component test', function(){
  beforeEach(() => {
    angular.mock.module('demoApp')
    angular.mock.inject(($componentController, $rootScope, $httpBackend) => {
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      
      this.exampleCtrl = $componentController('PUT SOME CONTROLER NAME HERE');
      this.exampleCtrl.$onInit();
    });
  });

  afterEach(() => this.$rootScope.$apply())
  afterEach(() => {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
  });

  it('example test', () => {
    let expectUrl = 'http://localhost:3000/api/something';
    let expectBody = {
      something: {
        name: 'cool beans',
        type: 'sunshine',
      },
    };
    let expectHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let mockResponse = {
      _id: 'abc123',
      name: 'coolbeans',
      timeToLive: 123123123231,
    };
      
    // setup expect request
    this.$httpBackend.expect(url, expectBody, expectHeaders)
    .respond(200, mockResponse)
    // invoke method
    this.exampleCtrl.someMethod();
    // flush $httpBackend
    this.$httpBackend.flush();

    // expect state changes
    expect(this.exampleCtrl.name).toEqual(mockResponse.name)
  });
});
