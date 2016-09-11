/**
 * Created by kpicaza on 5/08/16.
 */
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            icon: '',
            onClick: this.props.onClick || null
        };
    }

    componentWillMount() {
        console.log('submit button props', this.props);

        this.setState({
            label: this.props.label || "",
            icon: this.props.icon || ""
        });
    }

    render() {
        return (
            <div>
                <RaisedButton
                    type="submit"
                    label={this.state.label}
                    primary={true}
                    icon={<FontIcon className={this.state.icon}/>}
                    onMouseUp={this.state.onClick}
                />
            </div>
        );
    }
}

export default SubmitButton;
