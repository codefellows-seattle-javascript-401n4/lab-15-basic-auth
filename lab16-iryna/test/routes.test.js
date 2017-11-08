'use strict';
require('dotenv').config();
const PORT = 5000;
const User = require('../models/user');
const mongoose = require('mongoose');
const expect = require('expect');
const jwt = require('jsonwebtoken');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

const superagent = require('superagent');
require('superagent-auth-bearer')(superagent);
const server = require('express')();

let token = '';


server.use(require('../routes/auth-routes'));

server.use((err, req, res, next ) => {
    // console.log(err);
    res.status(err.statusCode||500).send(err.message||'server error')
})

beforeAll(()=>{
    server.listen(PORT);
    return  User.remove({})
})

afterAll(()=>{
    // User.remove({});
    mongoose.connection.close();
    server.close();
    console.log('closing');
})

describe('unregistered paths ', ()=>{
    it('should respond with a 404',()=>{
        return superagent
        .post(`localhost:${PORT}/api/si`)
        .set({"Content-Type":"application/json"})
        .send({"username":"someone", "email":"someone@hotmail.com", "password":"guest"})
        .then(Promise.reject)
        .catch(res=>{
            expect(res.status).toEqual(404);
            expect(res.message).toBe('Not Found')
        })
    })
})

describe('POST',() => {

    it(' should create a user', ()=>{
        return superagent
        .post(`localhost:${PORT}/api/signup`)
        .set({"Content-Type":"application/json"})
        .send({username:"user1", email:"user1@hotmail.com", password:"user1"})
        .then(res=>{
            expect(res.text).not.toBe(null);
            expect(res.status).toEqual(200);
        })
    })

    it('should return a 400 when user exists', ()=>{
        return superagent
        .post(`localhost:${PORT}/api/signup`)
        .set({"Content-Type":"application/json"})
        .send({"username":"user1", "email":"user1@hotmail.com", "password":"user1"})
        .then(Promise.reject)
        .catch((res) => {
            // console.log("res: ",res);
            expect(res.status).toEqual(400);
            expect(res.response.text).toBe('user exists');
        })
    })

    it('should return a 400 when no body is provided', ()=>{
        return superagent
        .post(`localhost:${PORT}/api/signup`)
        .send({})
        .then(Promise.reject)
        .catch((res) => {
            expect(res.response.status).toEqual(400);
            expect(res.response.text).toBe('bad request')
        })
    })

})

describe('GET', ()=>{

    it('should return a 404 if a user is not authenticated', ()=>{
        return superagent
        .get(`localhost:${PORT}/api/signin`)
        .auth('not user', 'pass')
        .then(Promise.reject)
        .catch(res=>{
            // console.log(res);
            expect(res.response.statusCode).toEqual(404);
            expect(res.response.text).toBe('User not found');
        })
    })

    it('should respond with token for a request with a valid basic authorization header', ()=>{
        return superagent
        .get(`localhost:${PORT}/api/signin`)
        .auth('user1','user1')
        .then(res => {
            token = res.text;
            console.log("TOKEN: ", token);
            expect(res.text).not.toBe(null);
            expect(res.status).toEqual(200);
        })
    })

})

describe('Authorization: ', ()=>{

    it('GET should response with a 401 if no authorization token is provided',()=>{
        let getInvalid = '';
        return superagent
        .get(`localhost:${PORT}/api/email`)
        // .authBearer(getInvalid)
        .then(Promise.reject)
        .catch(res=>{
            expect(res.response.statusCode).toEqual(401);
            expect(res.response.text).toBe('you must authorize')
        })
    })

    it('GET should response with a 401 if invalid token is provided',()=>{
        let getInvalid = '';
        return superagent
        .get(`localhost:${PORT}/api/email`)
        .authBearer(getInvalid)
        .then(Promise.reject)
        .catch(res=>{
            expect(res.response.statusCode).toEqual(401);
            expect(res.response.text).toBe('invalid authorization')
        })
    })

    it('PUT should response with a 401 if no authorization token is provided',()=>{
        let getInvalid = '';
        return superagent
        .put(`localhost:${PORT}/api/edit`)
        // .authBearer(getInvalid)
        .then(Promise.reject)
        .catch(res=>{
            expect(res.response.statusCode).toEqual(401);
            expect(res.response.text).toBe('you must authorize')
        })
    })

    it(' PUT should update user info provided a good token', ()=>{
        // console.log("PUT TOKEN: ", token);
        return superagent
        .put(`localhost:${PORT}/api/edit`)
        .authBearer(token)
        .send({"username":"changed user", "email":"changed@hotmail.com", "password":"changed"})
        .then(res=>{
            expect(res.body.username).toBe('changed user')
        })  
    })

    it('PUT should return 400 if no body is provided', ()=>{
        return superagent
        .put(`localhost:${PORT}/api/edit`)
        .authBearer(token)
        .send({})
        .then(Promise.reject)
        .catch(res=>{
            expect(res.response.statusCode).toEqual(400);
            expect(res.response.text).toBe('no body')
        })
      
    })

})


