var userClickedPattern = [];
var gamePattern = [];
var check = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    $("h1").text("Level " + level);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if (!check) {
        $("h1").text("Level " + level);
        nextSequence();
        check = true;
    }
})

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

$("h1").text = "Press A Key to Start";

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }
    } else {
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    check = false;
}