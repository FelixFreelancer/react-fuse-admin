import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import reducer from '../../store/reducers';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  InputAdornment,
  withStyles,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';
import { SlideToggle, Select, TextField } from '../../../../shared-components/Form';
import { Field, reduxForm } from 'redux-form';
const styles = theme => ({
  layoutRoot: {}
});

class PaymentDetail extends Component {
  render() {
  
    const { handleChange, pristine, reset, submitting } = this.props;
    return (
      <Card className="mb-16 w-full">
        <CardContent>
        
          <Typography variant="subtitle1" className="mb-6">Payment Details</Typography>
          <form onChange={handleChange}>
          <Typography>Next Appointment : 02/21/2018</Typography>
          <Typography>Last Appointment : 06/21/2018</Typography>
         
          <Field component={SlideToggle} name="isSelfPay" label="Self Pay" />
          <Field component={Select} className="mb-8" name="insurance">
            {['Glasses', 'Contact Lenses'].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Field>
          <FormControl fullWidth>
            {/* <InputLabel htmlFor="adornment-amount">Amount</InputLabel> */}
            <Field
                    className="w-full"
                    component={TextField}
                    name="amount"
                    label="Amount"
              />
            {/* <Input
              id="adornment-amount"
              name="adornment-amount"
              component={TextField}
              // value={this.state.amount}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            /> */}
          </FormControl>
          </form>
        </CardContent>
     
      
      </Card>
    );
  }
}
PaymentDetail = reduxForm({
  form: 'PaymentDetailForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, { autoSave, pristine, dirty }) => {
    console.log('values ====> ',values);
    if (!pristine || dirty) {
      autoSave('paymentDetail', { paymentDetail: values });
    }
  }
})(PaymentDetail);

function mapStateToProps({ patientReducer }) {
  return {
    initialValues: patientReducer.profile.paymentDetail
    
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
      )(PaymentDetail)
    )
  )
);
// PaymentDetails = reduxForm({
//   form: 'PaymentDetailsForm'
// })(PaymentDetails);

// function mapStateToProps({ profileReducer }) {
//   return {
//     ...profileReducer.patient
//   };
// }

// export default withReducer('Reducer', reducer)(
//   withStyles(styles, { withTheme: true })(
//     withRouter(connect(mapStateToProps, null)(PaymentDetails))
//   )
// );
