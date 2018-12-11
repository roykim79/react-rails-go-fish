import React from 'react';
import Game from 'models/Game'
import OpponentView from './OpponentView'
import PlayerView from './PlayerView'
import PropTypes from 'prop-types';


export default class GameView extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    deckCount: PropTypes.number.isRequired,
    player: PropTypes.object.isRequired,
    currentPlayer: PropTypes.string.isRequired,
    opponents: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props)
    const game = new Game(this.props);
    this.state = {game}
  }

  handleOpponentClick(selectedOpponentName) {
    this.setState(() => {
      return {selectedOpponentName}
    }, () => {
      this.playTurnIfPossible();
    })
  }

  handleCardClick(selectedCard) {
    this.setState(() => {
      return {selectedCard}
    }, () => {
      this.playTurnIfPossible();
    })
  }

// #############################################################################
// #############################################################################
  playTurnIfPossible() {
    if () {
      fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
  }
// #############################################################################
// #############################################################################

  renderOpponents(opponents) {
    return opponents.map((opponent, i) => (
      <OpponentView
        isSelected={opponent.name === this.state.selectedOpponentName}
        key={`opponent${i}`}
        opponent={opponent}
        handleOpponentClick={this.handleOpponentClick.bind(this)}
      />
    ));
  }

  render() {
    const { game } = this.state;

    return(
      <div id='game-view'>
        <div className="opponents-list">
          {this.renderOpponents(game.opponents())}
        </div>
        <div className="card-set_count">
          {game.deckCount()}
        </div>
        <PlayerView
          player={game.player()}
          handleCardClick={this.handleCardClick.bind(this)}
          selectedCard={this.state.selectedCard}
        />
      </div>
    );
  }
}
