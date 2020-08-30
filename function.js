let blackjackGame={
    'you': {'scoreSpan': ' #your-result ', 'div':'#your-box', 'score':0 },
    'dealer': {'scoreSpan': ' #dealer-result ', 'div':'#dealer-box', 'score':0 },
    'cards': [ '2', '3', '4','5','6','7','8','9','10','J','K','Q','A' ],
    'cardMAP':{'2':2 ,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':1},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
}
const You=blackjackGame['you']
const Dealer=blackjackGame['dealer']
const hitsound= new Audio("sounds/swish.m4a");
const winSound= new Audio("sounds/cash.mp3");
const LossSound= new Audio("sounds/aww.mp3");
function blackjackHit(){
    if(blackjackGame['isStand']===false){
    let card=randomCards();
    console.log(card);
    showCard(card,You);
    updateScore(card,You);
    showScore(You);
    console.log(You['score']);
}
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement("img");
    cardImage.src=`images/${card}.png`;
    cardImage.className="your-img";
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitsound.play();
}
}
function blackjackDeal(){
    if(blackjackGame['turnsOver']===true){
        blackjackGame['isStand']=false;
    var i=0;
    var yourImages=document.querySelector("#your-box").querySelectorAll("img");
    while(i<yourImages.length){
        yourImages[i].remove();
        i=i+1;
    }
    var x=0;
    var dealerImages=document.querySelector("#dealer-box").querySelectorAll("img");
    while(x<dealerImages.length){
        dealerImages[x].remove();
        x=x+1;
    }
    You['score']=0;
    Dealer['score']=0;
    document.querySelector(You['scoreSpan']).textContent=0;
    document.querySelector(You['scoreSpan']).style.color='white';
    document.querySelector(Dealer['scoreSpan']).textContent=0;
    document.querySelector(Dealer['scoreSpan']).style.color='white';

    document.querySelector('#play-heading').textContent="Let's play";
    document.querySelector('#play-heading').style.color='Black';
    blackjackGame['turnsOver']=true;
}
}
function randomCards(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}
function updateScore(card, activePlayer){
    activePlayer['score'] +=blackjackGame['cardMAP'][card];
}
function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!!!!';
        document.querySelector(activePlayer['scoreSpan']).style.color='Red';
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}


async function dealerLogic(){
    blackjackGame['isStand']=true;

    while(Dealer['score']<16 && blackjackGame['isStand']===true){
        let card=randomCards();
        showCard(card, Dealer);
        updateScore(card,Dealer);
        showScore(Dealer);
        await sleep(1000);
    }
        blackjackGame['turnsOver']=true;
        let winner=computeWinner();
        showResult(winner);
    }
function computeWinner(){
    let winner;

    if(You['score']<=21){
        if(You['score']>Dealer['score']||(Dealer['score']>21)){
            blackjackGame['wins']++;
            winner=You;
        }else if(You['score']<Dealer['score']){
            blackjackGame['losses']++;
            winner=Dealer;
        }else if(You['score']===Dealer['score']){
            blackjackGame['draws']++;
        }
    }else if(You['score']>21 &&Dealer['score']<=21){
        blackjackGame['losses']++;
        winner=Dealer;
    }else if(You['score']>21 &&Dealer['score']>21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}
function showResult(winner){
    let message,messageColor;
    if(blackjackGame['turnsOver']===true){
    if(winner===You){
        document.querySelector('#wins').textContent=blackjackGame['wins'];
        message='YOU WON';
        messageColor='Green';
        winSound.play();
    }else if(winner===Dealer){
        document.querySelector('#losses').textContent=blackjackGame['losses'];
        message='YOU LOST';
        messageColor='Red';
        LossSound.play();
    }else{
        document.querySelector('#draws').textContent=blackjackGame['draws'];
        message='YOU DREW';
        messageColor='Black';
    }
    document.querySelector('#play-heading').textContent=message;
    document.querySelector('#play-heading').style.color=messageColor;
}
}