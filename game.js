var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = (Math.random() * 4);
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch(function(error) {
        console.error("Error playing sound:", error);
    });
}

function animatePress(currentColour){
    $(".btn").click(function(){
        $(this).addClass("pressed");
    })
    setInterval(function(){
        $("." + currentColour).removeClass("pressed");  
    } , 50);
    
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) 
        {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        }else{
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();

            document.querySelector("body").classList.add("game-over");

            setTimeout(function(){
                document.querySelector("body").classList.remove("game-over");
            }, 200);

            document.querySelector("h1").innerHTML = ("Game Over, Press Any Key to Restart");

            console.log("Wrong");
            startOver();
    }
   
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}



