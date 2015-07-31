function renderNewCard(imagefromJSON, castfromJSON, teaserfromJSON){
 
 // define template
 var templateText = $('#my-template').html();

 // define dynamic values
 var daValues = {
   image: imagefromJSON,
   cast: castfromJSON,
   teaser: teaserfromJSON
 };

 // Render template and values with Mustache
 var renderedText = Mustache.render(templateText, daValues);

 // shove the results of Mustache render into the html body
 // $('body').append(renderedText);

 $('#cards-container').append(renderedText);
};