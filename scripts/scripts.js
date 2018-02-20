// App object
const triviaApp = {};

// Starting of question counter
triviaApp.counter = 0;

// Starting score of players
triviaApp.player = {
    user1: 0,
    user2: 0
}

// Start page
triviaApp.start = () => {
    $('#start').on('click', function () {
        triviaApp.insertName();
        triviaApp.timerId = setInterval(triviaApp.timer, 1000);
        $('.startPage').fadeOut('1000');
        $('.triviaPage').show();
        
    });
}

// Hides the Trivia Page
triviaApp.hideTriviaPage = () => {
    $('.triviaPage').hide();
}

//  Function that will grab a random category of question
triviaApp.getInfo = () => {
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple',
            dataType: 'json',
            method: 'GET',
    }).then(function(info) {
        triviaApp.questions = info.results;
        triviaApp.getQuestion(triviaApp.questions[triviaApp.counter].question);
        triviaApp.giveRightAnswer(triviaApp.questions[triviaApp.counter].correct_answer);
        triviaApp.giveWrongAnswer(triviaApp.questions[triviaApp.counter].incorrect_answers);
        triviaApp.setupQuestions();
    });
}

// Question Set-Up
triviaApp.setupQuestions = () => {
    $('#nextQuestion').on('click', function () {
        $('.teamOneName').toggleClass('teamOneNameNotActive');
        $('.teamTwoName').toggleClass('teamTwoNameActive pulseAnimated');
        //display a question
        clearInterval(triviaApp.timerId);        
        triviaApp.timerId = setInterval(triviaApp.timer, 1000);
        triviaApp.counter = triviaApp.counter + 1;
        triviaApp.countdown = 21;

        //if the counter hits a certain number, do nothing and finish
        //else keep showing questions
        triviaApp.getQuestion(triviaApp.questions[triviaApp.counter].question);
        triviaApp.giveRightAnswer(triviaApp.questions[triviaApp.counter].correct_answer);
        triviaApp.giveWrongAnswer(triviaApp.questions[triviaApp.counter].incorrect_answers);
    });
}


// Timer
triviaApp.countdown = 21;
triviaApp.timer = function () {
    if (triviaApp.countdown === 0) {
        clearInterval(triviaApp.timerId);
        swal("Oh No!!", "Out Of Time")
    } else {
        triviaApp.countdown--;
        $('.mycounter').html(`<h3>` + triviaApp.countdown + `</h3>`);
    }
}

//  Function that will grab the question
triviaApp.getQuestion = (question) => {
    //  displays question
    $('.question').empty();
    $('.question').append(question);
};

// Function that displays the right answer
triviaApp.giveRightAnswer = (rightAnswer) => {
    $('.answers').empty();
    $('.answers').append('<label class="right"><input class="right" type="radio" name="answer">' + rightAnswer + '</label>');
}

// Function that displays the wrong answers
triviaApp.giveWrongAnswer = (wrongAnswer) => {
    wrongAnswer.forEach((answerBreakdown) => {
        triviaApp.randomAnswers();
        $('.answers').append('<label class="wrong"><input class="wrong" type="radio" name="answer">' + answerBreakdown + '</label>');
    });
}

// Randomizes the answers
triviaApp.randomAnswers = () => {
    let questions = $("#answers");

    questions.html(
        questions.find("label").sort(function () {
            return Math.round(Math.random()) - 0.5;
        })
    );
}

// Adds point to each person's score
triviaApp.addPoint = function () {
    triviaApp.player['user1']++;
    $(`#player1`).empty();
    $('#player1').append(`<h3>Score: ` + triviaApp.player['user1'] + `/10 </h3>`);
}
triviaApp.addPoint2 = function () {
    triviaApp.player['user2']++;
    $(`#player2`).empty();
    $('#player2').append(`<h3>Score: ` + triviaApp.player['user2'] + `/10</h3>`);
}


// Function that determines the person's turn and resets the timer on submit
triviaApp.takeTurns = () => {

    $('form').on('submit', function (e) {
        e.preventDefault();
        clearInterval(triviaApp.timerId);

        $('.right').addClass('correct');
        triviaApp.results();
            
        const answerSelection = $('input[name=answer]:checked').val();
        const rightSelection = $('input:radio.right:checked').val();
        const IsChecked = $('input[name=answer]').is(':checked');

        if (!IsChecked) {
            swal("Oh No!", "No selection was made. You lose your turn!");
        }
        // if the counter is even, player 1 makes a selection
        // if the selection is correct, add point to user1 score
        if (triviaApp.counter % 2 === 0) {                        
            if (answerSelection === rightSelection && IsChecked) {
                triviaApp.addPoint();            
            } 
        } else {            
            if (answerSelection === rightSelection && IsChecked) {
                triviaApp.addPoint2();
            } 
        }
    });
}

// Displays the person's name to the trivia 
triviaApp.insertName = () => {
    let playerOneName = $('#inputOne').val();
    if (playerOneName !== '') {
        $('.teamOneName').append(`<h2>` + playerOneName + `</h2>`);
        $('.teamOneName').val('');
    } else {
        $('.teamOneName').append(`<h2>Player One</h2>`);        
    }
    let playerTwoName = $('#inputTwo').val();
    if (playerTwoName !== '') {
        $('.teamTwoName').append(`<h2>` + playerTwoName + `</h2>`);
        $('.teamTwoName').val('');
    } else {
        $('.teamTwoName').append(`<h2>Player Two</h2>`);               
    }
}
    
// Displays the winner when score reaches 10
triviaApp.results = () => {
    if (triviaApp.player['user1'] === 9) {
        $('.results').append(`<h2 class="answerHeader">Player one wins!!!</h2>`);
        $('.triviaPage').hide();
        $('.resultPage').show('resultPage');
    } 
    if (triviaApp.player['user2'] === 9) {
        $('.results').append(`<h2 class="answerHeader"> Player two wins!!!</h2>`);        
        $('.resultPage').show('resultPage');   
        $('.triviaPage').hide();             
    } 
}

// Function that resets the page
$(".reset").on('click',function() {
    location.reload();
});

// Init function
triviaApp.init = () => {
    triviaApp.start();
    triviaApp.hideTriviaPage();
    triviaApp.getInfo();
    triviaApp.getQuestion();
    triviaApp.takeTurns();
    triviaApp.timer();
}

// Document ready function
$(function(){
    triviaApp.init();
});


//Questions provided https://opentdb.com/ API