/*global fetch window*/
/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';
import Game from 'models/Game'
import OpponentView from './OpponentView'
import PlayerView from './PlayerView'
import Pusher from 'pusher-js';


export default class GameView extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    deckCount: PropTypes.number.isRequired,
    player: PropTypes.object.isRequired,
    currentPlayer: PropTypes.string.isRequired,
    opponents: PropTypes.array.isRequired,
    winner: PropTypes.object
  };

  constructor(props) {
    super(props)

    const game = new Game({...this.props});

    this.state = {game};

    // Pusher.logToConsole = true;

    const pusher = new Pusher('656e007150142d5db2c4', {
      cluster: 'us2',
      forceTLS: true
    });

    const channel = pusher.subscribe('go-fish');

    channel.bind('pusher:subscription_succeeded', () => {});

    // channel.bind('game-starting', (data) => {
    //   if (window.location.pathname == `/games/${data.gameId}`) {
    //     window.location.reload();
    //   }
    // });

    channel.bind('round-played', (data) => {
      if (window.location.pathname == `/games/${data.gameId}`) {
        this.fetchGame(data.gameId);
      }
    });
  }

  fetchGame(gameId) {
    fetch(`/games/${gameId}`, this.fetchOptions('GET'))
    .then(res => {
      debugger;
      res.json()}).then(result => {
      console.log("Result", result)

      this.updateGameState(result);
    }, (error) => {
    });
  }

  handleOpponentClick(selectedOpponentName) {
    if (this.isCurrentPlayer()) {
      this.setState(() => ({selectedOpponentName}), () => {
        this.playTurnIfPossible();
      });
    }
  }

  handleCardClick(selectedCard) {
    if (this.isCurrentPlayer()) {
      this.setState(() => ({selectedCard}), () => {
        this.playTurnIfPossible();
      });
    }
  }

  isCurrentPlayer() {
    const { game } = this.state;

    return game.player().name() === game.currentPlayer();
  }

  playTurnIfPossible() {
    const { game, selectedOpponentName, selectedCard } = this.state;

    if (selectedOpponentName && selectedCard) {
      fetch(`/games/${game.id()}`, this.fetchOptions('PATCH', {selectedOpponentName, rank: selectedCard.rank()}))
      .then(res => {
        res.json()
      }).then(result => {
        this.updateGameState(result);
      }, () => {
      });
    }
  }

  // fetchOptions = (method, body) => ({
  //   method,
  //   body: JSON.stringify(body),
  //   headers:{'Content-Type': 'application/json', 'Accepts': 'application/json'}
  // });

  fetchOptions(method, body) {
    const options = {
      method,
      headers:{'Content-Type': 'application/json', 'Accepts': 'application/json'}
    }
    if (body) {
      return Object.assign({}, options, {body: JSON.stringify(body)});
    }

    return options;
  }

  updateGameState(result) {
    const game = new Game({...result});

    this.setState(() => ({game, selectedOpponentName: undefined, selectedCard: undefined}));
  }

  renderOpponents = (opponents) => (
    opponents.map((opponent, i) => (
      <OpponentView
        isSelected={opponent.name() === this.state.selectedOpponentName}
        key={`opponent${i}`}
        opponent={opponent}
        handleOpponentClick={this.handleOpponentClick.bind(this)}
      />
    ))
  );

  render() {
    const { game } = this.state;

    return (
      <div id='game-view'>
        <div>Current player: {game.currentPlayer()}</div>
        <div className="opponents">{this.renderOpponents(game.opponents())}</div>
        <div className="row">
          <div className="card-count">{game.deckCount()}</div>
        </div>
        <div className="row">
          <PlayerView
            player={game.player()}
            handleCardClick={this.handleCardClick.bind(this)}
            selectedCard={this.state.selectedCard}
          />
        </div>
      </div>
    );
  }
}
