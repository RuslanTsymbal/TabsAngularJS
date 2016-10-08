myApp = angular.module('myApp', ['ui.router']);

/*---фабрика Items ---*/

myApp.factory('Items', function () {
    debugger;
    var items = [];
    items.add = function (a) {
        //debugger;
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
                if ($scope.hideElem == true) {
                    $scope.hideElem = false;
                } else {
                    $scope.hideElem = true;
                }
            };

            $scope.saveText = function () {
                //debugger;
                if ($scope.myText !== undefined) {
                  // debugger;
                    $scope.valueKey = localStorage.getItem("text_0");
                    if ($scope.valueKey == null) {
                        $scope.saveKey("lastIndex", 0);
                        $scope.key = "text_" + 0;
                        $scope.saveKey($scope.key, $scope.myText);
                    } else {
                        $scope.lastIndexLS = +localStorage.getItem("lastIndex",  $scope.lastIndexLS) + 1;
                        localStorage.setItem("lastIndex", $scope.lastIndexLS);
                        $scope.key = "text_" + $scope.lastIndexLS;
                        $scope.saveKey($scope.key, $scope.myText)
                    }
                }
            };
            /*---Сохраняем ключи в localStorage---*/

            $scope.saveKey = function (key, value) {
                localStorage.setItem(key, value);
            }
        }
    });
});

/*---Получаем новое название Закладки---*/

myApp.controller('topCtrl', function ($scope, Items) {
    //debugger;
    var newValueTab;
    $scope.addTab = function () {
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



