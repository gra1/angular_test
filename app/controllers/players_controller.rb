class PlayersController < ApplicationController
  before_action :get_player, except: [:index, :create]
  respond_to :html, :json

  def index
    @player = Player.all
    respond_with(@players) do |format|
      format.json { render :json => @player.as_json }
      format.html
    end
  end

  def create
    @player = Player.new(player_params)
    if @player.save
      render json: @player.as_json, status: :ok
    else
      render json: {play: @player.errors, status: :no_content}
    end
  end      

  def show
    respond_with(@player.as_json)
  end

  def update
    if @player.update_attributes(player_params)
      render json: @player.as_json, status: :ok 
    else
      render json: {play: @player.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @player.destroy
    render json: {status: :ok}
  end

  private

  def player_params
    params.fetch(:player, {}).permit( :first_name, :last_name, :age, :birth_date, :gender, :price, :team )
  end

  def get_player
    @player = Player.find(params[:id])
    render json: {status: :not_found} unless @player
  end

end
