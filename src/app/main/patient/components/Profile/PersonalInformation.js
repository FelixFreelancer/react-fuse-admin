import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reducer from './../../store/reducers';
import * as Actions from './../../store/actions';
import { bindActionCreators } from 'redux';
import moment from 'moment'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  withStyles,

  FormControl,
  InputLabel,
  Grid
} from '@material-ui/core';
import { reduxForm, isDirty, Field } from 'redux-form';
import { states } from './../../../chart/Values';
import { TextField, Select } from './../../../../shared-components/Form';

const styles = theme => ({
  layoutRoot: {},
  card: {
    cardActions: {
      borderTop: '1px solid black'
    }
  }
});

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  // componentDidMount() {
  //   console.log("componentDidMount  edit mode=>",this.props.match.params.patientId)
  //   if(this.props.match.params.patientId) {
  //     this.props.getProfile(this.props.match.params.patientId)
  //   }
  // }

  onChange(values) {
    console.log('ffdf');
    // Check if the form values have changed since the last submit
    // The dirty boolean (signifies if the form has changed from its initial values) is established by redux-form by comparing the currently entered values to the initial form values
    // After we identify the form as having been changed, we will send the new form values to replace the original initial form values so redux-form is always comparing the current form values against the last submitted form values
    if (this.props.dirty) {
      // Set the initial values for the form on the redux store (This is used by redux form to compare the current values to the initial values so we can determine if there are new values since the last submit)
      this.props.initialize(values);
    }
  }

  render() {
    const { classes, handleChange, pristine, reset, submitting, autoSave } = this.props;
    console.log('this.props.initialValues ====> ', this.props.initialValues);
    return (
      <Card className="mb-16 w-full">
        <form>
          <CardContent>
            <Typography variant="subtitle1" className="mb-6">Personal Information</Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field
                    className="w-full"
                    component={TextField}
                    name="firstName"
                    label="First Name"
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
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field
                    className="w-full"
                    component={TextField}
                    name="address1"
                    label="Address 1"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field
                    className="w-full"
                    component={TextField}
                    name="address2"
                    label="Address 2"
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
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>

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
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field className="w-full" component={TextField} name="city" label="City" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <FormControl className="w-full">
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Field
                      component={Select}
                      name="state"
                    >
                      <option value="" />
                      {states.map((state, index) => (
                        <option key={index} value={state.code}>{state.name}</option>
                      ))}

                    </Field>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} style={{ marginBottom: 30 }}>
                <div className="form-wrap">
                  <Field className="w-full" component={TextField} name="zip" label="Zip" />
                </div>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" className="mb-0">Primary Member Address</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field
                    className="w-full"
                    component={TextField}
                    name="primary.address1"
                    label="Address 1"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field
                    className="w-full"
                    component={TextField}
                    name="primary.address2"
                    label="Address 2"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field className="w-full" component={TextField} name="primary.city" label="City" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <FormControl className="w-full">
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Field
                      component={Select}
                      name="primary.state"
                    >
                      <option value="" />
                      {states.map((state, index) => (
                        <option key={index} value={state.code}>{state.name}</option>
                      ))}

                    </Field>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4} style={{ marginBottom: 30 }}>
                <div className="form-wrap">
                  <Field className="w-full" component={TextField} name="primary.zip" label="Zip" />
                </div>
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions className={classes.card.cardActions}>
            <Button type="submit" variant="contained" color="secondary" size="medium" style={{marginBottom: 10}}>
              Update
            </Button>
          </CardActions> */}
        </form>
      </Card>
    );
  }
}

PersonalInformation = reduxForm({
  form: 'PatientInformationForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, { autoSave, pristine, dirty }) => {
    if (!pristine || dirty) {
      autoSave('personalInformation', values);
    }
  }
})(PersonalInformation);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProfile: Actions.getProfile,
      // updateProfile: Actions.updateProfile,
      // clearProfile: Actions.clearProfile
    },
    dispatch
  );
}
// function mapStateToProps({ patientReducer }) {
//   // // console.log(" personalInformation", patientReducer.profile)
//   console.log('patientReducer.profile.getPatientInfo ====> ',patientReducer.profile.getPatientInfo);
//   return {
//     initialValues: patientReducer.profile.getPatientInfo,
//     //getInsurName: patientReducer.profile.getInsuranceName,
//     // ...patientReducer
//   };
// }

function mapStateToProps({ patientReducer }) {
  console.log('patientReducer ====> ', patientReducer);
  const {

    address1,
    address2,
    zip,
    city,
    gender,
    state,
    dob,
    primary, user } = patientReducer.profile; //TODO

  var temp = {
    primary, address1, address2,
    zip,
    gender,
    state,
    dob: moment(dob).format('YYYY-MM-DD'),
    city,
    ...user,
  }
  console.log('temp ====> ', temp);
  return {
    initialValues: temp
  };
}

export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps,mapDispatchToProps )(PersonalInformation))
  )
);
