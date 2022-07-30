gamePattern = []
var buttonColours = ['red', 'blue', 'green', 'yellow']
var started = false;
var level = 0;
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4)
    console.log(randomNumber)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    console.log(gamePattern)

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}
$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    console.log(userChosenColour)

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern.length - 1)
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");


        // console.log(userClickedPattern.length - 1)



        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");

        // console.log(gamePattern[currentLevel])
        // console.log(userClickedPattern[currentLevel])
        // console.log(userClickedPattern.length)
        // console.log(gamePattern.length)

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }



}
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')

    }, 50);
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
