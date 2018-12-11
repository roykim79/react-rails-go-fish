import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Player from 'models/Player';
import CardView from './CardView';

export default class PlayerView extends PureComponent {
  static propTypes = {
    player: PropTypes.object.isRequired,
    handleCardClick: PropTypes.func.isRequired,
    selectedCard: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.player = new Player(this.props.player);
    this.handleCardClick = this.props.handleCardClick;
  }

  handleCardClick(rank) {
    this.props.handleCardClick(rank);
  }

  isCardSelected(card) {
    const { selectedCard } = this.props,
          { rank, suit } = card;

    if (selectedCard) {
      return (`${rank}${suit}` == selectedCard.key())
    } else {
      return false;
    }
  }

  renderHand(cards) {
    return cards.map((card, i) => (
      <CardView
        card={card}
        key={`card${i}`}
        handleCardClick={this.handleCardClick}
        isSelected={this.isCardSelected(card)}
       />
    ));
  }

  render() {
    const { player } = this;

    return (
      <div className='player human'>
        <div className="">{player.name()}</div>
        <div className="sets">Sets: {player.sets()}</div>
        <div className="hand">
          {this.renderHand(player.hand())}
        </div>
      </div>
    );
  }
}
