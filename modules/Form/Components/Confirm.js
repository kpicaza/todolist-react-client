import React from 'react';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Confirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleClose = this.handleClose.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.setState({
            message: this.props.message,
            open: false
        });
    }

    componentWillReceiveProps() {
        this.setState({
            open: this.props.open
        });
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        });

        this.props.onClose()
    }

    submit() {
        this.props.onConfirm()
    }

    render() {
        let actions = [
            <FlatButton key="1" label="Close" primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton type="submit" key="2" label="Confirm" primary={true} keyboardFocused={true}
                        onMouseUp={this.submit}/>,
        ];

        return (
            <Dialog
                title={this.state.message} actions={actions} modal={false} open={this.state.open}
                onRequestClose={this.handleClose} >
                <Divider/>
            </Dialog>
        );
    }

}
