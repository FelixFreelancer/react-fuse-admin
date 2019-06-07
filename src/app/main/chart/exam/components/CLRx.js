import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from './../../store/reducers';

// Material Components + Values
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { Select } from '../../../../shared-components/Form';
import { SphereValues, CylinderValues, AxisValues } from './../../Values';

const styles = theme => ({
  layoutRoot: {}
});

class CLRx extends Component {
  render() {
    return (
      <form className="flex flex-wrap mb-24 text-center">
        <div className="w-full md:w-1/1">
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                CL Exam
              </Typography>
              <Divider />
              <div className="w-full mt-24">
                <div className="flex flex-wrap mb-6 text-center text-grey-darker">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0" />
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p>Sphere</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p>Cylinder</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p>Axis</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p>Add</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p>Base Curve</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p>Dia</p>
                  </div>
                  <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <p>Brand</p>
                  </div>
                </div>

                <div className="flex content-center flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p className="leading-loose text-grey-darker">OD</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field name="OD.sphere" component={Select} className="mb-8">
                      {SphereValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.cylinder"
                      component={Select}
                      className="mb-8"
                    >
                      {CylinderValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field name="OD.axis" component={Select} className="mb-8">
                      {AxisValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.add"
                      component="input"
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
                      name="OD.baseCurve"
                      component="input"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose"
                      name="OD.dia"
                      component="input"
                    />
                  </div>

                  <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <Field
                      className="w-full border border-grey-dark px-6 leading-loose rounded"
                      name="OD.brand"
                      component="input"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <p className="leading-loose text-grey-darker">OS</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field name="OS.sphere" component={Select} className="mb-8">
                      {SphereValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.cylinder"
                      component={Select}
                      className="mb-8"
                    >
                      {CylinderValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field name="OS.axis" component={Select} className="mb-8">
                      {AxisValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
                      name="OS.add"
                      component="input"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      className="w-2/3 border border-grey-dark px-3 rounded leading-loose mx-3"
                      name="OS.baseCurve"
                      component="input"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose"
                      name="OS.dia"
                      component="input"
                    />
                  </div>

                  <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <Field
                      className="w-full border border-grey-dark px-6 rounded leading-loose"
                      name="OS.brand"
                      component="input"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ Reducer }) {
  return {
    ...Reducer.application,
    initialValues: Reducer.exam.CLRx
  };
}

CLRx = reduxForm({
  form: 'CLRxForm'
})(CLRx);

export default withReducer('Reducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps)(CLRx))
  )
);
