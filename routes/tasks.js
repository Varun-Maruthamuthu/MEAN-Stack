var express = require('express');
var router = express.Router();

var mongojs = require('mongojs')

var db = mongojs('mongodb://varun:muruga@localhost:27017/myTask',['tasks']);



router.get('/tasks', function(req, res, next) {
    // res.send('TASK PAGE');
    db.tasks.find(function(err, tasks){
        if(err) {
            res.send(err);
        }

        res.json(tasks);
    });
});


// get single record 

router.get('/task/:id', function(req, res, next) {
    // res.send('TASK PAGE');
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err) {
            res.send(err);
        }

        res.json(task);
    });
});


// post record

router.post('/task', function(req, res, next) {
    var task = req.body;
    if(!task.name || !(task.status + '')) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    }

    db.tasks.save(task, function(err, task){
         if(err) {
            res.send(err);
        }

        res.json(task);
    });

});

//DELETE A RECORD
router.delete('/task/:id', function(req, res, next) {
    // res.send('TASK PAGE');
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err) {
            res.send(err);
        }

        res.json(task);
    });
});


//UPDATE A RECORD
router.put('/task/:id', function(req, res, next) {

    var task = req.body;
    var updTask = {};

    if(task.status) {
        updTask.status = task.status;
    }

    if(task.name) {
        updTask.name = task.name;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    }

    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});


module.exports = router;
