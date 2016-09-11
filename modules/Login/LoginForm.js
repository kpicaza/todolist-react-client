/**
 * Created by kpicaza on 7/08/16.
 */

import React from 'react';
import {CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {Grid, Row, Col} from 'react-flexbox-grid';
import SubmitButton from '../Form/Components/submitButton';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState({
            username: this.props.email || ''
        });
    }

    componentWillUnmount() {
        this.forceUpdate();
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Row center="xs">
                            <TextField
                                hintText="Username"
                                floatingLabelText="Add your username"
                                name="_username"
                                defaultValue={this.state.email}
                                required="required"
                            />
                        </Row>

                        <Row center="xs">
                            <TextField
                                hintText="Password"
                                floatingLabelText="Add your Password"
                                name="_password"
                                type="password"
                                required="required"
                            />
                        </Row>
                    </Col>
                    <Divider />
                    <Col xs={12}>
                        <CardActions>
                            <Row center="xs">
                                <SubmitButton label="Access"/>
                            </Row>
                        </CardActions>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default LoginForm;
