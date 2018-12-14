class GoFish
  attr_accessor :players, :deck, :turn

  def initialize(players, deck = env_deck, turn = 0)
    @players = players
    @deck = deck
    @turn = turn
  end

  def start
    deck.shuffle
    deal_count = players.count <= 3 ? 7 : 5

    deal_count.times do
      players.each { |player| player.take([deck.deal]) }
    end
  end

  def current_player
    players[turn % players.count]
  end

  def next_player
    self.turn = turn + 1
  end

  def play_turn(asked_player, card_rank)
    if asked_player.has?(card_rank)
      cards_asked_for = asked_player.give(card_rank)
      current_player.take(cards_asked_for)
    else
      go_fish
    end

    next_player unless current_player.check_for_sets
    play_for_bot
  end

  def play_for_bot
    return unless current_player.autoplay

    play_turn(pick_target, current_player.pick_rank)
  end

  def pick_target
    players.reject { |player| player == current_player }.sample
  end

  def winner
    if deck.count.zero?
      players.max_by(&:set_count)
    else
      players.find { |player| player.card_count.zero? }
    end
  end

  def as_json
    {
      'players' => players.map(&:as_json),
      'deck' => deck.as_json,
      'turn' => turn
    }
  end

  def self.from_json(data)
    GoFish.new(
      Player.collection_from_data(data['players']),
      CardDeck.from_json(data['deck']),
      data['turn']
    )
  end

  def state_for(player)
    {
      deckCount: deck.count,
      player: players.find { |game_player| game_player == player }.as_json,
      currentPlayer: current_player.name,
      opponents: opponent_summaries_for(player)
    }.stringify_keys
  end

  def opponent_summaries_for(player)
    players.reject { |game_player| game_player == player }.map(&:summary)
  end

  private

  def player_made_set?(sets_before)
    current_player.set_count > sets_before
  end

  def go_fish
    current_player.take([deck.deal])
  end

  def env_deck
    Rails.env.test? ? CardDeck::TestDeck.new : CardDeck.new
  end
end
