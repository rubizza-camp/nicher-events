import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { FormTextField } from '../../ui/FormTextField';

export default class EventObjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventObject: {name: '', description: '', file: null, location: ''} };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);

  }

  handleChangeFile = (eventObject) => {
    var prevState = {...this.state};
    var updatedEventObject = {...this.state.eventObject};
    updatedEventObject[eventObject.target.name] = eventObject.target.files[0];
    this.setState({ ...prevState, eventObject: updatedEventObject });
  }

  handleChange = (eventObject) => {
    var prevState = {...this.state};
    var updatedEventObject = {...this.state.eventObject};
    updatedEventObject[eventObject.target.name] = eventObject.target.value;
    this.setState({ ...prevState, eventObject: updatedEventObject });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    var newEvent = {...newProps.eventObject};
    this.setState({ eventObject: newEvent });
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
    const { eventObject } = this.state;
    return (
      <form onSubmit={(e) => { this.props.handleSubmit(e, this.state.eventObject); }}>
        {errorsMessage}
        <Grid container direction="column" justify="center" alignItems="center">
          <h1>Event Object</h1>
          <FormTextField
            value={eventObject.name}
            name="name"
            label="Name"
            multiline
            rows="3"
            onChange={this.handleChange}
          />
          <FormTextField
            value={eventObject.description}
            name="description"
            label="Description"
            multiline
            rows="3"
            onChange={this.handleChange}
          />
          <FormTextField
            type='file'
            name="file"
            required
            onChange={this.handleChangeFile}
          />
          <div className="btn-group">
            <FormButton text='Save' color="primary" />
            <FormButton text='Cancel' onClick={this.props.handleCancel} />
          </div>
        </Grid>
      </form>
    );
  }
}
