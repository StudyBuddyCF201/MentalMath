'use strict';

var JSONpresent = JSON.parse(localStorage.getItem('User')); //Get localStorage data
var nameForm = document.getElementById('usernameform');

nameForm.addEventListener('submit', function(e){
  e.preventDefault();
});


//Disable link on results-link and only allow user
//to navigate to results if they have visited before
var resultsLink = document.getElementById('results-link');
resultsLink.addEventListener('click', function(e){
  e.preventDefault();
  if(JSONpresent){
    window.location.href = 'results.html';
  }
});


//If the user's info is in localStorage, welcome the user
//and provide the option to change user name
if (JSONpresent){
  nameForm.setAttribute('style','display:none');
  var greeting = document.getElementsByClassName('formOrGreeting');
  var hi = document.createElement('p');
  var notUser = document.createElement('p');
  notUser.className = 'notuser';
  notUser.textContent = `(Not ${JSONpresent.userName}?)`;
  // Because you declare this variable inside a conditional, it's possible that your
  // code uses the userName variable in the event listener without that variable
  // having been declared! If there was no json, no 'var userName' line of code ever runs.
  // This is bad. If you're using this as a global variable, you need to declare it
  // outside of any conditionals.
  var username = JSONpresent.userName;
  hi.textContent = `Welcome back, ${JSONpresent.userName}!`;
  greeting[0].appendChild(hi);
  greeting[0].appendChild(notUser);
  // both setting onClick and adding an event listener for "click" is a weird pattern!
  // I'd do this as:
  // notUser.addEventListener('click', function () {
  //   localStorage.removeItem('User');
  //   window.location.reload();
  // })
  // Also, for accessibility reasons, anything clickable should have a tabIndex.
  notUser.setAttribute('onClick', 'window.location.reload()');
  notUser.addEventListener('click', function(){
    localStorage.removeItem('User');
  });
}


//Add event listener to div with quiz choices
//Register which quiz was chosen and also get the username
//save User object to localStorage
var cardDiv = document.getElementById('cards');
// There doesn't seem to be a benefit in declaring this variable outside of the function.
// In general, it's best to declare variables in the smallest possible scope.
var quizName;
// To avoid the repeated checks for quizName, I'd add this to each of the .card elements,
// not to the .cards element.
// i.e.
// var cardElts = document.getElementsByClassName('card');
// for (var i = 0; i < cardElts.length; i++) {
//   cardElts[i].addEventListener... (the rest of it can be identical)
// }
cardDiv.addEventListener('click', function(e){
  // Your logic in here is quite twisted.
  // I'd do this in this order instead:
  // if there's JSON:
  //   run the game
  // else
  //   grab that input's value
  //   if that input's value is null:
  //     alert to enter a username
  //   else:
  //     create new user, save to local storage
  //     run the game
  var usernameInput = document.getElementById('username');
  username = usernameInput.value;
  quizName = e.target.dataset.name;
  if(username){
    if(quizName){
      var me = new User(username);
      localStorage.setItem('User', JSON.stringify(me));
      runQuiz(quizName);
    }
  }
  else if(JSONpresent){
    if(quizName){
      runQuiz(quizName);
    }
  }
  else{
    alert('Please Enter a Username');
  }
});


//Saves selected quiz name to localStorage and takes
//user to quiz page
function runQuiz(quizName){
  localStorage.setItem('selectedQuiz', JSON.stringify(quizName));
  window.location.href = 'quiz.html';
}
