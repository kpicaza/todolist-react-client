import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Card>
                    <CardTitle
                        title="Dashboard"
                    />
                    <Divider/>
                    <CardText>
                        {this.props.children}
                    </CardText>
                </Card>
            </div>
        );
    }
}
