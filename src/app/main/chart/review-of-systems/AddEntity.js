import React, { Component } from 'react';
import {
  Button,
  IconButton,
  Icon,
  TextField,
  ClickAwayListener,
  InputAdornment
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './../store/actions';
import reducer from './../store/reducers';

const initialState = {
  formOpen: false,
  cardTitle: ''
};

class AddEntity extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleOpenForm = () => {
    this.setState({ formOpen: true });
  };

  handleCloseForm = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    this.setState({ cardTitle: event.target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    console.log(this.state.cardTitle);
    const { chart } = this.props;
    console.log('this.props ===> ', this.props);
    this.props.addRos({
      chart: chart._id,
      name: this.state.cardTitle,
      type: this.props.reviewType
    });
    this.handleCloseForm();
  };

  canBeSubmitted() {
    const { cardTitle } = this.state;
    return cardTitle.length > 0;
  }

  render() {
    const { formOpen } = this.state;
    const { activePatientId } = this.props;
    console.log('acc', activePatientId);
    return (
      <div className="w-full border-t-1">
        {formOpen ? (
          <ClickAwayListener onClickAway={this.handleCloseForm}>
            <form className="p-16" onSubmit={this.onSubmit}>
              <TextField
                className="mb-16"
                required
                fullWidth
                variant="outlined"
                label="Name"
                autoFocus
                name="title"
                value={this.state.cardTitle}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleCloseForm}>
                        <Icon className="text-18">close</Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <div className="flex justify-between items-center">
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={!this.canBeSubmitted()}
                >
                  Add
                </Button>
              </div>
            </form>
          </ClickAwayListener>
        ) : (
            <Button
              disabled={this.props.chart.isSigned}
              onClick={this.handleOpenForm}
              classes={{
                root: 'normal-case font-600 w-full rounded-none h-48',
                label: 'justify-start'
              }}
            >
              <Icon className="text-20 mr-8">add</Icon>
              Add
          </Button>
          )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addRos: Actions.addRos
    },
    dispatch
  );
}

function mapStateToProps({ Reducer, applicationsReducer }) {
  return {
    ...applicationsReducer.application
  };
}

export default withReducer('Reducer', reducer)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(AddEntity)
  )
);
