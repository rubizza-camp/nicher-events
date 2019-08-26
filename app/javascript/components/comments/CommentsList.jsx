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
      comments: [],
      comment: { text: '', rating: '', user_id: '' }
    };
    this.fetchAvailableComments = this.fetchAvailableComments.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchAvailableComments() {
    delete this.state.comments;
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    // const authenticationRequired = !!sessionStorage.user;
    Axios.get('/api/v1/comments', {
      //   params: { authentication_required: authenticationRequired },
      headers: headers,
    })
      .then(response => {
        this.setState({ comments: response.data });
      });
  }

  handleSubmit = (e, comment) => {
    e.preventDefault();
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
      comment.user_id = JSON.parse(sessionStorage.user_attributes).id;
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post('/api/v1/comments', { comment: comment }, { headers: headers })
      .then(response => {
        this.fetchAvailableComments();
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

  componentDidMount() {
    this.fetchAvailableComments();
  }

  render() {
    let commentForm
    if (sessionStorage.user !== undefined) {
      commentForm = <CommentForm comment={this.state.comment} errors={this.state.errors} handleSubmit={this.handleSubmit} />
    }

    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center" >
          {this.state.comments.map(comment => (
            <div>
              <CommentCard
                comment={comment}
                user={comment.user}
                delete_button={<CommentDelete comment={comment} fetchAvailableComments={this.fetchAvailableComments}/>}
                update_form={<CommentUpdate comment={comment} errors={this.state.errors} fetchAvailableComments={this.fetchAvailableComments}/>}
              />
            </div>
          ))}
          {commentForm}
        </Grid>
      </div>
    );
  }
}