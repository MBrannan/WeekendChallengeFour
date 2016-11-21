var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/tasks';

router.get('/', function(req, res) {
  console.log("get request");

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("connection error: ", err);
      res.sendStatus(500);
    }

  client.query(
      'SELECT DISTINCT id, task, added, deadline, completion FROM tasks',
      function(err, result) {
      done();

      if(err) {
        console.log('get query error ', err);
        res.sendStatus(500);
      }
      console.log('success');
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

router.post('/', function(req, res) {
  newTask = req.body;
  console.log("this is the ", newTask);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO tasks (task, added, deadline, completion) ' +
      'VALUES ($1, $2, $3, $4)',
      [newTask.task, newTask.added, newTask.deadline, newTask.completion],
      function (err, result) {
        done();

        if(err) {
          console.log('insert query error ', err);
          res.sendStatus(500);
        } else {
          console.log("task logged successfully");
          res.sendStatus(201);
        }
    });
  })
});

router.delete('/delete/' , function(req, res) {

  pg.connect(connectionString, function(req, res) {
    if(err) {
      console.log("delete error ", err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM tasks WHERE id = "', [req.params.id] + '";',
      function(err, result) {
        done();

        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
    });
  });
});

router.put('/tasks/completion', function(req, res) {

  pg.connect(connectionString, function(req, res) {
    if(err) {
      console.log("update error ", err);
      res.sendStatus(500);
    }

    client.query(
      'UPDATE tasks SET completion=TRUE WHERE id=$1',
      [req.params.id],
      function (err, result) {
        done();

        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});
module.exports = router;
