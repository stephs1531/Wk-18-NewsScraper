// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    let newArticle = "<p data-id=" + data[i]._id + ">" + data[i].title + "<br />" + data[i].link + "</p>"

    let cardHorizontal = '<div class="card horizontal" id="cardHorizontal">' + '<div class="card-stacked" id="newCard">' + '</div>' + '<div class="card-content" id="cardContent">' + newArticle + '</div>' + '</div>'

    $("#articles").append(cardHorizontal);

  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  $("#user-notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h5>" + data[0].title + "</h5>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data[0]._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data[0].note) {
        // Place the title of the note in the title input
        // $("#titleinput").val(data[0].note.title);
        // // Place the body of the note in the body textarea
        // $("#bodyinput").val(data[0].note.body);

        $("#user-notes").append("<h6>" + data[0].note.title + "<br>" + data[0].note.body + "</h6>");

      };

      //TODO: display notes on the page below the input for a new note -- this part isn't working yet

      //get notes from database and append them to user-notes div
      // $("#user-notes").append("<h6>" + data.note.title + "<br>" + data.note.body + "</h6>");
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
