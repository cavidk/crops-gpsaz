import React, {Component, useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import "./css/login.css";
import userModel from "../../models/user";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import * as APP_CONSTONSTS from "../../ApplicationConstants";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
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

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            redirectToReferrer: false,
            showPassword: false
        };
    }

    handleLoginClick = () => {
        const user = {
            username: this.state.username || undefined,
            password: this.state.password || undefined
        }

        request.login(user, (err, res) => {
            if (err) {
                console.log("An error has been encountered")
                console.log(err)
                this.setState({error: "login failed"})
            } else {
                console.log("login: ", res.body)
                request.auth.authenticate(res.body.token, () => {
                    this.setState({redirectToReferrer: true})
                });
                userModel.authenticated(res.data);
            }
        })
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.handleLoginClick()
        }
    }


    render() {
        const {location} = this.props;
        const {classes} = this.props;

        // const {from} = classes.location.state || {
        // const {from} = window.location.state || {
        const {from} = window.location.state || {
            from: {
                pathname: APP_CONSTONSTS.WELCOME_URL
            }
        }
        const {redirectToReferrer} = this.state
        if (redirectToReferrer) {
            return (<Redirect to={from}/>)
        }

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        const togglePassword = () => {
            this.setState({showPassword: !this.state.showPassword})
        };

        return (
            <div style={{paddingTop:"200px"}}>
            <Card className={classes.card} style={{width: "max-content", marginTop: 0}}>
                <CardContent>
                    <Input
                        id="username"
                        placeholder="Username"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        style={{margin: "20px"}}
                        onKeyDown={this.handleKeyDown}
                    />
                    <br/>
                    <Input
                        id="password"
                        type={this.state.showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        style={{margin: "20px"}}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onKeyDown={this.handleKeyDown}
                    />
                    <br/> {
                    this.state.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {this.state.error}
                    </Typography>)
                }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="outlined" onClick={this.handleLoginClick}
                            className={classes.login}>Sign in</Button>
                </CardActions>
            </Card>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)