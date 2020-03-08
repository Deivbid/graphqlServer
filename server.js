const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const { createGame, getGame, getMonster, getPlayer, getCards, nextTurn } = require('./functions')

// Initialize a GraphQL schema
const schema = buildSchema(`
  type Query {
    getGame(gameId: String!): Game
    getPlayer(gameId: String!): Player
    getMonster(gameId: String!): Monster
    getCards(playerId: String!): [Card]
  },
  type Mutation {
    createGame(name: String!): String
    nextTurn(gameId: String!, cardId: String): NextTurn
  }

  type Game {
    id: ID
    currentTurn: Int!
    maxTurns: Int!
    turnsLeft: Int!
    player: Player!
    monster: Monster!
}

type Player {
    id: ID!
    name: String!
    hp: Int!
    maxHp: Int!
    shield: Int!
    cards: [Card!]!
}

type Monster {
    id: ID!
    name: String!
    hp: Int!
    maxHp: Int!
    shield: Int!
}

type MonsterEffect {
    effect: String!
    value: Int!
}

type Card {
    id: ID!
    value: Int!
    effect: String!
}

type NextTurn {
    game: Game!
    monsterEffect: MonsterEffect!
}

`);

const root = { 
    createGame: createGame,   
    getGame: getGame,
    getPlayer: getPlayer,
    getMonster: getMonster,
    getCards: getCards,
    nextTurn: nextTurn,
};

// Create an express server and a GraphQL endpoint
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,  // Must be provided
  rootValue: root,
  graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));