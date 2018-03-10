
var gifs = ["dog", "cat", "hamster", "parrot"]

function searchGiphy() {

    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dWrzYW0BDnzwozrf1PSoC64gqeYLPSby&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
       var results = response.data;
        console.log(results);
        $("#gif-display").text("");
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gif-display").prepend(gifDiv);

        }
        makebuttons();
        
    });
}

function makebuttons() {
    $("#gif-view").empty();
    for (i = 0; i < gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#gif-view").append(a);
        //$("#gif-display").text("YEAHH");
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    if (gif == "") {
        alert("nothing");
    } else {
        gifs.push(gif);
        makebuttons();
        $("#gif-input").val("");
    }

});

$(document).on("click", ".gif", searchGiphy);
makebuttons();


