const express = require('express');
const APP = express();

// Settings
APP.set('port', process.env.PORT || 3000);

// Middlewares
APP.use(express.json());

// Routes
APP.use(require('./routes/employees'));

// Server
APP.listen(APP.get('port'), () => {
    console.log('Server on port', APP.get('port'));
});