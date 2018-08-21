'use strict';

var questionDisplayOrder = []; //Tracks order of question indices for display
var answerDisplayOrder = []; //Tracks order of answer indices for display
var addition = new QuizSet('addition', []);
var subtraction = new QuizSet('subtraction', []);
var division = new QuizSet('division', []);

var progress = 0;
var userResults = new Result(quizSetName);

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



//Even handler to move to results, which saves user results in localStorage


//Get selected quiz name from quizSets (app.js)
var quizSetName = JSON.parse(localStorage.getItem('selectedQuiz'));
//Get quiz set object whose name matches quizSetName
var quizSet = quizSetObjects[quizSetName];


//Generates random number in range [0, 3]
//pushes the index to shownQuestions and displays question/answers in div
function generateRandomQuestionIndex(arr){
  for(var i=0; i < quizSet.questions.length; i++){
    do{
      var randIndex = Math.floor(Math.random() * quizSet.questions.length);
    }while(arr.includes(randIndex));
    //add random number to questionDisplayOrder array
    arr.push(randIndex);
  }
}


//Display Question
function displayQuestion(index){
  //Add question to front and back of card
  var questionDivFront = document.getElementById('question-front');
  questionDivFront.innerText = quizSet.questions[index].question;
  var questionDivBack = document.getElementById('question-back');
  questionDivBack.innerText = quizSet.questions[index].question;

  // For each answer list item
  // Add answer text
  for(var i=0; i < 3; i++){
    var answer = document.getElementById('a' + (i+1));
    var answerIndex = answerDisplayOrder[i];
    answer.innerText = quizSet.questions[index].answerArr[answerIndex];
  }


  //Add answer to back of card
  var cardBack = document.getElementById('answer');
  cardBack.innerText = quizSet.questions[questionIndex].answerArr[0];

  var button = document.getElementById('card-button');
  if(progress < questionDisplayOrder.length-1){
    button.innerText = 'Next';
  }else{
    button.innerText = 'Results';
  }
  progress++;
  updateProgress();
}


//On page load, display the first question
// and display the question/answer in the question-back div
generateRandomQuestionIndex(questionDisplayOrder);
generateRandomQuestionIndex(answerDisplayOrder);
updateProgress();
updateScore();

//Display the current question
displayQuestion(questionDisplayOrder[progress]);

//Display initial progress numbers
function updateProgress(){
  var progressDiv = document.getElementById('top-progress-display');
  progressDiv.innerText = `${progress} / ${quizSet.questions.length}`;
}

function updateScore(){
  var scoreDiv = document.getElementById('score-display');
  scoreDiv.innerText = `Score: ${userResults.score}`;
}

//Display next question once button is clicked
var button = document.getElementById('card-button');
button.addEventListener('click', function(){
  displayQuestion(questionDisplayOrder[progress]);
});

//Event handler for clicking on card
//register correct/incorrect, move to next card, update progress counts
var answerList = document.getElementById('answer-list');
answerList.addEventListener('click', function(e){
  var userAnswer = e.target.innerText;
  console.log('***'+quizSet.questions[questionDisplayOrder[progress]].answerArr[0]);
  if(userAnswer === quizSet.questions[questionDisplayOrder[progress]].answerArr[0]){
    userResults.score++;
    updateScore();
  }
});
