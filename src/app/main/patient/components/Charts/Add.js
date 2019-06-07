import React, { Component, Fragment } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

import { reduxForm, Field } from 'redux-form';
import { TextField } from './../../../../shared-components/Form';

export default class Add extends Component {
  render() {
    const { handleClose, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Create Chart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Field
            component={TextField}
            autoFocus
            name="date"
            margin="dense"
            id="name"
            label="Scheduled Date"
            type="date"
            fullWidth
          />
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
    );
  }
}

Add = reduxForm({
  form: 'AddChartForm'
})(Add);
