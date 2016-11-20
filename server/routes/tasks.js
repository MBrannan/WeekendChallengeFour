var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/tasks';

router.get(function(req, res) {
  console.log("get request");

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("connection error: ", err);
      res.sendStatus(500);
    }

  client.query(
      'SELECT task, dateAdded, deadline, priority, status FROM tasks',
      function(err, result) {
      done();

      if(err) {
        console.log('get query error ', err);
        res.sendStatus(500);
      } else {
        console.log("tasks obtained successfully");
        res.sendStatus(201);
      }
      console.log('success');
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

router.post(function(req, res) {
  newTask = req.body;
  console.log("this is the ", newTask);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO tasks (task, dateAdded, deadline, priority, status) ' +
      'VALUES ($1, $2, $3, $4, $5) RETURNING id AS task_id',
      [newTask.taskName, newTask.taskDate, newTask.taskDeadline, newTask.priority, newTask.status],
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

module.exports = router;
