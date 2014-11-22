
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