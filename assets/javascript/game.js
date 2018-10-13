$(document).ready(function () {

    // set up for first game through flag and global wins and losses variables
    var newGame = true;
    var targetValue = 0;
    var playerScore = 0;
    var blueValue = 0;
    var yellowValue = 0;
    var redValue = 0;
    var greenValue = 0;
    var buttonValue = 0;
    var numWins = 0;
    var numLosses = 0;
    var msgText = "";

    // Initialize a new game
    function initializeGame() {
        // officially start the game
        newGame = false;
        // get random numbers for each crystal
        blueValue = getRandomNumber(1, 12);
        yellowValue = getRandomNumber(1, 12);
        redValue = getRandomNumber(1, 12);
        greenValue = getRandomNumber(1, 12);
        // get new target value
        targetValue = getTargetValue(blueValue, yellowValue, redValue, greenValue, 10, 120);
        // set the players guess number
        playerScore = 0;
        // Update the display
        msgText = "Press a crystal to start";
        updateDisplay();
    }

    // get a random number between two values
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // return a target value that is gauranteed to between a multiple of the crystal
    // values (which are passed in) and between a min and max (also passed in)
    function getTargetValue(bV, yV, rV, gV, min, max) {
        var tempTargetVal = 0;
        // we have to be sure the target value is possible combination
        // so the loop below will execute until we find a valid target number
        while (1 === 1) {
            // generate a random number between min and max
            tempTargetVal = Math.floor(Math.random() * (max - min + 1) + min);
            //confirm whether the proposed target value is a multiple of the crystal values
            // we only have to be a multiple of one crystal to be successful
            if ((tempTargetVal % bV == 0) || (tempTargetVal % yV == 0) || (tempTargetVal % rV == 0) || (tempTargetVal % gV == 0)) {
                return tempTargetVal;
            }
        }
    }

    // Update display
    function updateDisplay() {
        // Update the display 
        $("#currentTarget").html("<h1>" + targetValue + "</h1>");
        $("#currScore").html("<h1>" + playerScore + "</h1>");
        $("#yourScore").html("<h5>Your score...</h5>");
        $("#playerMsg").html("<p>" + msgText + "</p>");
        $("#numWins").html("<p>Wins: " + numWins + "</p>");
        $("#numLosses").html("<p>Losses: " + numLosses + "</p>");
    }

    // play the game
    function playGame(buttonValue) {
        playerScore = playerScore + buttonValue;
        msgText = "Keep guessing...";
        // Check and see if we need to start a new game and reset our variables
        if (newGame) {
            initializeGame();
        } else if (playerScore == targetValue) {
            // player wins - increase number of wins and start new game
            numWins += 1;
            newGame = true;
            msgText = "Awesome - you win!";
        } else if (playerScore > targetValue) {
            // player loses - increase number of losses and start new game
            numLosses += 1;
            newGame = true;
            msgText = "Bummer - you lose.";
        }
        updateDisplay();
    }

    // Update based upon crystal clicks

    // Blue Crystal
    $(".blueButton").on("click", function () {
        playGame(blueValue);
    });

    // Yellow Crystal
    $(".yellowButton").on("click", function () {
        playGame(yellowValue);
    });

    // Red Crystal
    $(".redButton").on("click", function () {
        playGame(redValue);
    });

    // Green Crystal
    $(".greenButton").on("click", function () {
        playGame(greenValue);
    });

});
