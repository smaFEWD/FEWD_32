var moviesDictionary = {};

function fetchData() {
  //this is using jQuery to go into the id = thumbnail-template and put whatever is in the html into this new variable

  var rawTemplate = $('#thumbnail-template').html();

  console.log(rawTemplate);

  $.get('https://ga-movies-lite.firebaseio.com/movies.json', function(moviesDatafrJSON) {
    buildDictionary(moviesDatafrJSON);
    // console.log(moviesDatafrJSON);
    // Stamp out our cards here.
      for (var i = 0; i < moviesDatafrJSON.length; i++) {
        // console.log(moviesDatafrJSON[i]);
        var currentMovie=moviesDatafrJSON[i];

        //Mustache.render takes in two parameters, the raw template that is using mustache and you feed it the data (object) that contains the keys to map to {{id}} {{image}} in your template.

        //console.log(currentMovie)  -- returns objects!

        var stampedTemplate = Mustache.render(rawTemplate, currentMovie);
        // console.log(stampedTemplate);

        //now append into the id = cards-container div tag, what you were able to get from the data stored in the stampedTemplate
        $('#cards-container').append(stampedTemplate);

      };

      buildDictionary(moviesDatafrJSON);
      bindEventListeners();
  });
}

//now, we are running through the array (from the JSON that came back) and building an object-- so that we can efficiently access data from this data structure (object) instead of having linear efficiency seen in an array.  An Object is the most efficient data structure, we get to access the data in "constant" time complexity as opposed to "linear time complexity, aka = n".  You can do "instant" look ups using objects b/c you can access the "keys" to grab the "values". 

function buildDictionary(movies) {
  for (var i = 0; i < movies.length; i++) {
    var currentMovie = movies[i];
    moviesDictionary[currentMovie.id] = currentMovie;
    console.log(moviesDictionary);
  }
}

//refer to: https://api.jquery.com/click/
// refer to: http://api.jquery.com/event.preventdefault/

//going out and fetching data is asynchronous. jQuery will try to do that in the background, so if you call the bindEventListeners() by putting that code on line 46, after fetchData(), it will happen almost at the same time.  You have no idea how long it will take to fetch Data back from the JSON. Meanwhile, the CPU will go on start the fetchData() and then go on, so even when the data from JSON is not back, it will move on and call the next function.  

// the thing you want to happen "next"--is better to put that bindEventListeners() within the function of fetchData function.  Put the bindEventListener() in the callback function upon success is more appropriate.

//Ajax is what we have been doing all along.   Asynchonous Javascript and XML.

// a "callback" function is how we deal with Asynchronous events.  Fetching data from JSON is one of these events.  "clicks" are also aynschronous events.  Asychronous means we don't know when it will happen. Life is asynchronous! 
function bindEventListeners (){
  $('.card').click(function(e){
    // console.log(e);
    // console.log(e.target); 
    var targetId = e.target.id;
    // console.log(e.target.id);

    //reaching into an object using a "variable = targetId" istead of a "string = targetId" b/c if you did moviesDictionary.targetId  then that would not work since we don't have a key named "targetId"

    //now, when anyone hits the card on a "click", you will have "constant-time lookup" and get to immediately get the "info" on that card, without having to traverse the entire array returned from JSON.

    var info = moviesDictionary[targetId];
    // console.log(info);  


    var rawTemplate = $('#lightbox-template').html(); 

    //Mustache.render takes in two parameters, the raw template that is using mustache and you feed it the data (object) that contains the keys to map to {{image}}, {{cast}}, {{teaser}} in your template.  Recall, the "object" you are using now is called "info" -- defined above. 

    var stampedTemplate = Mustache.render(rawTemplate, info);
    // console.log(stampedTemplate);
    $('#lightbox-container').html(stampedTemplate);
     $('#lightbox-container').fadeIn();
      $('#mask').fadeIn();

  $('#mask').click(function(){
    $('#lightbox-container').fadeOut();
    $('#mask').fadeOut();
  });
  });


}

fetchData();




