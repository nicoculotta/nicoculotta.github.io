const emojis = [ "🤖","🤡","🎩","🐵","🐶","🐣","🍓","🏀","⚽","🚗","⚒️","💊","💸","❤️","🏴‍☠️","🇦🇷","😎","😍","🤮","💪" ]
const allEmojis = emojis.concat(emojis)

const cardBoardDOM = document.querySelector('.cardboard')
//cardBoardDOM.innerHTML = ''


const dealCards = () => {
    allEmojis.forEach( elem => {
        let cardDOM = document.createElement('div')
        cardDOM.classList.add('card__container')
        cardDOM.innerHTML = `
            <div class="card__emoji">${elem}</div>
        `
        cardBoardDOM.appendChild(cardDOM)
    })

}

dealCards()

