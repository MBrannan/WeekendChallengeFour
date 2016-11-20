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
  console.log(tasks);
  $('#taskContainer').empty();
  var $el = $('#taskContainer').children().last();
  for (var i = 0; i < tasks.length; i++) {
      var string = '<tr class="taskRow">';
      string += '<td>' + tasks[i].taskName +'</td>';
      string += '<td>' + tasks[i].dateAdded +'</td>';
      string += '<td>' + tasks[i].deadline +'</td>';
      string += '<td>' + tasks[i].priority +'</td>';
      string += '<td><button class="btn deleteBtn" data-id=' + tasks.id +'>Delete Task</button></td>';
      string += toggleBtn + '</td></tr>';
      // console.log(string);
      $el.append(string);
    }
}
