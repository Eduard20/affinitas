app.controller('testCtrl', ['$scope', '$rootScope', '$http', '$timeout',
    ($scope, $rootScope, $http, $timeout) => {
    $scope.questions = [];
    let questions = [];

        /**
         * HTTP GET To Get All Questions
         */

        function getQuestions() {
            $rootScope.httpRequest('questions', 'GET', {}, data => {
                if (!_.isEmpty(data.questions)) {
                    $scope.questions = _.groupBy(data.questions, one => one.category);
                    questions = data.questions;
                }
            });
        }
        getQuestions();

        $scope.answers = {};

        /**
         * Save Test Answer To MongoDB
         */

        $scope.saveTestAnswers = () => {
            let data = {};
            const arr = [];

            _.each(questions, one => {
                if ('single_choice_conditional' === one.question_type.type) {
                    if ($scope.answers[one.question]
                        !== one.question_type.condition.predicate.exactEquals[1]) {
                        if ($scope.answers[one.question_type.condition.if_positive.question]) {
                            delete $scope.answers[one.question_type.condition.if_positive.question];
                        }
                    }
                }
            });

            for (const key in $scope.answers) {
                if ($scope.answers.hasOwnProperty(key)) {
                    data = {
                        question: key,
                        answer: $scope.answers[key]
                    };
                    arr.push(data);
                }
            }

            $rootScope.httpRequest('answers', 'PUT', { data: arr }, data => {
                if (!data.error) return $('#testSuccess').modal('open');
                return ('#testFailed$').modal('open');
            });
        };
    }
]);
