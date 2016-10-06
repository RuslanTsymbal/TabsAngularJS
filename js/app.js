myApp = angular.module('myApp', ['ui.router']);

myApp.factory('Items',function(){
    debugger;
var items = [];
items.add = function(a){
    debugger;
    var itemsVal = {value: a};
    items.push(itemsVal);
    return items;
};
return items;
});

myApp.config(function ($stateProvider) {
    debugger;

    $stateProvider.state('tabs', {
        url: '/tabs/:cat/:page',
        templateUrl: 'templates/contacts.html',
        controller: function($scope, $stateParams, Items) {
            debugger;
            $scope.category = $stateParams.cat;
            $scope.page = $stateParams.page;
            $scope.text = "Мой текс закладки - " + $scope.page;
        },
    });
 });

/*Получаем говое название Закладки*/

myApp.controller('topCtrl', function ($scope, Items) {
    debugger;
    var newValueTab;
    $scope.addTab = function () {
        debugger;
        newValueTab = prompt("Введите новое название закладки");
        console.log(newValueTab);

        items = Items.add(newValueTab);
        console.log(items);
    };
});

