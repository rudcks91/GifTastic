$(document).ready(function()
{
    var topics = ['The Simpsons', 'Family Guys', 'Mickey Mouse', 'Friends'];

    function renderButtons()
    {
        $('#topicsView').empty();
        for (var i = 0; i < topics.length; i++)
        {
            var a = $('<button type="button">');
            a.addClass('topicButton btn btn-primary');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#topicsView').append(a);
        }
    }

        $('#addTopic').on('click', function(){

            console.log('button clicked');

            var topic = $('#topicInput').val().trim();

            console.log(topic);
            if (topic != "")
            {
                topics.push(topic);
                renderButtons();
            }

            else
            {
                $('#topicInput').attr("placeholder", "Please enter a topic to search.")
                renderButtons();
            }
            return false;
        });


    function displaytopicGif()
    {
        $('#gifView').empty();
        var topic = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";

        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response)
        {
            var topicDiv = $('<div class="topicImage">');
            console.log(response);
            for (i=0; i < response.data.length; i++)
            {
                var stillImage = response.data[i].images.fixed_height_still.url;
                console.log(stillImage);

                var playImage = response.data[i].images.fixed_height.url;
                console.log("Moving"+ playImage);

                var rating = response.data[i].rating;
                console.log(rating);

                var pOne = $('<p>').text( "Rating: " + rating.toUpperCase());
                topicDiv.append(pOne);

                var image = $("<img>").attr("src", stillImage);
                image.attr("playsrc", playImage);
                image.attr("stopsrc", stillImage);

                topicDiv.append(image);

                $('#gifView').append(topicDiv);

                image.addClass('playClickedGif');


            }
        });
    }

    function swapGif()
    {
        var playImage = $(this).attr('playsrc');
        console.log(playImage);

        var stopImage = $(this).attr('stopsrc');

        console.log(stopImage);

        if ($(this).attr('playsrc') == $(this).attr('src'))
        {
            $(this).attr('src', stopImage);
        }

        else
        {
            $(this).attr('src', playImage);
        }
    }

    renderButtons();

    $(document).on('click', '.topicButton', displaytopicGif);
    $(document).on('click', '.playClickedGif', swapGif);


});

