var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Homework 1');
});
router.get('/:word', function(req, res){
    res.send({word: req.params.word, length: req.params.word.length})
});
router.post('/post', function(req, res){
    var value = req.body.key;
    res.json({value: value, length: value.length})
})
module.exports = router;