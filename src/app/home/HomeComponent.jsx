import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import EnhancedTableContainer from './EnhancedTableContainer';
import CreateButtonComponent from './CreateButtonComponent';
import CreateRequestDialogContainer from './CreateRequestDialogContainer';

const styles = theme => ({
    layout: {
        marginTop: theme.spacing.unit * 2
    },
    header: {
        padding: theme.spacing.unit * 8
    },
    footer: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center' 
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
            <Grid container spacing={24} className={classes.layout}>
                <Grid item md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    <Paper className={classes.header} elevation={2}>
                        <Typography variant="h4" gutterBottom={true}>
                            Smart Leave Request
                        </Typography>
                        <Typography variant="body1">
                            Smart Leave Request allow constrcution workers to access and organise their leaving requests. Operation includes creating a leave request, viewing their upcoming leave requests and deleting ones they do not want anymore.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item md={1} lg={2}></Grid>
                {/* {fetchMessage && fetchMessage !== 'success' && 
                    <div id="fetchMessage">{fetchMessage}</div>} */}
                <Grid item md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    <Paper elevation={2}>
                        <EnhancedTableContainer data={leaveRequests} />
                    </Paper>
                </Grid>
                <Grid item md={1} lg={2}></Grid>
                <Grid item md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    <Paper className={classes.footer} elevation={2}>
                        <Typography variant="body1">
                            &copy; Yi Chin 2018
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item md={1} lg={2}></Grid>
                <div className={classes.floatButton}>
                    <CreateButtonComponent>
                        <CreateRequestDialogContainer userId={user.user_id}/>
                    </CreateButtonComponent>
                </div>
            </Grid>
        );
    }
}

HomeComponent.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(HomeComponent);