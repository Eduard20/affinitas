app.controller('mainCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$cookies',
     ($scope, $rootScope, $http, $timeout, $cookies) => {
        $scope.reg_username = null;
        $scope.reg_password = null;
        $scope.reg_name = null;
        $scope.reg_surname = null;
        $rootScope.isLogged = false;
        $scope.formData = [];
        $rootScope.userInfo = {};

         /**
          * Get User Information
          * @param {String} token
          */

        const getUserInfo = token => {
             if (token) {
                 $rootScope.getUserInfo(data => {
                     if (!data.error) {
                         $rootScope.isLogged = true;
                         $rootScope.userInfo = data;
                         return;
                     }
                     $rootScope.isLogged = false;
                 });
             }
         };

        const token = $cookies.get('token');

        getUserInfo(token);

         /**
          * Register
          * @param {String} regName
          * @param {String} regSurname
          * @param {String} regEmail
          * @param {String} regPassword
          */

        $scope.register = (regName, regSurname, regEmail, regPassword) => {

            const Data = {
                email: regEmail.toLowerCase(),
                password: regPassword
            };

            /**
             * HTTP POST /register
             */

            $http({
                url: '/register',
                method: 'POST',
                data: Data}).success(data => {

                if (!data.error) return $('#modal1').modal('open');

                $scope.message = data.message;
                $timeout(() => {
                    $scope.message = '';
                }, 2000);
            });

        };

        $scope.clearFields = () => {
            $scope.reg_username = null;
            $scope.reg_password = null;
        };

         /**
          * Login
          * @param {String} username
          * @param {String} password
          */

        $scope.login = (username, password) => {

            const Data = {
                email: username.toLowerCase(),
                password
            };

            /**
             * HTTP POST /login
             */

            $http({
                url: '/login',
                method: 'POST',
                data: Data}).success(data => {
                if (!data.error) {
                    const token = data.token;
                    $cookies.put('token', token);
                    $rootScope.isLogged = true;
                    location.reload();
                    return;
                }
                $scope.message = data.message;
                $timeout(() => {
                    $scope.message = '';
                }, 2000);
            });

        };


         /**
          * Logout
          */

         $scope.logout = () => {
            $cookies.remove('token');
            $rootScope.isLogged = false;
            location.reload();
        };

     }
]);

