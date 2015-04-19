app.controller('appController', function ($rootScope, $scope, USER_ROLES, AUTH_EVENTS, AuthService, Session) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
        console.log(user);
        $scope.currentUser = user;

    };

    $scope.$watch('currentUser', function (currentUser) {
        if (currentUser != null && angular.isDefined(currentUser)) {
            console.log('User is defined');
            $scope.isLoginPage = true;
        }
        else {
            console.log('User is undefined');
            $scope.isLoginPage = false;
        }
    });
});