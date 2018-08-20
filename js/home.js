'use strict';

var deckOne = document.getElementById('deck-one');
var nameForm = document.getElementById('usernameform');
var username = ""

nameForm.addEventListener('submit', function(event){
  event.preventDefault();
  username = event.target.username.value
  // console.log(event.target.username.value);
})

deckOne.addEventListener('click', function(){
  if(username){
    runQuiz();
  } else {
    alert('Please Enter a Username')
  }
})