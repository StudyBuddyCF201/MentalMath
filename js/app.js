'use strict';

console.log('app.js linked');

// Object definitions
function QuizSet(name, questions) {
  this.name = name;
  this.questions = questions;
}

function Question(question, answerArr) {
  this.question = question;
  // the 0th index should always be the correct answer within answer array
  this.answerArr = answerArr;
}

function User(userName, results = []) {
  this.userName = userName;
  this.results = results;
}

function Result(subject) {
  this.subject = subject;
  this.score = 0;
  this.wrong = 0;
  var currentDate = new Date();
  this.date = currentDate.toDateString();
  this.quizTime;
}

QuizSet.prototype.addQuestion = function (question, answerArr) {
  var newQuestion = new Question(question, answerArr);
  this.questions.push(newQuestion);
};

User.prototype.saveToLocalStorage = function () {
  localStorage.setItem('User', JSON.stringify(this));
};

//Functions that help convert localStorage data
//parameter userData is parsed JSON from localStorage
function convertToUserObject(userData){
  //Create a new user with userName
  var user = new User(userData.userName);

  //For each result owned by the user, create a Result
  //object and push it to user.results
  for(var i=0; i < userData.results.length; i++){
    var result = new Result(userData.results[i].subject);
    result.score = userData.results[i].score;
    result.date = userData.results[i].date;
    result.quizTime = userData.results[i].quizTime;
    user.results.push(result);
  }
  return user;
}