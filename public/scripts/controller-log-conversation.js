
var app = angular.module('MinhaApp', []);

app.controller('myController', ['$scope', '$log', '$http','$filter', function($scope, $log, $http,$filter) {


        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term

      $scope.buscar = function() {

            $http.get('/api/logconversation').success(function(data) {

               var retorno = [];
               console.log('data '+data);
                var pos = 0;

                angular.forEach(data.logs, function(item){

                     var jsonParam = {};
                      angular.forEach(item.response.entities, function(ent){
                           jsonParam.entidade = ent.entity;
                           jsonParam.confidenceEntidade = (ent.confidence*100).toFixed(1)+" %";
                      });
                      angular.forEach(item.response.intents, function(int){
                         jsonParam.intencao = int.intent;
                         jsonParam.confidenceIntencao = (int.confidence*100).toFixed(1) +" %";
                      });

                      angular.forEach(item.response.input, function(text){
                                 if(text.length!=0)jsonParam.msgUser = text;
                       });

                      if(item.response.context.conversation_id.length!=0){
                        jsonParam.conversation_id = item.response.context.conversation_id;
                        jsonParam.data = $filter('date')(item.response_timestamp, "dd-MM-yyyy HH:mm:ss");


                      }

                     if(!angular.equals(jsonParam, {})){
                        retorno.push(jsonParam);
                     }

                 });

                 console.log('size data '+retorno.length);

                  $scope.items = retorno;


             });
      }


   $scope.sort_by = function(newSortingOrder) {
      $scope.sortType = newSortingOrder; $scope.sortReverse = !$scope.sortReverse;
    };

    $scope.showDown = function(newSortingOrder) {
          return $scope.sortType == newSortingOrder && !$scope.sortReverse
     };

    $scope.showUp = function(newSortingOrder) {
          return $scope.sortType == newSortingOrder && $scope.sortReverse

     };




}]);

