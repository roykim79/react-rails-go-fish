class User < ApplicationRecord
  has_many :game_users, dependent: :destroy
  has_many :games, through: :game_users
  has_many :won_games, class_name: 'Game', foreign_key: :winner
  validates :name, presence: true,
                   length: { maximum: 16 },
                   uniqueness: { case_sensitive: false }

  def games_played
    games.count
  end

  def win_percentage
    won_games.count / games_played.to_f
  end
end
