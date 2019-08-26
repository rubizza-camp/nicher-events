class CommentSerializer < ActiveModel::Serializer
	attributes :id, :text, :rating, :created_at, :user

	def created_at
		Time.parse(object.created_at.to_s).strftime('%Y-%m-%d %H:%M')
	end

	# def available_to_edit
	# 	object.decorate.current_organization?(current_user.id) if current_user&.organizer?
	# end
end
