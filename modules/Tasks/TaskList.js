import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import RestClient from '../Client/Conponents/RestClient';
import TaskSummary from './TaskSummary';
import TaskCreate from './TaskCreate';

export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.service = new RestClient;
        this.communicateParent = this.communicateParent.bind(this);
        this.ok = this.ok.bind(this);
        this.process = this.process.bind(this);
    }

    componentWillMount() {
        this.setState({
            tasks: null,
            path: this.props.path || "",
            received: false
        });
    }

    componentDidMount() {
        setTimeout((() => {
            this.getTasks();
        }), 0);
    }

    communicateParent() {
        console.log('Task list was notified');
        this.setState({
            received: false
        });
        setTimeout((() => {
            this.getTasks();
        }), 0);
    }

    getTasks() {
        if (true === this.state.received) {
            return;
        }

        this.service.getResponse(
            this.service.request(this.state.path, 'GET', {}),
            this.ok,
            this.error,
            this.process
        );
    }

    ok(response) {
        if (!response.ok) {
            throw true;
        }

        return response.json();
    }

    process(data) {
        this.setState({
            tasks: data,
            received: true
        });

        this.renderTasks();
        this.forceUpdate();

        return this;
    }

    error(e) {
        console.log(e);
    }

    renderTasks() {
        let tasks = [];

        _.forEach(this.state.tasks, ((task, key) => {
            console.log(task);

            tasks.push(
                <TaskSummary path={this.state.path} key={key} task={task} onDelete={this.communicateParent}/>
            );
        }));

        return tasks;
    }

    render() {
        if (!this.state.tasks) {
            return (
                <CircularProgress size={.5}/>
            );
        }

        return (
            <div>
                <h2>Tasks</h2>
                <Grid>
                    <Row>
                        {this.renderTasks()}
                    </Row>
                </Grid>

                <Grid className="page-buttons">
                    <Col xsOffset={11} xs={1}>
                        <TaskCreate onMouseUp={this.communicateParent}/>
                    </Col>
                </Grid>
            </div>
        );
    }

}
