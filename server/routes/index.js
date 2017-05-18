var express = require('express');
var router = express.Router();
const controllers = require('../controllers/twit');

/* GET home page. */
router.get('/', controllers.getTwitt);
router.post('/', controllers.postTwitt);
router.delete('/:id', controllers.deleteTwitt);

module.exports = router;
