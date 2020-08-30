let blackjackGame={
    'you': {'scoreSpan': ' #your-result ', 'div':'#your-box', 'score':0 },
    'dealer': {'scoreSpan': ' #dealer-result ', 'div':'#dealer-box', 'score':0 },
    'cards': [ '2', '3', '4','5','6','7','8','9','10','J','K','Q','A' ],
    'cardMAP':{'2':2 ,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':1},
}
const You=blackjackGame['you']
const Dealer=blackjackGame['dealer']
const hitsound= new Audio("sounds/swish.m4a");
function blackjackHit(){
    let card=randomCards();
    console.log(card);
    showCard(card,You);
    updateScore(card,You);
    showScore(You);
    console.log(You['score']);
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