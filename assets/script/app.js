var terms = ['ironman', 'thor', 'drax', 'thanos', 'starlord',];

//---------Functions for making search buttons-------------------------------
function makeButton(text) {
    $('#buttons').append(`<button class="btn btn-secondary search" term="${text}">${text}</button>`)
}

//---------Creates initial serach buttons on pageload------------------------
terms.map(makeButton);

$("body").on("click", ".search", function() {
    search = $('#input').val() || $(this).attr('term');
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&rating=pg-13&api_key=6bB7JsvsgPeTsEMLMDI1ZgJGeu9SqoD6";
    
    //--------Eliminates the creation of duplicate buttons--------------------
    if (terms.includes(search)) {
        //do nothing
    } else {
        $('#buttons').append(`<button class="btn btn-secondary search" term="${search}">${search}</button>`)
        terms.push(search);
    }

    //--------Clears previous gifs(if any) and input field--------------------
    $("#results-bank").html('');
    $('#input').val(null);


    //--------Ajax request to giphy api---------------------------------------
    $.ajax({
        url : queryURL,
        method : "GET"
    })
    
      .then(function(response) {
        console.log(response);
        response.data.map(gifRender);
      });
  });

//---------Function for appending gif elements to html----------------------
  function gifRender(obj){
      animate = obj.images.fixed_height.url;
      still = obj.images.fixed_height_still.url;
      rating = obj.rating;
      $newGif = `<div class="col">
                    <p id="rate">Rating: ${rating}<i class="far fa-star" id="unselected"></i></p>
                    <img id="gif" data-state="animate" data-animate="${animate}" data-still="${still}" src="${still}">
                </div>`
      $("#results-bank").prepend($newGif);
  };

//-------Animates gif on mouse enter-------------------------------------------
$('body').on('mouseenter', '#gif', function(){
      var move = $(this).attr('data-animate')
      $(this).attr('src', move);
});

//-------Changes animated gif to still image on mouse out----------------------
$('body').on('mouseout', '#gif', function(){
    var stop = $(this).attr('data-still')
    $(this).attr('src', stop);
});


uniqueId = 0;

//------Clones gif item and appends a copy to the favorites section-------------
$('body').on('click', '#unselected', function(){
    $(this).attr('class', 'fas fa-star');
    $(this).attr('id', 'selected');
    $(this).attr('data-id', uniqueId);  //---Adds a unique id for targeting individual gifs in and out of favorites section
    favorite = $(this).closest('div');
    favorite.clone().appendTo('#favorites');
    $('#favorites-title').css('visibility', 'visible')
    uniqueId++;


})

$('body').on('click', '#selected', function(){
    toRemoveId = $(this).data('id');//grabs the id we can use to target specific gifs and their "favorites" section clone
    unSelect = $("#selected[data-id='" + toRemoveId +"']");
    unFavorite = $("#favorites #selected[data-id='" + toRemoveId +"']").closest('div');
    unFavorite.remove();
    unSelect.attr('id', 'unselected');
    unSelect.attr('class', 'far fa-star');
})