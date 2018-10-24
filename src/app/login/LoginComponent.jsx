import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { isAuthenticated } from '../../utils/userService'
import { messageType, MessageBar } from '../common/MessageBar';

const styles = theme => ({
    layout: {
        display: 'flex',
        width: '100%',
        height: '100%',
        'justify-content': 'center',
        'align-items': 'center',
    },
    loading: {
        display: 'flex',
        width: '350px',
        height: '320px',
        'justify-content': 'center',
        'align-items': 'center',
    },
    paper: {
        display: 'flex',
        width: '350px',
        height: '320px',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    checkbox: {
        marginTop: theme.spacing.unit * 2
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            open: false
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleLogin = event => {
        const { onLoginRequest } =  this.props;
        const { username, password } = this.state;

        event.preventDefault();
        this.props.onLogoutRequest(); 
        this.setState({ loading: true });
        if(username && password) {
            onLoginRequest(username, password);
        }
    }

    handleMessageBarOpen = () => {
        this.setState({ open: true });
    }

    handleMessageBarClose = () => {
        this.setState({ open: false });
    }

    componentWillMount() {
        const { loggingIn, user } = this.props;
        if(loggingIn && isAuthenticated(user)) {
            // If user has authenticated, redirect to home page.
            this.props.history.push('/');
        } else {
            // Clear all login state.
            this.props.onLogoutRequest(); 
        }
    }

    componentDidUpdate(prevProps) {
        // Redirect user to home page when user is authenticated.
        if (!prevProps.loggingIn && this.props.loggingIn) {
            const that = this;
            this.handleMessageBarOpen();
            setInterval(((that) => {
                that.setState({ loading: false });
                that.props.history.push('/');
            })(that), 5000);
        }
        // Clear all login state if user isn't authenticated.
        if(!prevProps.message && this.props.message) {
            this.setState({ loading: false });
            this.handleMessageBarOpen();
        }
    }

    render() {
        const { classes, message, loggingIn } = this.props;
        const { username, password, loading, open } = this.state;
        let mainContent, messageBar;

        if(loading) {
            mainContent = 
                <Paper className={classes.loading}>
                    <CircularProgress size={50} color="primary" />
                </Paper>;
        } else {
            mainContent = 
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Smart Leave Request
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleLogin}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input 
                                id="username" 
                                name="username"
                                autoFocus
                                defaultValue={username}
                                onChange={this.handleChange("username")} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                defaultValue={password}
                                onChange={this.handleChange("password")} />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log in
                        </Button>
                    </form>
                </Paper>
        }

        if(loggingIn) {
            messageBar = <MessageBar open={open} variant={messageType.SUCCESS} message="Login successful" handleClose={this.handleMessageBarClose} />
        } else if(message) {
            messageBar = <MessageBar open={open} variant={messageType.ERROR} message={message} handleClose={this.handleMessageBarClose} />
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    {messageBar}
                    {mainContent} 
                </main>
            </React.Fragment>
        );
    }
}

LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(LoginComponent);