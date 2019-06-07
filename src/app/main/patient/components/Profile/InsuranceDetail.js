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
  withStyles
} from '@material-ui/core';
import { TextField, Select, Radios } from '../../../../shared-components/Form';

const styles = theme => ({
  layoutRoot: {}
});

class InsuranceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  render() {
    const { handleChange, pristine, reset, submitting } = this.props;
    return (
      <Card className="mb-16 w-full">
        <CardContent>
          <Typography variant="subtitle1" className="mb-6">Insurance Detail</Typography>
          <form className="w-full"  onChange={handleChange}>
            <div className="w-full py-6 mb-6 md:mb-0">
              <Field
                className="w-full"
                component={TextField}
                name="authorizationNumber"
                label="Authorization Number"
              />
            </div>
            <div className="w-full py-3 mb-6 md:mb-0">
              <Field
                className="w-full"
                component={TextField}
                name="confirmationNumber"
                label="Confirmation Number"
              />
            </div>
            {/* <div className="flex mb-6">
              
             
            </div> */}
          </form>
        </CardContent>
        {/* <CardActions>
          <Button type="submit" variant="contained" color="secondary" size="medium" style={{marginBottom: 10}}>Update</Button>
        </CardActions> */}
      </Card>
    );
  }
}

// InsuranceDetail = reduxForm({
//   form: 'InsuranceDetailForm',
//   enableReinitialize: true,
//   destroyOnUnmount: true,
//   onChange: (values, dispatch, { autoSave, pristine, dirty }) => {
//     if (!pristine || dirty) {
//       autoSave('insuranceDetail', { insuranceDetail: values });
//     }
//   }

// })(InsuranceDetail);

InsuranceDetail = reduxForm({
  form: 'InsuranceDetailForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, { autoSave, pristine, dirty }) => {
    console.log('values ====> ',values);
    if (!pristine || dirty) {
      autoSave('insuranceDetail', { insuranceDetail: values });
    }
  }
})(InsuranceDetail);

function mapStateToProps({ patientReducer }) {
  return {
    initialValues: patientReducer.profile.insuranceDetail
    
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
      )(InsuranceDetail)
    )
  )
);
// function mapStateToProps({ patientReducer }) {
//   return {
//     // initialValues: patientReducer.profile
//     initialValues: patientReducer.profile.InsuranceDetail,

//   };
// }

// export default withReducer('Reducer', reducer)(
//   withStyles(styles, { withTheme: true })(
//     withRouter(connect(mapStateToProps)(InsuranceDetail))
//   )
// );
