import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class OpponentView extends PureComponent {
  static propTypes = {
    opponent: PropTypes.object.isRequired,
    handleOpponentClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }

  handleOpponentClick(name) {
    this.props.handleOpponentClick(name);
  }

  render() {
    const { opponent, isSelected } = this.props;

    return (
      <div className={isSelected ? 'opponent selected' : 'opponent'}
        onClick={() => this.handleOpponentClick(opponent.name())}
      >
        <div>{opponent.name()}</div>
        <div>Cards:{opponent.cardCount()}</div>
        <div>Sets:{opponent.setCount()}</div>
      </div>
    );
  }
}
