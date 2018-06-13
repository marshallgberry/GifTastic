$(document).ready(function(){ 

	//Global
	var topics = ['David Bowie', 'Freddy Mercury', 'Notorious BIG', 'The Beatles', 'Prince', 'Talking Heads', 'Jimi Hendrix', 'Nirvana'];
	var searchWord = [];
	
	//AJAX
	function displayGifs() {
		//api key and url for AJAX
		var apiKey = "Dc2ZY7P8Y8vLFFr81QzNEMGjQvc5O0pM";
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + searchWord + "&limit=10&rating=pg&api_key=" + apiKey;
		

		$.ajax({url: giphyURL, method: 'GET'}).done(function(response) {
			//clear gifs from page
			$('#gifs').empty();

			//loop to display gifs on page
			for(var i=0; i<10; i++) {
				var image = response.data[i].images.fixed_height_still.url;
				var animated = response.data[i].images.fixed_height.url;
				var rating = '<p>Rating: ' + response.data[i].rating.toUpperCase();
				var gifImage = $('<img>');
				var gifWrapper = $('<div/>');
				
				//add class and attributes to be used in the on click event
				gifWrapper.addClass('gifWrapper');
				gifImage.addClass('gifs');
				gifImage.attr('src', image)
				gifWrapper.attr('id', "gifWrap" + [i])
				gifImage.attr('data-stop', image);
				gifImage.attr('data-animate', animated);
				gifImage.attr('data-state', 'stop');

				//append the div to gifs id then append rating and gifImage to the div
				$('#gifs').append(gifWrapper);
				$('#gifWrap' + [i]).append(rating);
				$('#gifWrap' + [i]).append(gifImage);
				
				
			}
			
			//on click to change gif from still to animate and back
			$('.gifs').on('click', function() {
				var state = $(this).attr('data-state');

				if ( state == 'stop'){
					$(this).attr('src', $(this).data('animate'));
					$(this).attr('data-state', 'animate');
				}
				else {
					$(this).attr('src', $(this).data('stop'));
					$(this).attr('data-state', 'stop');
				}
			})

		})
			
	};

	
	//functions


	//creates buttons and gives them a class
	function buttons() {
		//empty buttons from #gifButtons div
		$('#pageButtons').empty();
		//repopulate buttons in topics array
		for(var i = 0; i < topics.length; i++) {
			var button = $('<button/>');
			//concatinates multiple words with + using .join()
			button.data('query', topics[i].split(' ').join('+'))
			button.addClass('artistButtons');
			button.data('name', topics[i]);
			button.text(topics[i]);
			$('#pageButtons').append(button);
			
		}
		$('.artistButtons').on("click", function() {
			var value = $(this).data('query').trim();
			searchWord = [];
			searchWord.push(value);
			displayGifs();

	})
	};

	//user interaction
	buttons();

	//on click to create new artist button
	$('#addGif').on('click', function() {
		//gets the value of #gifInput and trims the word, adds to topics
		for(var i=0; i<topics.length; i++) {
		var sport = $('#gifInput').val().trim();
		topics.push(sport);
		buttons();
		//clear input field
		$('#gifInput').val('');
		return false;
		}
		
	})
});