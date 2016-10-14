myApp = angular.module('myApp', ['ui.router']);

/*---фабрика Items ---*/

myApp.factory('Items', function () {
    var items = {
        tabs: [],
        add: function (tabName, myText) {
            debugger;
            var nameTab = {
                name: tabName,
                text: myText
            };

            if (myText) {
                var index = items.tabs.map(function (e) {
                    return e.name;
                }).indexOf(tabName);
                var arrTabs = [];
                arrTabs = JSON.parse(localStorage.getItem("name-tabs"));
                arrTabs.splice(index, 1, nameTab);
                arrTabs = JSON.stringify(arrTabs);
                localStorage.setItem("name-tabs", arrTabs);
                items.tabs = JSON.parse(localStorage.getItem("name-tabs"));

            } else {
                this.tabs.push(nameTab);
                var obj = JSON.stringify(this.tabs);
                localStorage.setItem("name-tabs", obj);
                this.tabs = JSON.parse(localStorage.getItem("name-tabs"));
            }
        }
    };
    if (JSON.parse(localStorage.getItem("name-tabs"))) {
        items.tabs = JSON.parse(localStorage.getItem("name-tabs"));
    }
    return items;
});

myApp.config(function ($stateProvider) {
    $stateProvider.state('tabs', {
        url: '/tabs/:cat/:page',
        templateUrl: 'templates/page.html',
        controller: function ($scope, $stateParams, Items) {
            $scope.page = $stateParams.page;
            $scope.text = $scope.page;
            $scope.hideElem = true;
            $scope.myText;
            $scope.hideElemChange = function () {
                $scope.hideElem = !$scope.hideElem;
            };

            $scope.saveText = function () {
                if ($scope.myText) {
                    $scope.$emit("messageEvent", {
                        message: $scope.myText
                    });
                    Items.add($scope.page, $scope.myText);
                }
            };
        }
    });
});

/*---Получаем новое название Закладки---*/

myApp.controller('topCtrl', function ($scope, Items) {
    var newValueTab;
    $scope.arrTabs = [];
    $scope.addTab = function () {
        newValueTab = prompt("Введите новое название закладки :");
        if (newValueTab) {
            Items.add(newValueTab, $scope.text);
        }
    };
    /*---Чистим localStorage и массив имен закладок ---*/
    $scope.dellTab = function () {
        Items.tabs.splice(0);
        localStorage.clear();
    }
});

myApp.controller('parentCrtl', function ($scope) {
    /*---получаем текст закладки  от дочернего $scope---*/
    $scope.$on("messageEvent", function (event, args) {
        event.stopPropagation();
        $scope.myNewText = args.message;
    });

    /*---получаем название и текст закладки от дочернего $scope---*/

    $scope.$on("tabName&Text", function (event, args) {
        event.stopPropagation();
        $scope.infoTab = args.message;
        $scope.tabName = $scope.infoTab.name;
        if ($scope.infoTab.text) {
            $scope.myNewText = $scope.infoTab.text;
        } else {
            $scope.myNewText = "";
        }
    })
});
