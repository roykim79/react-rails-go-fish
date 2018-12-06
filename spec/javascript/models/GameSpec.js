import Game from 'models/Game'

describe('Game', () => {
  let game;

  it('has an id', () => {
    const gameId = 1;
    game = new Game({id: gameId, players: []});
    expect(game.id).toEqual(gameId)
  })

  it('has players', () => {

  })
})
