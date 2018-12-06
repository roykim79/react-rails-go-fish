require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user1) { create(:user, name: 'Roy') }
  let(:user2) { create(:user, name: 'John') }
  let(:user3) { create(:user, name: 'Bob') }

  it 'should be valid?' do
    expect(user1.valid?).to be true
  end

  it 'should have a name' do
    user1.name = '     '
    expect(user1.valid?).to be false
  end

  it 'should not have a name longer than 16 characters' do
    user1.name = 'a' * 17
    expect(user1.valid?).to be false
  end

  it 'should have a unique name' do
    duplicate_user1 = user1.dup
    duplicate_user1.name = user1.name.upcase
    user1.save
    expect(duplicate_user1.valid?).to be false
  end

  context 'User statistics' do
    def create_won_game(winning_user, losing_user)
      game = create(:game, player_count: 2)
      game.users << winning_user << losing_user
      game.start
      game.update(winner_id: winning_user.id)
    end

    describe '#won_games' do
      it 'returns the number of games the user1 won' do
        create_won_game(user1, user2)
        expect(user1.won_games.count).to eq 1
        expect(user2.won_games.count).to eq 0
      end
    end

    describe '#games_played' do
      it 'returns the games the user has played' do
        create_won_game(user1, user2)
        create_won_game(user2, user3)
        expect(user1.games_played).to eq 1
        expect(user2.games_played).to eq 2
        expect(user3.games_played).to eq 1
      end
    end

    describe '#win_percentage' do
      it 'returns the percent of games won' do
        create_won_game(user1, user2)
        create_won_game(user2, user3)
        expect(user1.win_percentage).to eq 1
        expect(user2.win_percentage).to eq 0.5
        expect(user3.win_percentage).to eq 0
      end
    end
  end
end
