import React, {useState} from 'react';
import {Icon, Button, Typography, Input} from '@mui/material';
import {Link} from 'react-router-dom';
import * as request from '../../utils/request';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [userCreatedAndSaved, setUserCreatedAndSaved] = useState(false);

    const handleChange = (name) => (event) => {
        switch (name) {
            case 'username':
                setUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleSignUPClick = () => {
        const user = {
            username: username || undefined,
            email: email || undefined,
            password: password || undefined,
        }
        request.signup('register', user, (err, res) => {
            if (err) {
                setUserCreatedAndSaved(false);
                // console.log(err)
            } else {
                setUserCreatedAndSaved(true);
                // console.log(res.body)
            }
            setError('');
            setOpen(true);
        })
    }


    return (
        <div>
            <div>
                <div>
                    <p type="headline" component="h2">
                        {/*Welcome to the Simple App Platform. Sign-up to see more.*/}
                    </p>
                    <Input
                        required
                        id="username"
                        label="Username"
                        value={username}
                        onChange={handleChange('username')}
                        margin="normal"
                    /><br />
                    <Input
                        required
                        id="email"
                        type="email"
                        label="Email"
                        value={email}
                        onChange={handleChange('email')}
                        margin="normal"
                    /><br />
                    <input
                        required
                        id="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={handleChange('password')}
                        margin="normal"
                    /><br />
                    {error && (
                        <Typography component="p" color="error">
                            <Icon color="error">error</Icon>
                            {error}
                        </Typography>
                    )}
                </div>
                <div>
                    <Button color="primary" variant="outlined" onClick={handleSignUPClick}>
                        Sign-Up
                    </Button>
                </div>
            </div>
            <div open={open} disableBackdropClick={true}>
                <p>User Sign-Up</p>

                {userCreatedAndSaved ? (
                    <span>
                    <div>
                        <p>User successfully signed up.</p>
                    </div>
                    <div>
                        <Link to="/">
                            <Button color="primary" autoFocus="autoFocus" variant="outlined">
                                Home
                            </Button>
                        </Link>
                        <a href="/signin">
                            <Button color="primary" autoFocus="autoFocus" variant="outlined">
                                Login
                            </Button>
                        </a>
                    </div>
                </span>
                ) : (
                    <span>
                    <div>
                        <span>
                            <Icon color="error">error</Icon>
                            Sign-Up Failed.
                            <br/>
                            The username might already be in use
                        </span>
                    </div>
                </span>
                )}
            </div>
        </div>


    );
};

export default Signup;
