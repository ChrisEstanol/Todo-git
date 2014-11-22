$(document).ready(function() {
  $('#input').on('keyup', function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var text = $('#input').val();
    var id = "";
    if(keycode == '13'){
      $('#input').val("");
        
      $.ajax("http://makeitreal-todo.herokuapp.com/todo_items", {
        type: 'POST',
        contentType: "application/json", 
        data: JSON.stringify({ title: text }),
        success: function(data) {
          var message = $('<div><li id=' + data.id + '><input type="checkbox"> ' + text + '</li></div>');

          $('.todo-list').append(message);
          id = data.id;
        }
      });
    }
  });
});