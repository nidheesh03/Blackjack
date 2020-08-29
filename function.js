let blackjackGame={
    'you': {'scoreSpan': ' #your-result ', 'div':'#your-box', 'score':0 },
    'dealer': {'scoreSpan': ' #dealer-result ', 'div':'#dealer-box', 'score':0 },
}
const You=blackjackGame['you']
const Dealer=blackjackGame['dealer']
const hitsound= new Audio("sounds/swish.m4a");
function blackjackHit(){
    showCard(You);
}

function showCard(activePlayer){
    let cardImage=document.createElement("img");
    cardImage.src="images/Q.png";
    cardImage.className="your-img";
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitsound.play();
}