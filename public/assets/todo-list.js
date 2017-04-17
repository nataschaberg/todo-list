$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo, //here we pass the data to POST req in main.js
        success: function(data){
          location.reload();
        }
      });

      return false;

  });

  $('b').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      console.log(item);
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          location.reload();
        }
      });
  });

});
