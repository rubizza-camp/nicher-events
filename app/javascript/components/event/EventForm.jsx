import React from 'react';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: ''} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const currentEvent = this.props.event;
    currentEvent[event.target.name] = event.target.value;
    this.setState(currentEvent);
  }

  render () {
    const { event } = this.props
    return (
    <form onSubmit={this.props.handleSubmit}>
      <div className="form-group">
        <label htmlFor='name'>Name</label> <br/>
        <input type="text" name="name" value={event.name} onChange={this.handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor='date'>Date</label> <br/>
        <input type="datetime-local" name="date" value={event.date} onChange={this.handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor='status'>Status : </label> <br/>
        <input type="radio" name="status" onChange={this.handleChange} value="social"  checked={(event.status  == 'social')} />
        <label>Social</label> <br/>
        <input type="radio" name="status" onChange={this.handleChange} value="confidential" checked={(event.status  == 'confidential')} />
        <label>Confidential</label>
      </div>
      <div className="form-group">
        <label htmlFor='description'>Description</label> <br/>
        <textarea name="description" rows="5" value={event.description} onChange={this.handleChange} className="form-control" />
      </div>
      <div className="btn-group">
        <button type="submit" className="btn btn-dark">Save</button>
        <button type="button" onClick={this.props.handleCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </form>
    )
  }
}
