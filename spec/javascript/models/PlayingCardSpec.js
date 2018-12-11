import PlayingCard from 'models/PlayingCard'

describe('PlayingCard', () => {
  const rank = 'A',
        suit = 'S',
        playingCard = new PlayingCard({rank, suit});

  describe('rank', () => {
    it('returns the rank of the playing card', () => {
      expect(playingCard.rank()).toEqual(rank);
    })
  })

  describe('suit', () => {
    it('returns the suit of the playing card', () => {
      expect(playingCard.suit()).toEqual(suit);
    })
  })

  describe('key', () => {
    it('returns a unique string combining the rank and suit', () => {
      expect(playingCard.key()).toEqual(`${rank}${suit}`);
    })
  })
})
