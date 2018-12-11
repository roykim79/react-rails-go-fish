import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PlayingCard from 'models/PlayingCard'

export default class CardView extends PureComponent {
  static propTypes = {
    card: PropTypes.object.isRequired,
    handleCardClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.card = new PlayingCard(this.props.card)
  }

  handleCardClick(cardKey) {
    this.props.handleCardClick(cardKey);
  }

  render() {
    const { card, props } = this;

    return (
      <div className={props.isSelected ? 'visible-card selected' : 'visible-card'}
        onClick={() => this.handleCardClick(card)}
        key={card.rank() + card.suit()}
        id={card.rank() + card.suit()}
      >
        {card.rank()}
      </div>
    );
  }
}
