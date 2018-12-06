import PlayingCard from 'models/PlayingCard'

describe('PlayingCard', () => {
  const rank = 'A',
        suit = 'S',
        playingCard = new PlayingCard({rank, suit});

  it('has a rank', () => {
    expect(playingCard.rank()).toEqual(rank);
  })

  it('has a suit', () => {
    expect(playingCard.suit()).toEqual(suit);
  })

  describe('key', () => {
    it('returns a string combining the rank and suit', () => {
      expect(playingCard.key()).toEqual(`${rank}${suit}`);
    })
  })
})
