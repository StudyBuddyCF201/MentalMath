'use strict';

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
      borderColor: '#109744',
      backgroundColor: '#109744',
      radius: 4
    },
    {
      label: 'Subtraction',
      data: subPlot,
      borderColor: '#ce6a2f',
      backgroundColor: '#ce6a2f',
      radius: 4
    },
    {
      label: 'Multiplication',
      data: multPlot,
      borderColor: '#fbbb40',
      backgroundColor: '#fbbb40',
      radius: 4
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return data['datasets'][tooltipItem[0]['datasetIndex']]['label'];
        },
        label: function(tooltipItem) {
          return 'Score: '+ tooltipItem['yLabel'];
        },
        afterLabel: function(tooltipItem) {
          return 'Time: '+tooltipItem['xLabel']+' seconds';
        },
      },
      displayColors: false
    },
    scales: {
      yAxes:[{
        scaleLabel: {
          display: true,
          labelString: 'Score'
        },
        ticks: {
          suggestedMax: 10,
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          suggestedMax: 10,
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Time (sec)'
        },
        type: 'linear',
        position: 'bottom'
      }]
    }
  }
});