import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import PropTypes from 'prop-types'
import "./css/login.css";
import userModel from "../../models/user";
import * as APP_CONSTONSTS from "../../ApplicationConstants";
import {withStyles} from '@material-ui/core/styles'
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {Input, IconButton, InputAdornment, Typography, Button, Icon, Card, CardActions, CardContent} from '@material-ui/core';

import {Alert} from '@material-ui/lab';

const request = require('../../resources/request');

const styles = theme => ({
    card: {
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        width: 300
    },
    login: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
})

function Redirect({to}) {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const classes = props.classes

    useEffect(() => {
        const {from} = location.state || {from: {pathname: APP_CONSTONSTS.WELCOME_URL}}
        if (redirectToReferrer) {
            navigate(from)
        }
    }, [redirectToReferrer])

    const handleLoginClick = () => {
        const user = {
            username: username || undefined,
            password: password || undefined
        }

        request.login(user, (err, res) => {
            if (err) {
                setError("login failed")
            } else {
                console.log("login: ", res.body)
                request.auth.authenticate(res.body.token, () => {
                    setRedirectToReferrer(true)
                });
                userModel.authenticated(res.data);
            }
        })
    }

    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLoginClick()
        }
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const togglePassword = () => {
        setShowPassword(!showPassword)
    };

    return (
        <div style={{paddingTop: "200px"}}>
            <Card className={classes.card} style={{width: "max-content", marginTop: 0}}>
                <CardContent>
                    <Input
                        id="username"
                        placeholder="Username"
                        className={classes.textField}
                        value={username}
                        onChange={handleChange}
                        style={{margin: "20px"}}
                        onKeyDown={handleKeyDown}
                    />
                    <br/>
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={classes.textField}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{margin: "20px"}}
                        onKeyDown={handleKeyDown}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </CardContent>
                <CardActions>
                    {error && (
                        <Alert severity="error">Invalid username or password!</Alert>
                    )}
                </CardActions>
                <CardActions>
                    <Button onClick={handleLoginClick} color="primary" style={{backgroundColor: '#71b456', margin: 'auto'}} variant='contained'
                            className={classes.loginButton} >
                        <Typography variant="h6" className={classes.loginButtonLabel}>
                            Login
                        </Typography>
                        <Icon className={classes.loginButtonIcon}>
                            arrow_forward
                        </Icon>
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
