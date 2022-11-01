import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'

const request = require('../../resources/request');
const APP_CONSTONSTS = require('../../ApplicationConstants')

const styles = theme => ({
    card: {
        maxWidth: 600,
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
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
})

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        open: false,
        error: '',
        userCreatedAndSaved: false,
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }


    componentWillUpdate() {
        this.state.open = false
    }


    handleSignUPClick = () => {
        const user = {
            username: this.state.username || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined,
        }

        request.singup('users', user, (err, res) => {
            if (err) {
                this.setState({userCreatedAndSaved: false})
                // console.log(err)
            } else {
                this.setState({userCreatedAndSaved: true})
                // console.log(res.body)
            }
            this.setState({error: '', open: true})
        })

    }

    render() {
        const {classes} = this.props

        return (<div>

            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        {/*Welcome to the Simple App Platform. Sign-up to see more.*/}
                    </Typography>
                    <TextField required id="username" label="Username" className={classes.textField}
                               value={this.state.username} onChange={this.handleChange('username')}
                               margin="normal"/><br/>
                    <TextField required id="email" type="email" label="Email" className={classes.textField}
                               value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
                    <TextField required id="password" type="password" label="Password" className={classes.textField}
                               value={this.state.password} onChange={this.handleChange('password')}
                               margin="normal"/><br/>

                    <br/> {
                    this.state.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {this.state.error}</Typography>)
                }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="outlined" onClick={this.handleSignUPClick}
                            className={classes.submit}>Sign-Up</Button>
                </CardActions>
            </Card>
            <Dialog open={this.state.open} disableBackdropClick={true}>
                <DialogTitle>User Sign-Up</DialogTitle>

                {
                    this.state.userCreatedAndSaved ? (<span>
              <DialogContent>
                <DialogContentText>
                  User successfully signed up.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Link to={APP_CONSTONSTS.HOME_URL}>
                  <Button color="primary" autoFocus="autoFocus" variant="outlined">
                    Home
                  </Button>
                </Link>
                <Link to={APP_CONSTONSTS.LOGIN_URL}>
                  <Button color="primary" autoFocus="autoFocus" variant="outlined">
                    Login
                  </Button>
                </Link>
              </DialogActions>
            </span>) :
                        (<span>
              <DialogContent>
                <DialogContentText>
                <Icon color="error" className={classes.error}>error</Icon>
                  Sign-Up Failed.<br/>
                  The username might already be in use
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Link to={APP_CONSTONSTS.HOME_URL}>
                  <Button color="primary" autoFocus="autoFocus" variant="outlined">
                    Home
                  </Button>
                </Link>
                <Link to={APP_CONSTONSTS.SIGNUP_URL}>
                  <Button color="primary" autoFocus="autoFocus" variant="outlined">
                    Try Again
                  </Button>
                </Link>
              </DialogActions>
            </span>)
                }

            </Dialog>
        </div>)
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUp)