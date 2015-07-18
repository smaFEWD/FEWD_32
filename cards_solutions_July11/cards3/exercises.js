function renderArray() {
  var posts = ['Brainstorming some ideas for mechanics and puzzles.', 'Ben Swinden', 21, '1.jpg'];
  // console.log(posts[0], posts[1], posts[2], posts[3]);
  renderNewCard(posts[0], posts[1], posts[2], posts[3]);
}

function renderObject() {
  var posts = {
    description: 'Brainstorming some ideas for mechanics and puzzles.',
    submitted: 'Ben Swinden',
    notes: 21,
    image: '1.jpg'
  };
  renderNewCard(posts.description, posts.submitted, posts.notes, posts.image);

}

function renderObjectsFromArray() {
  var posts = [
    {
      description: 'Brainstorming some ideas for mechanics and puzzles.',
      submitted: 'Ben Swinden',
      notes: 21,
      image: '1.jpg'
    },

    {
      description: 'Brainstorming some ideas for mechanics and puzzles.',
      submitted: 'Ben Swinden',
      notes: 21,
      image: '2.jpg'
    },

    {
      description: 'Brainstorming some ideas for mechanics and puzzles.',
      submitted: 'Ben Swinden',
      notes: 21,
      image: '3.jpg'
    },

    {
      description: 'Brainstorming some ideas for mechanics and puzzles.',
      submitted: 'Ben Swinden',
      notes: 21,
      image: '4.jpg'
    },

    {
      description: 'Brainstorming some ideas for mechanics and puzzles.',
      submitted: 'Ben Swinden',
      notes: 21,
      image: '5.jpg'
    }
  ];

}

function renderPostsApi() {
  $.get('https://ga-tumblr-lite.firebaseio.com/posts.json', function(posts) {
    console.log(posts);
    for (var i = 0; i < posts.length; i++) {
      renderNewCard(posts[i].description, posts[i].sumbitted, posts[i].notes, posts[i].image);
    };
  });
}


// renderNewCard('Brainstorming some ideas for mechanics and puzzles.', 'Ben Swinden', 21, '1.jpg');
// renderObject();
// renderArray();
// renderObjectsFromArray();
renderPostsApi();
