var terms = ['ironman', 'thor', 'drax', 'thanos', 'starlord',];

function makeButton(text) {
    $('#buttons').append(`<button class="btn btn-secondary search" term="${text}">${text}</button>`)
}

terms.map(makeButton);

$("body").on("click", ".search", function() {
    search = $('#input').val() || $(this).attr('term');
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=6bB7JsvsgPeTsEMLMDI1ZgJGeu9SqoD6";
    
    //--------Eliminates the creation of duplicate buttons--------------------
    if (terms.includes(search)) {
        //do nothing
    } else {
        $('#buttons').append(`<button class="btn btn-secondary search" term="${search}">${search}</button>`)
        terms.push(search);
    }
    //--------Clears previous gifs(if any) and input field--------------
    $("#results-bank").html('');
    $('#input').val(null);

    $.ajax({
        url : queryURL,
        method : "GET"
    })
    
      .then(function(response) {
        console.log(response);
        response.data.map(gifRender);
      });
  });


  function gifRender(obj){
      animate = obj.images.fixed_height.url;
      still = obj.images.fixed_height_still.url;
      rating = obj.rating;
      $newGif = `<div class="col"><p>${rating}</p><img id="gif" data-state="animate" data-animate="${animate}" data-still="${still}" src="${still}"></div>`
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

