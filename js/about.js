'use strict';

var JSONpresent = JSON.parse(localStorage.getItem('User')); //Get localStorage data

//Disable link on results-link and only allow user
//to navigate to results if they have visited before
var resultsLink = document.getElementById('results-link');
resultsLink.addEventListener('click', function(e){
  e.preventDefault();
  if(JSONpresent){
    window.location.href = 'results.html';
  }
});