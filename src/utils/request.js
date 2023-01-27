import axios from 'axios';
const request = require('superagent');
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const login = (user, callback) => {
    axios.post(REACT_APP_API_BASE_URL + 'login', user, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((res) => {
        callback(null, res);
    }).catch((err) => {
        callback(err);
    });
}

const signup = (url, body, callback) => {
    request.post(REACT_APP_API_BASE_URL + url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .send(body)
        .end((err, res) => {
            callback(err, res)
        })
}

const get = (url, callback) => {
    request.get(REACT_APP_API_BASE_URL + url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
        .end((err, res) => {
            callback(err, res)
        })
}

const post = (url, body, callback) => {
    request.post(REACT_APP_API_BASE_URL + url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
        .send(body)
        .end((err, res) => {
            callback(err, res)
        })
}

const put = (url, body, callback) => {
    request.put(REACT_APP_API_BASE_URL + url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
        .send(body)
        .end((err, res) => {
            callback(err, res)
        })
}

const remove = (url, body, callback) => {
    request.delete(REACT_APP_API_BASE_URL + url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
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
    authenticate(data, cb) {
        sessionStorage.setItem('user', JSON.stringify(data.user))
        sessionStorage.setItem('jwt', JSON.stringify(data.token))
        cb()
    },
    logout() {
        sessionStorage.removeItem('jwt')
        sessionStorage.removeItem('user')
    },
    getUser() {
        const user = sessionStorage.getItem('user')
        return user
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
