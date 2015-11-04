
angular.module('app.offer-mgmt', ['ngRoute', 'app.main'], function ($routeProvider) {
    'use strict';
    // adding a new route definition for the given url postfix
    // Basically if there will be successful path match then a new dialog will be opened with:
    // - template indicated by templateUrl property
    // - controller indicated by the controller property
    // - dependencies injected into controller indicated by the resolve property ({Object.<string, function>=} map)
    // For details regarding AngularJS $routeProvider please check: https://docs.angularjs.org/api/ngRoute/provider/$routeProvider.
    $routeProvider.when('/offer-mgmt/special-search', {
        templateUrl: 'offer-mgmt/html/special-search.html',
        controller: 'SpecialSearchCntl' ,
        resolve: {
            // Please notice that the TableSearchCntl has paginatedTableList injected.
            // Before loading the dialog, the function defined below will be called.
            // The function is defined in the tables service (please see tables service defined in the tables.service.js file).
            // The function will load the tables data before dialog is loaded. Later on the data is used by the TableSearchCntl.
            paginatedSpecialsList: ['offers', function (offers) {
                return offers.getPaginatedSpecials(1, 4).then(function (paginatedSpecials) {
                    return paginatedSpecials;
                });
            }]
        }
    });
});