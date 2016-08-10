//cached elements 
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
var popMoviesId =document.getElementById('popMovies'); 
var advtId = document.getElementById('advt'); 
var fishId = document.getElementById('fish'); 
var dbzId = document.getElementById('dbz');
var pokemonId = document.getElementById('pokemon'); 


//game variables 
var wins = 0 ,gameStarted=false;
var guessArr = []; 
var guess; 
var answer;
var answers =[];
var defaultCategory = popMovies;
setDefaultCategory(defaultCategory);

var themeMusic; 




//functions 
popMoviesId.onclick = function(){
   setNewCategory(popMovies);   
}

advtId.onclick = function(){
   setNewCategory(advt); 
}

fishId.onclick = function(){
    setNewCategory(fish); 
}

dbzId.onclick = function(){
   setNewCategory(dbz); 
}

pokemonId.onclick = function(){
   setNewCategory(pokemon); 
}


playButton.onclick = function(){
    togglePlayButton(); 
    togglePlay(themeMusic, true);
    
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
    console.log('answer loaded');
    
}

function putAnswer(){
     for(var i = 0; i < answer.length; i++){
        var d = document.createElement('DIV'); 
        var blank; 
         
        d.className +='answer-block';
        d.id = i ;
        changeColor(d, '#000'); 
       
        if(answer[i] === ' '){
            blank = document.createTextNode('+');
            d.style.borderBottom = 'none';
        }
         else if(answer[i] ==="'"){
             blank = document.createTextNode("'"); 
             d.style.borderBottom ='none';
             changeColor(d, '#fff'); 
         }
         
         else if(answer[i] ==='-'){
             blank = document.createTextNode('-'); 
             d.style.borderBottom = 'none'; 
             changeColor(d, '#fff'); 
         }
         else{
            blank = document.createTextNode('_');
             
         }
        answerContainer.appendChild(d);
        d.appendChild(blank);
        
        
    }
}

function setDefaultCategory(category){
    categoryText.innerHTML =category.name;
    answers = category.answers;
    setThemeMusic(category); 
  
}

function setNewCategory(newCategory){
    categoryText.innerHTML =newCategory.name;
    answers = newCategory.answers;
    isPlaying(); 
    setThemeMusic(newCategory);
    startGame(); 
}

function isPlaying(){
     
    if(themeMusic.paused === false){
        togglePlay(themeMusic, false);
         togglePlayButton(); 
    }
    
   
}

function setThemeMusic(category){
    
    themeMusic = category.theme; 
     
}

function changeColor(element, $color){
    element.style.color = $color; 
}

function getGuess(){
     var pattern = /^[a-zA-Z0-9]*$/; 
    
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
    var nodes = answerContainer.childNodes; 
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].innerHTML === '_'){
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
    fillInAnswer('win'); 
    gameStarted = false;
}

function fillInAnswer(outcome){
    var nodes = answerContainer.childNodes; 
    for(var i = 0 ; i < nodes.length; i++){
        if(outcome === 'win'){
            if(nodes[i].innerHTML !== '+'){
            changeColor(nodes[i], 'lime'); 
            }
    
        }
        else if(outcome === 'lose'){
            nodes[i].innerHTML = answer[i].toUpperCase(); 
            changeColor(nodes[i], 'crimson'); 
        }
    }
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
    fillInAnswer('lose'); 
    gameStarted = false; 
}

//calls 
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

