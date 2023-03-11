const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }
  
  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);

    //INITS
    const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
    const quote = data[Math.floor(Math.random() * 1600)].text;

    const query = quote.toUpperCase().split('');
var strikes = 0;
var userGuesses = [];

// BUILD KEYBOARD
for (let i=0; i<alphabet.length; i++){
    $('#keyboard').append('<button id='+alphabet[i]+'>'+ alphabet[i]+'</button>')
}

$(document).keydown(function(e) {
    var key = e.key.toUpperCase();
    var button = $('#' + key);
    if (button.length) {
      button.trigger('click');
    }
  });

// RENDER QUOTE FUNCTION
function renderQuote(guessArray){
    var render = []
    for (let i=0; i<query.length; i++){
        if(guessArray.includes(query[i]) || !alphabet.includes(query[i])){
            render.push(query[i]);
        }else{
            render.push('_')
        }
    }
    return render.join('');
}

// PLAYING THE GAME
$('#quote-holder').html('<h1>' + renderQuote(userGuesses) + '</h1>')
$('#message-holder').html('<h1>Start Guessing: </h1>')

$('button').click(function(){
    userGuesses.push(this.id)
    if(strikes<3){
        if(renderQuote(userGuesses)!=query.join('')){
        if (query.includes(this.id)){
            $(this).addClass('button-right')
            $(this).prop('disabled',true)
        }else{
            strikes = strikes + 1
            $(this).addClass('button-wrong')
            $(this).prop('disabled',true)
        }
        $('#quote-holder').html('<h1>' + renderQuote(userGuesses) + '</h1>')
        $('#message-holder').html('<h1>You have '+ (3-strikes) + ' more strikes.</h1>')
        }else{
            $('#quote-holder').html('<h1>' + renderQuote(userGuesses) + '</h1>')
            $('#message-holder').html('<h1>Yayy! You guessed it.</h1>')
        }
    }
    else{
        $('#quote-holder').html('<h1>' + query.join('') + '</h1>')
        $('#message-holder').html('<h1>Oops! Refresh to play again.</h1>')
        $('button').addClass('button-wrong')
        $('button').prop('disabled',true)
    }
    
})
  });

