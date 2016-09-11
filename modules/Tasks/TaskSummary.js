import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Task from './Task';
import TaskSlider from './TaskSlider';
import TaskToggle from './TaskToggle';
import TaskActions from './TaskActions';

export default class TaskSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.communicateParent = this.communicateParent.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    }

    componentWillMount() {
        this.setState({
            task: this.props.task,
            path: this.props.path,
            open: false
        });
    }

    componentWillReceiveProps() {
        this.setState({
            task: this.props.task,
        });
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleDeleteConfirm() {

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
            <FlatButton label="Close" primary={true} onTouchTap={this.handleClose} />,
        ];
        {/*onTouchTap={this.goToLogin}*/}

        return (
            <Dialog
                title={this.state.task.description} actions={actions} modal={false} open={this.state.open}
                onRequestClose={this.handleClose} >
                <Divider/>
                <Task onChange={this.communicateParent} task={this.state.task}/>
            </Dialog>

        );
    }

    render() {
        return (
            <Col xs={12} sm={6} md={4}>
                {this.renderTask()}
                <Paper className="content-summary-item">
                    <Card>
                        <CardHeader title={this.state.task.description}/>
                        <Divider/>
                        <CardText>
                            <TaskSlider task={this.state.task} onDragStop={this.communicateParent} />
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
                                    <TaskActions onClickView={this.handleOpen} onClickClose={this.handleDeleteConfirm} />
                                </Col>
                            </Row>
                        </CardActions>
                    </Card>
                </Paper>
            </Col>
        );
    }
}
