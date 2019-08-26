import React from 'react';
import Axios from 'axios';
import { FormButton } from '../../ui/Buttons';
import { CommentDiolog } from '../../ui/CommentDiolog';
import { CommentCard } from '../../ui/CommentCard';

export default class CommentDelete extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = (e, comment_id) => {
    e.preventDefault();
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    const that = this
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.delete(`/api/v1/comments/${comment_id}`, { headers: headers })
      .then(() => {
        that.props.fetchAvailableComments();
      })
      .catch(error => {

      });
  }


  render() {
    const comment = this.props.comment;
    let buttonDelete;
    let commentCard;
    let commentDeleteModal;
    if ( sessionStorage.user !== undefined && JSON.parse(sessionStorage.user_attributes).id == comment.user.id || JSON.parse(sessionStorage.user_attributes).role == 'organizer') {
      buttonDelete = <FormButton onClick={(e) => { this.handleDelete(e, comment.id) }} color="primary" text='Delete' />
      commentCard = <CommentCard comment={comment} user={JSON.parse(sessionStorage.user_attributes)} />
      commentDeleteModal = <CommentDiolog content={buttonDelete} text_button={'Delete'} comment_card={commentCard} />
    }
    return (
      <div key={comment.id}>
        {commentDeleteModal}
      </div>
    )
  }
}