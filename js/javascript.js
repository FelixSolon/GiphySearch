//So, as a framework, I copy-pasted and commented out the Readme. Feel free to ignore those bits.
//ToDo: Figure out how to 

/*Before you can make any part of our site work, you need to create an array of strings, 
each one related to a topic that interests you. Save it to a variable called topics. */

var topics = ["Space", "Elon Musk", "Saturn", "Jupiter", "Stars", "Space Ships"];

//We chose animals for our theme, but you can make a list to your own liking.

//Your app should take the topics in this array and create buttons in your HTML.

//Try using a loop that appends a button for each string in the array.
var query = "";
var queryUrl = "http://api.giphy.com/v1/gifs/search?api_key=44bb524d90374ef48090c7de2ce02d06&q=" + query;
var incrementingId = topics.length;
var generatedButton = ".giphyButtons";
$(document).ready(function(){
    
    
    for (var i = 0; i < topics.length; i++) {
        $("#gifButtons").append("<button type='button' class = 'btn btn-dark giphyButtons' data-button = '" + i + "'>" + topics[i] + "</button>")
    }



//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API
//and place them on the page. 
    

    //trying to be a good person and make a function early on to create buttons when submitting the form.
    function createButton() {
        topics.push($("#inputField").val());
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            $("#gifButtons").append("<button type='button' class = 'btn btn-dark giphyButtons' data-button = '" + i + "'>" + topics[i] + "</button>")
        }
        $("#inputField").val("");
    }

    $("#submitButton").on("click", function(){
        console.log($("#inputField").val());
        createButton();
    });

    //to capture on pressing "enter" not just clicking submit. Slightly stolen, slightly modified, from Stack Overflow.
    $('#inputField').keypress(function (e) {
        if (e.which === 13) {
            console.log($("#inputField").val());
            createButton();

            return false;
        }   
    });

    $(document).on("click", generatedButton, function(){
        //Creates a URL to query the Giphy API
        //This *should* let you use spaces in buttons and query properly, according to Stack Overflow.
        var searchQuery = $(this).text().split(' ').join('+');
        queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=44bb524d90374ef48090c7de2ce02d06&limit=10";

        console.log($(this).text());
        console.log(queryUrl);
      //Actually queries it via AJAX, using the GET method
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {
        console.log(response);
        console.log("Will this work? " + response.data[0].rating);
        //Look, it's not that I directly copied and pasted from the cat-button exercise. I just reused an old, functional, piece of code.
        //Creates a variable pulling from the JSON object to get the original URL
        for (var i = 0; i < response.data.length; i++) {
            response.data[i]
            var imageUrl = response.data[i].images.fixed_height_still.url;
            var runningUrl = response.data[i].images.fixed_height.url;
            var rating = response.data[i].images.rating;
            console.log(imageUrl);
            console.log(runningUrl);
            console.log(rating);

        //Creates a brand new image tag
            var giphyImage = $("<img>");

            //Sets the source of the new image tag to the URL from the JSON object, and gives it alt text.
            giphyImage.attr("src", imageUrl);
            giphyImage.attr("alt", "Science Image");
            giphyImage.attr("data-state", "still");
            giphyImage.attr("data-still", imageUrl);
            giphyImage.attr("data-animate", runningUrl);
            giphyImage.addClass("gif");


            //Adds the newly created image to the top of the page.

            //Under every gif, display its rating (PG, G, so on).
            $("#gifHolder").prepend("<p>Rated " + response.data[i].rating + "</p>")
            $("#gifHolder").prepend(giphyImage);

        }
      });
    });
    //api key 44bb524d90374ef48090c7de2ce02d06
//When the user clicks one of the still GIPHY images, the gif should animate. 
//If the user clicks the gif again, it should stop playing.

//
$(document).on("click", ".gif", function() {
    console.log("Working!");
      var state = $(this).attr("data-state");
      console.log(state);
      if (state === "still"){
        var moving = $(this).attr("data-animate")
        $(this).attr("src", moving)
        state = $(this).attr("data-state", "animate");
      } else if (state === "animate"){
        var stopped = $(this).attr("data-still")
        $(this).attr("src", stopped)
        state = $(this).attr("data-state", "still")
      }
    });
 


//This data is provided by the GIPHY API.
//Only once you get images displaying with button presses should you move on to the next step.


//Add a form to your page takes the value from a user input box and adds it into your topics array. 
//Then make a function call that takes each topic in the array remakes the buttons on the page.
//Deploy your assignment to Github Pages.

//The end of the document function, because you'll forget...
});
//Rejoice! You just made something really cool.
//console.log("Rejoicing noises");