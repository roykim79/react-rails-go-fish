import Player from './Player'
import Opponent from './Opponent'

export default class Game {
  constructor(data) {
    this._id = data.id;
    this._deckCount = data.deckCount;
    this._player = data.player;
    this._currentPlayer = data.currentPlayer;
    this._opponents = data.opponents;
    this._winner = data.winner;
  }

  id() {
    return this._id;
  }

  deckCount() {
    return this._deckCount;
  }

  player() {
    return new Player(this._player);
  }

  currentPlayer() {
    return this._currentPlayer;
  }

  opponents() {
    return this._opponents.map(opponent => {
      return new Opponent(opponent);
    });
  }

  winner() {
    return this._winner;
  }
}
