import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import reducer from './../store/reducers';
import { bindActionCreators } from 'redux';
import * as Actions from './../store/actions';
import _ from 'lodash'
// Material Components + Form Fields
import { Field, FieldArray, reduxForm } from 'redux-form';
import {
  TextField,
  SlideToggle,
  Radios
} from '../../../shared-components/Form';
import TypeAheadField from './../../../shared-components/DownShift';

// Material Components
import {
  Card,
  Button,
  CardContent,
  Divider,
  Typography,
  Radio,
  FormControlLabel,
  Fab,
  Icon
} from '@material-ui/core';

const styles = theme => ({
  layoutRoot: {}
});

const renderCPT = ({ fields, meta, items,...rest }) => (
  <section>
    <div className="md:flex md:items-center justify-center mb-6">
      <div className="md:w-1/2">
        {

          console.log("rest",rest)
           
        }
      {/* <TypeAheadField
            placeholder="Eg: 99203"
            textFieldClassName="w-full p-16"
            name="CPT0"
            items={items}
            fields={fields}
            key={0}
            index={0}
          /> */}
        {fields.map((member, index) => (
          <>
          <TypeAheadField
            placeholder="Eg: 99203"
            textFieldClassName="w-full p-16"
            name={member}
            items={items}
            fields={fields}
            key={index}
            index={index}
          />
          { console.log("member = > ",member)
           }
          </>

        ))}
      </div>
    </div>

    <div className="flex justify-end my-24">
      <Fab
        size="small"
        color="secondary"
        aria-label="Add"
        className="mx-12"
        onClick={() => fields.push()}
      >
        <Icon>add</Icon>
      </Fab>
    </div>
  </section>
);

class Bill extends Component {
  constructor(props) {
    super(props);
  }
  // componentWillMount() {
  //  // this.props.getBill(this.props.activePatientId);

  //   //  fields.push(this.props.getCTPData.data)
  // }
  componentDidMount() {
    this.props.getBill(this.props.activeId.chart._id);
    this.props.getCPT();
  }
  render() {
    var items = [];
    this.props.getCTPData && this.props.getCTPData.data && this.props.getCTPData.data.map((val, i) => {
      items.push(val.CPT_Name)
    });
    console.log("activeId~~~~~~~~~~~~~~~>", this.props.activeId.patient._id)
    return (
      <div className="p-12">
        <Typography variant="h5">Bill</Typography>
        <Divider className="my-24" />

        <form className="flex flex-wrap justify-center mb-24">
          <div className="w-full md:w-2/3">
            <Card>
              <CardContent>
                <Typography
                  className="text-center"
                  color="textSecondary"
                  gutterBottom
                >
                  CPT
                </Typography>
                <Divider />
                <div className="w-full max-w-md my-24">
                  <FieldArray name="CPT" component={renderCPT} props={items} items={items} />

                  <Divider className="my-12" />

                  <div className="flex flex-wrap mb-6">
                    <div
                      className="md:w-1/3 text-center"
                      style={{ paddingTop: '20px' }}
                    >
                      <Field
                        component={SlideToggle}
                        label="Paid"
                        name="isPaid"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <Field
                        name="amount"
                        component={TextField}
                        type="number"
                        label="Amount"
                        margin="normal"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center mb-6 mt-32">
                    <div className="md:w-1/3" />
                    <Field
                      name="paymentMode"
                      component={Radios}
                      row={true}
                      className="md:w-2/3"
                    >
                      {['Cash', 'Credit Card', 'Insurance'].map(
                        (option, index) => (
                          <FormControlLabel
                            value={option}
                            key={index}
                            control={<Radio />}
                            label={option}
                          />
                        )
                      )}
                    </Field>
                  </div>

                  <div className="flex flex-wrap mb-6">
                    <div
                      style={{ paddingTop: '27px' }}
                      className="md:w-1/3 text-center"
                    >
                      <Field
                        component={SlideToggle}
                        name="isBilledInsurance"
                        label="Billed Insurance"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <Field
                        name="confirmationCode"
                        component={TextField}
                        id="filled-multiline-flexiblea"
                        label="Confirmation Code"
                        margin="normal"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
        <div className="flex justify-between mt-32">
          <Link to={`/chart/${this.props.chart._id}/ap`}>
            <Button variant="contained">Back</Button>
          </Link>
          <Link to={`/search`}>
            <Button variant="contained" color="primary">
              Complete
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

Bill = reduxForm({
  form: 'BillForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, { pristine, dirty, saveBill, chart }) => {
    var valueObj = {
      CPT:values.CPT,
      amount: values.amount,
      chart: values.chart,
      confirmationCode: values.confirmationCode,
      isBilledInsurance:values.isBilledInsurance,
      paymentMode:values.paymentMode,
      isPaid:values.isPaid

      // CPT:values.CPT
    }
    if (!pristine || dirty) {
      saveBill(valueObj, chart._id,);
    }
    // if (!pristine || dirty) {


    //   saveBill(values, chart._id);
    // }
  }
})(Bill);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBill: Actions.getBill,
      saveBill: Actions.saveBill,
      getCPT: Actions.getCPT
    },
    dispatch
  );
}

function mapStateToProps({ applicationsReducer }) {
  return {
    ...applicationsReducer.application,
    activeId:applicationsReducer.application,
    initialValues: applicationsReducer.bill,
    getCTPData: applicationsReducer.bill.getCTPVal
  };
}

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Bill)
    )
  )
);
