import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import EnhancedTableComponent from './EnhancedTableComponent.jsx';
import CreateButtonComponent from './CreateButtonComponent.jsx';
import CreateRequestDialogComponent from './CreateRequestDialogComponent.jsx';
import { getLeaveRequestsQuery } from '../queries/queries';
import { readClient } from '../../apolloClients'

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
    render() {
        const { classes, user } = this.props;

        return (
            <Query query={getLeaveRequestsQuery} client={readClient}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    console.log("HomeComponent: ", data.LeaveRequests);

                    return (
                        <div className={classes.layout}>
                            <Typography align="center" variant="h4" paragraph>
                                Yi's Leave Request List
                            </Typography>
                            <EnhancedTableComponent data={data.LeaveRequests} />
                            <div className={classes.floatButton}>
                                <CreateButtonComponent>
                                    <CreateRequestDialogComponent userId={user.user_id}/>
                                </CreateButtonComponent>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

HomeComponent.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(HomeComponent);