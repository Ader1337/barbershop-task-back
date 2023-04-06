module.exports = (app) => {
    let barberHandlers = require('../controllers/barberController.js');
    app.route('/api/barbers')
        .get(barberHandlers.getBarbers);
  /*   app.route('/api/barbers')
        .patch(barberHandlers.updateBarber); */
   
};