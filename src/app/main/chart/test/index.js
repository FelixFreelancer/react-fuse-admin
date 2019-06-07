import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';
import reducer from './../store/reducers';
import * as Actions from './../store/actions';
import * as moment from 'moment';
import {TextField } from '../../../shared-components/Form';

// Material Components + Form Fields
import { Field, reduxForm } from 'redux-form';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Button
} from '@material-ui/core';
import { Select } from '../../../shared-components/Form';

import {
  AxisValues,
  IOPValues,
  SphereValues,
  CylinderValues
} from './../Values';

const styles = theme => ({
  layoutRoot: {}
});

class Test extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getTest(this.props.chart._id);
  }
  
  render() {
    const { time, chart } = this.props;
    //const { change, handleSubmit, selectedUnits = [], units } = props;
    console.log("props###### ===", this.props)
    return (
      <div className="p-12">
        <Typography variant="h5">Test</Typography>
        <Divider className="my-24" />

        <form className="flex flex-wrap mb-24 text-center">
          <div className="w-full md:w-1/2" disabled={chart.isSigned}>
            {/* <fieldset disabled={chart.isSigned} className="w-full"> */}
            <Card style={{ marginRight: '10px' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Autorefraction
                </Typography>
                <Divider />
                <div className="w-full max-w-md my-24">
                  <div className="flex flex-wrap mb-12">
                    <div className="w-full md:w-1/3 px-3 md:mb-0 text-grey-dark">
                      <p style={{ lineHeight: '30px' }}>Sphere</p>
                    </div>
                    <div className="w-full md:w-1/3 px-3 md:mb-0 border-r">
                      <Field disabled={this.props.chart.isSigned}
                        name="OD.sphere" component={Select}>
                        {SphereValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option > 0
                              ? `+${option.toFixed(2)}`
                              : option.toFixed(2)}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className="w-full md:w-1/3 px-3 md:mb-0">
                      <Field disabled={this.props.chart.isSigned}
                        name="OS.sphere" component={Select}>
                        {SphereValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option > 0
                              ? `+${option.toFixed(2)}`
                              : option.toFixed(2)}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-12">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 text-grey-dark">
                      <p style={{ lineHeight: '30px' }}>Cylinder</p>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 border-r">
                      <Field disabled={this.props.chart.isSigned}
                        name="OD.cylinder" component={Select}>
                        {CylinderValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option > 0
                              ? `+${option.toFixed(2)}`
                              : option.toFixed(2)}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <Field disabled={this.props.chart.isSigned}
                        name="OS.cylinder" component={Select}>
                        {CylinderValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option > 0
                              ? `+${option.toFixed(2)}`
                              : option.toFixed(2)}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div className="flex flex-wrap  mb-12">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 text-grey-dark">
                      <p style={{ lineHeight: '30px' }}>Axis</p>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 border-r">
                      <Field disabled={this.props.chart.isSigned}
                        name="OD.axis" component={Select}>
                        {AxisValues.map((option, index) => (
                          <option key={index} value={option}>
                            {('00' + option).slice(-3)}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <Field disabled={this.props.chart.isSigned}
                        name="OS.axis" component={Select}>
                        {AxisValues.map((option, index) => (
                          <option key={index} value={option}>
                            {('00' + option).slice(-3)}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div className="flex flex-wrap my-24">
                    <div className="w-full md:w-1/3 px-3 md:mb-0">
                    </div>
                    <div className="w-full md:w-1/3 px-3 md:mb-0 text-grey-dark">
                      OD
                    </div>
                    <div className="w-full md:w-1/3 px-3 md:mb-0 text-grey-dark">
                      OS
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardActions />
            </Card>
          </div>
          <div className="w-full md:w-1/2">
            <Card style={{ marginLeft: '10px' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Intraocular Pressure
                </Typography>
                <Divider />
                <div className="w-full max-w-md my-24">
                  <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 text-grey-dark">
                      <p style={{ lineHeight: '30px' }}>IOP</p>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 border-r">
                      <Field disabled={this.props.chart.isSigned}
                        name="OD.iop" component={Select}>
                        {IOPValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <div className="mt-6 text-grey-dark">OD</div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <Field disabled={this.props.chart.isSigned}
                        name="OS.iop" component={Select}>
                        {IOPValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <div className="mt-6 text-grey-dark">OS</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap my-24">
                    <div className="w-full md:w-1/3 px-3 md:mb-0 text-grey-dark">
                      <p style={{ lineHeight: '30px' }}>method</p>
                    </div>
                    <div className="w-full md:w-1/3 px-3 md:mb-0">
                      <Field disabled={this.props.chart.isSigned}
                        name="method" component={Select}>
                        {['NCT', 'GAT', 'FT', 'Tonopen', 'iCare'].map(
                          (option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </Field>
                    </div>
                    <div className="w-full md:w-1/3 px-3 md:mb-0 text-grey-dark">
                      {/* {moment(time).format('LL')} */}
                      {moment.utc(time).format('MM/DD/YYYY HH:mm:ss')}
                      {/* <Field
                      name="time"
                      component={TextField}
                      className="w-full"
                      margin="normal"
                    /> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>

        <div className="flex justify-between">
          <Link to={`/chart/${this.props.chart._id}/ros`}>
            <Button variant="contained">Back</Button>
          </Link>
          <Link to={`/chart/${this.props.chart._id}/exam`}>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

Test = reduxForm({
  form: 'TestForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, props,previousValue) => {
    console.log("values~~~~~~~>", values)
    if (props.dirty) {
      if(values.OD.iop !== previousValue.OD.iop){
      props.change('time', moment.utc(values.time).format('MM/DD/YYYY HH:mm:ss'));
      }
      props.saveTest(values, props.chart._id);
      
    }
  }
})(Test);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTest: Actions.getTest,
      saveTest: Actions.saveTest,
     // updateField: (field, data) => change( "time", field, moment.utc(time).format('MM/DD/YYYY HH:mm:ss') )
    },
    dispatch
  );
}

function mapStateToProps({ applicationsReducer }) {
  return {
    ...applicationsReducer.application,
    initialValues: applicationsReducer.test,
    time: applicationsReducer.test.time
  };
}

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Test)
    )
  )
);
