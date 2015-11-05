angular.module('app.offer-mgmt').controller('SpecialDetailsCntl',
    function ($scope, offers, specialDetails, allOffers, globalSpinner, $sce) {
        'use strict';
        $scope.special = specialDetails;
        $scope.allOffers = allOffers;
        
		var allOffersFiltered = allOffers.filter(function (offer) {
			return offer.id === $scope.special.offerId;
		});
        $scope.selectedOffer = allOffersFiltered.length > 0 ? allOffersFiltered[0] : null;
        
        $scope.model = {};
        $scope.model.selected = allOffers.length ? allOffers[0] : undefined;
        $scope.selectedItems = [];

        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        $scope.selectOffer = function (item) {
            $scope.special.offerId = item.id;
        }
      			
        // form container to access forms added in parent scopes
        $scope.forms = {};

        $scope.submit = function () {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                return offers.saveOrUpdateSpecial($scope.special);
            }).then(function () {
                $scope.$close();
            });
        };

    });
