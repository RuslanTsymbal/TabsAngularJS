angular.module('myApp').component('tabs', {
        templateUrl: 'components/tabs/template.html',
        controller: "tabsCtrl"
    });

myApp.controller('tabsCtrl', function ($scope, Items) {
    //debugger;

    $scope.dell = "Удалить";
    $scope.tabs = Items;
    $scope.remove2 = true;

    $scope.remove = function (id){
        debugger;
        $("#" + id).remove();

        $scope.pos = $scope.tabs.map(function(e) {
            return e.value; }).indexOf(id);
            delete $scope.tabs[$scope.pos];
            $scope.tabs.length = $scope.tabs.length-1;
    };
    $scope.remove2 = (function(){
        if($scope.tabs.length == 0){
            $(".dell").remove();
        }
    })

});
