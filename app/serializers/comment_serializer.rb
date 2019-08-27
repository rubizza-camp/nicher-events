class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :rating, :created_at, :user

  def created_at
    Time.parse(object.created_at.to_s).strftime('%Y-%m-%d %H:%M')
  end
end
