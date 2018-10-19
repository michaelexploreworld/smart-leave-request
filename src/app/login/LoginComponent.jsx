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

import { isValid } from '../../utils/userService'

const styles = theme => ({
    layout: {
        display: 'flex',
        width: '100%',
        height: '100%',
        'justify-content': 'center',
        'align-items': 'center',
    },
    paper: {
        display: 'flex',
        width: '350px',
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
            password: ''
        };
    }

    componentWillMount() {
        if(isValid()) {
            this.props.history.push('/');
        } 
    }

    componentDidUpdate(prevProps) {
        if (this.props.loggingIn !== prevProps.loggingIn && this.props.loggingIn) {
            this.props.history.push('/');
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleLogin = event => {
        const { onLoginRequest } =  this.props;
        const { username, password } = this.state;

        event.preventDefault();
        if(username && password) {
            onLoginRequest(username, password);
        }
    }

    render() {
        const { classes, message } = this.props;
        const { username, password } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        {message && 
                            <Typography component="h1" variant="h5">
                                {message}
                            </Typography>}
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
                </main>
            </React.Fragment>
        );
    }
}

LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(LoginComponent);