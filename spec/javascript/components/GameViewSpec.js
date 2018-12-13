import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayingCard from 'models/PlayingCard'
import GameView from 'components/GameView'

Enzyme.configure({adapter: new Adapter()});

describe('CardView', () => {
  let wrapper;

  const playerData = {
          name: 'Roy',
          user_id: 1,
          hand: [{rank: 'A', suit: 'S'}, {rank: 'K', suit: 'S'}],
          sets: [],
          autoplay: false
        },
        currentPlayerData = {
          id: 1,
          deckCount: 38,
          player: playerData,
          currentPlayer: 'Roy',
          opponents: [{name: 'John', card_count: 6, set_count: 1}]
        },
        mountView = (data) => mount(<GameView {...data}/>);

  describe('when the player is the current player', () => {
    beforeEach(() => {wrapper = mountView(currentPlayerData)})

    describe('handleOpponentClick', () => {
      it('updates the selectedOpponentName value in state', () => {
        expect(wrapper.find('.opponent').first().hasClass('selected')).toEqual(false);
        expect(wrapper.state().selectedOpponentName).toEqual(undefined);
        wrapper.find('.opponent').first().simulate('click');
        expect(wrapper.find('.opponent').first().hasClass('selected')).toEqual(true);
        expect(wrapper.state().selectedOpponentName).toEqual('John');
      })
    })

    describe('handleCardClick', () => {
      it('updates the value of selectedRank value in state', () => {
        expect(wrapper.find('.visible-card').first().hasClass('selected')).toEqual(false);
        expect(wrapper.state().selectedCard).toEqual(undefined);
        wrapper.find('.visible-card').first().simulate('click');
        expect(wrapper.find('.visible-card').first().hasClass('selected')).toEqual(true);
        expect(wrapper.state().selectedCard).toEqual(new PlayingCard({rank: 'A', suit: 'S'}));
      })
    })
  })

  describe('when the player is not the current player', () => {
    const notCurrentPlayerData = Object.assign({}, currentPlayerData, {currentPlayer: 'John'});

    beforeEach(() => {wrapper = mountView(notCurrentPlayerData)});

    describe('handleOpponentClick', () => {
      it('does nothing if the player is not the current player', () => {
        expect(wrapper.find('.opponent').first().hasClass('selected')).toEqual(false);
        expect(wrapper.state().selectedOpponentName).toEqual(undefined);
        wrapper.find('.opponent').first().simulate('click');
        expect(wrapper.find('.opponent').first().hasClass('selected')).toEqual(false);
        expect(wrapper.state().selectedOpponentName).toEqual(undefined);
      })
    })

    describe('handleCardClick', () => {
      it('does nothing if the player is not the current player', () => {
        expect(wrapper.find('.visible-card').first().hasClass('selected')).toEqual(false);
        expect(wrapper.state().selectedOpponentName).toEqual(undefined);
        wrapper.find('.visible-card').first().simulate('click');
        expect(wrapper.find('.visible-card').first().hasClass('selected')).toEqual(false);
        expect(wrapper.state().selectedOpponentName).toEqual(undefined);
      })
    })
  })
})
