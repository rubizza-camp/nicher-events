import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { CommentCard } from '../../ui/CommentCard';
import CommentForm from './CommentForm';
import CommentDelete from './CommentDelete';
import CommentUpdate from './CommentUpdate';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: { text: '', rating: '', user_id: '', event_id: '' },
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e, comment) => {
    e.preventDefault();
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
      comment.user_id = JSON.parse(sessionStorage.user_attributes).id;
      comment.event_id = this.props.event_id;
    }
    const that = this;
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post('/api/v1/comments', { comment: comment }, { headers: headers })
      .then(() => {
        that.props.fetchAvailableEvent();
      })
      .catch(error => {
        switch (error.response.statusText) {
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
    // this.setState({ event_id: this.props.event_id });
    // const comments = this.props.comments;
    let commentForm;
    // if (sessionStorage.user !== undefined) {
    commentForm = <CommentForm comment={this.state.comment} errors={this.state.errors} handleSubmit={this.handleSubmit} />;
    // }

    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center" >
          {this.props.comments.map(comment => (
            <div key={comment.id}>
              <CommentCard
                comment={comment}
                delete_button={<CommentDelete comment={comment} fetchAvailableEvent={this.props.fetchAvailableEvent}/>}
                update_form={<CommentUpdate comment={comment} errors={this.state.errors} fetchAvailableEvent={this.props.fetchAvailableEvent}/>}
              />
            </div>
          ))}
        </Grid>
        {commentForm}
      </div>
    );
  }
}
