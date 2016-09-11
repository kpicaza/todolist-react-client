import React from 'react';
import config from 'react-global-configuration';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {CardActions} from 'material-ui/Card';
import TaskForm from './TaskForm';
import RestClient from '../Client/Conponents/RestClient';

export default class TaskCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.service = new RestClient();
        this.path = config.get('apiTasksPath') + '/';
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.ok = this.ok.bind(this);
        this.process = this.process.bind(this);
    }

    componentWillMount() {
        this.setState({
            submitting: false,
            open: false
        });
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    onSubmit(e) {
        e.preventDefault();

        if (true === this.submitting) {
            return;
        }

        this.setState({
            submitting: true
        });

        let formData = {
            description: this.refs.form[0].value,
            progress: 0
        };

        this.service.getResponse(
            this.service.request(this.path, 'POST', formData),
            this.ok,
            this.error,
            this.process
        );
    }

    ok(response) {
        if (!response.ok) {
            throw true;
        }

        this.setState({
            submitting: false,
        });

        return this;
    }

    process(data) {
        this.props.onMouseUp();
        this.handleClose();
    }

    error(e) {
        console.log(e);
    }

    renderForm() {
        let actions = [
            <FlatButton key="1" label="Close" primary={true} onTouchTap={this.handleClose}/>,
            <FlatButton type="submit" key="2" label="Add Task" primary={true} keyboardFocused={true}
                        onMouseUp={this.submit}/>,
        ];

        return (
            <Dialog
                title='Add a Task' modal={false} open={this.state.open}
                onRequestClose={this.handleClose}>
                <form ref="form" onSubmit={this.onSubmit} className="task-add-form"
                      autoComplete="off">
                    <TaskForm/>
                    <CardActions className="floating-right">
                        {actions}
                    </CardActions>
                </form>
            </Dialog>
        )
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                <FloatingActionButton secondary={true} onMouseUp={this.handleOpen}>
                    <ContentAdd className="right-float-button"/>
                </FloatingActionButton>
            </div>
        );
    }
}
