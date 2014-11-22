$(document).ready(function() {


   var url = "http://makeitreal-todo.herokuapp.com/todo_items/";

//============================== crear =======================================
      

		  $('#input').on('keyup', function(event){
		    var keycode = (event.keyCode ? event.keyCode : event.which);
		    var text = $('#input').val();

		    if(keycode == '13'){
		      $('#input').val("");
		        
		      $.ajax(url, {
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


//=============================  actualizar ==============================

	$('.todo-list').on('click', '.CheckBox_class', function(){
		var li = $(this).closest("li");
		var itemId = li.attr("id");

		if ($(this).prop("checked")) {
			patch(itemId,true);
			li.addClass("done");
		} else {
			patch(itemId,false);
			li.removeClass("done");
		}

	});

	function patch (parametro,valor){

		$.ajax({
			url: url+parametro,
			type: "PATCH",
			contentType: "application/json",
			data: JSON.stringify{done:valor},
		});
	}


});