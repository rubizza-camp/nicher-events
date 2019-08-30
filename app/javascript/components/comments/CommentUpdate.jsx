import React from 'react';
import Axios from 'axios';
import { CommentDialog } from '../../ui/CommentDialog';
import CommentForm from './CommentForm';
import { EditIcon } from '../../ui/IconsCollection';

export default class CommentUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {},
      errors: [],
      response: []
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
    Axios.patch(`/api/v1/events/${comment.event_id}/comments/${comment.id}`, { comment: comment }, { headers: headers })
      .then(() => {
        this.setState({ response: ['Comment edited'] });
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
    let commentUpdateDialog;
    if ( sessionStorage.user !== undefined && JSON.parse(sessionStorage.user_attributes).id == comment.user.id) {
      editForm = <CommentForm comment={comment} errors={this.state.errors} response={this.state.response} handleSubmit={this.handleUpdate} />;
      const editIcon = <EditIcon />;
      commentUpdateDialog = <CommentDialog content={editForm} text_button={editIcon} />;
    }
    return (
      <div key={comment.id}>
        {commentUpdateDialog}
      </div>
    );
  }
}
