import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";

import EnhancedTableComponent from './EnhancedTableComponent';
import CreateButtonComponent from './CreateButtonComponent';
import CreateRequestDialogComponent from './CreateRequestDialogComponent';

// dummy data
const data = [{
    id: "1",
    leave_type: "Aeave type",
    start_datetime: "2018-10-01",
    end_datetime: "2018-10-10",
    created_time: "2018-11-09",
}, {
    id: "2",
    leave_type: "Beave type",
    start_datetime: "2018-10-01",
    end_datetime: "2018-10-10",
    created_time: "2018-06-09",
}, {
    id: "3",
    leave_type: "Ceave type",
    start_datetime: "2018-09-01",
    end_datetime: "2018-10-15",
    created_time: "2018-09-02",
}, {
    id: "4",
    leave_type: "Deave type",
    start_datetime: "2018-08-01",
    end_datetime: "2018-08-15",
    created_time: "2018-07-09",
}];

const styles = theme => ({
    layout: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    floatButton: {
        position: 'absolute',
        bottom: '50px',
        left: '50px'
    }
});

class HomeComponent extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.layout}>
                <Typography align="center" variant="h4" paragraph>
                    Yi's Leave Request List
                </Typography>
                <EnhancedTableComponent data={data} />
                <div className={classes.floatButton}>
                    <CreateButtonComponent>
                        <CreateRequestDialogComponent/>
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