import React from 'react';
import {browserHistory} from 'react-router'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class RegiterSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        this.setState({
            open: this.props.open || false
        });
    }

    handleClose() {
        this.setState({open: false});
    }

    goToLogin() {
        browserHistory.push('/login');
    }

    render() {
        console.log('RegisterSuccess', this.state.open);


        let actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Login"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.goToLogin}
            />,
        ];

        return (
            <Dialog
                title="Congratulations!!"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.handleClose}
            >
                Your account was successfully created, going to login page and start using Todolist App.
            </Dialog>
        );
    }
}
