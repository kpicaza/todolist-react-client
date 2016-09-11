import localStorage from 'localStorage';
import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import RestClient from '../Client/Conponents/RestClient';
import FormErrors from '../Form/Components/formErrors';
import RegisterForm from './RegisterForm';
import RegisterSuccess from './RegiterSuccess';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.service = new RestClient();
        this.renderProgress = this.renderProgress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        if (localStorage.getItem('token') && null !== localStorage.getItem('token')) {
            browserHistory.push('/');
        }
    }

    componentWillMount() {
        this.setState({
            submitting: false,
            path: this.props.path || "",
            username: this.props.eusername || '',
            email: this.props.email || '',
            errors: this.props.errors || [],
            confirmed: false,
        });

    }

    onSubmit(e) {
        e.preventDefault();

        if (true === this.state.submitting) {
            return;
        }

        this.setState({submitting: true});

        if (this.refs.form[2].value !== this.refs.form[3].value) {
            this.setState({
                errors: [{'message': 'Passwords are not equals'}],
                confirmed: false,
                submitting: false
            });

            return;
        }

        let formData = {
            username: this.refs.form[0].value,
            email: this.refs.form[1].value,
            password: this.refs.form[2].value,
        };

        this.service.request(this.state.path, 'POST', formData)
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw true;
                }

                this.setState({
                    errors: [],
                    confirmed: true,
                    submitting: false
                });

            })
            .catch((e) => {
                this.setState({
                    errors: [{'message': 'Invalid username or email'}],
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
        return (
            <CardText>
                <RegisterSuccess open={this.state.confirmed}/>
                <FormErrors errors={this.state.errors}/>
                <Card>
                    <CardTitle title="Todo list" subtitle="Create account"/>
                    {this.renderProgress()}
                    <Divider />
                    <div>
                        <form ref="form" onSubmit={this.onSubmit} className="register-form"
                              autoComplete="off">
                            <RegisterForm username={this.state.username} email={this.state.email} />
                        </form>
                    </div>
                </Card>
            </CardText>
        );
    }
}
