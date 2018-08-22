'use strict';

var questionDisplayOrder = []; //Tracks order of question indices for display
var answerDisplayOrder = []; //Tracks order of answer indices for display
var progress = 0; //Tracks user progress through quiz deck
var questionsToDisplayCount = 10; //Indicates number of questions to display in the deck



/*****************************************************************
 *                   Get User info from LocalStorage
 ****************************************************************/
//Get selected quiz name from quizSets (app.js)
var quizSetName = JSON.parse(localStorage.getItem('selectedQuiz'));

//Get User from local Storage
var thisUser = convertToUserObject(JSON.parse(localStorage.getItem('User')));



/*****************************************************************
 *                     Function Definitions
 ****************************************************************/

//Generate 10 addition questions
function makeAdditionQuestions(){
  //Create a question array container
  var questions = [];
  for(var i=0; i < 10; i++){
    //Create a question array
    var question = [];
    //Create an answer array container
    var answers = [];
    var a = Math.floor(Math.random() * 100);
    var b = Math.floor(Math.random() * 100);
    question.push(`${a} + ${b}`);
    answers.push(`${a + b}`);
    answers.push(`${a + b - 1}`);
    answers.push(`${a + b + 2}`);
    question.push(answers);
    questions.push(question);
  }
  return questions;
}

//Generate 10 subtraction questions
function makeSubtractionQuestions(){
  //Create a question array container
  var questions = [];
  for(var i=0; i < 10; i++){
    //Create a question array
    var question = [];
    //Create an answer array container
    var answers = [];
    var a = Math.floor(Math.random() * 100);
    var b = Math.floor(Math.random() * 100);
    question.push(`${a} - ${b}`);
    answers.push(`${a - b}`);
    answers.push(`${a - b - 1}`);
    answers.push(`${a - b + 2}`);
    question.push(answers);
    questions.push(question);
  }
  return questions;
}


//Generate 10 multiplication questions
function makeMultiplicationQuestions(){
  //Create a question array container
  var questions = [];
  for(var i=0; i < 10; i++){
    //Create a question array
    var question = [];
    //Create an answer array container
    var answers = [];
    var a = Math.floor(Math.random() * 10);
    var b = Math.floor(Math.random() * 10);
    question.push(`${a} x ${b}`);
    answers.push(`${a * b}`);
    answers.push(`${a * b + 1}`);
    answers.push(`${a * b + 2}`);
    question.push(answers);
    questions.push(question);
  }
  return questions;
}


//Creates quiz set for the selected quiz
function loadQuestionsIntoQuizSet(quizName, questions){
  for (var j = 0; j < questionsToDisplayCount; j++) {
    quizName.addQuestion(questions[j][0], questions[j][1]);
  }
}


//Generates random number in range 0 to the length of the question array
//pushes the index to shownQuestions and displays question/answers in div
function generateRandomIndexOrder(arr, size){
  for(var i=0; i < size; i++){
    do{
      var randIndex = Math.floor(Math.random() * size);
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

//Adds score footer update
function updateScoreFooter(){
  var wrongScoreText = document.getElementById('wrong');
  var rightScoreText = document.getElementById('right');
  rightScoreText.innerText = userResult.score;
  wrongScoreText.innerText = userResult.wrong;
}



/*****************************************************************
 *            Main page execution and event handlers
 ****************************************************************/
//Stores user results for this quiz
var userResult = new Result(quizSetName);

//Create quiz set object whose name matches quizSetName
var quizSet = new QuizSet(quizSetName, []);
var questions;

//Generate quiz questions and add the to the quiz set
if(quizSetName === 'addition'){
  questions = makeAdditionQuestions();
}else if(quizSetName === 'subtraction'){
  questions = makeSubtractionQuestions();
}else{
  questions = makeMultiplicationQuestions();
}

//Load questions into quiz set
loadQuestionsIntoQuizSet(quizSet, questions);

//On page load, display the first question
// and display the question/answer in the question-back div
generateRandomIndexOrder(questionDisplayOrder, questionsToDisplayCount);
generateRandomIndexOrder(answerDisplayOrder, 3);
displayProgress();
displayScore();

//Display the current question
displayQuestion(questionDisplayOrder[progress-1]);


//Get flipper element from DOM
var flip = document.getElementsByClassName('flipper')[0];

//Handler on button to display next question once button is clicked
var button = document.getElementById('card-button');
button.addEventListener('click', function(){
  flip.classList.toggle('is-flipped');
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
  flip.classList.toggle('is-flipped');
  if(e.target.dataset.value === 'true'){
    userResult.score++;
  }
  else{
    userResult.wrong++;
  }
  displayScore();
});
