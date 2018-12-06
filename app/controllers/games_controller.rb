class GamesController < ApplicationController
  def index
    Game.create_pending_games_if_needed
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])

  end

  def update
    game = Game.find(params[:id])
    game.play_turn(params['player_name'], params['card_rank'])
    redirect_to game_path(game)
  end

  private

  def users_turn?(game)
    game.current_player.user == current_user
  end
end
