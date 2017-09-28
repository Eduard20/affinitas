app.controller('testCtrl', ['$scope', '$rootScope', '$http', '$timeout',
    ($scope, $rootScope, $http, $timeout) => {
    $scope.questions = [];
        function getQuestions() {
            $rootScope.httpRequest('questions', 'GET', {}, data => {
                if (!_.isEmpty(data.questions)) {
                    $scope.questions = _.groupBy(data.questions, one => one.category);
                    console.log($scope.questions);
                }
            });
        }
        getQuestions();
        $scope.answers = {};
        $scope.specialValue = {};
    }
]);