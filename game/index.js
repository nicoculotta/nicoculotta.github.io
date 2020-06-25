//SET CONFIG HOW MANY ITEMS IN THE ARRAY
let config = {
    totalCards : 4,
    revealTime : 1000
}
const emojis = [ "🤖","🤡","🎩","🐵","🐶","🐣","🍓","🏀","⚽","🚗","⚒️","💊","💸","❤️","🏴‍☠️","🇦🇷","😎","😍","🤮","💪" ]

//splice array of cards
const spliceCards = (num, array) => {
    let arraySpliced = array.slice(0, num);
    return arraySpliced
}

let revealTime = config.revealTime
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

function positionInCircle(){
    // position cards in a circle
    let cardsInBoard = document.querySelectorAll('.card__container')
    let type = 1 //circle type - 1 whole, 0.5 half, 0.25 quarter
    let radius = '16em' //distance from center
    let start = -90 //shift start from 0
    let numberOfCards = (type === 1) ?  cardsInBoard.length : cardsInBoard.length - 1 //adj for even distro of cards when not full circle
    let slice = 360 * type / numberOfCards;

    cardsInBoard.forEach((elem, index) => {
        let rotate = slice * index + start;
        let rotateReverse = rotate * -1;
        elem.style.transform = `rotate(${rotate}deg) translate(${radius}) rotate(${rotateReverse}deg)`;
    });
}


function showAndHideInBoard(time) {
    let timer;
    let cardsInBoard = document.querySelectorAll('.card__container')
    cardsInBoard.forEach( elem => {
        elem.classList.add('show')
    })
    timer = setTimeout(() => {
        cardsInBoard.forEach( elem => {
            elem.classList.remove('show')
        })
    }, time)
}


dealCards()
positionInCircle()
showAndHideInBoard(revealTime)
// show cards END


const allCardsDOM = document.querySelectorAll('.card__container')
// Event to reveal Card


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
    cards[0].classList.add('arrow')
    cards.forEach( elem => {
        elem.classList.add('match')
    })
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


