
var app = angular.module('MinhaApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('myController', ['$scope', '$log', '$http','$filter','$uibModal', function($scope, $log, $http,$filter,$uibModal) {

            $scope.sortType     = 'name'; // set the default sort type
            $scope.sortReverse  = true;  // set the default sort order
            $scope.searchFish   = '';     // set the default search/filter term


            $scope.buscar = function() {

                $scope.loading = true;
                $http.get('/api/logconversation').then(function(response) {
                   var retorno = [];

                   var data = response.data;
                   console.log('data '+data);
                    var pos = 0;

                    angular.forEach(data.logs, function(item){
                         var jsonParam = {};
                          angular.forEach(item.response.entities, function(ent){
                               jsonParam.entidade = ent.entity;
                               //jsonParam.confidenceEntidade = (ent.confidence*100).toFixed(1)+" %";
                               jsonParam.confidenceEntidade = ent.confidence.toFixed(4)*100 ;
                          });
                          angular.forEach(item.response.intents, function(int){
                             jsonParam.intencao = int.intent;
                            // jsonParam.confidenceIntencao = (int.confidence*100).toFixed(1) +" %";
                            jsonParam.confidenceIntencao = int.confidence.toFixed(4)*100 ;
                          });

                          angular.forEach(item.response.input, function(text){
                                     if(text.length!=0)jsonParam.msgUser = text;
                           });

                          if(item.response.context.conversation_id.length!=0){
                            jsonParam.conversation_id = item.response.context.conversation_id;
                            jsonParam.data = $filter('date')(item.response_timestamp, "dd-MM-yyyy HH:mm:ss");
                            jsonParam.id=item.log_id;
                          }

                         if(!angular.equals(jsonParam, {})){
                            retorno.push(jsonParam);

                         }
                     });

                     if(retorno.length!=0){
                       retorno.push({selected: {}});
                     }

                      console.log('size data '+retorno.length);
                      $scope.items = retorno;
                      $scope.filteredItems = retorno;

                      if(retorno.length==0 ){
                            $scope.errorMessage='Registro não encontrado.';
                      } else {
                            $scope.errorMessage='';
                      }

                      $scope.loading = false;

                 });
             }

             $scope.isNumber = angular.isNumber;

             $scope.sort_by = function(newSortingOrder) {
                   $scope.sortReverse = ($scope.sortType === newSortingOrder) ? !$scope.sortReverse : false;
                   $scope.sortType = newSortingOrder;

             };

             $scope.showDown = function(newSortingOrder) {
                  return $scope.sortType == newSortingOrder && !$scope.sortReverse
             };

             $scope.showUp = function(newSortingOrder) {
                  return $scope.sortType == newSortingOrder && $scope.sortReverse
             };

             $scope.selection = [];

             // Toggle selection
             $scope.toggleSelection = function (id) {
                   var idx = $scope.selection.indexOf(id);
                   // Is currently selected
                   if (idx > -1) {
                     $scope.selection.splice(idx, 1);
                   } // Is newly selected
                   else {
                     $scope.selection.push(id);
                   }
             };

            $scope.aplicar = function () {
                 angular.forEach($scope.selection, function(sel){
                      console.log('checksboxx'+sel)
                  });
             };

            var $ctrl = this;
            $scope.modalEntidade = function(size,param) {
                     $scope.parametro=param;
                     $uibModal.open({
                         scope: $scope,
                         animation: true,
                         controllerAs: '$ctrl',
                         // Esse vai exibir o nome do scope atual
                         templateUrl: 'myModalEntidade.html',
                         controller: 'ModalInstanceCtrl',
                         windowClass: 'custom-dialog',
                         backdrop:false,
                         size: size,
                     });
             };


             $scope.modalIntencao = function(size,param) {
                       $scope.parametro=param;
                          $uibModal.open({
                              scope: $scope,
                              animation: true,
                              controllerAs: '$ctrl',
                              // Esse vai exibir o nome do scope atual
                              templateUrl: 'myModalIntencao.html',
                              controller: 'ModalInstanceCtrl',
                              windowClass: 'custom-dialog',
                              backdrop:false,
                              size: size,
                          });
              };

               $scope.modalConfigWorkspace = function(size,param) {
                                     $scope.parametro=param;
                                        $uibModal.open({
                                            scope: $scope,
                                            animation: true,
                                            controllerAs: '$ctrl',
                                            // Esse vai exibir o nome do scope atual
                                            templateUrl: 'myModalAdmWorkspace.html',
                                            controller: 'ModalInstanceCtrl',
                                            windowClass: 'custom-dialog',
                                            backdrop:false,
                                            size: size,
                                        });
                };


                $scope.modalCriarWorkspace = function(size,param) {
                             $scope.parametro=param;
                                $uibModal.open({
                                    scope: $scope,
                                    animation: true,
                                    controllerAs: '$ctrl',
                                    // Esse vai exibir o nome do scope atual
                                    templateUrl: 'myModalConfigWorkspace.html',
                                    controller: 'ModalInstanceCtrl',
                                    windowClass: 'custom-dialog',
                                    backdrop:false,
                                    size: size,
                                });
                 };


}]);


