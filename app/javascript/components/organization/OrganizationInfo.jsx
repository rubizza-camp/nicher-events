import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OrganizationInfo extends Component {
	constructor(props) {
    super(props);
    this.state = { organization: {} };
    this.handleDelete = this.handleDelete.bind(this);
	}

  componentDidMount() {
    axios.get(`api/organizations/${this.props.match.params.id}`)
      .then(res => {
        this.setState({organization: res.data})
      })
      .catch(error => console.log('error', error))
  }

  handleDelete() {
    axios.delete(`api/organizations/${this.props.match.params.id}`)
      .then(res => {
        this.props.history.push('/organizations')
      })
      .catch(error => console.log('error', error))
  }

  render() {
    return (
      <div>
        <h3>{this.state.organization.name}</h3>
        <p>{this.state.organization.description}</p>
        <p>
          <Link to={`/organizations/${this.state.organization.id}/edit`}
            className='btn btn-outline-dark'>Edit</Link>
          <button onClick={this.handleDelete} className='btn btn-outline-dark'>Delete</button>
        </p>
      </div>
      )
  }
}

export default OrganizationInfo;
