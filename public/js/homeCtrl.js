app.controller('homeCtrl', ['$scope', '$rootScope',
    ($scope, $rootScope) => {
    $scope.answers = [];

        /**
         * HTTP GET To Get Answers
         */
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
