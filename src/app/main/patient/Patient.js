import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple } from '@fuse';
import { Tab, Tabs } from '@material-ui/core';
import { connect } from 'react-redux';

// Components
import * as Actions from './store/actions';
import reducer from './store/reducers';
import Charts from './components/Charts/';
import Profile from './components/Profile/';
import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  layoutRoot: {}
});

class Patient extends Component {
  componentDidMount() {
    const {
      setPatient,
      match: { params }
    } = this.props;
    setPatient(params.patientId);
  }

  componentDidUpdate(prevProps) {
    this.props.setPatient(this.props.match.params.patientId)
  }

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot
        }}
        header={
          <div className="p-24">
            <h4>Patient</h4>
          </div>
        }
        contentToolbar={
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="off"
            className="w-full h-64 border-b-1"
            value={value}
            onChange={this.handleChange}
          >
            <Tab className="h-64" label="Profile" />
            <Tab className="h-64" label="Charts" />
          </Tabs>
        }
        content={
          <div className="p-24">
            {value === 0 && <Profile />}
            {value === 1 && <Charts />}
          </div>
        }
      />
    );
  }
}

function mapStateToProps({ patientReducer }) {
  return {
    ...patientReducer.patient
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setPatient: Actions.setPatient
    },
    dispatch
  );
}

export default withReducer('patientReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Patient)
  )
);
