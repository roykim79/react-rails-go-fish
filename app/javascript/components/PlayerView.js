import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CardView from './CardView';

export default class PlayerView extends PureComponent {
  static propTypes = {
    player: PropTypes.object.isRequired,
    handleCardClick: PropTypes.func.isRequired,
    selectedCard: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  handleCardClick(rank) {
    this.props.handleCardClick(rank);
  }

  isCardSelected(card) {
    const { selectedCard } = this.props;

    if (selectedCard) {
      return card.key() == selectedCard.key();
    } else {
      return false;
    }
  }

  renderHand = (cards) => (
    cards.sort((a, b) => {
      return b.rank() < a.rank();
    }).map(card => (
      <CardView
        card={card}
        key={card.key()}
        handleCardClick={this.handleCardClick.bind(this)}
        isSelected={this.isCardSelected(card)}
      />
    ))
  );

  renderSets = (sets) => (
    sets.map((set, i) => (
      <span className="set" key={`set${i}`}>{set}</span>
    ))
  );

  render() {
    const { player } = this.props;

    return (
      <div className='player human'>
        <div className="">{player.name()}</div>
        <div className="sets">
          Sets: {player.setCount()}
        </div>
        <div className="hand">
          {this.renderHand(player.hand())}
        </div>
      </div>
    );
  }
}
