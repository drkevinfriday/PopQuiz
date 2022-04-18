//  Quiz timer
var  quizTime = 60;

//
var timeInterval // make this global 
// player score
var playerScore = 0;

var Highscore = 0

var scoreList =[]

// variable to tracker current question
currentQuestion = 0


// create var object  with 4 questions
var sunQuestion = 
    {
    question: "what color is the sun ",
    answers: ["red", "blue", "orange", "purple"],
    correctAnswer: "orange"
    
}
var moonQuestion = 
    {
    question: "what color is the moon ",
    answers: ["red", "blue", "orange", "white"],
    correctAnswer: "white"
    
}

var signQuestion = 
    {
    question: "what color is a sto sign ",
    answers: ["red", "blue", "orange", "purple"],
    correctAnswer: "red"
    
}

var footallQuestion = 
    {
    question: "what color is football ",
    answers: ["red", "blue", "orange", "brown"],
    correctAnswer: "brown"
    
}

var listQuestions = [
  sunQuestion,
  moonQuestion,
  signQuestion,
  footallQuestion
]


 
//quiz variables


// timer dom element
var timerEl = document.querySelector(".timer")


// page dom elements

var introEl = document.querySelector(".intro")
var quizEl = document.querySelector(".quiz")
var resetHighScoreEl= document.querySelector(".resetBtn")
var resultEl  = document.querySelector(".results")
var scoreEl = document.querySelector(".score")
var QuestionEl = document.querySelector(".question")
var answerOneEl = document.querySelector(".answerOne")
var answerTwoEl = document.querySelector(".answerTwo")
var answerThreeEl = document.querySelector(".answerThree")
var answerFourEl = document.querySelector(".answerFour")
var highScorceListEL = document.querySelector(".high-score-list")
var topEl = document.querySelector(".top")
var rightOrWrongEl = document.querySelector(".rightOrWrong")
// button Doms
var startBtnEl = document.querySelector(".startBtn")
var submitBtnEl = document.querySelector(".submitBtn")
var goBackBtnEl = document.querySelector(".goBackBtn")
var topScoreEl = document.querySelector(".topScore")

var userName = document.querySelector(".userName")


var listScoresEl = document.querySelector(".listScores")
// visibilty set
resultEl.hidden = true
listScoresEl.hidden = true
QuestionEl.hidden = true
answerOneEl.hidden = true
answerTwoEl.hidden = true
answerThreeEl.hidden = true
answerFourEl.hidden = true


// create a timer function to start  the quiz and timer  via a button connected to a event listener  
var timerFunc = function(){
  

    console.log("timer is working")
    // this sets the timer dom to 60
    timerEl.textContent = quizTime;
    

    // this is where the time is decreased
     timeInterval = setInterval(function () {
        // As long as the `quizTime` is greater than 1
        if (quizTime >= 1) {
          // Set the `textContent` of `timerEl` to show the remaining seconds
          timerEl.textContent = quizTime + ' seconds remaining';
          // Decrement `quizTime` by 1
          quizTime--;
        } else if (quizTime === 1) {
          // When `quizTime` is equal to 1, rename to 'second' instead of 'seconds'
          timerEl.textContent = quizTime + ' second remaining';
          timeLeft--;
         
         
        } else {
          // Once `quizTime` gets to 0, set `timerEl` to an empty string
          timerEl.textContent = '';
          // Use `clearInterval()` to stop the timer
          clearInterval(timeInterval);
          // Call the `displayMessage()` function
          quizTime -= 1
          endGame();
          
          ;
        }
      }, 1000);
}

function init() {
  // need to parse array of user score objects
  var storedScoreList = JSON.parse(localStorage.getItem("ScoresList"));
  console.log(storedScoreList)

  // assign the parsed array to scoreList array to render later
  if (storedScoreList !== null) {
    scoreList = storedScoreList;
    console.log(scoreList)
  }
  showScore();
}


// create a function that iterates over a set of question objects this function should call a function based on the   result.
// Starts the quiz through a set of function calls 
var startQuiz = function(){

  currentQuestion = 0
  quizTime = 60;
  // this hides the intro text one the page displays 
 //starts timer over
  timerFunc();
  resetIntro();
  displayQuestion();
 
//loops through the list of objects



}

var resetIntro = function(){
  console.log("reset ran")
resultEl.hidden = true
listScoresEl.hidden = true
QuestionEl.hidden = true
answerOneEl.hidden = true
answerTwoEl.hidden = true
answerThreeEl.hidden = true
answerFourEl.hidden = true

}
// Hidden intro after quiz starts
var hideIntro = function(){
  console.log("Hide is working")
  introEl.hidden = true
  quizEl.hidden = false
  QuestionEl.hidden = false
  answerOneEl.hidden = false
  answerTwoEl.hidden = false
  answerThreeEl.hidden = false
  answerFourEl.hidden = false

  
}
// render quiz
// var displayQuestion = function(){

//   // this shows the question options
//   QuestionEl.hidden = false
//   answerOneEl.hidden = false
//   answerTwoEl.hidden = false
//   answerThreeEl.hidden = false
//   answerFourEl.hidden = false

//   // renders the question
//   QuestionEl.textContent = listQuestions[currentQuestion].question;

//   //display answer
//   for(var i = 0; i < listQuestions[currentQuestion].answers.length; i++){
//     listAnswer[i].textContent =listQuestions[currentQuestion].answers[i];
//     console.log(listQuestions[currentQuestion].answers[i])

//   }
// }

// function to verify that answers
// render quiz
var displayQuestion = function(){

  hideIntro();

  console.log(currentQuestion)
  console.log(listQuestions.length)


  //end the quiz if there are no more question left
  if(currentQuestion == listQuestions.length){
    
    
   endGame();
  }
  else{

  // this shows the question options
  QuestionEl.hidden = false
  answerOneEl.hidden = false
  answerTwoEl.hidden = false
  answerThreeEl.hidden = false
  answerFourEl.hidden = false

  //reset the answers
  var listAnswer = document.querySelectorAll("#choice")

  // renders the question
  QuestionEl.textContent = listQuestions[currentQuestion].question;

  //display answer
  for(var i = 0; i < listQuestions[currentQuestion].answers.length; i++){
    listAnswer[i].textContent = listQuestions[currentQuestion].answers[i];
    console.log("the correct answer is " + listQuestions[currentQuestion].correctAnswer)

    }
  }
}
var verifyAnswer = function (event) {

  var timeOutID = 0;
//test to see what was clicked on
var thisAnswer = event.target
console.log("User choice " + thisAnswer.textContent)
console.log(listQuestions[currentQuestion].correctAnswer)
console.log(listQuestions[currentQuestion])


  //test to see if the user answer id correct
  if (thisAnswer.textContent === listQuestions[currentQuestion].correctAnswer){


    rightOrWrongEl.textContent = "Correct"

    console.log("The correct answer " + listQuestions[currentQuestion].correctAnswer)

    // moves to the next question 
    currentQuestion +=1 ;
    //calls the display function to move to the next question 
    timeOutID=window.setTimeout(displayQuestion,600)

   
  

  }
  else{

    rightOrWrongEl.textContent= "Wrong"

    console.log("This answer is wroong" )
    //subtracts time for wrong answer.
    subtractTime();

    // moves to the next question 
    currentQuestion++;

    //calls the display function to move to the next question 
    timeOutID=window.setTimeout(displayQuestion,600)
    

  }
}

// create a function to subtract time from timer.
var subtractTime = function () {
  // subtracts time from time when answer is wrong
  quizTime -= 10
}


// end game function
var endGame = function () {

  
  
  console.log("Endgame ran")
  // hide all the dom elements once the  quiz is over
  QuestionEl.hidden = true
  answerOneEl.hidden = true
  answerTwoEl.hidden = true
  answerThreeEl.hidden = true
  answerFourEl.hidden = true
  resultEl.hidden = false


  // call function stop timer and save it as a score
  //set player score equal to time left
  playerScore = quizTime +1
  clearInterval(timeInterval);
  
  // call function to show quiz results
  quizResults();
}

//function displays results then 

var quizResults = function (){
  //displays  the players score
  scoreEl.textContent = playerScore
}

// create a function to save player score and name

var submitScorces = function (event){
  event.preventDefault();
  resultEl.hidden= true
   //save the user name as a var
  var user = userName.value.trim()

  console.log(user)

  var userScore = {
    name: user,
    Highscore: playerScore,
  }
  console.log(userScore)
  //save the push the user infor the socre list array
  scoreList.push(userScore)
  saveScore();
  showScore();
  
}
var showScore = function(){
  
  listScoresEl.hidden = false
  introEl.hidden = true
  quizEl.hidden= true
  highScorceListEL.innerHTML=""

   for(var i= 0; i< scoreList.length; i++) {
     var storedScores = scoreList[i]
     var li = document.createElement("li")

    li.textContent="Name " + scoreList[i].name + "Score " + scoreList[i].Highscore 

    highScorceListEL.appendChild(li)



  }
}
var saveScore = function() {
  localStorage.setItem("ScoresList", JSON.stringify(scoreList));
};

//reset
var resetHighScore= function(){
  listScoresEl.innerHTML="High Score Erased Quiz will Restart"
  localStorage.clear()
  scoreList = []
  timeOutID=window.setTimeout(startQuiz,2000)

}


// conditional state to check for new high

// create a a button to display highscorce get high scorce.




//This button starts the quiz 
startBtnEl.addEventListener("click", startQuiz)
submitBtnEl.addEventListener("click",submitScorces )
goBackBtnEl.addEventListener("click",startQuiz)

topScoreEl.addEventListener("click", init )
answerOneEl.addEventListener("click",verifyAnswer)
answerTwoEl.addEventListener("click",verifyAnswer)
answerThreeEl.addEventListener("click",verifyAnswer)
answerFourEl.addEventListener("click",verifyAnswer)
resetHighScoreEl.addEventListener("click", resetHighScore)








 