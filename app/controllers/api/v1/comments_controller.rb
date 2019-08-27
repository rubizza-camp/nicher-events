# :reek:InstanceVariableAssumption
class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_current_user_comment, only: %i[update destroy]

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
    return head :not_found unless @current_user_comment
    if @current_user_comment.update(comment_params)
      render json: @current_user_comment
    else
      render json: @current_user_comment.errors.full_messages
    end
  end

  def destroy
    Comment.find_by(id: params[:id]).destroy
    head :no_content
  end

  def set_current_user_comment
    @current_user_comment = current_user.comments.find_by(id: params[:id])
  end

  def comment_params
    params.require(:comment).permit(:text, :rating, :user_id)
  end
end
