
function renderArray() {
  var rental = ['Flatiron studio next to Madison Park', '$175', 'Private room', 'room1.jpg', 'profile1.jpg'];

  renderNewCard(rental[0], rental[1], rental[2], rental[3], rental[4]);
}

function renderObject() {
  var rental = {
    title: 'Flatiron studio next to Madison Park',
    price: '$175',
    size: 'Private room',
    room: 'room1.jpg',
    profile: 'profile1.jpg'
  };
  renderNewCard(rental.title, rental.price, rental.size, rental.room, rental.profile)
}

function renderObjectsFromArray() {
  var rentals = [
    {
      title: 'Flatiron studio next to Madison Park',
      price: '$175',
      size: 'Private room',
      room: 'room1.jpg',
      profile: 'profile1.jpg'
    },

    {
      title: 'Cozy room in Hells Kitchen',
      price: '$96',
      size: 'Entire home',
      room: 'room2.jpg',
      profile: 'profile2.jpg'
    },

    {
      title: 'Amazing studio in heart of Manhattan',
      price: '$80',
      size: 'Private room',
      room: 'room3.jpg',
      profile: 'profile3.jpg'
    }
  ];

  for (var i = 0; i < rentals.length; i++) {
    renderNewCard(rentals[i].title, rentals[i].price, rentals[i].size, rentals[i].room, rentals[i].profile)
    // console.log(rentals[i]);
  };

}


function renderRentalsAPI() {
  $.get('https://ga-rentals-lite.firebaseio.com/rentals.json', function(dataFromJson) {
    for (var i = 0; i < dataFromJson.length; i++) {
      console.log(dataFromJson[i]);
    };
    
  });
}


// renderNewCard('Bedroom with Garden at the Back', '$70', 'Private room', 'room1.jpg', 'profile1.jpg');

// renderArray();
// renderObject();
// renderObjectsFromArray();
renderRentalsAPI();
