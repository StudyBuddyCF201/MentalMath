'use strict';

var questionDisplayOrder = []; //Tracks order of question indices for display
var addition = new QuizSet('addition', []);
var subtraction = new QuizSet('subtraction', []);
var division = new QuizSet('division', []);

var quizSets = [addition, subtraction, division];

var questionInfo = [
  ['This is a question?', ['yes', 'no', 'maybe']],
  ['This is yet another question?', ['y', 'n', 'm']],
  ['This is a third question?', ['YES', 'NO', 'MAYBE']],
];

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    quizSets[i].addQuestion(questionInfo[j][0], questionInfo[j][1]);
  }
}

var quizSetObjects = {'addition': addition, 'subtraction': subtraction, 'division': division};

//Event handler for clicking on card
//register correct/incorrect, move to next card, update progress counts



//Even handler to move to results, which saves user results in localStorage


//Get selected quiz name from quizSets (app.js)
var quizSetName = JSON.parse(localStorage.getItem('selectedQuiz'));
//Get quiz set object whose name matches quizSetName
var quizSet = quizSetObjects[quizSetName];


//Generates random number in range [0, 3]
//pushes the index to shownQuestions and displays question/answers in div
function generateRandomQuestionIndex(){
  console.log(quizSet.questions.length);
  for(var i=0; i < quizSet.questions.length; i++){
    do{
      var randIndex = Math.floor(Math.random() * quizSet.questions.length);
    }while(questionDisplayOrder.includes(randIndex));
    //add random number to questionDisplayOrder array
    console.log(randIndex);
    questionDisplayOrder.push(randIndex);
  }
}


//Display


//On page load, display the first question
//Display initial progress numbers
//Display the question/answer in the question-back div
