//SET CONFIG HOW MANY ITEMS IN THE ARRAY
let config = {
    totalCards : 8
}
const emojis = [ "🤖","🤡","🎩","🐵","🐶","🐣","🍓","🏀","⚽","🚗","⚒️","💊","💸","❤️","🏴‍☠️","🇦🇷","😎","😍","🤮","💪" ]

//splice array of cards
const spliceCards = (num, array) => {
    let arraySpliced = array.slice(0, num);
    return arraySpliced
}

let totalCardsInBoard = config.totalCards
let arrayOfEmojis = spliceCards(totalCardsInBoard, emojis)

const allEmojis = arrayOfEmojis.concat(arrayOfEmojis)

const cardBoardDOM = document.querySelector('.cardboard')


// Random cards function
const randomCards = () => {
    let totalCards;
    totalCards = allEmojis.sort(function(){
        return 0.5 - Math.random();
    })
    return totalCards;
}

// Function show cards in the cardboard
const dealCards = () => {
    let randomCardsResult = randomCards()

    randomCardsResult.forEach( elem => {
        let cardDOM = document.createElement('div')
        cardDOM.classList.add('card__container')
        cardDOM.innerHTML = `
            <div class="card__emoji" data-value="${elem}">${elem}</div>
        `
        cardBoardDOM.appendChild(cardDOM)
    })
}

dealCards()
// show cards END


// Event to reveal Card
const allCardsDOM = document.querySelectorAll('.card__container')

function revealCard() {
    let reveledCards;
    let totalRevealedCards = document.querySelectorAll('.show:not(.match)')

    if (totalRevealedCards.length > 1) {
        return;
    }

    this.classList.add('show')

    reveledCards = document.querySelectorAll('.show:not(.match)')

    if (reveledCards.length < 2) {
        return;
    }
    compareSelectedCards(reveledCards)
}

function compareSelectedCards(listOfCardsToCompare) {
    if (listOfCardsToCompare[0].children[0].dataset.value === listOfCardsToCompare[1].children[0].dataset.value) {
        successMatch(listOfCardsToCompare)

    } else {
        errorMatch(listOfCardsToCompare)
    }
}

function successMatch(cards) {
    cards[1].classList.add('arrow')
}

function errorMatch(cards){
    cards.forEach( elem => {
        elem.classList.remove('show')
    })
}




allCardsDOM.forEach( elem => {
    elem.addEventListener('click', revealCard )
})

// reveal card END


