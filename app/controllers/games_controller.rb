class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :update

  @@pusher_client = Pusher::Client.new(
    app_id: '610491',
    key: '656e007150142d5db2c4',
    secret: 'db5c4cb7e2cbff381984',
    cluster: 'us2',
    encrypted: true
  )

  def index
    Game.create_pending_games_if_needed
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
    if @game.pending?
      @game.start
      if @game.pending?
        render :waiting
      else
        # @@pusher_client.trigger('go-fish', 'game-starting', gameId: params[:id])
        # @game_state = @game.state_for(current_user)
        redirect_to @game
      end
    else
      @game_state = @game.state_for(current_user)
      respond_to do |format|
        format.html 
        format.json { render json: @game.state_for(current_user) }
      end
    end
  end

  def update
    game = Game.find(params[:id])
    game.play_turn(params['selectedOpponentName'], params['rank'])
    @@pusher_client.trigger('go-fish', 'round-played', gameId: params[:id])

    respond_to do |format|
      format.json { render json: game.state_for(current_user) }
    end
    # render json: game.state_for(current_user)
  end

  private

  def users_turn?(game)
    game.current_player.user == current_user
  end
end
