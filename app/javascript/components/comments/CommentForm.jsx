import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { CommentTextField } from '../../ui/TextFileds';
import Rating from '@material-ui/lab/Rating';
import { Message } from '../../ui/Message';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  handleChange = (comment) => {
    const prevState = {...this.state};
    const updatedComment = {...this.state.comment};
    updatedComment[comment.target.name] = comment.target.value;
    this.setState({ ...prevState, comment: updatedComment });
  }

  handleChangeRating = (comment) => {
    const prevState = {...this.state};
    const updatedComment = {...this.state.comment};
    updatedComment['rating'] = comment.target.value;
    this.setState({ ...prevState, comment: updatedComment });
  }

  componentDidMount(){
    const { comment } = this.props;
    if (comment.id !== undefined) {
      this.setState({ comment: comment });
    }
  }

  render () {
    let message;
    if (this.props.errors !== undefined && this.props.errors.length !== 0)  {
      message = <Message message={this.props.errors} variant='error' />;
    }
    if (this.props.response !== undefined && this.props.response.length !== 0)  {
      message = <Message message={this.props.response} variant='success' />;
    }

    let { comment } = this.state;
    if (this.state.comment.user_id !== undefined && message == undefined) {
      this.setState({ comment: { text: '', rating: ''} });
      comment = this.state.comment;
    }
    return (
      <form onSubmit={(e) => { this.props.handleSubmit(e, this.state.comment); }}>
        {message}
        <Grid container direction="column" justify="center" alignItems="center" >
          <CommentTextField
            value={comment.text}
            name="text"
            rows="3"
            multiline
            onChange={this.handleChange}
          />
          <Rating
            value={comment.rating}
            name={Math.random()}
            onChange={this.handleChangeRating}
          />
          <div className="btn-group">
            <FormButton text='Save' color="primary" />
          </div>
        </Grid>
      </form>
    );
  }
}
