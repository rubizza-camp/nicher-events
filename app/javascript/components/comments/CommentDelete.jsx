import React from 'react';
import Axios from 'axios';
import { FormButton } from '../../ui/Buttons';
import { CommentDialog } from '../../ui/CommentDialog';
import { CommentCard } from '../../ui/CommentCard';
import { DeleteIcon } from '../../ui/IconsCollection';

export default class CommentDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = (e, comment) => {
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    const that = this;
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.delete(`/api/v1/events/${comment.event.id}/comments/${comment.id}`, { headers: headers })
      .then(() => {
        that.props.fetchAvailableEvent();
      })
      .catch(error => {
        switch (error.response.statusText) {
        case 'Forbidden':
          this.setState({ errors: ['You can\'t do it'] });
          break;
        case 'Unauthorized':
          this.setState({ errors: error.response.data.errors });
          break;
        }
      });
  }

  render() {
    const comment = this.props.comment;
    let buttonDelete;
    let commentCard;
    let commentDeleteDialog;
    const userAtttributes = JSON.parse(localStorage.user_attributes);
    const userAuthenticated = localStorage.user !== undefined
    const isCommentOwner = userAtttributes.id == comment.user.id
    const isOrganizer = userAtttributes.role == 'organizer'
    const allowedToDeleteComment = userAuthenticated && (isCommentOwner || isOrganizer)
    if ( allowedToDeleteComment ) {
      buttonDelete = <FormButton onClick={(e) => { this.handleDelete(e, comment); }} color="primary" text='Delete' />;
      commentCard = <CommentCard comment={comment} errors={this.state.errors} />;
      const deleteIcon = <DeleteIcon />;
      commentDeleteDialog = <CommentDialog content={buttonDelete} text_button={deleteIcon} comment_card={commentCard} />;
    }
    return (
      <div key={comment.id}>
        {commentDeleteDialog}
      </div>
    );
  }
}
