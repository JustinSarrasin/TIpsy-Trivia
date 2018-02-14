//  create an app object
const triviaApp = {};

// const question = (info.results[0].question);
// console.log(question);
//  create a function that will grab a random category of question
triviaApp.getInfo = () => {
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple',
            dataType: 'json',
            method: 'GET',
    
    }).then(function(info) {
        //const q = info.question;
        //triviaApp.getQuestion(info);
        const question = (info.results[0].question);
        // triviaApp.getQuestion(question);
        // console.log(question);
        triviaApp.getQuestion(info.results[0].question);
        triviaApp.getAnswer(info.results[0].correct_answer);
        triviaApp.getWrongAnswer(info.results[0].incorrect_answers);
        
        // console.log(info.results[0].question);
        // console.log(info.results[0].correct_answer);
        // console.log(info.results[0].incorrect_answers);
      
    });
//  create a new function for a timer once the question is displayed
}

//  create a function that will grab the question
triviaApp.getQuestion = (question) => {
    // console.log(question);
    // $(".container").html('');
    
    const displayQuestion = $('<h2>').text(question);
    $('.question').append(question);

    // const displayAnswers = $('<p>').text(correct_answer);
    // $('.answer').append(correct_answer);


    // const question = (results[0].question);
            // console.log(info.results[0].question);
            // console.log(question);

    // console.log(question);
};

triviaApp.getAnswer = (answerRight) => {
    const displayAnswers = $('<p>').text(answerRight);
    $('ul').append('<li>' + answerRight + '</li>');
    console.log(answerRight);


    // let userChoice = $('li').on('click', function (j) {
    //     // grab the note by ID
    //     // console.log("something is clicked")
    //     if (userChoice !== answerRight) {
    //         console.log('correct');
    //     } else {
    //         console.log('wrong');
    //     }
    // });
    triviaApp.userAnswer();

}

triviaApp.getWrongAnswer = (answerWrong) => {
    answerWrong.forEach((answerBreakdown) =>{
        const wrongAnswers = $('<p>').text(answerWrong);
        $('ul').append('<li>' + answerBreakdown + '</li>');
        let userChoice = $('li').on('click', function (a) {
            console.log('wrong click');
    //     // console.log(answerWrong);
    })
})
    triviaApp.randomAnswers();
    // triviaApp.userAnswer();
}

triviaApp.randomAnswers = (rando) => {
    let answers = $('ul');
    let list = $('ul li').length;
    for (let i = 1; i < list; i++) {
        let shuffle= Math.floor(Math.random() * list);
        $('li', answers).eq(shuffle).appendTo(answers);
    }

    // triviaApp.userAnswer();
}


//  create a new function that would evaluate the userSelection to the correct answer
// triviaApp.userAnswer = (userChoice) => {
//     // $('li').on('click', function (j){
//     //     // grab the note by ID
//     //     console.log("something is clicked")
//     //     if(userChoice === answerRight) {
//     //         console.log('correct');
//     //     }
//     // });


// }

triviaApp.userAnswer = (choice) => {
    let userChoice = $('li').on('click', function (j) {
        // grab the note by ID
        console.log("something is clicked")
        if (userChoice !== choice) {
            console.log('correct');
        } else {
            console.log('wrong');
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
    // triviaApp.userAnswer();
    // triviaApp.getAnswer();
    // triviaApp.randomAnswers();
}

//document ready function
$(function(){
    triviaApp.init();
});
