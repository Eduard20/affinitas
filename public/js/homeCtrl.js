app.controller('homeCtrl', ['$scope', '$rootScope', '$http', '$timeout',
    ($scope, $rootScope, $http, $timeout) => {
    $scope.answers = [];
        function getAnswers() {
            $rootScope.httpRequest('answers', 'GET', {}, data => {
                if (!data.error) {
                    $scope.answers = data.result;
                    $(document).ready(function(){
                        $('.collapsible').collapsible();
                    });
                    console.log($scope.answers);
                }
            });
        }
        getAnswers();
    }
]);