import localStorage from 'localStorage';
import React from 'react';
import {browserHistory} from 'react-router';
import gravatar from 'gravatar';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import RestClient from '../Client/Conponents/RestClient';
import SideBar from '../SideBar/SideBar';

const publicRoutes = ['/login', '/register', '/resetting'];

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.service = new RestClient;
        this.handleToggle = this.handleToggle.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentWillMount() {
        this.setState({
            currentPath: this.props.pathname,
            path: this.props.path,
            open: this.props.open || false,
            shoots: this.state.shoots || 0,
            email: ''
        });
    }

    componentDidMount() {
        setTimeout((() => {
            this.getUser();
        }), 0);
    }

    getUser() {

        if (!this.isPublicRoute() && !this.state.email && (!localStorage.getItem('token') || null === localStorage.getItem('token'))) {
            this.redirectToLogin();
        }

        if (0 < this.state.shoots || this.isPublicRoute()) {
            return;
        }

        this.service.request(this.state.path + localStorage.getItem('uuid'), 'GET', {})
            .then(((response) => {
                console.log(response);
                if (!response.ok) {
                    throw true;
                }
                return response.json();
            }))
            .then(((data) => {
                console.log(data);

                this.setState({
                    user: data,
                    email: data.email,
                    shoots: this.state.shoots + 1
                });
            }))
            .catch(((e) => {
                debugger
                console.log(e);
                localStorage.removeItem('token');
                localStorage.removeItem('uuid');

                this.redirectToLogin();
            }))
        ;

    }

    isPublicRoute() {
        return -1 !== publicRoutes.indexOf(this.state.currentPath);
    }

    redirectToLogin() {
        if (this.isPublicRoute()) {
            this.setState({
                shoots: this.state.shoots + 1
            });
            return;
        }
        browserHistory.push('/login');

    }

    handleToggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    disableSwipeToOpen={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <SideBar handler={this.handleToggle}/>
                </Drawer>
                <AppBar
                    title="Todo List"
                    onLeftIconButtonTouchTap={this.handleToggle}
                    isInitiallyOpen={ true }
                    iconElementRight={
                        <Avatar src={gravatar.url(this.state.email)}/>
                    }
                />
                <main className="mdl-layout__content">
                    {this.props.children}
                </main>

            </div>
        );
    }
}
