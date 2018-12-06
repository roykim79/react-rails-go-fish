export default class PlayingCard {
  constructor(data) {
    this._rank = data.rank;
    this._suit = data.suit;
  }

  rank() {
    return this._rank;
  }

  suit() {
    return this._suit;
  }

  key() {
    return `${this.rank()}${this.suit()}`;
  }
}
