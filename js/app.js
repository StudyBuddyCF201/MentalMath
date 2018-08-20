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
  this.score;
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

// var addition = new QuizSet('addition', []);
// var subtraction = new QuizSet('subtraction', []);
// var division = new QuizSet('division', []);

// var quizSets = [addition, subtraction, division];

// var questionInfo = [
//   ['This is a question?', ['yes', 'no', 'maybe']],
//   ['This is yet another question?', ['y', 'n', 'm']],
//   ['This is a third question?', ['YES', 'NO', 'MAYBE']],
// ];

// for (var i = 0; i < 3; i++) {
//   for (var j = 0; j < 3; j++) {
//     quizSets[i].addQuestion(questionInfo[j][0], questionInfo[j][1]);
//   }
// }

console.log('quiz sets created');
