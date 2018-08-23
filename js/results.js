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
var thisUser = convertToUserObject(userData);

//Create new element and post in ordered list on results page
for(var i = 0; i < userData.results.length; i++){
  var resultList = document.createElement('li');
  resultList.textContent = `Subject: ${userData.results[i]['subject']}, 
    Score: ${userData.results[i]['score']},  
    Date: ${userData.results[i]['date']}`;
  listOnPage.appendChild(resultList);
}


var ScatterPlots = [];


function PointOnGraph(){
  var userResults =  thisUser.results;
  for(var i = 0; i < userResults.length; i++ ){
    var dataPoint = {};
    dataPoint.x = userResults[i].score;
    dataPoint.y = userResults[i].quizTime;
    ScatterPlots.push(dataPoint);
  }
}

PointOnGraph();

// got this chart.js code from this here: https://www.chartjs.org/docs/latest/charts/scatter.html
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Scatter Dataset',
      data: ScatterPlots
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
});

// var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//   // The type of chart we want to create
//   type: 'line',

//   // The data for our dataset
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [{
//       label: 'My First dataset',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     }]
//   },

//   // Configuration options go here
//   options: {}
// });