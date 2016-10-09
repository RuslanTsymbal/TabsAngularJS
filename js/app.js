myApp = angular.module('myApp', ['ui.router']);

/*---фабрика Items ---*/

myApp.factory('Items', function () {
    debugger;
    var items = [];
    items.add = function (tabName) {
        //debugger;
        var itemsVal = {value: tabName};
        items.push(itemsVal);
        return items;
    };
    return items;
});

myApp.config(function ($stateProvider) {
    debugger;
    $stateProvider.state('tabs', {
        url: '/tabs/:cat/:page',
        templateUrl: 'templates/page.html',
        controller: function ($scope, $stateParams, Items) {
           // debugger;
            $scope.category = $stateParams.cat;
            $scope.page = $stateParams.page;
            $scope.text = "Введите ваш текст на закладке : " + $scope.page;
            $scope.hideElem = true;
            $scope.myText;
            $scope.hideElemChange = function () {
                //debugger;
                $scope.hideElem = !$scope.hideElem;
            };

            $scope.saveText = function () {
                //debugger;
                if ($scope.myText !== undefined) {
                  debugger;
                    var lastIndex = +localStorage.getItem("lastIndex")+1 || 1;
                    var key = "text_" + lastIndex;
                    saveKey("lastIndex",lastIndex);
                    saveKey(key, $scope.myText);
                }
            };
            /*---Сохраняем ключи в localStorage---*/

            function saveKey (key, value) {
                localStorage.setItem(key, value);
            }
        }
    });
});

/*---Получаем новое название Закладки---*/

myApp.controller('topCtrl', function ($scope, Items) {
    debugger;
    var newValueTab;
    $scope.addTab = function () {
        debugger;
        newValueTab = prompt("Введите новое название закладки");
        items = Items.add(newValueTab);
    };

    /*---Чистим localStorage и массив ---*/
    $scope.dellTab = function () {
        //debugger;
        localStorage.clear();
        Items.splice(0);
    }
});



