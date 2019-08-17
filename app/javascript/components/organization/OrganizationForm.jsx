import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: { name: '', description: '' } };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(organization) {
    const currentOrganization = this.props.organization;
    currentOrganization[organization.target.name] = organization.target.value;
    this.setState(currentOrganization);
  }

  render() {
    const {organization} = this.props;

    const useStyles = makeStyles(theme => ({
      button: {
      margin: theme.spacing(1),
      width: 165,
      },
      input: {
      display: 'none',
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350,
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
    }));

    const SaveButton = () => {
      const classes = useStyles();
      return <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>
    }

    const CancelButton = () => {
      const classes = useStyles();
      return <Button type="submit" variant="contained" onClick={this.props.handleCancel}
              className={classes.button}>Cancel</Button>
    }

    const TextFieldName = () => {
      const classes = useStyles();
      return <TextField
              name="name"
              id="outlined-name"
              label="Name"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
    }

    const TextFieldDescription = () => {
      const classes = useStyles();
      return <TextField
              name="description"
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rowsMax="10"
              className={classes.textField}
              margin="normal"
              variant="outlined"
          />
    }

    return(
     <form onSubmit={this.props.handleSubmit}>
        <p>{this.props.errors}</p>
        <div className='form-group'>
          <Grid container direction="column" justify="center" alignItems="center">
            <TextField value={organization.name} onChange={this.handleChange}
              name="name"
              id="outlined-name"
              label="Name"
              margin="normal"
              variant="outlined"
              style={{width: 350}} />
          </Grid>
        </div>
        <br/>
        <div className='form-group'>
        <Grid container direction="column" justify="center" alignItems="center">
          <TextField value={organization.description} onChange={this.handleChange}
              name="description"
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rowsMax="10"
              margin="normal"
              variant="outlined"
              style={{width: 350}}  />
          </Grid>
        </div>
        <div class='btn-group'>
          <SaveButton />
          <CancelButton />
        </div>
    </form>
    );
  }
}

export default OrganizationForm;
