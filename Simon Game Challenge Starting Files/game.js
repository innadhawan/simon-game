var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var firstTime = true;

var level = 0;

$(document).keypress(function(event) {
    if(firstTime)
        {
            $("h1").text("Level " + level);
            nextSequence();
            firstTime = false;
        }
})

$(".btn").on("click", function(event) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);

    animatePress(userChosenColour);

    if( checkAnswer())
    {
        
        if(userClickedPattern.length === gamePattern.length)
        {
            nextSequence();
        }

    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        firstTime = true;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 200);
    }
});



function nextSequence() {
    
    level++;
    $("h1").text("Level " + level);
    
    var num = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[num];
    gamePattern.push(randomChosenColor);

    var selectedButton = $("#" + randomChosenColor);
    selectedButton.fadeOut(100).fadeIn("slow");

    playSound(randomChosenColor);

    userClickedPattern = [];
    //animatePress(randomChosenColor);
   
}
function playSound (name) {
    
    
    var audio4SelectedButton = new Audio ("sounds/" + name + ".mp3");
    audio4SelectedButton.play();
}


function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer ()
{
    console.log("GamePattern: " + gamePattern.toString() + " UserPattern: " +  userClickedPattern.toString() );
    var answer = true;
    for(var i = 0; i < gamePattern.length; i++)
    {
        var singleGamePattern = gamePattern[i];
        var singleUserClickedPattern = userClickedPattern[i];
        console.log("SingleUserClickedPattern: " + singleUserClickedPattern);
        if(singleUserClickedPattern === undefined)
        {
            break;
        }
        if( (gamePattern[i] === userClickedPattern[i]) )
        {
            continue;
        }
        else 
        {
            answer = false;
            
        }
    }
    console.log(answer);
    return answer;
}

