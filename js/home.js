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


//Add event listener to div with quiz choices
//Register which quiz was chosen and also get the username
//save User object to localStorage
var cardDiv = document.getElementById('cards');
cardDiv.addEventListener('click', function(e){
  // e.preventDefault();
  var usernameInput = document.getElementById('username');
  username = usernameInput.value;
  console.log(username);
  if(username){
    var me = new User(username);
    localStorage.setItem('User', JSON.stringify(me));
    var quizName = e.target.id;
    runQuiz(quizName);
  }else {
    alert('Please Enter a Username');
  }
});

// for(var i = 0; i < disciplines.length; i++){
//   disciplines[i].addEventListener('click', function(e){
//     if(username){
//   });
// }

function runQuiz(quizName){
  console.log(selectedQuiz);
  localStorage.setItem('selectedQuiz', JSON.stringify(quizName));
  window.location.href = 'quiz.html';
}