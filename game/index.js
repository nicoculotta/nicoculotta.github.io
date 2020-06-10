const allEmojis = [ "🤖","🤡","🎩","🐵","🐶","🐣","🍓","🏀","⚽","🚗","⚒️","💊","💸","❤️","🏴‍☠️","🇦🇷","😎","😍","🤮","💪" ]


const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const createCardBoard = () => {
    for( let i = 0; i <  allEmojis.length; i++){
        let number = randomNumber(0, 20)

        if (number === number) {
            let cardEmoji = document.createElement('span')
            cardEmoji.innerHTML = allEmojis[number]
            document.body.append(cardEmoji);
        }

    }
}

createCardBoard()

