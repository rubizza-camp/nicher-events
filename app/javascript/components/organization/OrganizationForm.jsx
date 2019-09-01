import React, { Component } from 'react';
import { FormButton } from '../../ui/Buttons';
import { FormTextField } from '../../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
import { Message } from '../../ui/Message';
import { StoreIcon, SpeakerNotesIcon } from '../../ui/IconsCollection';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: { name: '', description: '' } };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (organization) => {
    var currentOrganization = {...this.state.organization};
    currentOrganization[organization.target.name] = organization.target.value;
    this.setState({organization: currentOrganization});
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    var newOrganization = {...newProps.organization};
    this.setState({organization: newOrganization});
  }

  render() {
    const {organization} = this.state;
    let errorsMessage;
    if (this.props.errors)  {
      errorsMessage = <Message message={this.props.errors} variant='error' />;
    }
    return(
      <form onSubmit={(e) => {this.props.handleSubmit(e, this.state.organization);}}>
        <Grid container direction="column" justify="center" alignItems="center">
          <p>{errorsMessage}</p>
          <div>
            <StoreIcon />
            <FormTextField type="text"
              name="name"
              label="Name"
              value={organization.name}
              onChange={this.handleChange} />
          </div>
          <br/>
          <div>
            <SpeakerNotesIcon />
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
