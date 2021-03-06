import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { CommentCard } from '../../ui/CommentCard';
import CommentForm from './CommentForm';
import CommentDelete from './CommentDelete';
import CommentUpdate from './CommentUpdate';
import { List } from '@material-ui/core';

export default class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: { text: '', rating: '', user_id: '', event_id: '' },
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e, comment) => {
    delete this.state.errors;
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
      comment.user_id = JSON.parse(localStorage.user_attributes).id;
      comment.event_id = this.props.event_id;
    }
    const that = this;
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post(`/api/v1/events/${comment.event_id}/comments`, { comment: comment }, { headers: headers })
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
      }
      );
  }

  render() {
    let commentForm;
    if (localStorage.user !== undefined) {
      commentForm = <CommentForm comment={this.state.comment} errors={this.state.errors} handleSubmit={this.handleSubmit} />;
    }
    return (
      <List>
        <Grid container direction="column" justify="center" alignItems="center" >
          {this.props.comments.map(comment => (
            <div key={comment.id}>
              <CommentCard
                comment={comment}
                delete_button={<CommentDelete comment={comment} fetchAvailableEvent={this.props.fetchAvailableEvent} />}
                update_form={<CommentUpdate comment={comment} errors={this.state.errors} fetchAvailableEvent={this.props.fetchAvailableEvent} />}
              />
            </div>
          ))}
        </Grid>
        {commentForm}
      </List>
    );
  }
}
