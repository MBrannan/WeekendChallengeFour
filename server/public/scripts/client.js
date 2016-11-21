var toggleBtn = '<label class="switch">' ;
toggleBtn += '<input class="switch-input" type="checkbox" />' ;
toggleBtn += '<span class="switch-label" data-on="Complete" data-off="Not Done"></span>' ;
toggleBtn += '<span class="switch-handle"></span>' ;
toggleBtn += '</label>';

$(document).ready(function() {

  getTasks();

  $('#submit').on('click', function(event){
    event.preventDefault();
    addTask();
});
  $('#taskContainer').on('click', '.deleteButton', function(event){
    console.log("click");
    event.preventDefault();
    deleteTask();
});
  $('.switch').on('click', function(event){
    console.log("click");
    event.preventDefault();
    completeTask();
  });

});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(tasks) {
      console.log("pls");
      appendTasks(tasks);
    },
    error: function() {
      console.log('Error retrieving database information');
    }

  });
}

function addTask() {
  var tasks = {};
    $.each($('#taskForm').serializeArray(), function (i, field) {
      tasks[field.name] = field.value;
    });

console.log('tasks: ', tasks);

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: tasks,
    success: function(response) {
      getTasks();
        console.log('server is talking', response);
      },
      error: function() {
        console.log('could not post a new task');
      }
  });
}

function appendTasks(tasks) {
  $("#taskContainer").empty();
  for (var i = 0; i < tasks.length; i++) {
    $("#taskContainer").append("<div class='tasks'></div>");
    var $el = $("#taskContainer").children().last();
    $el.append("<h2>" + tasks[i].task + "</h2>");
    $el.append("<p>" + tasks[i].added + "</p>");
    $el.append("<p>" + tasks[i].deadline + "</p>");
    $el.append("<p>" + tasks[i].completion + "</p>");
    $el.append("<button type='button' class='deleteButton' name='deleteButton'>Delete</button>")
    $el.append("<p>" + toggleBtn + "</p>");
    }
}

function deleteTask(task) {
  var taskid=$(this).parent().data('id');
    $.ajax({
        type: 'DELETE',
        url: '/tasks/delete' + taskid,
        success: function(result) {
            getTasks();
        },
        error: function(result) {
            console.log('Unable to delete task:', taskid);
        }
    });
}

function completeTask(task) {
  $.ajax({
    type: 'UPDATE',
    url: '/tasks/completion',
    success: function(result) {
      getTasks();
    },
    error: function(result) {
    console.log("Unable to update completion status");
  }
});
}
