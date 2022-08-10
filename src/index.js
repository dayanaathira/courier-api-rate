var express = require('express');
var router = express.Router();

let body = 'Courier API call';


/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).send(body);
});

module.exports = router;