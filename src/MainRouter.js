import React, {Component, useEffect} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import Header from './components/header/Header'
import Login from './components/login/Login'
import ZonePreview from './components/zones/ZonePreview'
import user from "./models/user";
// import SignUp from './components/signUp/SignUp'
const APP_CONSTANTS = require('./ApplicationConstants');

function RequireAuth({children}: { children: JSX.Element }) {
    let location = useLocation();
    if (!user.isLoggedIn()) {
        return <Navigate to={APP_CONSTANTS.LOGIN_URL} state={{from: location}}/>;
    }
    return children;
}


//inspired from https://reacttraining.com/react-router/web/example/auth-workflow


class MainRouter extends Component {
    state = {
        language: 'en'
    }

    // languageHandler(e) {
    //     e.preventDefault();
    //     let lang = e.target.value;
    //     this.setState(prevState => ({
    //         language: lang
    //     }))
    // }

    render() {
        return (
            <div style={{height: "100%"}}>

                <Header/>
                <Routes>
                    <Route path={APP_CONSTANTS.LOGIN_URL} element={<Login/>}/>
                    {/*<Route path={APP_CONSTANTS.SIGNUP_URL} element={<SignUp/>}/>*/}
                    <Route path={APP_CONSTANTS.HOME_URL} element={
                            <RequireAuth>
                                <ZonePreview/>
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<Navigate to={APP_CONSTANTS.HOME_URL}/>}/>
                </Routes>
            </div>
        )
    }
}

export default MainRouter