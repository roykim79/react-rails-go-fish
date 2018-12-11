class GamesController < ApplicationController
  def index
    Game.create_pending_games_if_needed
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
    if @game.pending?
      @game.start
      render :waiting
    else
      @game_state = @game.state_for(current_user)
    end
  end

  def play_round

  end

  # def update
  #   game = Game.find(params[:id])
  #   game.play_turn(params['player_name'], params['card_rank'])
  #   redirect_to game_path(game)
  # end

  private

  def users_turn?(game)
    game.current_player.user == current_user
  end
end
