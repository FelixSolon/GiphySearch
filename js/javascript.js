//creating a starting list to generate buttons from
var topics = ["Space", "Elon Musk", "Saturn", "Jupiter", "Stars", "Space Ships"];

//*holds up broom* SET ALL THE VARIABLES!
var query = "";

var queryUrl = "http://api.giphy.com/v1/gifs/search?api_key=44bb524d90374ef48090c7de2ce02d06&q=" + query;

var generatedButton = ".giphyButtons";

//When you're ready, do the thing!

$(document).ready(function(){
    
    //bog standard loop. Except I usually prefer to use +=1 instead of ++ buuuuut I wrote it first this way and don't want to change and potentially break it.
    for (var i = 0; i < topics.length; i++) {
        $("#gifButtons").append("<button type='button' class = 'btn btn-dark giphyButtons' data-button = '" + i + "'>" + topics[i] + "</button>")
    }

    //trying to be a good person and make a function early on to create buttons when submitting the form.
    function createButton() {
        //add whatever the user input to the topics array
        topics.push($("#inputField").val());
        //clear out the old buttons so we can regenerate it, because this stupid thing won't let me click on new buttons unless I regenerate the whole batch.
        $("#gifButtons").empty();
        //make a button
        //in probably the least efficient/best practice way. I should be using var foo = $(<button>), foo.addClass('btn btn-dark giphyButtons'), foo.attr('data.button', i), foo.text(topics[i])
        //However
        //I'm not 100% sure that will work and don't want to break things
        //and I'm 100% sure the below works
        //So if the var foo = $(<button>) method is massively more processing efficient, or there's other good reasons to use it besides maybe making it easier to modify code, please let me know.
        //Until then, I'm OK just writing HTML/CSS in my JS and appending it
        for (var i = 0; i < topics.length; i++) {
            $("#gifButtons").append("<button type='button' class = 'btn btn-dark giphyButtons' data-button = '" + i + "'>" + topics[i] + "</button>")
        }
        //clear out the input field to prevent stray entries later
        $("#inputField").val("");
    }

    // When I click the submit button, run that thing up there ^
    $("#submitButton").on("click", function(){
        createButton();
    });

    //to capture on pressing "enter" not just clicking submit. Slightly stolen, slightly modified, from Stack Overflow.
    $('#inputField').keypress(function (e) {
        //if there's a key pressed that has a unicode value of 13, which is carriage return/enter
        if (e.which === 13) {
            //Run that function up above
            createButton();
            //...I'm not totally sure what this bit does TBH. It came with the code, but doesn't appear to be necessary?
            //Leaving it here in case things break later I can uncomment and see if that fixes is.
            //return false;
        }   
    });

    //When you click on something with the .giphyButtons class
    $(document).on("click", generatedButton, function(){
        //This *should* let you use spaces in buttons and query properly, according to Stack Overflow.
        var searchQuery = $(this).text().split(' ').join('+');
        //Actually makes the query URL
        //&limit=10 at the end to just pull 10 gifs
        //My API Key Do Not Steal (^_^)
        queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=44bb524d90374ef48090c7de2ce02d06&limit=10";

      //Actually queries it via AJAX, using the GET method because that's what we've more or less been told to use and it works.
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {
        //Look, it's not that I directly copied and pasted from the cat-button exercise and the pausing gifs exercise. I just reused an old, functional, piece of code.
        //loops through the pulled objects aaaaaand...
        for (var i = 0; i < response.data.length; i++) {
            //creates a variable which is the starting, still URL 200px high
            var imageUrl = response.data[i].images.fixed_height_still.url;
            //creates a variable which is the animated URL 200px high because otherwise things get wonky
            var runningUrl = response.data[i].images.fixed_height.url;
            //creates a variable that is the rating of the .gif
            var rating = response.data[i].images.rating;

            //Creates a brand new image tag.
            //See, I do know how to create tags with attributes the proper way! So...I guess doing it the weird way up above shows I have a variety of skills?
            //something like that. I dunno.
            var giphyImage = $("<img>");

            //Sets the source of the new image tag to the URL from the JSON object.
            giphyImage.attr("src", imageUrl);
            //"I'm just here so I don't get fined." Or creating an alt-text so I don't get sued. Same difference.
            giphyImage.attr("alt", "Science Image");
            //Keeps track of whether it's animating or not at the moment.
            giphyImage.attr("data-state", "still");
            //Sets the non-animated url to pull from when clicking
            giphyImage.attr("data-still", imageUrl);
            //Sets the animated url to pull from when clicking
            giphyImage.attr("data-animate", runningUrl);
            //Give it a class I can pull to do on-click events
            giphyImage.addClass("gif");


            //So I did this a weird way, I feel like, but it technically works. I will note, the requirement just says "place them on the page". It says nothing about putting multiple on the same line. I think if I wrote img tags to display inline it would work, but I'm meeting the spec and don't want to break it.
            $("#gifHolder").prepend("<p>Rated: " + response.data[i].rating + "</p>")
            $("#gifHolder").prepend(giphyImage);

        }
      });
    });
//"When you click something with the .gif class"
$(document).on("click", ".gif", function() {
    //create a variable which is basically whether it's still or animated.
    var state = $(this).attr("data-state");
    //If it's not moving...
    if (state === "still"){
        //pull the animated URL
        var moving = $(this).attr("data-animate")
        //set the source to teh animated URL
        $(this).attr("src", moving)
        //set the state to moving
        state = $(this).attr("data-state", "animate");
        //if it's not not moving, and is moving...
      } else if (state === "animate"){
        //pull the still URL
        var stopped = $(this).attr("data-still")
        //change the source to the still URL
        $(this).attr("src", stopped)
        //set the state to still
        state = $(this).attr("data-state", "still")
      }
    });
 
//The end of the document function. Because I keep forgetting where I put it, and like to leave myself a note
});

//console.log("Rejoicing noises");
//because I'm supposed to rejoice for making something really cool, according to the instructions.