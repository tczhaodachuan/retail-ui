/**
 * Created by tczhaodachuan on 4/18/2015.
 */
app.directive('loginDialog', function(AUTH_EVENTS){
    return {
        restrict: 'A',
        template: '<div ng-if="visible" ng-include="\'/templates/login.html\'">',
        link: function (scope) {
            var showDialog = function () {
                scope.visible = true;
            };

            scope.visible = false;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
        }
    };
})