/* 

const router = express.Router()
*/
/* const express = require('express');
let router = express.Router()
 */

module.exports =  (app) => {
    let userHandlers = require('../controllers/userController.js');
    app.route('/api/auth/tasks')
        .post(userHandlers.loginRequired, userHandlers.profile, userHandlers.getUser);
    app.route('/api/auth/register')
        .post(userHandlers.register);
    app.route('/api/auth/sign_in')
        .post(userHandlers.sign_in);
};