app.factory('employeeResource', ['$resource', function($resource) {
    return $resource('http://localhost:8080/retail-crm/rest/_employee_resources/Employees',{},
        {
            query: {
                method:'GET',
                isArray:true,
                headers: {'Content-Type': 'application/json'}
            }
        });
}]);