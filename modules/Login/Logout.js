import localStorage from 'localStorage';
import React from 'react';
import {browserHistory} from 'react-router';

export default class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    clearCookies() {
        localStorage.removeItem('uuid');
        localStorage.removeItem('token');

        browserHistory.go('/login');
    }

    render() {
        return (
            <div>
                <a onClick={this.clearCookies.bind(this)}>Logout</a>
            </div>
        );
    }

}
