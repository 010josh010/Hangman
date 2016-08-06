var start = document.getElementById('start'); 
var keyStart = document.querySelector('.key-start'); 
var intro = document.querySelector('.intro');
var game  = document.querySelector('.game');
var guesses= document.querySelector('.guesses');
var answerContainer = document.querySelector('.answer-container'); 
var answerBlock = document.querySelector('.answer-block'); 
var winsContainer = document.querySelector('.wins-container'); 
var winsCount = document.getElementById('wins-count');
var hangman = document.getElementById('hangman');
var categoryText = document.getElementById('category-text'); 
var categoryChoiceBtn = document.getElementById('category-choice-btn'); 
var categoryChoices = document.querySelector('.category-choices');
var playButton = document.getElementById('play-button'); 
var themeMusic; 


var wins = 0 ,gameStarted=false;
var guessArr = []; 
var guess; 
var answer;
var answers = adventureTimeCharacters; 
var defaultCategory = 'Adventure Time Characters'; 


//audio
var soundStart = new Audio('audio/start.wav'); 
var soundGuess1 = new Audio('audio/guess_1.wav'); 
var soundGuess2 = new Audio('audio/guess_2.wav'); 
var soundGrunt = new Audio('audio/grunt.mp3'); 
var themeAdvt = new Audio('audio/advt.mp3'); 


categoryChoices.onclick = function(){
    console.log(this.id); 
}


playButton.onclick = function(){
    togglePlayButton(); 
    togglePlay(themeAdvt, true);
    
}

function togglePlay(theme, loopControl) {
  theme.loop = loopControl; 
  return theme.paused ? theme.play() : theme.pause();
}

function togglePlayButton(){
    var p = playButton.firstElementChild; 
    var c = playButton.firstElementChild.className; 
    var ply = 'fa fa-play fa-lg'; 
    var pse = 'fa fa-pause fa-lg'; 
    
    if(c === ply){
        p.className = ''; 
        p.className += pse; 
    }
    else{
       p.className = ''; 
       p.className += ply; 
    }
}


function playAudio(a, loopControl){
    a.play();
    
}


function changeImg(num){
    hangman.src = 'img/hangman_'+num.toString()+'.jpg';  
}

function clearAnswer(){
   while(answerContainer.firstChild){
       answerContainer.removeChild(answerContainer.firstChild); 
   }
    console.log('answer cleared'); 
}

function clearGuesses(){
    while(guesses.firstChild){
        guesses.removeChild(guesses.firstChild); 
    }
    guessArr = []; 
    console.log('guesses cleared'); 
}
    

function loadAnswer(){
    var rand = Math.floor(Math.random() * answers.length) + 0; 
    answer = answers[rand].split(''); 
    console.log('answer loaded')
    
}

function putAnswer(){
     for(var i = 0; i < answer.length; i++){
        var d = document.createElement('DIV'); 
        d.className +='answer-block';
        d.id = i ;
        var blank = document.createTextNode('_');
         
        if(answer[i] === ' '){
            blank = document.createTextNode('&');
            d.style.borderBottom = 'none'; 
        }
        answerContainer.appendChild(d);
        d.appendChild(blank);
        d.style.color = '#000000'; 
        
    }
}

function setCategory(text, newCategory){
    categoryText.innerHTML = text; 
}

function changeColor(element, $color){
    element.style.color = $color; 
}

function getGuess(){
     var pattern = /^[a-zA-Z]*$/; 
    
     if(String.fromCharCode(event.keyCode).match(pattern)){
        guess = String.fromCharCode(event.keyCode).toLowerCase();
     }
    else{
        guess=''; 
        console.log('not a valid character'); 
    }
}


function putGuess(){
    var hits = [];
    for(var i in answer){
        if(answer[i] === guess){
            var a = document.getElementById(i);
            changeColor(a, '#fff');  
            a.innerHTML = guess.toUpperCase();
            hits.push(answer[i]); 
        }
    }
    
    if(hits.length === 0){
        if(guess !== ''){
            guessArr.push(guess); 
            var d = document.createElement('DIV');
            guesses.appendChild(d);
            changeColor(d, 'crimson'); 
        
            var node = document.createTextNode(guess.toUpperCase());
            d.appendChild(node); 
            
            wrongAnswer(guessArr.length); 
            
        }
    } 
}

function wrongAnswer(num){
    changeImg(num);
    if(num <= 3){
        playAudio(soundGuess1); 
    }
    else if(num > 3 && num < 10){
        playAudio(soundGuess2); 
    }
    else if(num === 10){
        playAudio(soundGrunt); 
    }
    
}

function winChecker(){
    var flag = false; 
    for(var i = 0; i < answerContainer.childNodes.length; i++){
        if(answerContainer.childNodes[i].innerHTML === '_'){
            flag = true; 
            break;
        }
    }
    if(flag === false){
        winGame(); 
        console.log('game won!')
    }
    else{
        return false; 
     }  
    
}

function lossChecker(){
    if(guessArr.length >= 10){
        loseGame(); 
    }
}

function winGame(){
    wins++; 
    setWins(); 
    gameStarted = false; 
}

function setWins(num){
    if(num === undefined){
        winsCount.innerHTML = wins; 
    }
   else{
     winsCount.innerHTML = num.toString(); 
   }
}

function loseGame(){

    gameStarted = false; 
}

function startGame(){
    playAudio(soundStart); 
    changeImg(0); 
    gameStarted = true;
    clearAnswer();
    clearGuesses();
    loadAnswer(); 
    putAnswer(); 
}

document.onkeyup = function(event){
    if(wins === 0){
        keyStart.style.display = 'none';
        setCategory(defaultCategory); 
        setWins(0); 
    }
    if(gameStarted){
        getGuess();
        putGuess();
        winChecker();
        lossChecker(); 
    }
    else{
        startGame();   
    }
}

