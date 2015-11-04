angular.module('app.offer-mgmt')
    // TableSearchCntl definition
    // The definition contains:
    // - controller name as a first parameter
    // - controller constructor function with dependencies as a function parameters (injection of angular $scope object, UI Bootstrap $modal and
    // other OASP services)
    // For more details regarding controller concept and assigning model and behavior to $scope object, please check:
    // https://docs.angularjs.org/guide/controller
    .controller('SpecialSearchCntl', function ($scope, paginatedSpecialsList, offers, globalSpinner) { // , tables, paginatedTableList, $modal, sales
        'use strict';
        var selectedSpecial = function () {
            return $scope.selectedItems && $scope.selectedItems.length ? $scope.selectedItems[0] : undefined;
        };

/*
        // $scope function definition for calling modal dialog for table edition. The function is indirectly called in the table-search.html -
        // the function call is hidden behind the buttonBar directive.
        $scope.openEditDialog = function (tableRow) {
            // modal dialog call
            // The modal dialog configuration is provided by the object passed as a parameter of $modal.open function.
            // The object indicates:
            // - modal dialog url
            // - controller for modal dialog
            // - members that will be resolved and passed to the controller as locals; it is equivalent of the resolve property for AngularJS routes
            // For more details regarding $modal service please see https://angular-ui.github.io/bootstrap/#/modal
            $modal.open({
                templateUrl: 'table-mgmt/html/table-details.html',
                controller: 'TableDetailsCntl',
                resolve: {
                    tableDetails: function () {
                        return tables.loadTable(tableRow.id);
                    },
                    allOffers: function () {
                        return offers.loadAllOffers();
                    },
                    currentOrder: function () {
                        return sales.loadOrderForTable(tableRow.id);
                    }
                }
            });
        };
*/

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
                    $scope.openEditDialog(selectedSpecial());
                },
                isActive: function () {
                    // makes button active when there is a table selected
                    return selectedSpecial();
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