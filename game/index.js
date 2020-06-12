//SET CONFIG HOW MANY ITEMS IN THE ARRAY
let config = {
    totalCards : 20
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
console.log(allEmojis)


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
            <div class="card__emoji">${elem}</div>
        `
        cardBoardDOM.appendChild(cardDOM)
    })
}

dealCards()
// show cards END


// Event to reveal Card
const allCardsDOM = document.querySelectorAll('.card__container')

function revealCard() {
    this.classList.add('show')
}

allCardsDOM.forEach( elem => {
    elem.addEventListener('click', revealCard )
})

// reveal card END


