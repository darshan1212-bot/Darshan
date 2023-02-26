var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    // console.log(currentLevel);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        // console.log("wrong");
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// $(document).keydown(function (e) { 
//     buttonPressed(e.key);
// });

// function buttonPressed(button){
//     $("."+button).addClass("pressed");
//     setTimeout(() => {
//         $("."+button).removeClass("pressed");
//     }, 100);
//     checkAnswer();
//     startOver();
// }

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

