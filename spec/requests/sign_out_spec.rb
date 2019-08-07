require 'rails_helper'

describe 'sign_out' do
  it 'should get success status' do
    get '/'
    expect(response).to have_http_status(:success)
  end

  it 'should get error status' do
    delete '/auth/sign_out'
    expect(response).to have_http_status(404)

    delete '/auth/sign_out', params: {
      'access-token': 'vMzlOcJkftWkaU382TO2bg',
      'token-type': 'Bearer',
      'client': 'OWd3ZdcglX5nXDjg5bYEbA',
      'expiry': '1566226122',
      'uid': 'example@mail.ru'
    }
    expect(response).to have_http_status(404)
  end
end
