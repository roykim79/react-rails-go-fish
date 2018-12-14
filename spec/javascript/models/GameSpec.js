import Game from 'models/Game'

describe('Game', () => {
  const id = 1,
        deckCount = 38,
        player = {},
        currentPlayer = 'Roy',
        opponents = [],
        winner = 'Roy',
        game = new Game({id, deckCount, player, currentPlayer, opponents, winner});

  describe('id', () => {
    it('returns the game id', () => {
      expect(game.id()).toEqual(id);
    })
  })

  describe('deckCount', () => {
    it('returns the number of cards left in the deck', () => {
      expect(game.deckCount()).toEqual(deckCount);
    })
  })

  describe('player', () => {
    it('returns the player object', () => {
      expect(game.player()).toEqual(player);
    })
  })

  describe('currentPlayer', () => {
    it('returns the name of the current player', () => {
      expect(game.currentPlayer()).toEqual(currentPlayer);
    })
  })

  describe('opponents', () => {
    it('returns an array of opponent objects', () => {
      expect(game.opponents()).toEqual(opponents);
    })
  })

  describe('winner', () => {
    it('returns the winning players name', () => {
      expect(game.winner()).toEqual(winner)
    })
  })
})
