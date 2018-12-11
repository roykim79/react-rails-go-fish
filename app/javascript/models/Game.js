export default class Game {
  constructor(data) {
    this._id = data.id;
    this._deckCount = data.deckCount;
    this._player = data.player;
    this._currentPlayer = data.currentPlayer;
    this._opponents = data.opponents;
  }

  id() {
    return this._id;
  }

  deckCount() {
    return this._deckCount;
  }

  player() {
    return this._player;
  }

  currentPlayer() {
    return this._currentPlayer;
  }

  opponents() {
    return this._opponents;
  }
}
