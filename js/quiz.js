'use strict';

var questionDisplayOrder = []; //Tracks order of question indices for display
var answerDisplayOrder = []; //Tracks order of answer indices for display

//Create quiz sets
var addition = new QuizSet('addition', []);
var subtraction = new QuizSet('subtraction', []);
var division = new QuizSet('division', []);

var progress = 0; //Tracks user progress through quiz deck


//Quiz set containers
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
//Get User from local Storage
var thisUser = convertToUserObject(JSON.parse(localStorage.getItem('User')));
//Stores user results for this quiz
var userResult = new Result(quizSetName);
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
    //Set dataset value to true if correct answer, else set to false
    if(answerIndex === 0){
      answer.dataset.value = true;
    }
    else answer.dataset.value = false;
  }

  //Add answer to back of card
  var cardBack = document.getElementById('answer');
  cardBack.innerText = quizSet.questions[index].answerArr[0];

  //Set button text to 'next' or 'results' depending on
  //where the user is in the deck
  var nextButton = document.getElementById('card-button');
  console.log(`questionDisplayOrder ${questionDisplayOrder.length}, progress: ${progress}`);
  if(progress <= (questionDisplayOrder.length-1)){
    nextButton.innerHTML = 'Next';
  }else{
    nextButton.innerHTML = 'Results';
  }
  displayProgress();
  updateScoreFooter();
}


//On page load, display the first question
// and display the question/answer in the question-back div
generateRandomQuestionIndex(questionDisplayOrder);
generateRandomQuestionIndex(answerDisplayOrder);
displayProgress();
displayScore();

//Display the current question
displayQuestion(questionDisplayOrder[progress-1]);

//Display progress counter at top of page
function displayProgress(){
  var progressDiv = document.getElementById('top-progress-display');
  progressDiv.innerText = `${progress} / ${quizSet.questions.length}`;
  progress++;
}

//Display score at top of page
function displayScore(){
  var scoreDiv = document.getElementById('score-display');
  scoreDiv.innerText = `Score: ${userResult.score}`;
}

//Handler on button to display next question once button is clicked
var button = document.getElementById('card-button');
button.addEventListener('click', function(){
  if(button.innerHTML === 'Results'){
    //add result object to User results array
    thisUser.results.push(userResult);
    localStorage.setItem('User', JSON.stringify(thisUser));
    //redirect to results.html
    window.location.href = 'results.html';
  } else {
    displayQuestion(questionDisplayOrder[progress-1]);
  }
});

//Event handler for registering correct/incorrect on card click.
//Updates user score
var answerList = document.getElementById('answer-list');
answerList.addEventListener('click', function(e){
  if(e.target.dataset.value === 'true'){
    userResult.score++;
  }
  else{
    userResult.wrong++;
  }
  displayScore();
});

//Adds score footer update
function updateScoreFooter(){
  var wrongScoreText = document.getElementById('wrong');
  var rightScoreText = document.getElementById('right');
  rightScoreText.innerText = userResult.score;
  wrongScoreText.innerText = userResult.wrong;
}