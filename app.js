var express = require('express');
const cors = require('cors'); //rest api accepts requests from any source
const bodyParser = require('body-parser'); //convert into javascript objects
const helmet = require('helmet'); //http headers to safeguard 
const winston = require('winston');
const config = require('config');
const logger = require('./config/winston'); //logger info
const fs = require('fs');
const httpLogger = require('./config/httplogger'); //http logger
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const jsyaml = require('js-yaml');
const readYaml = fs.readFileSync('./swagger/swagger.yaml', 'utf8');
const swaggerDoc = jsyaml.load(readYaml);
const apicache = require('apicache');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(httpLogger);

// const ads = [
//     {
//         title: 'hello again'
//     }
// ];

//cache
let cache = apicache.middleware;
app.use(cache('5 minutes'));

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

//security using helmet to prevent malicious scripts to browser
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: false,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "fonts.googleapis.com"],
            fontSrc: ["'self'", "fonts.gstatic.com"],
            connectSrc: ["'self'", "wss://video.geekwisdom.net"],
        },
    })
);

//security to set dns-prefetch 
app.use(helmet.dnsPrefetchControl({allow: false}));

//to set up xframe options
app.use(helmet.frameguard({action: 'deny'}));

//to prevent XSS attacks
app.use(helmet.xssFilter());


//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//call index
var indexRouter = require('./src/index');
app.use('/', indexRouter);

//courier api call
require('./src/courier')(app);
require('./src/calls')(app);


// app.get('/try', (req,res) => {
//     res.send(ads);
// });


app.listen(PORT, () => {
    console.log(`listen to port ${PORT}`)
});



module.exports = app;