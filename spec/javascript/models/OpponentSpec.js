import Opponent from 'models/Opponent'

describe('Opponent', () => {
  const name = 'Roy',
        card_count = 5,
        set_count = 1,
        opponent = new Opponent({name, card_count, set_count});

  describe('name', () => {
    it('returns the name of the opponent', () => {
      expect(opponent.name()).toEqual('Roy');
    })
  })

  describe('cardCount', () => {
    it('returns the opponent\'s card count', () => {
      expect(opponent.cardCount()).toEqual(5);
    })
  })

  describe('setCount', () => {
    it('returns the opponent\'s set count', () => {
      expect(opponent.setCount()).toEqual(1);
    })
  })
})
