import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  FormControlLabel,
  Radio,
  Typography,
  withStyles,
  FormControl,
  InputLabel,
  Grid
} from '@material-ui/core';
import { TextField, Radios, Select } from '../../../../shared-components/Form';

const styles = theme => ({
  layoutRoot: {}
});

class MedicalInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    this.props.getInsuranceName(); 
  }
  render() {
    const { handleChange, pristine, reset, submitting } = this.props;

    return (
      <Card className="mb-16 w-full">
        <CardContent>
          <Typography variant="subtitle1" className="mb-6">Medical Insurance</Typography>
          <form onChange={handleChange}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <div className="form-wrap">
                  <FormControl className="w-full">
                    <InputLabel htmlFor="email">Insurance Provider</InputLabel>
                    <Field
                      component={Select}
                        name="insuranceProvider"
                       
                    >
                      {this.props.getInsurName && this.props.getInsurName.data && this.props.getInsurName.data.map((data, i)=>{
                            return (
                    
                            <option key ={i} value={data._id}>{data.Insurance_Name}</option>
                            )
                           
                          })
                      }
                    </Field>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field
                    className="w-full"
                    component={TextField}
                    name="memberId"
                    label="Member ID"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <Field
                    className="w-full"
                    component={TextField}
                    name="SSN"
                    label="Last 4 (SSN)"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="form-wrap">
                  <FormControl className="w-full">
                    <InputLabel htmlFor="relationship">Primary Member</InputLabel>
                    <Field
                      component={Select}
                      name="isPrimaryMember"
                    >
                      <option value="" />
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="form-wrap">
                  <FormControl className="w-full">
                    <InputLabel htmlFor="relationship">Relationship</InputLabel>
                    <Field
                      component={Select}
                      name="relationship"
                    >
                      <option value="" />
                      <option value="child">Child</option>
                      <option value="spouse">Spouse</option>
                      <option value="dependent">Dependent</option>
                    </Field>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="form-wrap" style={{ marginBottom: 15 }}>
                  <Field component={Radios} name="patientOrPrimaryAddress" className="w-full">
                    {/* <Grid container spacing={24}>
                      <Grid item xs={12} sm={6}> */}
                    <FormControlLabel
                      className="w-full"
                      value="patientAddress"
                      control={<Radio />}
                      label="Use Patient Address"
                    />
                    {/* </Grid>
                      <Grid item xs={12} sm={6}> */}
                    <FormControlLabel
                      className="w-full"
                      value="primaryAddress"
                      control={<Radio />}
                      label="Use Primary Address"
                    />
                    {/* </Grid>
                    </Grid> */}
                  </Field>
                </div>
                <Typography variant="subtitle1" className="mb-6">TODO : Image capture section UI</Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        {/* <CardActions>
          <Button type="submit" variant="contained" color="secondary" size="medium" style={{marginBottom: 10}}>Update</Button>
        </CardActions> */}
      </Card>
    );
  }
}

MedicalInsurance = reduxForm({
  form: 'MedicalInsuranceForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, { autoSave, pristine, dirty }) => {
    if (!pristine || dirty) {
      console.log("value###########~~~~~~~~~~~>", values,"pristine----->",pristine,"dirty--->",dirty)
      // var valObj={
      //   insuranceProvider :values.insuranceProvider,
      //   isPrimaryMember: values.isPrimaryMember,
      //   memberId: values.memberId,
      //   patientOrPrimaryAddress: values.patientOrPrimaryAddress,
      //   relationship: values.relationship
      // }
      autoSave('medicalInsurance', { medicalInsurance: values });
    }
  }
})(MedicalInsurance);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({   
    getInsuranceName: Actions.getInsuranceName
  
  }, dispatch);
}
function mapStateToProps({ patientReducer }) {
  return {
    initialValues: patientReducer.profile.medicalInsurance,
    getInsurName: patientReducer.profile.getInsuranceName,
    // ...patientReducer
  };
}

export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps,mapDispatchToProps)(MedicalInsurance))
  )
);
