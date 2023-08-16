const POKEMONS = 1010 // This actually the amount of pokemons in the universe.
var cards = [];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function pokemon(number) {
    number = number.toString().padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;
}

function genCards(pairs) {
    var Cards = [];
    var used = [];
    for (let i = 0; i < pairs; i++) {
        var number = randomInt(POKEMONS) + 1;
        while (used.includes(number)) {
            number = randomInt(POKEMONS) + 1;
        }
        used.push(number);
        Cards.push(pokemon(number));
        Cards.push(pokemon(number));
    }
    console.log(Cards);
    return Cards;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#answer-12646864
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

cards = shuffle(genCards(4));
console.log(cards);

cardHTML = "";
for (let i = 0; i < cards.length; i++) {
    cardHTML += `<button id="card" class="notFlipped">
    <img src="${cards[i]}">
</button>`
}

document.getElementById("cards").innerHTML = cardHTML;

var buttons = document.querySelectorAll('[id=card]');;
console.log(buttons);
var clicks = [];
function getSrc(index) {
    return buttons[clicks[index]].getElementsByTagName("img")[0].src
}
for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        clicks.push(i);
        console.log(clicks.length);
        if (clicks.length < 2){
	        buttons[i].className = "flipped";
        } else if (clicks.length == 2) {
            buttons[i].className = "flipped";
            console.log(clicks);
            setTimeout(function() {
                if (getSrc(0) == getSrc(1)) {
                    buttons[clicks[0]].className = "flipped";
                    buttons[clicks[1]].className = "flipped";
                } else {
                    buttons[clicks[0]].className = "notFlipped";
                    buttons[clicks[1]].className = "notFlipped";
                }
                clicks = [];
            }, 1000);
        }
    });
}

