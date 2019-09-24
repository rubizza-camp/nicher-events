class ErrorListModel
  include Swagger::Blocks

  swagger_schema :ErrorListModel do
    key :type, :array
    items do
      key :type, :string
      key :example, 'Error'
    end
  end
end
