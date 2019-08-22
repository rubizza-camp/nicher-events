import React, { Component } from 'react';
import { FormButton } from '../../ui/Buttons';
import { FormTextField } from '../../ui/TextFileds';
import Grid from '@material-ui/core/Grid';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: { name: '', description: '' } };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (organization) => {
    const currentOrganization = Object.assign({}, this.state.organization);
    currentOrganization[organization.target.name] = organization.target.value;
    this.setState({organization: currentOrganization});
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const newOrganization = Object.assign({}, newProps.organization);
    this.setState({organization: newOrganization});
  }

  render() {
    const {organization} = this.state;
    return(
      <form onSubmit={(e) => {this.props.handleSubmit(e, this.state.organization);}}>
        <Grid container direction="column" justify="center" alignItems="center">
          <p>{this.props.errors}</p>
          <div>
            <FormTextField type="text"
              name="name"
              label="Name"
              value={organization.name}
              onChange={this.handleChange} />
          </div>
          <br/>
          <div>
            <FormTextField type="text"
              name="description"
              label="Description"
              value={organization.description}
              onChange={this.handleChange} />
          </div>
          <div className='btn-group'>
            <FormButton text="Save" color="primary" />
            <FormButton text="Cancel" onClick={this.props.handleCancel} />
          </div>
        </Grid>  
      </form>
    );
  }
}

export default OrganizationForm;
