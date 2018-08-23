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
  var username = JSONpresent.userName;
  hi.textContent = `Welcome back, ${JSONpresent.userName}!`;
  greeting[0].appendChild(hi);
  greeting[0].appendChild(notUser);
  notUser.setAttribute('onClick', 'window.location.reload()');
  notUser.addEventListener('click', function(){
    localStorage.removeItem('User');
  });
}


//Add event listener to div with quiz choices
//Register which quiz was chosen and also get the username
//save User object to localStorage
var cardDiv = document.getElementById('cards');
var quizName;
cardDiv.addEventListener('click', function(e){
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
