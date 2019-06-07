import React, { Component } from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import { TextField, Select } from './../../../shared-components/Form';
import {
  Grid,
  FormControl,
  InputLabel,
} from '@material-ui/core';

export default class AddPatient extends Component {
  render() {
    const { handleClose, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} >
        <DialogTitle id="form-dialog-title">Add Patient</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>

            <Grid item xs={12} sm={6} md={4}>
              <div className="form-wrap">
                <Field
                  className="w-full"
                  component={TextField}
                  name="firstName"
                  label="First Name"
                  required
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>

              <div className="form-wrap">
                <Field
                  className="w-full"
                  component={TextField}
                  name="lastName"
                  label="Last Name"
                  required
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>

              <div className="form-wrap">
                <Field
                  className="w-full"
                  type="email"
                  component={TextField}
                  name="email"
                  label="Email"
                  required
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div className="form-wrap">
                <FormControl className="w-full">
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Field
                    component={Select}
                    name="gender"
                    inputProps={{
                      name: 'gender',
                      id: 'gender',
                    }}
                    required
                  >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unspecified">Unspecified</option>
                  </Field>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div className="form-wrap">
                <Field
                  className="w-full"
                  label="Date of Birth"
                  component={TextField}
                  name="dob"
                  type="date"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    )
  }
}

AddPatient = reduxForm({
  form: 'AddPatienttForm'
})(AddPatient);

