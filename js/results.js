'use strict';

var results = [];
var resultOne = new Result ('addition')
 

var currentTime = new Date();
resultOne.quizTime = currentTime.toDateString()
resultOne.score = 7;
results.push(resultOne);

var resultTwo = new Result ('subtraction')
resultTwo.quizTime = currentTime.toDateString()
resultTwo.score = 9001;
results.push(resultTwo);



var newUser = new User('username', results)
localStorage.setItem('User', JSON.stringify(newUser));

var userData = JSON.parse(localStorage.getItem('User'));

var listOnPage = document.getElementById('load_scores');
for(var i = 0; i < userData.results.length; i++){
  var resultList = document.createElement('li');
  resultList.textContent = `Subject: ${userData.results[i]['subject']}, 
  Score: ${userData.results[i]['score']},  
  Date: ${userData.results[i]['quizTime']}`;
  console.log(userData.results);
  listOnPage.appendChild(resultList);
}