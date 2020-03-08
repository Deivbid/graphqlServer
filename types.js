//Probando

type Game {
    id: ID
    currentTurn: Int
    maxTurns: Int
    turnsLeft: Int
    player: Player
    monster: Monster
}

type Player {
    id: ID
    name: String
    hp: Int
    maxHp: Int
    shield: Int
    cards: []Card
}

type Monster {
    id: ID
    name: String
    hp: Int
    maxHp: Int
    shield: Int
    image: 'Imagen Aqui'
}

type MonsterEffect {
    effect: String
    value: Int
}

type Card {
    id: ID
    value: Int
    effect: String
}

type NextTurn {
    game: Game
    monsterEffect: MonsterEffect
}