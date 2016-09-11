import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RestService from './../Client/Conponents/RestClient';
import Confirm from './../Form/Components/Confirm';
import Task from './Task';
import TaskSlider from './TaskSlider';
import TaskToggle from './TaskToggle';
import TaskActions from './TaskActions';

export default class TaskSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.service = new RestService;
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderConfirm = this.renderConfirm.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.communicateParent = this.communicateParent.bind(this);
        this.handleDeleteConfirmOpen = this.handleDeleteConfirmOpen.bind(this);
        this.handleDeleteConfirmClose = this.handleDeleteConfirmClose.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
        this.ok = this.ok.bind(this);
    }

    componentWillMount() {
        this.setState({
            task: this.props.task,
            path: this.props.path,
            open: false,
            confirmOpen: false
        });
    }

    componentWillReceiveProps() {
        this.setState({
            task: this.props.task,
            confirmOpen: false
        });

        setTimeout(this.forceUpdate(), 1000);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleDeleteConfirmOpen() {
        this.setState({
            confirmOpen: true
        });

        setTimeout((() => {
            this.forceUpdate();
        }), 0);
    }

    handleDeleteConfirmClose() {
        this.setState({
            confirmOpen: false
        });

        setTimeout((() => {
            this.forceUpdate();
        }), 0);
    }

    handleDeleteConfirm() {
        console.log('Element marked to delete.');

        this.service.getResponse(
            this.service.request(this.state.path + this.state.task.id, 'DELETE', {}),
            this.ok,
            this.error
        );
    }

    ok(response) {
        if (!response.ok) {
            throw true;
        }

        this.setState({
            confirmOpen: false
        });

        this.props.onDelete();
    }

    error(e) {
        console.log(e);
    }

    handleToggle() {

    }

    communicateParent(task) {
        this.setState({
            task: task
        });
        this.forceUpdate();
    }

    renderTask() {
        let actions = [
            <FlatButton label="Close" primary={true} onTouchTap={this.handleClose}/>,
        ];

        return (
            <Dialog
                title={this.state.task.description} actions={actions} modal={false} open={this.state.open}
                onRequestClose={this.handleClose}>
                <Divider/>
                <Task onChange={this.communicateParent} task={this.state.task}/>
            </Dialog>

        );
    }

    renderConfirm() {
        return (
            <Confirm message={'Are you sure you want to delete tasks "' + this.state.task.description + '"'}
                     open={this.state.confirmOpen} onConfirm={this.handleDeleteConfirm}
                     onClose={this.handleDeleteConfirmClose}/>
        );
    }

    render() {
        return (
            <Col xs={12} sm={6} md={4}>
                {this.renderTask()}
                {this.renderConfirm()}
                <Paper className="content-summary-item">
                    <Card>
                        <CardHeader title={this.state.task.description}/>
                        <Divider/>
                        <CardText>
                            <TaskSlider task={this.state.task} onDragStop={this.communicateParent}/>
                        </CardText>
                        <Divider/>
                        <CardActions>
                            <Row>
                                <Col xs={4}>
                                    <TaskToggle onSwitchTogged={this.handleToggle} task={this.state.task}/>
                                </Col>
                                <Col xs={3}>
                                </Col>
                                <Col xs={5} className="summary-buttons">
                                    <TaskActions onClickView={this.handleOpen}
                                                 onClickClose={this.handleDeleteConfirmOpen}/>
                                </Col>
                            </Row>
                        </CardActions>
                    </Card>
                </Paper>
            </Col>
        );
    }
}
