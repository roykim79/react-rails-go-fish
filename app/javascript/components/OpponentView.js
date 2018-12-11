import React, { PureComponent } from 'react';
import Opponent from 'models/Opponent'
import PropTypes from 'prop-types';

export default class OpponentView extends PureComponent {
  static propTypes = {
    opponent: PropTypes.object.isRequired,
    handleOpponentClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.opponent = new Opponent(this.props.opponent);
  }

  handleOpponentClick(name) {
    this.props.handleOpponentClick(name);
  }

  render() {
    const { opponent, props } = this;

    return (
      <div className={props.isSelected ? 'opponent selected' : 'opponent'}
        onClick={() => this.handleOpponentClick(opponent.name())}
      >
        <div>{opponent.name()}</div>
        <div>Cards:{opponent.cardCount()}</div>
        <div>Sets:{opponent.setCount()}</div>
      </div>
    );
  }
}
