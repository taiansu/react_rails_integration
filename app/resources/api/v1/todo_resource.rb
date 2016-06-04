module API
  module V1
    class TodoResource < JSONAPI::Resource
      attributes :text, :complete
    end
  end
end
