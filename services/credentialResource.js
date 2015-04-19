app.factory('Credential', ['$resource', function($resource) {
    return $resource('http://localhost:8000/#/rest/_credential',{},{});
}]);