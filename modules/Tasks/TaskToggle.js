import React from 'react';
import Toggle from 'material-ui/Toggle';

export default class TaskToggle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.dispatchToggle = this.dispatchToggle.bind(this);
    }

    componentWillMount() {
        this.setState({
            task: this.props.task
        });
    }

    componentWillReceiveProps() {
        this.setState({
            task: this.props.task,
        });
    }

    dispatchToggle(e) {
        e.preventDefault();

        this.props.onSwitchTogged();
    }

    render() {
        return (
            <Toggle
                label={true === this.state.task.progress.isDone ? 'Closed' : 'Open'}
                defaultToggled={this.state.task.progress.isDone}
                labelPosition="right"
                disabled={true}
                onToggle={this.dispatchToggle}
            />
        );
    }
}
