'use strict';

var results = [];
var resultOne = new Result ('addition')
 

var currentTime = new Date();
resultOne.quizTime = currentTime.toDateString()
resultOne.score = 7;
results.push(resultOne);


var newUser = new User('username', results)
localStorage.setItem('User', JSON.stringify(newUser));

var userData = JSON.parse(localStorage.getItem('User'));

var listOnPage = document.getElementById('load_scores');
for(var i = 0; i < userData.results.length; i++){
  var resultList = document.createElement('li');
  resultList.textContent = userData.results[i]['score'];
  console.log(userData.results);
  listOnPage.appendChild(resultList);
}