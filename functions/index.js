//Dummy Data
const Games = [];

const getRandom = (values) => {
    return values[Math.floor(Math.random() * values.length)]
}

const points = [1, 2, 3, 4, 5]
const playerEffects = ['Shield', 'Heal', 'Damage']
const monsterEffects = [ ...playerEffects, 'Horror' ]

const createGame = (args) => {
    const gameId = Math.random().toString()
    const game = {
        id: gameId,
        currentTurn: 0,
        maxTurns: 12,
        turnsLeft: 12,
        player: {
            id: Math.random().toString(),
            name: args.name,
            hp: 20,
            maxHp: 30,
            shield: 0,
            cards: [{ id: Math.random().toString(), value: getRandom(points), effect: getRandom(playerEffects)},
                { id: Math.random().toString(), value: getRandom(points), effect: getRandom(playerEffects)},
                { id: Math.random().toString(), value: getRandom(points), effect: getRandom(playerEffects)}]
        },
        monster: {
            id: Math.random().toString(),
            name: 'Chavez',
            hp: 40,
            maxHp: 50,
            shield: 0
        }
    }

    Games.push(game)
    return gameId
    
  }
  
const getGame = (args) => { // Return a list of users. Takes an optional gender parameter
    const gameId = args.gameId
    const game = Games.find((item) => item.id === gameId)

    if(game){
        return game
    }else{
        throw new Error('No existe!')
    }
  }

const getPlayer = (args) => {  // Update a user and return new user details
    const gameId = args.gameId
    const game = Games.find((item) => item.id === gameId)
    
    if(game){
        return game.player
    }else{
        throw new Error('No existe este jugador!')
    }
}

const getMonster = (args) => {  // Update a user and return new user details
    const gameId = args.gameId
    const game = Games.find((item) => item.id === gameId)
    
    if(game){
        return game.monster
    }else{
        throw new Error('No existe este jugador!')
    }
}

const getCards = (args) => {
    const playerId = args.playerId
    const game = Games.find((item) => item.player.id === playerId)
    const { player } = game
    console.log('PlayerId: ', playerId)
    console.log('Player: ', player)
    if(player){
        return player.cards
    } else {
        throw new Error('No existe este jugador!')
    }
}

const getCardStats = (game, cardId) => {
    if(game && cardId){
        console.log('A ver: ', game.player.cards, cardId)
        const cardEffectsIndex = game.player.cards.findIndex((item) => item.id === cardId)
        const cardEffects = game.player.cards.splice(cardEffectsIndex, 1)[0]
        console.log('Estos son los card effects: ', cardEffects)
        return cardEffects
    }

    return null
}

const applyEffect = (effect, value, game) => {
    switch(effect){
        case 'Heal': {
            const maxHp = game.player.maxHp
            const currentHp = game.player.hp

            if(currentHp + value <= maxHp){
                game.player.hp += value
            }else {
                game.player.hp = maxHp
            }
        }
        break

        case 'Damage': {
            const { shield } = game.monster
            if(shield === 0){
                game.monster.hp -= value
            } else {
                if(value > shield){
                    const diff = value - shield
                    game.monster.shield = 0
                    game.monster.hp -= diff
                } else {
                    game.monster.shield -= value
                }
            }
        }
        break

        case 'Shield': {
            game.player.shield += value
        }
        break

        default: {
            return
        }
    }
}

const nextTurn = (args) => {
    const game = getGame(args)
    const cardId = args.cardId || ''

    if(cardId){
        const { effect, value } = getCardStats(game, cardId)
        applyEffect(effect, value, game)
        console.log('Array Original: ', Games)
        console.log('Modificacion', game)
        console.log('Cards', game.player.cards)
    }

    return {
        game,
        monsterEffect: {
            value: getRandom(points), 
            effect: getRandom(monsterEffects)
        }
    }
}


module.exports = {
    createGame,
    getGame,
    getPlayer,
    getMonster,
    getCards,
    nextTurn
}