require 'rails_helper'
# rubocop:disable Lint/AmbiguousBlockAssociation
# rubocop:disable Metrics/LineLength

RSpec.describe Api::V1::EventsController, type: :controller do
  let(:organization) { create(:organization) }
  let(:organizer) { create(:user, role: :organizer, organization: organization) }

  describe 'POST #create with event_layouts attributes' do
    let(:create_action) { post :create, params: event_with_layout_params }

    context 'when user is organizer' do
      before do
        @header = organizer.create_new_auth_token
        request.headers.merge!(@header)
      end

      context 'when params is valid and include nested attributes' do
      let(:event_with_layout_params) {
                                        {
                                          event:
                                            {
                                              name: Faker::Lorem.word,
                                              date: Faker::Date.between(from: 2.days.ago, to: Date.today),
                                              description: Faker::Lorem.sentence,
                                              status: Event.statuses.keys.sample,
                                              event_layouts_attributes: { virtual_map: fixture_file_upload('nikolas.jpg', 'image/jpg') }
                                            }
                                        }
                                      }

        it 'event is created with event_layouts' do
          expect { create_action }.to change { EventLayout.all.count }.by(1)
        end

        it 'render json with link for attached file' do
          create_action
          expect(response.content_type).to eq "application/json"
          expect(json_response).to include "link_map"
        end
      end

      context 'when event_layouts params is invalid' do
      # invlid params
      let(:event_with_layout_params) {
                                        {
                                          event:
                                            {
                                              name: Faker::Lorem.word,
                                              date: Faker::Date.between(from: 2.days.ago, to: Date.today),
                                              description: Faker::Lorem.sentence,
                                              status: Event.statuses.keys.sample,
                                              event_layouts_attributes: { virtual_map: '' }
                                            }
                                        }
                                      }

        it 'event is created and event_layouts disable' do
          expect { create_action }.to change { Event.all.count }
          expect { create_action }.to_not change { EventLayout.all.count }
          expect(response.content_type).to eq "application/json"
        end
      end
    end
  end
end
# rubocop:enable Metrics/LineLength
# rubocop:enable Lint/AmbiguousBlockAssociation
