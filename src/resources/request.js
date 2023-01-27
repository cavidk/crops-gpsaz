import user from "../models/user";

const request = require('superagent');
const REACT_APP_API_BASE_URL = 'http://127.0.0.1:8000/api/';//process.env.REACT_APP_API_BASE_URL;


const login = (user, callback) => {
    request.post(REACT_APP_API_BASE_URL + 'login')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
            callback(err, res)
        })
}

const signup = (url, body, callback) => {
    request.post(REACT_APP_API_BASE_URL + url)
        .set('Content-Type', 'application/json')
        // .set('Accept', 'application/json')
        // .set('Access-Control-Allow-Origin', '*')
        .send(body)
        .end((err, res) => {
            callback(err, res)
        })
}

const get = (url, callback) => {
    request.get(REACT_APP_API_BASE_URL + url)
        // .set('Content-Type', 'application/json')
        // .set('Accept', 'application/json')
        // .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
        .end((err, res) => {
            callback(err, res)
        })
}

const post = (url, body, callback) => {
    request.post(REACT_APP_API_BASE_URL + url)
        //    .set('Content-Type', 'application/json')
        //    .set('Accept', 'application/json')
        // .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
        .send(body)
        .end((err, res) => {
            callback(err, res)
        })
}

const put = (url, body, callback) => {
    request.put(REACT_APP_API_BASE_URL + url)
        //    .set('Content-Type', 'application/json')
        //    .set('Accept', 'application/json')
        // .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
        .send(body)
        .end((err, res) => {
            callback(err, res)
        })
}

const remove = (url, body, callback) => {
    request.delete(REACT_APP_API_BASE_URL + url)
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
        .send(body)
        .end((err, res) => {
            callback(err, res)
        })
}

const auth = {
    isAuthenticated() {
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false
    },
    authenticate(jwt, cb) {
        //console.log(`In the fxn authenticate jwt = ${JSON.stringify(jwt)}`)
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
        cb()
    },
    logout() {
        sessionStorage.removeItem('jwt')
        sessionStorage.removeItem('zone')
    },
    decodeJWT(token) {

        const jwtPayload = JSON.parse(atob(token.split('.')[1]));
        //console.log(`The parse JWT is:  ${jwtPayload.sub}`);

        return jwtPayload;
    },
    getSubject() {
        const jwtPayload = this.decodeJWT(JSON.parse(sessionStorage.getItem('jwt')))
        return jwtPayload
    },
    isZonePreview() {
        if (sessionStorage.getItem('zone')) {
            return JSON.parse(sessionStorage.getItem('zone'))
        } else
            return false
    },
    addZonePreview(zone) {
        sessionStorage.setItem('zone', JSON.stringify(zone))
    },
    removeZonePreview() {
        sessionStorage.removeItem('zone');
    }
}

export {
    get,
    // getAxios,
    post,
    put,
    remove,
    login,
    signup,
    REACT_APP_API_BASE_URL,
    auth
}
