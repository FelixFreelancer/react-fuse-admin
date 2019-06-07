import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reducer from './../../store/reducers';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  withStyles
} from '@material-ui/core';
import { TextField, SlideToggle } from './../../../../shared-components/Form';

const styles = theme => ({
  layoutRoot: {}
});

class communicationPreferences extends Component {
  
  render() {
    console.log('initialValues ====> ',this.props.initialValues);
    const { handleChange, pristine, reset, submitting } = this.props;
    return (
      <Card className="mb-16 w-full">
        <form onChange={handleChange}>
          <CardContent>
            <Typography variant="subtitle1" className="mb-6">Communication Preferences</Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <div className="form-wrap">
                  <Field className="w-full mb-4" component={TextField} name="email" label="Email" />
                  <Field component={SlideToggle} name="isEmail" label="On" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="form-wrap">
                  <Field className="w-full mb-4" component={TextField} name="cell" label="Cell" />
                  <Field component={SlideToggle} name="isCell" label="On" />
                </div>
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions>
            <Button type="submit" variant="contained" color="secondary" size="medium" style={{marginBottom: 10}}>
              Update
            </Button>
          </CardActions> */}
        </form>
      </Card>
    );
  }
}

// CommunicationPreferences = reduxForm({
//   form: 'CommunicationPreferencesForm'
// })(CommunicationPreferences);

communicationPreferences = reduxForm({
  form: 'communicationPreferences',
  enableReinitialize: true,
  destroyOnUnmount: true,
  initialValues: {isEmail: true, isCell:true},
  onChange: (values, dispatch, { autoSave, pristine, dirty }) => {
    console.log('values ====> ',values);
    console.log("value###########~~~~~~~~~~~>", values,"pristine----->",pristine,"dirty--->",dirty)
    //if (!pristine || dirty) {
      // var valObj={
      //   email:values.email,
      //   isEmail:values.isEmail
      // }
      autoSave('communicationPreferences', { communicationPreferences: values });
   // }
  }
})(communicationPreferences);

function mapStateToProps({ patientReducer }) {
  // return {
  //   initialValues: {
  //     isEmail: true,
  //     ...patientReducer.profile.communicationPreferences
  //   },
  // }
  return {
    initialValues: patientReducer.profile.communicationPreferences
    
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({   
   // getInsuranceName: Actions.getInsuranceName
  
  }, dispatch);
}
export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(communicationPreferences)
    )
  )
);
