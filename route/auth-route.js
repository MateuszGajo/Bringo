const express = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const app = express();

app.get('/me', (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Token is not valid"
                })
            } else {
                return res.json({
                    success: true,
                    message: "Token is valid"
                })
            }

        })
    } else {
        res.json({
            success: false,
            messgae: "Auth token is not supplied"
        })
    }
})

module.exports = app;