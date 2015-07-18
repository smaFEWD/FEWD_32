function renderNewCard(image, cast, teaser){
 
 // define template
 var templateText = $('#my-template').html();

 // define dynamic values
 var daValues = {
   image: image,
   cast: cast,
   teaser: teaser
 };

 // Render template and values with Mustache
 var renderedText = Mustache.render(templateText, daValues);

 // append the results of Mustache render into the html body
 $('body').append(renderedText);
};