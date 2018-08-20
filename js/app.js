'use strict';

console.log('app.js linked');

// Object definitions
function Set(name, questions) {
  this.name = name;
  this.questions = questions;
}

function Question(question, answerArr){
  this.question = question;
  // the 0th index should always be the correct answer within answer array
  this.answerArr = answerArr;
}

function User(userName, results=[]){
  this.userName = userName;
  this.results = results;
}

function Result(subject){
  this.subject = subject;
  this.score;
  var currentDate = new Date();
  this.date = currentDate.toDateString();
  this.quizTime;
}

Set.prototype.addQuestion = function(question, answerArr){
  var newQuestion = new Question(question, answerArr);
  this.questions.push(newQuestion);
}