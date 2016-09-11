import React from 'react';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-flexbox-grid';

export default class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Row>
                    <TextField
                        fullWidth={true}
                        hintText="Task description"
                        floatingLabelText="Describe your Task"
                        name="_description"
                        required="required"
                    />
                </Row>
            </div>
        )
    }
}
