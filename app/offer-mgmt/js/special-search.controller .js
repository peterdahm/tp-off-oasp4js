angular.module('app.offer-mgmt')
    .controller('SpecialSearchCntl', function ($scope, paginatedSpecialsList, offers, globalSpinner, $modal) { // , tables, paginatedTableList, $modal, sales
        'use strict';
        var selectedSpecial = function () {
            return $scope.selectedItems && $scope.selectedItems.length ? $scope.selectedItems[0] : undefined;
        };

        $scope.openEditDialog = function (special) {
            $modal.open({
                templateUrl: 'offer-mgmt/html/special-details.html',
                controller: 'SpecialDetailsCntl',
                resolve: {
                    specialDetails: function () {
                        return angular.copy(special);
                    },
                    allOffers: function () {
                        return offers.loadAllOffers();
                    }
                }
            }).result.finally(function () {
                $scope.reloadSpecials();
            });
        };

        // creating model - assigning data to $scope object. Data may come from different sources:
        // calculated by the controller logic / simple assignments / data from injected services
        $scope.selectedItems = [];
        $scope.maxSize = 5;
        $scope.totalItems = paginatedSpecialsList.pagination.total;
        $scope.numPerPage = paginatedSpecialsList.pagination.size;
        $scope.currentPage = paginatedSpecialsList.pagination.page;

        $scope.gridOptions = {
            data: paginatedSpecialsList.result
        };

        // function used in pagination - it loads tables when the table page is changed
        $scope.reloadSpecials = function () {
            offers.getPaginatedSpecials($scope.currentPage, $scope.numPerPage).then(function (res) {
                paginatedSpecialsList = res;
                $scope.gridOptions.data = paginatedSpecialsList.result;
            });
        };

/*
        // registering a listener which is called whenever $scope.currentPage is changed
        // For more info regarding watchers please check: https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch
        $scope.$watch('currentPage', function () {
            // When user changes the current page, the request for tables on the selected page is sent.
            $scope.reloadTables();
        });
*/

        $scope.buttonDefs = [
            {
                label: 'Create...',
                onClick: function () {
                    // opens edit table dialog on edit button click
                    $scope.openEditDialog({});
                },
                isActive: function () {
                    // makes button active when there is a table selected
                    return true;
                }
            },
            {
                label: 'Update...',
                onClick: function () {
                    // opens edit table dialog on edit button click
                    $scope.openEditDialog(selectedSpecial());
                },
                isActive: function () {
                    // makes button active when there is a table selected
                    return selectedSpecial();
                }
            },
            {
                label: 'Delete...',
                onClick: function () {
                    globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                        return offers.deleteSpecial(selectedSpecial()).then($scope.reloadSpecials);
                    });
                },
                isActive: function () {
                    // makes button active when there is a table selected
                    return selectedSpecial();
                }
            },
        ]; 
    });