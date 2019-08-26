import React from 'react';
import Axios from 'axios';
import { CommentDiolog } from '../../ui/CommentDiolog';
import CommentForm from './CommentForm';

export default class CommentUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: { }
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate = (e, comment) => {
    e.preventDefault();
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    const that = this;
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.put(`/api/v1/comments/${comment.id}`, { comment: comment }, { headers: headers })
      .then(() => {
        that.props.fetchAvailableComments();
      })
      .catch(error => {
        
      });
  }


  render() {
    const comment = this.props.comment;
    let editForm;
    let commentDeleteModal;
    if ( sessionStorage.user !== undefined && JSON.parse(sessionStorage.user_attributes).id == comment.user.id) {
      editForm = <CommentForm comment={comment} errors={this.props.errors} handleSubmit={this.handleUpdate} />
      commentDeleteModal = <CommentDiolog content={editForm} text_button={'Update'} />
    }
    return (
      <div key={comment.id}>
        {commentDeleteModal}
      </div>
    )
  }
}