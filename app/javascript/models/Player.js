export default class Player {
  constructor(data) {
    this._name = data.name;
    this._userId = data.user_id;
    this._hand = data.hand;
    this._sets = data.sets;
    this._autoplay = data.autoplay;
  }

  name() {
    return this._name;
  }

  userId() {
    return this._userId;
  }

  hand() {
    return this._hand;
  }

  sets() {
    return this._sets;
  }

  autoplay() {
    return this._autoplay;
  }
}
