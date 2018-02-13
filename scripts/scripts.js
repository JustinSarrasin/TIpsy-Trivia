//  create an app object
const triviaApp = {};

//  create a function that will grab a random category of question
triviaApp.getInfo = () => {
    $.ajax({
        url: 'https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple',
            dataType: 'json',
            method: 'GET',
            // data: {
            //     format: 'json',
            //     }
    
    }).then(function(info) {
        //const q = info.question;
        //triviaApp.getQuestion(info);
        console.log(info.results[0].question);
        console.log(info.results[0].correct_answer);
        console.log(info.results[0].incorrect_answers);
      
    });
//  create a new function for a timer once the question is displayed
}

//  create a function that will grab the question
triviaApp.getQuestion = (info) => {

};

//  print the question along with the answers to page
triviaApp.displayQuestion = () => {

}

//  create a new function that would evaluate the userSelection to the correct answer
triviaApp.userAnswer = () => {

//  create an object with two users to distinguish which team gets the point
//  create a for in loop????? if === to correct answer. add a point to teams score
//  once a team hits (x) of points, game over 
//  then start process again
}

     


//init function
triviaApp.init = () => {
    triviaApp.getInfo();
    triviaApp.getQuestion();
}

//document ready function
$(function(){
    triviaApp.init();
});