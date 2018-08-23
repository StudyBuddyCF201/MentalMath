'use strict';

var JSONpresent = JSON.parse(localStorage.getItem('User'));
var nameForm = document.getElementById('usernameform');
var username = '';
var selectedQuiz; //used to store name of selected quiz set


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
  notUser.textContent = `Not ${JSONpresent.userName}?`;
  username = JSONpresent.userName;
  hi.textContent = `Welcome back ${JSONpresent.userName}`;
  greeting[0].appendChild(hi);
  greeting[0].appendChild(notUser);
  notUser.setAttribute('onClick', 'window.location.reload()');
  notUser.addEventListener('click', function(e){
    e.preventDefault();
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
  console.log(username);
  if(username){
    if(quizName === e.target.dataset.name){
      var me = new User(username);
      localStorage.setItem('User', JSON.stringify(me));
      runQuiz(quizName);
    }
  }
  else if(JSONpresent){
    if(quizName === e.target.dataset.name){
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
  console.log(selectedQuiz);
  localStorage.setItem('selectedQuiz', JSON.stringify(quizName));
  window.location.href = 'quiz.html';
}
