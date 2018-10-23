import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { logout } from '../../utils/userService';

import { loginActions, loginSelectors } from '../login/duck';

export default function withAppBar(WrappedComponent) {
    const styles = {
        logo: {
            flexGrow: 1
        },
        popper: {
            'z-index': 10
        }
    };

    class AppBarComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                open: false
            }
        }

        handleToggle = () => {
            this.setState(state => ({ open: !state.open }));
        };
        
        handleClose = event => {
            if (this.anchorEl.contains(event.target)) {
              return;
            }
            this.setState({ open: false });
        };

        handleLogout = (event) => {
            const { onLogoutRequest } = this.props;
    
            logout();
            onLogoutRequest();
            this.handleClose(event);
        };

        render() {
            const { classes, user } = this.props;
            const { open } = this.state;

            return (
                <React.Fragment>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.logo} >
                                SLR
                            </Typography>
                            <Button 
                                color="inherit"
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                aria-owns={open ? 'menu-list-grow' : null}
                                aria-haspopup="true"
                                onClick={this.handleToggle}
                            >
                                {user.first_name}
                            </Button>
                            <Popper className={classes.popper} open={open} anchorEl={this.anchorEl} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="menu-list-grow"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList>
                                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Toolbar>
                    </AppBar>
                    <WrappedComponent />
                </React.Fragment>
              );
        }
    };

    AppBarComponent.propTypes = {
        classes: PropTypes.object.isRequired,
    };

    const mapStateToProps = state => ({
        user: loginSelectors.getUser(state)
    });
    
    const mapDispatchToProps = dispatch => ({
        onLogoutRequest: () => dispatch(loginActions.doLogout())
    });

    const enhance = compose(
        withStyles(styles),
        connect(
            mapStateToProps,
            mapDispatchToProps
        )
    );

    return enhance(AppBarComponent);
}