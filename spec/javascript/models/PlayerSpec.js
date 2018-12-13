import Player from 'models/Player'

describe('Player', () => {
  const name = 'Roy',
        user_id = 1,
        hand = [],
        sets = ['A', 'K'],
        autoplay = false,
        player = new Player({name, user_id, hand, sets, autoplay});

  describe('name', () => {
    it('returns the name of the player', () => {
      expect(player.name()).toEqual(name);
    })
  })

  describe('userId', () => {
    it('returns the player\'s user id', () => {
      expect(player.userId()).toEqual(user_id);
    })
  })

  describe('hand', () => {
    it('returns the player\'s hand', () => {
      expect(player.hand()).toEqual(hand);
    })
  })

  describe('setCount', () => {
    it('returns the player\'s set count', () => {
      expect(player.setCount()).toEqual(sets.length);
    })
  })

  describe('autoPlay', () => {
    it('retuns the player\'s autoplay status', () => {
      expect(player.autoplay()).toEqual(false);
    })
  })
})
