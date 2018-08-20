'use strict';

var questionDisplayOrder = []; //Tracks order of question indices for display
var addition = new QuizSet('addition', []);
var subtraction = new QuizSet('subtraction', []);
var division = new QuizSet('division', []);

var progress = 0;

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



//Display Question
function displayQuestion(questionIndex){
  //Add question to front and back of card
  var questionDivFront = document.getElementById('question-front');
  questionDivFront.innerText = quizSet.questions[questionIndex].question;
  var questionDivBack = document.getElementById('question-back');
  questionDivBack.innerText = quizSet.questions[questionIndex].question;

  //Add answer options to front of card
  var answer1 = document.getElementById('a1');
  answer1.innerText = quizSet.questions[questionIndex].answerArr[0];

  var answer2 = document.getElementById('a2');
  answer2.innerText = quizSet.questions[questionIndex].answerArr[1];

  var answer3 = document.getElementById('a3');
  answer3.innerText = quizSet.questions[questionIndex].answerArr[2];

  //Add answer to back of card
  var cardBack = document.getElementById('answer');
  cardBack.innerText = quizSet.questions[questionIndex].answerArr[0];
}


//On page load, display the first question
// and display the question/answer in the question-back div
displayQuestion(0);

//Display initial progress numbers
var progressDiv = document.getElementById('top-progress-display');
progressDiv.innerText = `${progress} / ${quizSet.questions.length}`;

