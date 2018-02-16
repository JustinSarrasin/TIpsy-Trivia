//  create an app object
const triviaApp = {};

triviaApp.counter = 0;
triviaApp.player = {
    user1: 0,
    user2: 0
}

//  create a function that will grab a random category of question
triviaApp.getInfo = () => {
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple',
            dataType: 'json',
            method: 'GET',
    
    }).then(function(info) {
        triviaApp.questions = info.results;
        // triviaApp.getQuestion(info.results[0].question);
        // triviaApp.getAnswer(info.results[0].correct_answer);
        // triviaApp.getWrongAnswer(info.results[0].incorrect_answers);
        triviaApp.getQuestion(triviaApp.questions[triviaApp.counter].question);
        triviaApp.giveRightAnswer(triviaApp.questions[triviaApp.counter].correct_answer);
        triviaApp.giveWrongAnswer(triviaApp.questions[triviaApp.counter].incorrect_answers);

        triviaApp.setupQuestions();
        
    });
//  create a new function for a timer once the question is displayed
}

triviaApp.setupQuestions = () => {
    $('.nextQuestion').on('click', function () {
        //display a question
        triviaApp.timerId = setInterval(triviaApp.timer, 1000);
        triviaApp.counter = triviaApp.counter + 1;
        triviaApp.countdown = 31;

        //if the counter hits a certain number, do nothing and finish
        //else keep showing questions
        triviaApp.getQuestion(triviaApp.questions[triviaApp.counter].question);
        triviaApp.giveRightAnswer(triviaApp.questions[triviaApp.counter].correct_answer);
        triviaApp.giveWrongAnswer(triviaApp.questions[triviaApp.counter].incorrect_answers);
        //increase
    });
}

triviaApp.countdown = 31;
triviaApp.timer = function () {
    if (triviaApp.countdown === 0) {
        console.log('something');
        $('form').off('submit', function(e) {
            e.preventDefault();
        });
        clearInterval(triviaApp.timerId);

    } else {
        triviaApp.countdown--;
        $('.mycounter').html(`<h2>Timer: ` + triviaApp.countdown + `</h2>`);
    }
}


//  create a function that will grab the question
triviaApp.getQuestion = (question) => {
    console.log(question)
    
    //  displays question
    $('.question').empty();
    $('.question').append(question);

};

triviaApp.giveRightAnswer = (rightAnswer) => {
    console.log(rightAnswer)
    $('.answers').empty();
    $('.answers').append('<label><input class="right" type="radio" name="answer">' + rightAnswer + '</label>');
}

triviaApp.giveWrongAnswer = (wrongAnswer) => {
    wrongAnswer.forEach((answerBreakdown) => {
        triviaApp.randomAnswers();

        //  console.log(wrongAnswer)
        //  $('.answers').empty();
        $('.answers').append('<label><input class="wrong" type="radio" name="answer">' + answerBreakdown + '</label>');
    });
}

triviaApp.randomAnswers = () => {
    let questions = $("#answers");

    questions.html(
        questions.find("label").sort(function () {
            return Math.round(Math.random()) - 0.5;
        })
    );
}

triviaApp.addPoint = function () {
    triviaApp.player['user1']++;
    $(`#player1`).empty();
    $('#player1').append(`<h2>Score: ` + triviaApp.player['user1'] + `</h2>`);
}

triviaApp.addPoint2 = function () {
    triviaApp.player['user2']++;
    $(`#player2`).empty();
    $('#player2').append(`<h2>Score: ` + triviaApp.player['user2'] + `</h2>`);

}


triviaApp.takeTurns = () => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        clearInterval(triviaApp.timerId);


        const answerSelection = $('input[name=answer]:checked').val();
        const rightSelection = $('input:radio.right:checked').val();
        // if the counter is even, player 1 makes a selection
        // if the selection is correct, add point to user1 score
        if (triviaApp.counter % 2 === 0) {
            console.log('even')
            if (answerSelection === rightSelection) {
                triviaApp.addPoint();
                

            } else {
                console.log('wrong');
            }

        } else {
            console.log('odd');
            if (answerSelection === rightSelection) {
                triviaApp.addPoint2();

            } else {
                console.log('wrong');
            }
        }
    });
}




//  create an object with two users to distinguish which team gets the point
//  create a for in loop????? if === to correct answer. add a point to teams score
//  once a team hits (x) of points, game over 
//  then start process again


//init function
triviaApp.init = () => {
    triviaApp.getInfo();
    triviaApp.getQuestion();
    triviaApp.takeTurns();
    triviaApp.timer();
    // triviaApp.nextQuestion();
}

//document ready function
$(function(){
    triviaApp.init();
});
