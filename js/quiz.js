'use strict';

startTimer();

var questionDisplayOrder = []; //Tracks order of question indices for display
var progress = 0; //Tracks user progress through quiz deck
var questionsToDisplayCount = 10; //Indicates number of questions to display in the deck
var timer; //used to track elapsed quiz time
var seconds = 0;

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


function getRandom(ans, offsets){
  var num = Math.floor(Math.random() * 6 -3);
  while(num === 0 || offsets.includes(num) || offsets.includes(Math.abs(num))){
    num = Math.floor(Math.random() * 6 - 3);
  }
  offsets.push(num);
  return num;
}

//Generate 10 addition questions
function makeAdditionQuestions(){
  //Create a question array container
  var questions = [];
  for(var i=0; i < 10; i++){
    //Create a question array
    var question = [];
    var offsets = []; //used for generating additional answers
    //Create an answer array container
    var answers = [];
    var a = Math.floor(Math.random() * 100);
    var b = Math.floor(Math.random() * 100);
    question.push(`${a} + ${b}`);
    answers.push(`${a + b}`);
    answers.push(`${a + b + getRandom(a + b, offsets)}`);
    answers.push(`${a + b + getRandom(a + b, offsets)}`);
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
    var offsets = []; //used for generating additional answers
    //Create an answer array container
    var answers = [];
    var a = Math.floor(Math.random() * 100);
    var b = Math.floor(Math.random() * 100);
    question.push(`${a} - ${b}`);
    answers.push(`${a - b}`);
    answers.push(`${a - b + getRandom(a - b, offsets)}`);
    answers.push(`${a - b + getRandom(a - b, offsets)}`);
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
    var offsets = []; //used for generating additional answers
    var a = Math.floor(Math.random() * 50);
    var b = Math.floor(Math.random() * 50);
    question.push(`${a} x ${b}`);
    answers.push(`${a * b}`);
    answers.push(`${Math.abs(a * b + getRandom(a * b, offsets))}`);
    answers.push(`${Math.abs(a * b + getRandom(a * b, offsets))}`);
    // answers.push(`${a * b + getRandom(a * b, offsets)}`);
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


//Creates timer (in seconds) at top of page
function startTimer(){
  timer = setInterval(function(){
    seconds++;
    document.getElementById('time-display').innerText = `${seconds}`;
  }, 1000);
}


//Stops timer and returns end time
function stopTimer(){
  clearInterval(timer);
}


//Display Question
function displayQuestion(index){
  //Get answer display order
  var answerDisplayOrder = []; //Tracks order of answer indices for display
  generateRandomIndexOrder(answerDisplayOrder, 3);
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
  if(progress <= (questionDisplayOrder.length-1)){
    nextButton.innerHTML = 'Next';
  }else{
    //Stop the timer
    stopTimer();
    nextButton.innerHTML = 'Results';
  }
}


//Display progress counter at top of page
function displayProgress(){
  progress++;
  move();
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
displayProgress();

//Display the current question
displayQuestion(questionDisplayOrder[progress-1]);


//Get flipper element from DOM
var flip = document.getElementsByClassName('flipper')[0];

//Handler on button to display next question once button is clicked
var button = document.getElementById('card-button');
button.addEventListener('click', function(){
  flip.classList.toggle('is-flipped');
  checkMark.classList.remove('enlarge');
  xMark.classList.remove('shake-wrong');
  if(button.innerHTML === 'Results'){
    //Add time to results object
    userResult.quizTime = seconds;
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
var xMark = document.getElementById('x-mark');
var checkMark = document.getElementById('check-mark');

answerList.addEventListener('click', function(e){
  if(e.target.dataset.value !== undefined){
    flip.classList.toggle('is-flipped');
    if(e.target.dataset.value === 'true'){
      userResult.score++;
      checkMark.classList.toggle('enlarge');
    }
    else{
      userResult.wrong++;
      xMark.classList.toggle('shake-wrong');
    }
    displayProgress();
    updateScoreFooter();
  }
});

//Event handler that allow the user to hide/show the
//time elapsed counter
var counterDisplayButton = document.getElementById('display-counter');
counterDisplayButton.addEventListener('click', function(e){
  var counter = document.getElementById('time-display');
  if(e.target.innerText === 'Hide Counter'){
    e.target.innerText = 'Show Counter';
    counter.style.visibility = 'hidden';
  }
  else{
    e.target.innerText = 'Hide Counter';
    counter.style.visibility = 'visible';
  }
});


var width = 0;
function move() {
  var elem = document.getElementById('barStatus');
  width += 10;
  elem.style.width = width + '%';

}
