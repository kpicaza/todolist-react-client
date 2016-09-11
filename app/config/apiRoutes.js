import config from 'react-global-configuration';

const apiPath = 'http://api.todolist.com/api/v1';

config.set({
    apiPath: apiPath,
    apiUsersPath: apiPath + '/users',
    apiCredentialsPath: apiPath + '/users/credentials',
    apiTasksPath: apiPath + '/tasks'
});
