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
        triviaApp.getQuestion(triviaApp.questions[triviaApp.counter].question);
        triviaApp.giveRightAnswer(triviaApp.questions[triviaApp.counter].correct_answer);
        triviaApp.giveWrongAnswer(triviaApp.questions[triviaApp.counter].incorrect_answers);

        triviaApp.setupQuestions();
    });
}

triviaApp.setupQuestions = () => {
    $('.nextQuestion').on('click', function () {
        //display a question
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

triviaApp.countdown = 21;
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
    //  displays question
    console.log(question);
    $('.question').empty();
    $('.question').append(question);
};

triviaApp.giveRightAnswer = (rightAnswer) => {
    console.log(rightAnswer)
    $('.answers').empty();
    $('.answers').append('<label class="right"><input class="right" type="radio" name="answer">' + rightAnswer + '</label>');
}

triviaApp.giveWrongAnswer = (wrongAnswer) => {
    wrongAnswer.forEach((answerBreakdown) => {
        triviaApp.randomAnswers();

        //  console.log(wrongAnswer)
        //  $('.answers').empty();
        $('.answers').append('<label class="wrong"><input class="wrong" type="radio" name="answer">' + answerBreakdown + '</label>');
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

triviaApp.addPoint = function (pizza) {
    triviaApp.player['user1']++;
    $(`#player1`).empty();
    $('#player1').append(`<h2>Score:` + triviaApp.player['user1'] + `/10 </h2>`);
    // if(triviaApp.player['user1']++=== true){
    //  return;
    // }
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

        $('.right').addClass('correct');
        triviaApp.results();
        
        // let click = $('form').on('submit');
        
        // if(click = false){
            
            // } else true;
            
            const answerSelection = $('input[name=answer]:checked').val();
            const rightSelection = $('input:radio.right:checked').val();
            // if the counter is even, player 1 makes a selection
            // if the selection is correct, add point to user1 score
            if (triviaApp.counter % 2 === 0) {
                
                // $('<p>').addClass('active-player');
            console.log('even')
            // let bingo = (answerSelection === rightSelection);
            if (answerSelection === rightSelection) {
                triviaApp.addPoint();            
            } else {
                // console.log('wrong');
            }

        } else {
            // console.log('odd');
            if (answerSelection === rightSelection) {
                triviaApp.addPoint2();
            } else {
                // console.log('wrong');
            }
        }
    });
}

triviaApp.player = {
    user1: 0,
    user2: 0
}

triviaApp.results = () => {
    if (triviaApp.player['user1'] === 10) {
        $('.results').append(`player 1 wins`);
        console.log('stuff');
    } else {
        // console.log('hey');
    }

    if (triviaApp.player['user2'] === 10) {
        $('.results').append(`player 2 wins`);
    } else {
        return;
    }


}

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
