module.exports = (app) => {
    let userHandlers = require('../controllers/userController.js');
    let recordHandler = require('../controllers/recordController.js');
    app.route('/api/record')
        .post(userHandlers.loginRequired, userHandlers.profile, recordHandler.addRecord);
    app.route('/api/record')
        .get(userHandlers.loginRequired, userHandlers.profile, recordHandler.getUserRecord);
    app.route('/api/record/available')
        .get(userHandlers.loginRequired, userHandlers.profile, recordHandler.getAvailableTime);
    app.route('/api/record')
        .delete(userHandlers.loginRequired, userHandlers.profile, recordHandler.deleteRecord);
   /*  app.route('/api/auth/register')
        .post(userHandlers.register);
    app.route('/api/auth/sign_in')
        .post(userHandlers.sign_in); */
};