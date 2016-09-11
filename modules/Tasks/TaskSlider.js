import React from 'react';
import config from 'react-global-configuration';
import RestClient from '../Client/Conponents/RestClient';
import Slider from 'material-ui/Slider';
import TaskFactory from './TaskFactory';

const sliderMin = 0;
const sliderMax = 100;

export default class TaskSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.service = new RestClient;
        this.factory = new TaskFactory;
        this.handleChange = this.handleChange.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.ok = this.ok.bind(this);
    }

    componentWillMount() {
        this.setState({
            task: this.props.task,
            value: this.props.task.progress.progress,
            submitting: false
        });
        this.path = config.get('apiTasksPath') + '/' + this.props.task.id;
    }

    componentWillReceiveProps() {
        this.setState({
            task: this.props.task,
            value: this.props.task.progress.progress,
        });
    }

    handleChange(e, value) {
        this.setState({
            value: value
        });
    }

    handleDrag(e) {
        e.preventDefault();

        if (true === this.state.submitting) {
            return;
        }

        this.setState({
            submitting: true
        });

        let formData = {
            replace: 'progress',
            value: this.state.value
        };

        this.service.getResponse(
            this.service.request(this.path, 'PATCH', formData),
            this.ok,
            this.error
        );
    }

    ok(response) {
        if (!response.ok) {
            throw true;
        }

        this.setState({
            submitting: false,
            task: this.factory.make(
                this.state.task.id,
                this.state.task.description,
                this.state.value
            )
        });

        this.props.onDragStop(this.state.task);

        return response.json();
    }

    error(e) {
        console.log(e);
    }

    render() {
        return (
            <Slider name="taskProgress" min={sliderMin} max={sliderMax} value={this.state.value}
                    step={1} onChange={this.handleChange} onDragStop={this.handleDrag}/>
        );
    }

}
