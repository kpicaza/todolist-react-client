import localStorage from 'localStorage';
import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import Logout from '../Login/Logout';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: this.props.open || false};
    }

    render() {
        if (!localStorage.getItem('token') || null === localStorage.getItem('token')) {
            return (
                <div>
                    <MenuItem onTouchTap={this.props.handler}><Link to="/login">Login</Link></MenuItem>
                    <MenuItem onTouchTap={this.props.handler}><Link to="/register">Register</Link></MenuItem>
                </div>
            );
        }

        return (
            <div>
                <MenuItem onTouchTap={this.props.handler}><Link to="/">Dashboard</Link></MenuItem>
                <MenuItem onTouchTap={this.props.handler}><Link to="/tasks">Tasks</Link></MenuItem>
                <MenuItem onTouchTap={this.props.handler}><Logout/></MenuItem>
            </div>
        );
    }
}
