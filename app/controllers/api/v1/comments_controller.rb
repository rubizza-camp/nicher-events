# :reek:InstanceVariableAssumption
class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]

  def index
    @comments = Comment.all # id event
    render json: @comments
  end

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
    return head :not_found unless current_user_comment
    if current_user_comment.update(comment_params)
      render json: current_user_comment
    else
      render json: current_user_comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    # and when organizer of this event
    return head :not_found unless current_comment && (current_user_comment || current_user.organizer?)
    current_comment.destroy
    head :no_content
  end

  private

  def current_user_comment
    @current_user_comment ||= current_user.comments.find_by(id: params[:id])
  end

  def comment_params
    @comment_params ||= params.require(:comment).permit(:text, :rating, :user_id)
  end

  def current_comment
    @current_comment ||= Comment.find_by(id: params[:id])
  end
end
