# :reek:InstanceVariableAssumption
class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :current_event
  before_action :current_comment, only: %i[update destroy]
  before_action :comment_params, only: %i[create]

  def index
    @comments = Comment.where(event_id: current_event.id)
    render json: @comments
  end

  def create
    return head :not_found unless user_subscribed_for_current_event? || user_organizer_of_event?
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    return head :not_found unless current_comment.present? && user_comment?
    if current_comment.update(comment_params)
      render json: current_comment
    else
      render json: current_comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    return head :not_found unless current_comment.present? && (user_comment? || user_organizer_of_event?)
    current_comment.destroy
    head :no_content
  end

  private

  def user_organizer_of_event?
    current_user.events.find_by(id: current_event.id).present?
  end

  def user_subscribed_for_current_event?
    current_user.attendances.find_by(event_id: current_event.id).present?
  end

  def user_comment?
    current_user.comments.find_by(id: params[:id])
  end

  def comment_params
    @comment_params ||= params.require(:comment).permit(:text, :rating, :user_id, :event_id)
  end

  def current_comment
    @current_comment ||= Comment.find_by(id: params[:id])
  end

  def current_event
    @current_event ||= Event.find_by(id: params[:event_id])
  end
end
