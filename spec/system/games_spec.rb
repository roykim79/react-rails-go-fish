require 'rails_helper'

RSpec.describe 'Games', type: :system do
  before do
    driven_by(:rack_test)
  end

  def sign_up(name)
    visit root_path
    fill_in 'Name', with: name
    click_on 'Play'
  end

  it 'requires authentication' do
    visit games_path

    expect(page).to have_css 'input[id=user_name]'
    expect(current_path).to eq root_path
  end

  it 'allows the user to join a pending game' do
    sign_up 'Roy'

    expect { click_on '2 Player' }.to change(GameUser, :count).by 1
    expect(page).to have_content 'Roy', count: 1
  end

  it 'prevents user from joining a game more than once' do
    sign_up 'Roy'
    click_on '2 Player'
    visit games_path

    expect { click_on '2 Player' }.not_to change(GameUser, :count)
    expect(page).to have_content 'Roy', count: 1
  end

  context 'with multiple sessions', js: true do
    # let(:session1) { Capybara::Session.new(:rack_test, Rails.application) }
    # let(:session2) { Capybara::Session.new(:rack_test, Rails.application) }
    let(:session1) { Capybara::Session.new(:selenium_chrome_headless, app) }
    let(:session2) { Capybara::Session.new(:selenium_chrome_headless, app) }
    let(:sessions) { [session1, session2] }

    def play_turns(ranks)
      ranks.each do |rank|
        session1.find('.opponent').click
        session1.first('.visible-card').click
        # session1.click_button rank, match: :first
      end
    end

    before do
      sessions.each_with_index do |session, index|
        player_name = "Player #{index + 1}"
        session.visit root_path
        session.fill_in 'Name', with: player_name
        session.click_on 'Play'
        session.click_on '2 Player'
      end
      session1.driver.refresh
    end

    after do
      sessions.each(&:reset!)
    end

    it 'will start a game when there are enough players' do
      expect(Game.in_progress.count).to eq 1
      expect(session1).to have_css '.player', count: 1
      expect(session1).to have_css '.opponent', count: 1
    end

    it 'allows the player to play a turn' do
      # session1.choose 'Player 2'
      # session1.click_button 'A', match: :first
      # expect(session1).not_to have_css 'input'
      # session2.driver.refresh
      # expect(session2).to have_css 'input'
    end
#
    it 'will display the winning template when the game has been won' do
      play_turns(%w[J Q K A])
      sessions.each { |session| expect(session).to have_content 'Game over' }
      sessions.each { |session| expect(session).to have_content 'Player 1' }
      expect(Game.finished.count).to eq 1
      expect(Game.finished.first.winner.name).to eq 'Player 2'
    end
  end
end
