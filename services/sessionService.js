app.service('Session', function () {
    // retrieve the existing module which was created at authService
    this.create = function (sessionId, userName, userRole) {
        console.log('Creating session with sessionId ' + sessionId);
        this.sessionId = sessionId;
        this.userName = userName;
        this.userRole = userRole;
    };
    this.destroy = function () {
        this.sessionId = null;
        this.userName = null;
        this.userRole = null;
    }
});