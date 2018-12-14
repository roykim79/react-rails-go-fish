require 'rails_helper'


RSpec.describe GoFish do
  let(:player1) { Player.new('Jim', 1) }
  let(:player2) { Player.new('Bob', 2) }
  let(:game) { GoFish.new([player1, player2]) }

  describe '#initialization' do
    it 'has a deck' do
      expect(game.deck).not_to be_nil
    end
  end

  describe '#start' do
    it 'deals out cards to each player' do
      game.start
      game.players.each { |player| expect(player.hand.count).to eq 7 }
    end
  end

  describe '#current_player' do
    it 'returns the player whose turn the game is on' do
      expect(game.current_player).to be player1
    end
  end

  describe '#next_player' do
    it 'changes the current_player to the next index of players' do
      game.next_player
      expect(game.current_player).to be player2
      game.next_player
      expect(game.current_player).to be player1
    end
  end

  describe '#play_turn' do
    it 'will change the number of cards current player has' do
      game.start
      expect { game.play_turn(player2, 'A') }.to change(player1, :card_count)
    end
  end

  describe '#pick_target' do
    it 'returns a random player that is not the current player' do
      expect(game.current_player).to be player1
      expect(game.pick_target).to be player2
    end
  end

  describe '#play_for_bot' do
    it 'plays for the current player if they have autoplay set to true' do
      game.start
      player1.toggle_autoplay
      expect { game.play_for_bot }.to change(player1, :card_count)
    end

    it 'does nothing if the current player is not a robot' do
      game.start
      expect { game.play_for_bot }.not_to change(player1, :card_count)
    end
  end

  describe '#winner' do
    it 'is nill at first' do
      game.start
      expect(game.winner).to be_nil
    end

    it 'returns the player with no cards left' do
      player1.take(%w[A].flat_map { |rank| %w[S H].map { |suit| PlayingCard.new(rank, suit) } })
      player2.take(%w[A K].flat_map { |rank| %w[C D].map { |suit| PlayingCard.new(rank, suit) } })
      rigged_game = GoFish.new([player1, player2])
      rigged_game.play_turn(player2, 'A')
      expect(rigged_game.winner).to be player1
    end

    it 'returns the player with the most sets if the deck count is 0' do
      rigged_hand1 = %w[A Q].flat_map { |rank| %w[S H C].map { |suit| PlayingCard.new(rank, suit) } }
      rigged_hand2 = %w[K].flat_map { |rank| %w[S H C].map { |suit| PlayingCard.new(rank, suit) } }
      rigged_deck = CardDeck.new(%w[A].flat_map { |rank| %w[D].map { |suit| PlayingCard.new(rank, suit) } })
      player1.take(rigged_hand1)
      player2.take(rigged_hand2)
      rigged_game = GoFish.new([player1, player2], rigged_deck)
      expect { rigged_game.play_turn(player2, 'A') }.to change { rigged_game.winner }.to player1
    end
  end

  describe '#state_for' do
    it 'returns the state of the game that is relevent for the player' do
      game.start
      state = game.state_for(player1)
      expect(state['deckCount']).to eq 2
      expect(state['player']).to eq player1.as_json
      expect(state['currentPlayer']).to eq player1.name
      expect(state['opponents'][0]['name']).to eq player2.name
      expect(state['opponents'].length).to eq 1
      expect(state['opponents'][0]['card_count']).to eq 7
      expect(state['opponents'][0]['set_count']).to eq 0
    end
  end

  context 'saving and reading json data' do
    let(:json_game) { game.as_json }

    describe '#as_json' do
      it 'returns a hash of the Game object' do
        expect(json_game).to be_a Hash
        expect(json_game['players'].count).to eq 2
      end
    end

    describe '.from_json' do
      it 'returns a GoFish object from json data' do
        return_object = GoFish.from_json(json_game)
        expect(return_object).to be_instance_of GoFish
        expect(return_object.players.count).to eq 2
      end
    end
  end
end
