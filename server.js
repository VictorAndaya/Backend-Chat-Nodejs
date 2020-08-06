const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config');

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');
const { port } = require('./config');

db(config.dbUrl);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(router);

socket.connect(server);

router(app);

app.use('/'+config.publicRoute,express.static('public'));

server.listen(config.port,()=>{
    console.log('la aplicación está escuchando en '+ config.host +':'+config.port);
});
