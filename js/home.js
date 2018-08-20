'use strict';


// var deckOne = document.getElementById('deck-one');
var addition = document.getElementById('addition');
var JSONpresent = JSON.parse(localStorage.getItem('user'));
var nameForm = document.getElementById('usernameform');
var username = '';
var quizSubject;

if (JSONpresent){
  nameForm.setAttribute('style','display : none');
  var greet = document.getElementsByClassName('formOrGreeting');
  var hi = document.createElement('p');
  hi.textContent = `Welocme back ${JSONpresent[0].username}`;
  greet.appendChild(hi);
}

nameForm.addEventListener('submit', function(event){
  event.preventDefault();
  username = event.target.username.value;
  // console.log(event.target.username.value);
});

// deckOne.addEventListener('click', function(){
//   if(username){
//     runQuiz();
//   } else {
//     alert('Please Enter a Username');
//   }
// });

addition.addEventListener('click', function(){
  if(username){
    runQuiz();
  } else {
    alert('Please Enter a Username');
  }
});

function runQuiz(){
  window.location.href = 'quiz.html';
}

