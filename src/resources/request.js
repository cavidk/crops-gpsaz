import user from "../models/user";
const request = require('superagent');
// const request_axios = require('axios');

// const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const  REACT_APP_API_BASE_URL  = process.env.REACT_APP_API_BASE_URL;
// const  REACT_APP_API_BASE_URL  = 'https://localhost:8443/api/';
// const  REACT_APP_API_BASE_URL  = 'https://127.0.0.1:8443/api/';
// const  REACT_APP_API_BASE_URL  = 'https://192.168.0.91:8443/api/';
// const  REACT_APP_API_BASE_URL  = 'http://192.168.0.91:8080/api/';
// const  REACT_APP_API_BASE_URL  = 'https://crops-back.gps.az/api/';
// https://172.16.35.173:8443/sentinel-ws/api/login
// const  REACT_APP_API_BASE_URL  = 'https://172.16.35.173:8090/api/';
// const  REACT_APP_API_BASE_URL  = 'https://172.16.35.172:8443/api/';
// https://crops.gps.az:8443/sentinel-ws/api/users/zones
const  REACT_APP_API_BASE_URL = //process.env.REACT_APP_API_BASE_URL ||
    'http://127.0.0.1:8080/api/';

const login = (user, callback) => {
    request.post(REACT_APP_API_BASE_URL  + 'login')
            .set('Content-Type', 'application/json')
            // .set('Accept', 'text/plain')
            // .set('Access-Control-Allow-Origin', '*')
            .send(user)
            .end((err, res) =>{
                callback(err, res)
            })
}
const singup = (url,body, callback) => {
  request.post(REACT_APP_API_BASE_URL + url)
         .set('Content-Type', 'application/json')
         // .set('Accept', 'application/json')
         // .set('Access-Control-Allow-Origin', '*')
         .send(body)
         .end((err, res) => {
             callback(err,res)
         })
}

const logout = (callback)=> {
    callback()
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
// const headers = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem('jwt'))
// }
// const getAxios = (url, callback) => {
//     request_axios.get(API_BASE_URL + url,{headers:headers})
//         .then((response) => {
//             dispatchEvent({
//                 data: response
//             })
//         })
//         .catch((error) => {
//             dispatchEvent({
//             })
//         })
// }

const post = (url,body, callback) => {
    request.post(REACT_APP_API_BASE_URL + url)
        //    .set('Content-Type', 'application/json')
        //    .set('Accept', 'application/json')
        // .set('Access-Control-Allow-Origin', '*')
           .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
           .send(body)
           .end((err, res) => {
               callback(err,res)
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
                callback(err,res)
           })
}


const remove = (url, body, callback) => {
    request.delete(REACT_APP_API_BASE_URL + url)
           // .set('Content-Type', 'application/json')
           // .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
           .set('Authorization', "Bearer " + JSON.parse(sessionStorage.getItem('jwt')))
           .send(body)
           .end((err, res) => {
                callback(err,res)
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
        user.logout();
    },
    decodeJWT(token){

        const jwtPayload = JSON.parse(atob(token.split('.')[1]));
        //console.log(`The parse JWT is:  ${jwtPayload.sub}`);
        
        return jwtPayload;  
    },
    getSubject(){
        const jwtPayload = this.decodeJWT(JSON.parse(sessionStorage.getItem('jwt')))
        return jwtPayload.sub
    },
    isZonePreview(){
        if (sessionStorage.getItem('zone'))
        {
            return JSON.parse(sessionStorage.getItem('zone'))
        }

    else
        return false
    },
    addZonePreview(zone) {
        sessionStorage.setItem('zone', JSON.stringify(zone))
    },
    removeZonePreview() {
        sessionStorage.removeItem('zone');
    }
  }


export{
    get,
    // getAxios,
    post,
    put,
    remove,
    login,
    singup,
    logout,
    REACT_APP_API_BASE_URL,
    auth
}