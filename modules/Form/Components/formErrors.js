/**
 * Created by kpicaza on 5/08/16.
 */
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class FormErrors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState({
            errors: this.props.errors || [],
            open: this.props.open || false,
            message: ''
        });
    }

    componentWillUnmount() {
        this.forceUpdate();
    }

    getErrors() {
        if (1 > this.props.errors.length) {
            return '';
        }

        this.state.open = true;
        this.state.errors = this.props.errors;

        return this.state.errors[0].message;
    };

    handleActionTouchTap() {
        this.handleRequestClose();
    };

    handleRequestClose() {
        if (false === this.state.open) {
            return '';
        }

        this.setState({
            open: false
        });
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.getErrors()}
                    action="X"
                    className="error-snack-bar"
                    onActionTouchTap={this.handleActionTouchTap.bind(this)}
                    onRequestClose={this.handleRequestClose.bind(this)}
                />
            </div>
        );
    }
}

export default FormErrors;
