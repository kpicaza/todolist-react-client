import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card} from 'material-ui/Card'
import NavBar from './NavBar/NavBar';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState({
            path: this.props.path,
            currentPath: this.props.currentPath
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
                <div>
                    <NavBar path={this.state.path} pathname={this.state.currentPath} />
                    <Card>
                        <main className="mdl-layout__content">
                            {this.props.children}
                        </main>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }

}
