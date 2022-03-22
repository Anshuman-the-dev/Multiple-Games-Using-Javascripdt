// challenge 1 : age calculator
function ageindays(){
var birthyear = prompt("what is your age in years");
var ageindayss=(2018-birthyear)* 365;
var h1=document.createElement('h1');
var testanswer=document.createTextNode('You are '+ ageindayss + 'days');
h1.setAttribute('id','ageindays');
h1.appendChild(testanswer);
document.getElementById('flex-box-result').appendChild(h1);
console.log(ageindayss);
}
function reset(){
    document.getElementById('ageindays').remove();
}

// challenge 2 : cat generator

function generatecat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(image);
}

// challenge 3 : Rock , Paper , Scissor

function rpsgame(yourchoice){
    console.log(yourchoice);
    var humanchoice, botchoice;
    humanchoice = yourchoice.id;

    botchoice = numberTochoice(randtorpcInt());
    console.log(botchoice);

    results =decidewinner(humanchoice,botchoice)// [0,1] human lost | bot won
    console.log(results);

    message= finalMessage(results); // return message with colors
    console.log(message);

    rpsfrontend(yourchoice.id, botchoice, message);

}
function randtorpcInt(){
    return Math.floor(Math.random() * 3);
}

function numberTochoice(number){
    return ['rock','paper','scissor'][number];
}

function decidewinner(yourchoice ,computerchoice){
    var rpsdatabase= {
        'rock': {'scissor': 1,'rock' : 0.5, 'paper': 0},
        'paper' :{'rock':1,'paper' : 0.5, 'scissor': 0},
        'scissor':{'paper': 1,'scissor':0.5,'rock': 0},
    }
    var yourscore= rpsdatabase[yourchoice][computerchoice];
    var computerscore= rpsdatabase[computerchoice][yourchoice];
    return [yourscore, computerscore];
}

function finalMessage([yourscore, computerscore]){
    if(yourscore === 0){
    return {'message': 'You lost !', 'color': 'red'};
    }
    else if(yourscore === 0.5){
    return {'message' : 'You tied !', 'color': 'yellow'};
    }
    else{ 
    return {'message' :'You won !','color':'green'};
    }
}

function rpsfrontend(humanimagechoice, botimagechoice, finalmessage){
    var imagesDatabase= {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissor' : document.getElementById('scissor').src
    }

    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv= document.createElement('div');
    var botDiv= document.createElement('div');
    var messageDiv= document.createElement('div');

    humanDiv.innerHTML ="<img src='" + imagesDatabase[humanimagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML="<h1 style='color: " + finalmessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalmessage['message'] +"</h1>" 
    botDiv.innerHTML ="<img src='" + imagesDatabase[botimagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
}

// challenge 4: changing color button

var allbuttons=document.getElementsByTagName('button');

var copyallbuttons =[];
for(let i=0;i< allbuttons.length;i++){
    copyallbuttons.push(allbuttons[i].classList[1]);
}

function buttoncolorchange(buttonthing){
    if(buttonthing.value ==='red'){
        buttonred();
    }
    else if(buttonthing.value === 'green'){
        buttongreen();
    }
    else if(buttonthing.value === 'reset'){
        buttonreset();
    }
    else if(buttonthing.value === 'random'){
        buttonrandom();
    }

}

function buttonred(){
    for(let i=0;i<allbuttons.length;i++){
      allbuttons[i].classList.remove(allbuttons[i].classList[1]);
      allbuttons[i].classList.add('btn-danger');
    }
}

function buttongreen(){
    for(let i=0;i<allbuttons.length;i++){
      allbuttons[i].classList.remove(allbuttons[i].classList[1]);
      allbuttons[i].classList.add('btn-success');
    }
}

function buttonreset(){
    for(let i=0;i<allbuttons.length;i++){
      allbuttons[i].classList.remove(allbuttons[i].classList[1]);
      allbuttons[i].classList.add(copyallbuttons[i]);
    }
}

function buttonrandom(){
    var choice =['btn-primary','btn-danger','btn-success','btn-warning']
    for(let i=0;i<allbuttons.length;i++){
        var randomnumber= Math.floor(Math.random() * 4);
        allbuttons[i].classList.remove(allbuttons[i].classList[1]);
        allbuttons[i].classList.add(choice[randomnumber]);
    }
}

// Challenge 5 : Blackjack

let blackjackGame={
    'you': {'scoreSpan': '#your-blackjack-result','div': '#your-box','score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result','div': '#dealer-box', 'score': 0},
    'cards' :['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap' :{'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K' :10,'J': 10, 'Q': 10,'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand' : false,
    'turnOver' : false,
};

const YOU =blackjackGame['you']
const DEALER =blackjackGame['dealer']

const hitsound = new Audio('sounds/swish.m4a');
const winsound = new Audio('sounds/cash.mp3');
const losssound= new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
      let card= randomcard();
      showcard(card,YOU);
      updateScore(card,YOU);
      showScore(YOU);
    }
    
    
}

function randomcard(){
    let randomIndex=Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showcard(card, activeplayer){
    if(activeplayer['score'] <= 21){
     let cardImage = document.createElement('img');
     cardImage.src =`images/${card}.png`;
     document.querySelector(activeplayer['div']).appendChild(cardImage);
     hitsound.play();
    }
    
}

function blackjackDeal(){
    if (blackjackGame['turnOver'] === true){
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages =document.querySelector('#dealer-box').querySelectorAll('img');

        for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
     }

       for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
     }

     YOU['score'] = 0;
     DEALER['score'] = 0;

     document.querySelector('#your-blackjack-result').textContent = 0;
     document.querySelector('#dealer-blackjack-result').textContent = 0;

     document.querySelector('#your-blackjack-result').style.color ='ffffff';
     document.querySelector('#dealer-blackjack-result').style.color ='ffffff';

     document.querySelector('#blackjack-result').textContent ="Let's play";
     document.querySelector('#blackjack-result').style.color = 'black';
     
     blackjackGame['turnOver'] = true;
    }
    
}

function updateScore(card, activeplayer){
    if(card === 'A'){
    // if adding 11 keeps me below 21 , add 11 otherwise, add 1
       if(activeplayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activeplayer['score'] += blackjackGame['cardsMap'][card][1]; 
        } else {
            activeplayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else{
    activeplayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activeplayer){
    if(activeplayer['score'] > 21){
        document.querySelector(activeplayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scoreSpan']).style.color ='red';
    }else{
    document.querySelector(activeplayer['scoreSpan']).textContent= activeplayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve , ms));
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
     let card= randomcard();
     showcard(card, DEALER);
     updateScore(card,DEALER);
     showScore(DEALER);
     await sleep(1000);
    }
    
    blackjackGame['turnOver'] = true;
    let winner =computerWinner();
    showResult(winner);
    
    
}

// compute winner and return who just won
// update the wins,draws and losses

function computerWinner(){
    let winner;
    
    if(YOU['score'] <= 21){
        // condition : higher score than dealer busts but you are 21 or under 
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner=YOU;
        } else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        } else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    // condition when the user busts but dealer don't; 
    }else if(YOU['score'] > 21 && DEALER['score'] <=21){
        blackjackGame['losses']++;
        winner = DEALER;
    // condition when you and dealer busts
    } else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;

    }
    
    return winner;
}

function showResult(winner){
    let message, messagecolor;
   
    if(blackjackGame['turnOver'] === true){

     if(winner === YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message ='You won!';
        messagecolor ='green';
        winsound.play();
     }else if(winner === DEALER){
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'You Lost!';
        messagecolor = 'red';
        losssound.play();
     }else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = "You drew!";
        messagecolor = 'yellow';
     }

     document.querySelector('#blackjack-result').textContent = message;
     document.querySelector('#blackjack-result').style.color = messagecolor;
    }
}