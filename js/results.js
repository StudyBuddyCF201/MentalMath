'use strict';

//***used for dummy info in order to populate localStorage
// var results = [];
// var resultOne = new Result ('addition');

// var currentTime = new Date();
// resultOne.quizTime = currentTime.toDateString();
// resultOne.score = 7;
// results.push(resultOne);

// var resultTwo = new Result ('subtraction');
// resultTwo.quizTime = currentTime.toDateString();
// resultTwo.score = 9001;
// results.push(resultTwo);

// var newUser = new User('username', results);
// localStorage.setItem('User', JSON.stringify(newUser));

//Pull User info from local storage
var userData = JSON.parse(localStorage.getItem('User'));

//Grab ordered list from results page
var listOnPage = document.getElementById('load_scores');

//Create new element and post in ordered list on results page
for(var i = 0; i < userData.results.length; i++){
  var resultList = document.createElement('li');
  resultList.textContent = `Subject: ${userData.results[i]['subject']}, 
    Score: ${userData.results[i]['score']},  
    Date: ${userData.results[i]['date']}`;
  listOnPage.appendChild(resultList);
}

//got this chart.js code from this here: https://www.chartjs.org/docs/latest/charts/scatter.html
var ctx = document.getElementById('myChart');
var myChart = new myChart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      labels: 'Scatter Dataset',
      data: [{
        x: -10,
        y: 0   
      }, {
        x: 0,
        y: 10
      }, {
        x: 10,
        y:5
      }]
    }]
  },
  options : {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  } 
});