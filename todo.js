
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
          var message = $('<div><li id=' + data.id + '><input type="checkbox"> ' + text + '</li></div>');

          $('.todo-list').append(message);
        }
      });
    }
  });


$('.todo-list').ON('click', '.CheckBox_class', function(){
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