userClickedPattern = [];
gamePattern = [];
buttonColours = ["red", "yellow", "green", "blue"];
level= 0;

// function to generate a new sequence of colours 

function nextSequence() {
  var randomNumber =  Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").text("Level " + ++level);
}

// detecting the key press to start the game

$(document).one("keypress",function (e) { 
  nextSequence();
  
});

// function to check the user answer

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(nextSequence,1000);
      userClickedPattern = [];
    }    
  }
  else {
      wrongAudio();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      $(document).one("keypress",function (e) { 
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        nextSequence();
      });
    }
}  



// function to play the corresponding sound of the chosen colour 

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// function to play the wrong audio 

function wrongAudio() {
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
}

// function to animate the pressed button 

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")},100);
}

// detecting the click event on buttons

$(".btn").click(function(){
  userChosenColour = $(this).attr("id"); 
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
});