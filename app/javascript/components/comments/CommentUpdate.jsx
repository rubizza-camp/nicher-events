import React from 'react';
import Axios from 'axios';
import { CommentDiolog } from '../../ui/CommentDiolog';
import CommentForm from './CommentForm';

export default class CommentUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {},
      errors: []
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
    Axios.patch(`/api/v1/comments/${comment.id}`, { comment: comment }, { headers: headers })
      .then(() => {
        that.props.fetchAvailableEvent();
      })
      .catch(error => {
        switch (error.response.statusText) {
        case 'Not Found':
          this.setState({ errors: ['You can\'t do it'] });
          break;
        case 'Unprocessable Entity':
          this.setState({ errors: error.response.data });
          break;
        case 'Unauthorized':
          this.setState({ errors: error.response.data.errors });
          break;
        }
      });
  }


  render() {
    const comment = this.props.comment;
    let editForm;
    let commentUpdateDiolog;
    // if ( sessionStorage.user !== undefined && JSON.parse(sessionStorage.user_attributes).id == comment.user.id) {
    editForm = <CommentForm comment={comment} errors={this.state.errors} handleSubmit={this.handleUpdate} />;
    commentUpdateDiolog = <CommentDiolog content={editForm} text_button={'Update'} />;
    // }
    return (
      <div key={comment.id}>
        {commentUpdateDiolog}
      </div>
    );
  }
}
