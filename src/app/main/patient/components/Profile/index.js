import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reducer from '../../store/reducers';
import * as Actions from './../../store/actions';
import { withStyles, Grid, Button } from '@material-ui/core';

// Components
import PersonalInformation from './PersonalInformation';
import CommunicationPreferences from './CommunicationPreferences';
import MedicalInsurance from './MedicalInsurance';
import VisionInsurance from './VisionInsurance';
import InsuranceDetail from './InsuranceDetail';
import PaymentDetail from './PaymentDetail';
import WaiversAndReleases from './WaiversAndReleases';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  layoutRoot: {}
});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("11",this.props.match.params.patientId)
    if(this.props.match.params.patientId) {
      this.props.getProfile(this.props.match.params.patientId)
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.patientId != prevProps.patientId) {
       this.props.getProfile(this.props.patientId);
    }
  }

  componentWillUnmount() {
    this.props.clearProfile();
  }

  handleSubmit = (node, values) => {
    console.log("node and values", node, values);
    switch (node) {
      case 'personalInformation':
        this.props.updateProfile(values, this.props.patientId)
        break;

      case 'visionInsurance':
        this.props.updateProfile(values, this.props.patientId)
        break;
      case 'medicalInsurance':
        this.props.updateProfile(values, this.props.patientId)
        break;

      case 'insuranceDetail':
        this.props.updateProfile(values, this.props.patientId)
        break;

        case 'communicationPreferences':
        this.props.updateProfile(values, this.props.patientId)
        break;

        case 'paymentDetail':
        this.props.updateProfile(values, this.props.patientId)
        break;

        case 'waiversAndReleases':
            this.props.updateProfile(values, this.props.patientId)
            break;

      default:
        break;
    }
    // console.log('values', values);
    // this.setState({ [node]: values });
    // const payload = {
    //   patient: this.props.patientId,
    //   [node]: values
    // };
    // console.log('payload', payload);

    // this.props.updateProfile(payload);
  };

  onUpdate = () => {
    console.log('values ==> ', this.state);
  };
  render() {
    const { getProfile } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <PersonalInformation
            autoSave={this.handleSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="flex">
          <VisionInsurance
            autoSave={this.handleSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="flex">
          <MedicalInsurance
            autoSave={this.handleSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="flex">
          <CommunicationPreferences
           autoSave={this.handleSubmit}
          // onChange={values => this.handleSubmit('communicationPreferences', values)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="flex">
          <InsuranceDetail
            autoSave={this.handleSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="flex">
          <PaymentDetail 
           autoSave={this.handleSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="flex">
          <WaiversAndReleases autoSave={this.handleSubmit} />
        </Grid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfile: Actions.getProfile,
      updateProfile: Actions.updateProfile,
      clearProfile: Actions.clearProfile
    },
    dispatch
  );
}

function mapStateToProps({ patientReducer, profileReducer }) {
  return {
    ...patientReducer.patient,
    ...profileReducer.patient
  };
}

export default withReducer('profileReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Profile)
    )
  )
);
