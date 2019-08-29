# :reek:InstanceVariableAssumption
class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]

  def create
    return head :not_found unless current_user
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    return head :not_found unless current_user_comment?
    if current_comment.update(comment_params)
      render json: current_comment
    else
      render json: current_comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    return head :not_found unless current_comment && (current_user_comment? || current_user_organizer_of_this_event?)
    current_comment.destroy
    head :no_content
  end

  private

  def current_user_organizer_of_this_event?
    current_user.events.find_by(id: current_comment.event_id)
  end

  def current_user_comment?
    current_user.comments.find_by(id: params[:id])
  end

  def comment_params
    @comment_params ||= params.require(:comment).permit(:text, :rating, :user_id, :event_id)
  end

  def current_comment
    @current_comment ||= Comment.find_by(id: params[:id])
  end
end
