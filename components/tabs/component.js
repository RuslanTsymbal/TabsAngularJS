angular.module('myApp').component('tabs', {
        templateUrl: 'components/tabs/template.html',
        controller: "tabsCtrl"
    });

myApp.controller('tabsCtrl', function ($scope, Items) {
//debugger;

    $scope.dell = "Удалить";
    $scope.tabs = Items;

});