

var gamePattern = [];
var userClickedPattern =[];
var buttonColors = ['purple', 'green', 'yellow', 'red'];

var level = 0;
var executed = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length -1);

});


var firstClick = (function() {  
    if (!executed) {
        executed = true;
        nextSequence()
    }   
});


function nextSequence (){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).animate({opacity: 0.1}, 100) .animate({opacity: 1},100) ;

    playSound(randomChosenColour);
    animatePress(randomChosenColour);   
};

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },   100);

};

$("body").keypress(function(key){
    if(key.keyCode == 32){
        animatePress("center");
        setTimeout(function(){
            firstClick(); 
        }, 500)

    }
});
$(".center").click(function(){
    animatePress("center");
    setTimeout(function(){
        firstClick();
    }, 500);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Succes")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("Wrong");
        playSound("Wrong");
        $("#level-title").text("Game over, press space or Play button to restart");
        $(".center").addClass("game-over");
        $("body").keypress(function(key){
            if(key.keyCode == 32){
                startOver();
            };
        });
        $(".center").click(function(){
            startOver();
        })     
    };
}
function startOver(){
    executed = false;
    level = 0;
    gamePattern = [];
    $(".center").removeClass("game-over");

}




