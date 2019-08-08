import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrganizationInfo extends Component {
	constructor() {
    super();
    this.state = { organization: {} };
    this.handleDelete = this.handleDelete.bind(this);
	}

  componentDidMount() {
    axios.get(`api/organizations/${this.props.match.params.id}`)
      .then(res => {
        const organization = res.data;
        this.setState({organization})
      })
  }

  handleDelete() {
    axios.delete(`api/organizations/${this.props.match.params.id}`)
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