import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {CardText, CardActions} from 'material-ui/Card';
import TaskSlider from './TaskSlider';
import Divider from 'material-ui/Divider';
import TaskToggle from './TaskToggle';

export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.communicateParent = this.communicateParent.bind(this);
    }

    componentWillMount() {
        this.setState({
            task: this.props.task,
        });
    }

    communicateParent(task) {
        this.setState({
            task: task
        });

        this.props.onChange(this.state.task);
        console.log(task);
    }

    render() {

        return (
            <div>
                <CardText>
                    <TaskSlider task={this.state.task} onDragStop={this.communicateParent}/>
                </CardText>
                <CardActions>
                    <Row>
                        <Col xs={4}>
                            <TaskToggle task={this.state.task}/>
                        </Col>
                        <Col xs={5}>
                        </Col>
                        <Col xs={3} className="summary-buttons">
                        </Col>
                    </Row>
                </CardActions>
                <Divider/>
            </div>
        );
    }
}
