var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var wordSchema = mongoose.Schema({
    name: String,
    length: Number,
});
var mword = mongoose.model('word', wordSchema);

router.get('/', function(req, res, next) {
    mword.find({}, '-id-__v', function (err, datadump) {
        res.json(datadump)
    })
});

router.get('/:word', function(req, res) {
    mword.find({name: req.params.word}, function (err, rword) {
        if(rword.length){
            res.json(rword)
        }
        else{
            dbword = new mword({name: req.params.word, length: req.params.word.length});
            dbword.save(function(err, dbword){});
            res.json({name: req.params.word, length: req.params.word.length});
        }
    })
});

router.post('/post', function(req, res) {
    let value = req.body.key;
    if(value) {
        mword.find({name: value}, function (err, rword) {
            if(rword.length){
                res.json(rword)
            }
            else{
                dbword = new mword({name: value, length: value.length});
                dbword.save(function(err, dbword){});
                res.json({name: value, length: value.length});
            }
        })
    }
    else {
        res.json({error: 'please provide a string'})
    }
    });
router.get('/delete/:word', function(req, res){
    if(req.params.word.length){
        mword.findOneAndDelete({name: req.params.word}, function (err, rword) {
            if (rword) {
                res.json({report: 'sucessfullly deleted'})
            }
            else{
                res.json({error: 'file not found'})
            }
        })
    }
});

module.exports = router;