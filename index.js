

var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$("#click-btn").on("click", function() {

  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();

    started = true;

  }
});

// ---------------------------------

function nextSequence() {

  level++;

  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("game patten is  this := " + gamePattern);

  // How to automatically click button by computer.
  function autoClickButton(colorName) {
    $(colorName).fadeOut(100).fadeIn(100)
    playMusic(randomChosenColour)
  }

  autoClickButton("." + randomChosenColour)
};

// -------------------------------------------------------------------

function btn_animation_sound(colorName, song_name) {

  $(colorName).on("click", function() {
    $(colorName).fadeOut(100).fadeIn(100)
    playMusic(song_name);

    var userChosenColour = $(colorName).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log("user clicked pattern is this := " + userClickedPattern);

    $(colorName).addClass("pressed");

    setTimeout(function() {
      $(colorName).removeClass("pressed");
    }, 100);

    checkAnswer(userClickedPattern.length-1);

});
}
// ----------------------------------------------------------------------------

for (var i = 0; i < buttonColours.length; i++) {
  btn_animation_sound("." + buttonColours[i], buttonColours[i] );
}

// -------------------------------------

function playMusic(sound_source) {
  var song = new Audio("sounds/" + sound_source + ".mp3");
  song.play();
}

// -------------------------------

function checkAnswer(currentLevel) {

      if ( userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {
        if (userClickedPattern.length === gamePattern.length) {

          console.log("success");
          console.log("matched")

          setTimeout(nextSequence(), 100);
          userClickedPattern = [];
        }

      }
      else {

        console.log("wrong");

        playMusic("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over. click on start to Restart.");


        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);

        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = false;

      }
    }
