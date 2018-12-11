class Game < ApplicationRecord
  has_many :game_users, dependent: :destroy
  has_many :users, through: :game_users
  belongs_to :winner, class_name: 'User', optional: true

  scope :pending, -> { where(started_at: nil) }
  scope :in_progress, -> { where.not(started_at: nil).where(ended_at: nil) }
  scope :finished, -> { where.not(started_at: nil).where.not(ended_at: nil) }

  def self.create_pending_games_if_needed
    (2..5).each do |player_count|
      if Game.pending.where(player_count: player_count).count.zero?
        Game.create(player_count: player_count)
      end
    end
  end

  def start
    return unless pending? && ready?

    go_fish = GoFish.new(create_players)
    go_fish.start
    update(game_state: go_fish.as_json, started_at: Time.zone.now)
  end

  def play_turn(player_name, card_rank)
    asked_player = players.find { |player| player.name == player_name }
    go_fish.play_turn(asked_player, card_rank)
    update(game_state: go_fish.as_json)
  end

  def pending?
    started_at.nil?
  end

  def ready?
    users.count == player_count
  end

  def create_players
    users.map { |user| Player.new(user.name, user.id) }
  end

  def go_fish
    @go_fish ||= GoFish.from_json(game_state)
  end

  def players
    go_fish.players
  end

  def deck
    go_fish.deck
  end

  def current_player
    go_fish.current_player
  end

  def winning_player
    return unless go_fish.winner

    update(winner_id: go_fish.winner.user_id, ended_at: Time.zone.now) if winner_id.nil?
    go_fish.winner
  end

  def state_for(user)
    state = go_fish.state_for(user_player(user))
    state['id'] = id
    state
  end

  def user_player(user)
    players.find { |player| player.user == user }
  end
end
