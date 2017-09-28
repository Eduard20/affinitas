app.controller('homeCtrl', ['$scope', '$rootScope', '$http', '$timeout',
    ($scope, $rootScope, $http, $timeout) => {
        function getAnswers() {
            $rootScope.httpRequest('questions', 'GET', {}, data => {
                if (!_.isEmpty(data.questions)) {
                    $scope.questions = _.groupBy(data.questions, one => one.category);
                    questions = data.questions;
                }
            });
        }
    }
]);