//Function for Random Number Generator
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

let playerChips = 5000
let dealerChips = 5000
const list = [];
const dlist = [];
//Function for click on Hit button 
function hitButton() {
    const node = document.createElement("li");
    node.className += "card-container";
    node.id = "card-" + (list.length + 1);
    const textnode = document.createTextNode(randomNumber(1,11));
    const para = document.createElement("h3");
    para.appendChild(textnode);
    node.appendChild(para);
    document.querySelector(".hand").appendChild(node);
    //Appends lists with random numbers
    dlist.push(randomNumber(1,11));
    //const ele = parseInt(textnode)
    const ele = parseInt(node.textContent)
    list.push(ele);
    //Show stay button
    document.getElementById("stayButton").className = "button1";
    //Produces sum of list in green circle
    imgGen()
    counter()
    //Creates image node with class and src attribute
}

//Create variable to hold bet total and functions for bet size
let betTotal = 0

function lowBetButton() {
    document.getElementById("potContainer").className = "showResult";
    if (playerChips >= 100 && dealerChips >= 100) {
        betTotal = betTotal + 200;
        playerChips = playerChips - 100;
        dealerChips = dealerChips - 100;}
    document.getElementById("pot").innerHTML = "Pot: $" + betTotal;
    document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;
}

function mediumBetButton() {
    document.getElementById("potContainer").className = "showResult";
    if (playerChips >= 500 && dealerChips >= 500) {
    betTotal = betTotal + 1000;
    playerChips = playerChips - 500;
    dealerChips = dealerChips - 500;}
    document.getElementById("pot").innerHTML = "Pot: $" + betTotal;
    document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;
}

function highBetButton() {
    document.getElementById("potContainer").className = "showResult";
    if (playerChips >= 1000 && dealerChips >= 1000) {
    betTotal = betTotal + 2000;
    playerChips = playerChips - 1000;
    dealerChips = dealerChips - 1000;}
    document.getElementById("pot").innerHTML = "Pot: $" + betTotal;
    document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;
}

//Function for checking Ace Values
function checkAceValues() {
    const sum = list.reduce((partialSum, a) => partialSum + a, 0);
    const dsum = dlist.reduce((partialSum, a) => partialSum + a, 0);
    document.querySelector(".total").textContent = sum;
    for (let i = 0; i < list.length; i++) {
        //If sum is greater than 21 i = 1
        if (list[i] === 11 && sum > 10) {
            list[i] = 1;
        }
        //If sum is less than 21 i = 11
        else if (list[i] === 1 || list[i] === 11) {
            list[i] = 11;
        }
    }
    for (let i = 0; i < list.length; i++) {
        //If sum is greater than 21 i = 1
        if (dlist[i] === 11 && dsum > 10) {
            dlist[i] = 1;
        }
        //If sum is less than 21 i = 11
        else if (dlist[i] === 1 && dsum <= 10) {
            dlist[i] = 11;
        }
    }
    
}
//Function for counter on the right of screen
function counter() {
    //Check for 1 or 11 against total
    checkAceValues()
    const sum = list.reduce((partialSum, a) => partialSum + a, 0);
    const dsum = dlist.reduce((partialSum, a) => partialSum + a, 0);
    document.querySelector(".total").textContent = sum;
    document.getElementById("Player").innerHTML = "You: " + sum;
    document.getElementById("Dealer").innerHTML = "Dealer: " + dsum;
    
    if (sum > 21 ) {
        hide()
        zeroOut()
        document.getElementById("results").innerHTML = "You Busted!";
        dealerChips = dealerChips + betTotal;
        document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;
    }
    checkAceValues();

}
            
//Function checking result conditions for click on Stay button
function checkResult() { 
    checkAceValues()
    const sum = list.reduce((partialSum, a) => partialSum + a, 0);
    const dsum = dlist.reduce((partialSum, a) => partialSum + a, 0);
    
    
    if (sum > dsum) {
        zeroOut()
        hide()
        document.getElementById("results").innerHTML = "You Win!"
        playerChips = playerChips + betTotal;
        document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;}
    else if (dsum > sum && dsum < 21) {
        hide()
        zeroOut()
        document.getElementById("results").innerHTML = "You Lose!";
        dealerChips = dealerChips + betTotal;
        document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;
} 
    else if (sum == dsum) {
        hide()
        document.getElementById("results").innerHTML = "It's A Tie";
        document.getElementById("resetButton").className = "hide";
        document.getElementById("playAgain").className = "button1";
        let splitTotal = betTotal / 2
        playerChips = playerChips + splitTotal;
        dealerChips = dealerChips + splitTotal;
        counter();}

}

//Function for click on Fold Button
function removeAll() {
    hide()
    document.querySelectorAll(".card-container").forEach(function(node) {
        node.remove();
    })
    document.querySelector(".total").textContent = 0;
    betTotal = 0;
    document.getElementById("pot").innerHTML = "Pot: $" + betTotal;

    list.splice(-Infinity);
    dlist.splice(-Infinity);
}

//Functions for fold and play again button
function hide() {
    document.getElementById("hitButton").className = "hide";
    document.getElementById("foldButton").className = "hide";
    document.getElementById("stayButton").className = "hide";
    document.getElementById("lBetButton").className = "hide";
    document.getElementById("mBetButton").className = "hide";
    document.getElementById("hBetButton").className = "hide";
    document.getElementById("results").className = "showResult";
    document.getElementById("scores").className = "showResult";
}

function newRound() {
    removeAll()
    document.getElementById("hitButton").className = "button1";
    document.getElementById("foldButton").className = "button1";
    document.getElementById("stayButton").className = "button1";
    document.getElementById("lBetButton").className = "button1";
    document.getElementById("mBetButton").className = "button1";
    document.getElementById("hBetButton").className = "button1";
    document.getElementById("playAgain").className = "hide";
    document.getElementById("results").className = "hideResult";
    document.getElementById("scores").className = "hideResult";
    document.getElementById("potContainer").className = "hideResult";
    document.getElementById("resetButton").className = "hide";
    document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;
}

function zeroOut() {
    if (playerChips == 0 || dealerChips == 0) {
    document.getElementById("playAgain").className = "hide";
    document.getElementById("resetButton").className = "button1";}
    
    else {
        document.getElementById("resetButton").className = "hide";
        document.getElementById("playAgain").className = "button1";}
}
function reset() {
    removeAll()
    document.getElementById("hitButton").className = "button1";
    document.getElementById("foldButton").className = "button1";
    document.getElementById("stayButton").className = "button1";
    document.getElementById("playAgain").className = "hide";
    document.getElementById("lBetButton").className = "button1";
    document.getElementById("mBetButton").className = "button1";
    document.getElementById("hBetButton").className = "button1";
    document.getElementById("results").className = "hideResult";
    document.getElementById("scores").className = "hideResult";
    document.getElementById("potContainer").className = "hideResult";
    document.getElementById("resetButton").className = "hide";
    playerChips = 5000
    dealerChips = 5000
    document.getElementById("winnings").innerHTML = "Player: $" + playerChips + " | " + "Dealer: $" + dealerChips;
}

function imgGen() {
    //Create element img with class card-image 
    const img = document.createElement("img");
    //Create attribute according to textContent of card element
    const number = parseInt(document.querySelector("#card-" + list.length).textContent);

    const highCards = ["card-10-","card-j-","card-q-","card-k-"];
    const classFromList = highCards[randomNumber(0,3)];

    const S = "s"
    const H = "h"
    const D = "d"
    const C = "c"

    const suits = [S,H,D,C];
    const suit = suits[randomNumber(0,4)];

    if (suit == S) {
        if (number == 1 || number == 11) {
            img.classList = "card-a-s"
        }
        else if (number == 2) {
        img.classList = "card-2-s"
        }
        else if (number == 3) {
            img.classList = "card-3-s"
        }
        else if (number == 4) {
            img.classList = "card-4-s"
        }
        else if (number == 5) {
            img.classList = "card-5-s"
        }
        else if (number == 6) {
            img.classList = "card-6-s"
        }
        else if (number == 7) {
            img.classList = "card-7-s"
        }
        else if (number == 8) {
            img.classList = "card-8-s"
        }
        else if (number == 9) {
            img.classList = "card-9-s"
        }
        else if (number == 10) {
            img.classList = classFromList + suit
        }
    }

    else if (suit == H) {
        if (number == 1 || number == 11) {
            img.classList = "card-a-h"
        }
        else if (number == 2) {
        img.classList = "card-2-h"
        }
        else if (number == 3) {
            img.classList = "card-3-h"
        }
        else if (number == 4) {
            img.classList = "card-4-h"
        }
        else if (number == 5) {
            img.classList = "card-5-h"
        }
        else if (number == 6) {
            img.classList = "card-6-h"
        }
        else if (number == 7) {
            img.classList = "card-7-h"
        }
        else if (number == 8) {
            img.classList = "card-8-h"
        }
        else if (number == 9) {
            img.classList = "card-9-h"
        }
        else if (number == 10) {
            img.classList = classFromList + suit
        }
    }

    else if (suit == D) {
        if (number == 1 || number == 11) {
            img.classList = "card-a-d"
        }
        else if (number == 2) {
        img.classList = "card-2-d"
        }
        else if (number == 3) {
            img.classList = "card-3-d"
        }
        else if (number == 4) {
            img.classList = "card-4-d"
        }
        else if (number == 5) {
            img.classList = "card-5-d"
        }
        else if (number == 6) {
            img.classList = "card-6-d"
        }
        else if (number == 7) {
            img.classList = "card-7-d"
        }
        else if (number == 8) {
            img.classList = "card-8-d"
        }
        else if (number == 9) {
            img.classList = "card-9-d"
        }
        else if (number == 10) {
            img.classList = classFromList + suit
        }
    }

    else if (suit == C) {
        if (number == 1 || number == 11) {
            img.classList = "card-a-c"
        }
        else if (number == 2) {
        img.classList = "card-2-c"
        }
        else if (number == 3) {
            img.classList = "card-3-c"
        }
        else if (number == 4) {
            img.classList = "card-4-c"
        }
        else if (number == 5) {
            img.classList = "card-5-c"
        }
        else if (number == 6) {
            img.classList = "card-6-c"
        }
        else if (number == 7) {
            img.classList = "card-7-c"
        }
        else if (number == 8) {
            img.classList = "card-8-c"
        }
        else if (number == 9) {
            img.classList = "card-9-c"
        }
        else if (number == 10) {
            img.classList = classFromList + suit
        }
    }

    //Appends the img element to card-container element
    document.querySelector("#card-" + (list.length)).appendChild(img);
    counter();
}