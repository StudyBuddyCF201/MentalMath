'use strict';

var addition = document.getElementById('addition');
var subtraction = document.getElementById('subtraction');
var division = document.getElementById('division');
var disciplines = [addition, subtraction, division];
var JSONpresent = JSON.parse(localStorage.getItem('User'));
var nameForm = document.getElementById('usernameform');
var username = '';
var quizSubject;

if (JSONpresent){
  nameForm.setAttribute('style','display:none');
  var greet = document.getElementsByClassName('formOrGreeting');
  var hi = document.createElement('p');
  username = JSONpresent[0].userName
  hi.textContent = `Welcome back ${JSONpresent[0].userName}`;
  greet.appendChild(hi);
}

nameForm.addEventListener('submit', function(event){
  event.preventDefault();
  username = event.target.username.value;
});

for(var i = 0; i < disciplines.length; i++){
  disciplines[i].addEventListener('click', function(){
    if(username){
      var me = new User(username)
      localStorage.setItem('user', JSON.stringify(me))
      runQuiz();
    } else {
      alert('Please Enter a Username');
    }
  });
}



function runQuiz(){
  window.location.href = 'quiz.html';
}

