export default class Opponent {
  constructor(data) {
    this._name = data.name;
    this._cardCount = data.card_count;
    this._setCount = data.set_count;
  }

  name() {
    return this._name;
  }

  cardCount() {
    return this._cardCount;
  }

  setCount() {
    return this._setCount;
  }
}
