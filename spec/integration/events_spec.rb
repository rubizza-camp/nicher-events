require 'swagger_helper'

describe 'Blogs API' do
#   path '/events' do
#     post 'Creates an event' do
#       tags 'Events'
#       consumes 'application/json', 'application/xml'
#       parameter name: :event, in: :body, schema: {
#         type: :object,
#         properties: {
#           name: { type: :string },
#           date: { type: :string },
#           description: { type: :string },
#           status: { type: :integer }
#         },
#         required: [ 'name', 'date', 'description', 'status' ]
#       }

#       response '201', 'event created' do
#         event = { name: 'my', date: '12-12-2012T12:12', description: 'eeeewccccccc', status: 0, user_id: 1  }
#         run_test!
#       end

#       response '422', 'invalid request' do
#         let(:blog) { { title: 'foo' } }
#         run_test!
#       end
#     end
#   end

  path '/api/v1/events/{id}' do
    parameter name: :id, in: :path, type: :string

    get 'Retrieves an social event' do
      tags 'Events'
      produces 'application/json', 'application/xml'

      response '200', 'event found' do
        schema type: :object,
               status_enum: %i[social confidential],
               properties: {
                 id: { type: :integer },
                 name: { type: :string },
                 date: { type: :string },
                 description: { type: :string },
                 status: { type: :status_enum }
               },
               required: %w[id name status date description]

        let(:organizer) { create(:user, role: :organizer) }
        let(:id) { create(:event, status: :social, user_id: organizer.id).id }
        binding.pry
      end

      response '404', 'blog not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
