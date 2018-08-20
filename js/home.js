'use strict';

var additionEl = document.getElementById('addition');
var subtractionEl = document.getElementById('subtraction');
var divisionEl = document.getElementById('division');
var disciplines = [additionEl, subtractionEl, divisionEl];
var JSONpresent = JSON.parse(localStorage.getItem('User'));
var nameForm = document.getElementById('usernameform');
var username = '';
var selectedQuiz; //used to store name of selected quiz set


if (JSONpresent){
  nameForm.setAttribute('style','display:none');
  var greeting = document.getElementsByClassName('formOrGreeting');
  var hi = document.createElement('p');
  var notUser = document.createElement('p');
  notUser.textContent = `Not ${JSONpresent.userName}?`;
  username = JSONpresent.userName;
  hi.textContent = `Welcome back ${JSONpresent.userName}`;
  greeting[0].appendChild(hi);
  greeting[0].appendChild(notUser);
  notUser.setAttribute('onClick', 'window.location.reload()');
  notUser.addEventListener('click', function(){
    localStorage.removeItem('User');
  });
}

nameForm.addEventListener('submit', function(event){
  event.preventDefault();
  username = event.target.username.value;
});

for(var i = 0; i < disciplines.length; i++){
  disciplines[i].addEventListener('click', function(e){
    if(username){
      var me = new User(username);
      localStorage.setItem('User', JSON.stringify(me));
      var quizName = e.target.id;
      runQuiz(quizName);
    } else {
      alert('Please Enter a Username');
    }
  });
}

function runQuiz(quizName){
  console.log(selectedQuiz);
  localStorage.setItem('selectedQuiz', JSON.stringify(quizName));
  window.location.href = 'quiz.html';
}

