import localStorage from 'localStorage';
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import Login from './Login/Login';
import Register from './Registration/Register';
import Dashboard from './Dashboard/Dashboard';
import TaskList from './Tasks/TaskList';

const usersPath = 'http://api.todolist.com/api/v1/users/';
const credentialsPath = 'http://api.todolist.com/api/v1/users/credentials';
const tasksPath = 'http://api.todolist.com/api/v1/tasks/';

function getApp(nextState, callback) {
    callback(null, props => <App {...props} path={usersPath} currentPath={nextState.location.pathname}/>);
}

function getRegistration(nextState, callback) {
    callback(null, props => <Register {...props} path={usersPath} currentPath={nextState.location.pathname}/>);
}

function getLogin(nextState, callback) {
    callback(null, props => <Login {...props} path={credentialsPath}/>);
}

function getTaskList(nextState, callback) {
    callback(null, props => <TaskList {...props} path={tasksPath}/>);
}

module.exports = (
    <Route path="/" getComponent={getApp}>
        <IndexRoute component={Dashboard}/>
        <Route path="/register" getComponent={getRegistration}/>
        <Route path="/login" getComponent={getLogin}/>
        <Route path="/" component={Dashboard}>
            <Route path="/tasks" getComponent={getTaskList}/>
        </Route>
    </Route>
);
