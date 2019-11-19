module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    listTasks: require('./list-tasks-by-user'),
    createTask: require('./create-task'),
    modifyTask: require('./modify-task'),
    deleteTask: require('./delete-task')
}