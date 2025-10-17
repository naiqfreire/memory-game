const emojis = [
    "🦖",
    "🦖",
    "🐝",
    "🐝",
    "🦇",
    "🦇",
    "🦊",
    "🦊",
    "🦁",
    "🦁",
    "🦈",
    "🦈",
    "🐢",
    "🐢",
    "🐒",
    "🐒",
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

const sounds = {
    flip: new Audio('./src/sounds/flipcard.mp3'),
    correct: new Audio('./src/sounds/correct-card.mp3'),
    win: new Audio('./src/sounds/complete.mp3'),
}

for(let i = 0; i < emojis.length; i++){
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if (this.classList.contains("boxMatch")) {
        return;
    }

    if(this.classList.contains("boxOpen")) {
        return;
    }
    
    if(openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2) {
        setTimeout(checkMatch, 700);
    }
}

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        sounds.correct.play();
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }else {
        sounds.flip.play();
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        sounds.win.play();
        alert("Parabéns! Você encontrou todas as cartas!");
    }
}