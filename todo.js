
$(document).ready(function() {
  $('#input').on('keyup', function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var text = $('#input').val();

    if(keycode == '13'){
      $('#input').val("");

      $.ajax("http://makeitreal-todo.herokuapp.com/todo_items", {
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ title: text }),
        success: function(data) {
          var message = $('<div><li id=' + data.id + '><input type="checkbox"><label for="task"> ' + text + '</label></li></div>');

          $('.todo-list').append(message);
        }
      });
    }
  });


$('.todo-list').on('click', '.CheckBox_class', function(){
	var li = $(this).closest("li");
  	var itemId = li.attr("id");
  	var url = "http://makeitreal-todo.herokuapp.com/todo_items/"+itemId;
  	var patch = function(valor){
    	$.ajax(url, {
    		type: "PATCH",
      		contentType: "application/json",
      		data:'{"done":'+valor+'}',
      		success: function(response){}
    	});
  	};
  	if ($(this).prop("checked")) {
    	patch(true);
    	li.addClass("done");
  	} else {
    	patch(false);
    	li.removeClass("done");
  	}

});



// GET request
      var GETurl = 'http://makeitreal-todo.herokuapp.com/todo_items';
      $.get( GETurl, function(result) {
        $.each(result, function (index, list){
        if (list.done) {
          var listElement = ('<li class="task underlined" id="' + list.id + '"><input type="checkbox" name="list" value="list" checked><label for="task">' + list.title + '</label><a href=""><span class="close">' + 'X' + '</span></a></li>');
        } else {
          var listElement = ('<li class="task" id="' + list.id + '"><input type="checkbox" name="list" value="list"><label for="task">' + list.title + '</label><a href=""><span class="close">' + 'X' + '</span></a></li>');
        }

        $(listElement).appendTo('.todo-list');
        }) // end each
      })

});

