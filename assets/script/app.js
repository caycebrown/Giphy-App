$("#search").on("click", function() {
    search = $('#input').val();
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=6bB7JsvsgPeTsEMLMDI1ZgJGeu9SqoD6";


    $.ajax({
        url : queryURL,
        method : "GET"
    })
    
      .then(function(response) {
        response.data.map(myFunction);
        console.log(response)
      });
  });

  function myFunction(obj){
      animate = obj.images.fixed_height.url;
      still = obj.images.fixed_height_still.url;
      $newGif = `<div><img id="gif" data-state="animate" data-animate="${animate}" data-still="${still}" src="${still}"></div>`
      $("#results-bank").prepend($newGif);
  };

$('body').on('mouseenter', '#gif', function(){
      var move = $(this).attr('data-animate')
      $(this).attr('src', move);
});

$('body').on('mouseout', '#gif', function(){
    var stop = $(this).attr('data-still')
    $(this).attr('src', stop);
});

