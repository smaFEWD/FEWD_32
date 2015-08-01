// An object that will eventually let us look up movies by a unique ID.
var moviesDictionary = {};

function fetchData() {
  //this forces the container to be empty each time you run this function.
  $('#cards-container').html('');
  //this is to set grab the string and search for the title that we are interested in.
    var query = $('#searchbox').val();
    // console.log(query);
    var rawTemplate = $('#thumbnail-template').html();

    $.get('https://ga-movies-lite.firebaseio.com/movies.json', function(movies) {
      // Stamp out cards and append them into <div id="cards-container"></div>
      for (var i = 0; i < movies.length; i++) {
        var currentMovie = movies[i];
        var title = currentMovie.title;

        //here is where we will compare our "search criteria" to the "movie title"

        if (title.includes(query) == true) {
             var stampedTemplate = Mustache.render(rawTemplate, currentMovie);
          $('#cards-container').append(stampedTemplate);
        }

       
      };

      // Our "pre-processing" step where we take the movies array we got from
      // our database and creates an object out of it.
      buildDictionary(movies);
      bindEventListeners();
  });

}

function bindEventListeners() {
  // Whenever any card gets clicked, show the lightbox.
  $('.card').click(function(e) {
    // e.target is the <div> that got clicked. The ID of that div holds a key
    // we can use to "look up" movie info in our moviesDictionary. Tricky.
    var targetId = e.target.id;
    var info = moviesDictionary[targetId];

    // Hack to make it so cast members are comma + space separated.
    if (Array.isArray(info.cast)) {
      info.cast = info.cast.join(', ');
    }

    // Now that we have our info, simply stamp out our lightbox template.
    var rawTemplate = $('#lightbox-template').html();
    var stampedTemplate = Mustache.render(rawTemplate, info);
    $('#lightbox-container').html(stampedTemplate);
    $('#lightbox-container').fadeIn();
    $('#mask').fadeIn();

  });

  // Fade out the lightbox and dimmer mask when the mask is clicked.
  $('#mask').click(function() {
    $('#lightbox-container').fadeOut();
    $('#mask').fadeOut();
  });
}

function buildDictionary(movies) {
  // Take the movies array and convert it into an object.
  // moviesDictionary holds that object and we can use it to do lookups.
  for (var i = 0; i < movies.length; i++) {
    var currentMovie = movies[i];
    moviesDictionary[currentMovie.id] = currentMovie;
  }
}

//this is the for the search box we created in the HTML file useing the <input> tag.
// when the user types something, we assign an event listener of "keypress" to the "enter" key (keyCode == 13)
function init(){
  $("#searchbox").keypress(function(e){
    // console.log(e.keyCode);

    if(e.keyCode == 13) {
      fetchData(); 
    }
  });
};

init();

// fetchData();
