import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CardView extends PureComponent {
  static propTypes = {
    card: PropTypes.object.isRequired,
    handleCardClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
  }

  handleCardClick(cardKey) {
    this.props.handleCardClick(cardKey);
  }

  render() {
    const { card, isSelected } = this.props;

    return (
      <div className={isSelected ? 'visible-card selected' : 'visible-card'}
        onClick={() => this.handleCardClick(card)}
        key={card.key()}
      >
        {card.rank()}
      </div>
    );
  }
}
