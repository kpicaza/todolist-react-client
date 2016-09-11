/**
 * Created by kpicaza on 1/08/16.
 */
import localStorage from 'localStorage';
import React from 'react';
import {browserHistory} from 'react-router';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import RestClient from '../Client/Conponents/RestClient';
import FormErrors from '../Form/Components/formErrors';
import LoginForm from './LoginForm';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.service = new RestClient();
        this.renderProgress = this.renderProgress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (!localStorage.getItem('token') && null !== localStorage.getItem('token')) {
            browserHistory.push('/');
        }
    }

    componentWillMount() {
        this.setState({
            submitting: false,
            login: [],
            path: this.props.path || "",
            username: this.props.email || '',
            errors: this.props.errors || [],
            confirmed: false,
            userId: localStorage.getItem('userId')
        });

    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({submitting: true});

        let formData = {
            username: this.refs.form[0].value,
            password: this.refs.form[1].value
        };
        // this.formData.append('_remember_me', this.refs.form[2].value);
        // this.formData.append('_csrf_token', this.refs.form[3].value);

        this.service.request(this.state.path, 'POST', formData)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw true;
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('uuid', data.uuid);

                console.log(data);

                this.state.errors = null;
                this.state.confirmed = true;

                browserHistory.push('/');

                return this;
            })
            .catch((e) => {
                localStorage.removeItem('token');
                localStorage.removeItem('uuid');

                this.setState({
                    errors: [{'message': 'Invalid username or password'}],
                    confirmed: false,
                    submitting: false
                });

                return this;
            })
        ;
    }

    renderProgress() {
        if (!this.state.submitting) {
            return '';
        }

        if (true === this.state.confirmed) {
            browserHistory.push('/');
        }

        return <CircularProgress size={.5}/>;
    }

    render() {
        if (true === this.state.confirmed) {
            browserHistory.push('/');
        }

        return (
            <CardText>
                <FormErrors errors={this.state.errors}/>
                <Card>
                    <CardTitle title="Todo list" subtitle="Login"/>
                    {this.renderProgress()}
                    <Divider />
                    <div>
                        <form ref="form" onSubmit={this.onSubmit} className="login-form"
                              autoComplete="off">
                            <LoginForm username={this.state.email}/>
                        </form>
                    </div>
                </Card>
            </CardText>
        );
    }
}

export default Login;
