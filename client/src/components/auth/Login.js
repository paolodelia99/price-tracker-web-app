import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { ThemeProvider } from '@material-ui/styles';
import {landingTheme} from '../styles/landingTheme'
import Avatar from '@material-ui/core/Avatar';
import {Button} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {loginStyle} from '../styles/loginStyle'
import AppNavbar from '../Layout/AppNavbar';

const Login = ({login,isAuthenticated}) => {
    const classes = loginStyle();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email,password} = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSumbit = async e => {
        e.preventDefault();
        login(email,password);
    };

    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }

    return(
        <Fragment>
            <AppNavbar/>
            <ThemeProvider theme={landingTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form} onSubmit={e => onSumbit(e)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={email}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={ e => onChange(e)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={password}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => onChange(e)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color='primary'
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/help" className="text-link">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to='/register' className="text-link">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </ThemeProvider>
        </Fragment>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(Login);
