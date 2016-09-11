import React from 'react';
import IconButton from 'material-ui/IconButton';
import PageView from 'material-ui/svg-icons/action/search';
import Close from 'material-ui/svg-icons/action/delete';
import {pink300, blue600} from 'material-ui/styles/colors';

export default class TaskActions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleOpenView = this.handleOpenView.bind(this);
        this.handleOpenClose = this.handleOpenClose.bind(this);
    }

    handleOpenView(e) {
        e.preventDefault();

        this.props.onClickView();
    }

    handleOpenClose(e) {
        e.preventDefault();

        this.props.onClickClose();
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.handleOpenView} className={'small-icon'}>
                    <PageView color={blue600} />
                </IconButton>
                <IconButton onClick={this.handleOpenClose} className={'small-icon'}>
                    <Close color={pink300}/>
                </IconButton>
            </div>
        );
    }
}
