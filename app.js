var gifs = ["guitar", "saxaphone", "violin", "piano","cello","flute","tuba","cymbal","synthesizer"]

function searchGiphy() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dWrzYW0BDnzwozrf1PSoC64gqeYLPSby&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results);
        $("#gif-display").text("");

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(personImage);
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