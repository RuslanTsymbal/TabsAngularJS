angular.module('myApp').component('tabs', {
        templateUrl: 'components/tabs/template.html',
        controller: "tabsCtrl"
});

myApp.controller('tabsCtrl', function ($scope, Items) {
    //debugger;
    $scope.dell = "Удалить";
    $scope.tabs = Items;
    $scope.remove2 = true;

    $scope.removeNum = function (id){
        //debugger;
        $scope.pos = $scope.tabs.map(function(e) {
            return e.value; }).indexOf(id);
        $scope.removeElem($scope.pos);
    };

    $scope.removeElem = function(num){
        debugger;
        Items.splice(num, 1);
    };

});
