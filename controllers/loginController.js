app.controller('loginController', function ($scope, $rootScope, $state, AUTH_EVENTS, Session, AuthService) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function (credentials) {
        AuthService.login(credentials)
            .then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
            }, function (error) {
                // TODO below codes are not correct, which force the login succeed for testing purpose.
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                var user = {};
                user.sessionId = '1234';
                user.userName = 'zhadac';
                user.userRole = 'admin';
                Session.create(user.sessionId, user.userName, user.userRole);
                $scope.setCurrentUser(user);
                $state.go('dashboard');
                //$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
    };
});