import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";

import EnhancedTableContainer from './EnhancedTableContainer';
import CreateButtonComponent from './CreateButtonComponent';
import CreateRequestDialogContainer from './CreateRequestDialogContainer';

const styles = theme => ({
    layout: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    floatButton: {
        position: 'fixed',
        bottom: '50px',
        left: '50px'
    }
});

class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { onFetchRequest, onClearFetchMessage } = this.props;
        onClearFetchMessage();
        onFetchRequest();
    }

    render() {
        const { classes, user, leaveRequests, fetchMessage } = this.props;

        return (
            <div className={classes.layout}>
                <Typography align="center" variant="h4" paragraph>
                    Yi's Leave Request List
                </Typography>
                {fetchMessage && fetchMessage !== 'success' && 
                    <div id="fetchMessage">{fetchMessage}</div>}
                <EnhancedTableContainer data={leaveRequests} />
                <div className={classes.floatButton}>
                    <CreateButtonComponent>
                        <CreateRequestDialogContainer userId={user.user_id}/>
                    </CreateButtonComponent>
                </div>
            </div>
        );
    }
}

HomeComponent.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(HomeComponent);