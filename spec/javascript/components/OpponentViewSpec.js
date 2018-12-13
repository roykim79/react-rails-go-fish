import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Opponent from 'models/Opponent'
import OpponentView from 'components/OpponentView'

Enzyme.configure({ adapter: new Adapter() });

describe('OpponentView', () => {
  let opponent, shallowView, wrapper, handleOpponentClick;

  beforeEach(() => {
    opponent = new Opponent({name: 'John', card_count: '6', set_count: 0})
    handleOpponentClick = jest.fn();
    shallowView = () => shallow(
      <OpponentView
        opponent={opponent}
        handleOpponentClick={handleOpponentClick}
        isSelected={false}
      />
    );
  })

  it('call handleCardClick with the rank of the card', () => {
    wrapper = shallowView()
    wrapper.find('.opponent').simulate('click')
    // expect class to include selected
    expect(handleOpponentClick).toBeCalledWith(opponent.name())
  })
})
