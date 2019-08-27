import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { FormTextField } from '../../ui/TextFileds';
import Rating from '@material-ui/lab/Rating';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comment: { } };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (comment) => {
    // comment.preventDefault();
    // comment.stopPropagation();
    const prevState = {...this.state};
    const updatedComment = {...this.state.comment};
    updatedComment[comment.target.name] = comment.target.value;
    this.setState({ ...prevState, comment: updatedComment });
  }

  handleChangeRating = (comment) => {
    // comment.preventDefault();
    // comment.stopPropagation();
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
    let errorsMessage;
    if (this.props.errors)  {
      errorsMessage = <ul>
        {this.props.errors.map((error) => (
          <li key={error.id}>{error}</li>
        ))}
      </ul>;
    }
    const { comment } = this.state;
    return (
      <form onSubmit={(e) => { this.props.handleSubmit(e, this.state.comment); }}>
        {errorsMessage}
        <Grid container direction="column" justify="center" alignItems="center" >
          <FormTextField
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
