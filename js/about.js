'use strict';

var JSONpresent = JSON.parse(localStorage.getItem('User')); //Get localStorage data

// It's weird to have this behavior built-in without any visual warning to users.
// I'd consider using CSS instead to both set pointer-events: none; and also gray
// out the link on page load.
//
// This logic is also duplicated between both about.js and home.js, so it should
// probably be in a function in app.js, and then you could call that function only
// in these two files, so that it doesn't run on every page.

//Disable link on results-link and only allow user
//to navigate to results if they have visited before
var resultsLink = document.getElementById('results-link');
resultsLink.addEventListener('click', function(e){
  // This logic seems very backwards to me. I'd rather do this in the oppposite way:
  // if (!JSONpresent) {
  //   e.preventDefault();
  // }
  e.preventDefault();
  if(JSONpresent){
    window.location.href = 'results.html';
  }
});