import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

class PlanoConfirmationDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      index: props.index,
    };

  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.setState({ index: nextProps.index });
    }
  }

  handleEntering = () => {
    // this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.props.onClose({
      index: null,
      confirmed: false
    });
  };

  handleOk = () => {
    this.props.onClose({
      index: this.state.index,
      confirmed: true
    });
  };


  render() {
    const { index, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          {this.props.message || 'Random text message'}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="secondary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

PlanoConfirmationDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

export default PlanoConfirmationDialog;
