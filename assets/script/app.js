



$("#search").on("click", function() {
    search = $('#input').val();
    console.log(search);
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
      $newGif = `<div id="gif"><img data-state="animate" data-animate="${animate}" data-still="${still}" src="${still}"></div>`
      $("#results-bank").prepend($newGif);
  }