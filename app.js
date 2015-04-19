var app = angular.module('app', ['ngResource', 'ui.router', 'app.auth']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, USER_ROLES) {
    $stateProvider
        .state('home', {
            url: '/',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
            }
        })
        .state('login', {
            url: '/login',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
            }
        })
        .state('logout', {
            url: '/logout',
            templateUrl: '/templates/login.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
            },
            controller: function($scope, Session) {
                Session.destroy();
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/home/home.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        });

    $urlRouterProvider.otherwise('/login');
    //$locationProvider.html5Mode(true);
});

app.run(function ($rootScope, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
        console.log(next);
        // the data is passed in from $stateProvider
        var authorizedRoles = next.data.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (AuthService.isAuthenticated()) {
                // user is not allowed
                console.log("User doesn't role to visit");
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            } else {
                console.log("User hasn't login.");
            }
                // user is not logged in
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }
    });
});

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});