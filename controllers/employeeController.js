app.controller('employeeController', ['$scope', '$log', 'employeeResource', function ($scope, $log, employeeResource) {
    var employees = employeeResource.query();
    employees.$promise.then(function (employees) {
        $log.info(employees);
        $scope.employees = [];
        for(var i = 0; i < employees.length; i++)
        {
            var employee = {};
            employee.firstName = employees[i].firstName;
            employee.secondName = employees[i].secondName;
            employee.startDate = employees[i].startDate;
            employee.note = employees[i].note;
            employee.departmentId = employees[i].departmentId;
            $scope.employees.push(employee);
        }

        createEmployeeTable();
    }, function (reason) {
        $log.error('Failed to get employees data ' + reason);
        $scope.alert = 'Oops! Cannot get employees data.';
    });

    var createEmployeeTable = function()
    {
        //todo implementa the dataTable
    }

}])