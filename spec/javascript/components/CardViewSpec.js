import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayingCard from 'models/PlayingCard'
import CardView from 'components/CardView'

Enzyme.configure({ adapter: new Adapter() });

describe('CardView', () => {
  const cardData = {rank: 'A', suit: 'S'},
        handleCardClick = jest.fn(),
        shallowView = () => shallow(
          <CardView
            card={cardData}
            handleCardClick={handleCardClick}
            isSelected={false}
          />
        );

  it('calls handleCardClick with the rank of the card', () => {
    const wrapper = shallowView();

    wrapper.find('.visible-card').simulate('click');
    expect(handleCardClick).toBeCalledWith(new PlayingCard({rank: 'A', suit: 'S'}));
  })
})
