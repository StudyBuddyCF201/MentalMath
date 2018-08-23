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

//declare empty arrays for use in chart on results page
var addPlot = [];
var subPlot = [];
var multPlot = [];


function PointOnGraph(){
  var userResults =  thisUser.results;
  for(var i = 0; i < userResults.length; i++ ){
    var dataPoint = {};
    dataPoint.y = userResults[i].score;
    dataPoint.x = userResults[i].quizTime;
    if(userResults[i].subject === 'addition'){
      addPlot.push(dataPoint);
    }else if(userResults[i].subject === 'subtraction'){
      subPlot.push(dataPoint);
    }else{
      multPlot.push(dataPoint);
    }
  }
}

PointOnGraph();

// got this chart.js code from this here: https://www.chartjs.org/docs/latest/charts/scatter.html
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Addition',
      data: addPlot,
      borderColor: '#fbbb40',
      backgroundColor: '#fecc1b',
      radius: 4
    },
    {
      label: 'Subtraction',
      data: subPlot,
      borderColor: '#004183',
      backgroundColor: '#5fbdcd',
      radius: 4
    },
    {
      label: 'Multiplication',
      data: multPlot,
      borderColor: '#94301b',
      backgroundColor: '#4d4d4f',
      radius: 4
    }]
  },
  options: {
    scales: {
      yAxes:[{
        ticks: {
          suggestedMax: 10,
        }
      }],
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
});