require "rails_helper"

RSpec.describe 'Session', type: :system do
  before do
    driven_by(:rack_test)
  end

  def sign_up(name)
    fill_in 'Name', with: name
    click_on 'Play'
  end

  it 'allows a new user to sign up' do
    visit root_path
    expect { sign_up('Roy') }.to change(User, :count).by 1
    expect(page).to have_content 'Pending Games'
  end

  it 'allows an existing user to login' do
    create(:user, name: 'Roy')
    visit root_path
    expect { sign_up('Roy') }.not_to change(User, :count)
    expect(page).to have_content 'Pending Games'
  end

  it 'prevents login for blank name' do
    visit root_path
    click_on 'Play' # don't fill in name
    expect(page).to have_css 'input[id=user_name]'
  end

  it 'shows a list of the users past games' do
    visit root_path
    sign_up('Roy')
    expect(page).to have_content 'Game history'
  end
end
