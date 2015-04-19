angular.module('app.auth', []).factory('AuthService', function (Session, Credential) {
    // instantiate a new module called app.auth
    var authService = {};
    authService.login = function (credentials) {
        var user = new Credential();
        user.userName = 'zhadac';
        user.userRole = 'admin';
        return user.$save();
    };

    authService.isAuthenticated = function () {
        return !!Session.sessionId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
});