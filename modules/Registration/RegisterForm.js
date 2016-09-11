import React from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {CardActions} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import SubmitButton from '../Form/Components/submitButton';

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState({
            username: this.props.username || '',
            email: this.props.email || ''
        });
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
                                defaultValue={this.state.username}
                                required="required"
                            />
                        </Row>

                        <Row center="xs">
                            <TextField
                                hintText="Email"
                                floatingLabelText="Add your email"
                                name="_email"
                                type="email"
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

                        <Row center="xs">
                            <TextField
                                hintText="Repeat Password"
                                floatingLabelText="Repeat your Password"
                                name="_passwordRepeat"
                                type="password"
                                required="required"
                            />
                        </Row>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col xs={12}>
                        <CardActions>
                            <Row center="xs">
                                <SubmitButton label="Create Account"/>
                            </Row>
                        </CardActions>
                    </Col>
                </Row>
            </Grid>

        );
    }
}
