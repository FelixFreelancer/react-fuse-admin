import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';
import * as Actions from './../../store/actions';
import reducer from './../../store/reducers';

// Material Components
import { Field, reduxForm } from 'redux-form';

// Material Components + Form Fields
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { Select, TextField } from '../../../../shared-components/Form';

// Values
import { SphereValues, CylinderValues, AxisValues } from './../../Values';

const styles = theme => ({
  layoutRoot: {}
});

class HabitualCLRx extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <form
        onChange={handleChange}
        className="flex flex-wrap mb-24 text-center"
      >
        <div className="w-full md:w-1/1">
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Habitual CL Rx
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
                    <Field disabled={this.props.chart.isSigned}
                    name="OD.sphere" component={Select} className="mb-8">
                      {SphereValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option > 0
                            ? `+${option.toFixed(2)}`
                            : option.toFixed(2)}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      name="OD.cylinder"
                      component={Select}
                      className="mb-8"
                    >
                      {CylinderValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option > 0
                            ? `+${option.toFixed(2)}`
                            : option.toFixed(2)}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                    name="OD.axis" component={Select} className="mb-8">
                      {AxisValues.map((option, index) => (
                        <option key={index} value={option}>
                          {('00' + option).slice(-3)}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      name="OD.add"
                      component="input"
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
                      name="OD.baseCurve"
                      component="input"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      className="w-2/3 border border-grey-dark border-grey-dark px-6 rounded leading-loose"
                      name="OD.dia"
                      component="input"
                    />
                  </div>

                  <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
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
                    <Field disabled={this.props.chart.isSigned}
                    name="OS.sphere" component={Select} className="mb-8">
                      {SphereValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option > 0
                            ? `+${option.toFixed(2)}`
                            : option.toFixed(2)}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      name="OS.cylinder"
                      component={Select}
                      className="mb-8"
                    >
                      {CylinderValues.map((option, index) => (
                        <option key={index} value={option}>
                          {option > 0
                            ? `+${option.toFixed(2)}`
                            : option.toFixed(2)}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                    name="OS.axis" component={Select} className="mb-8">
                      {AxisValues.map((option, index) => (
                        <option key={index} value={option}>
                          {('00' + option).slice(-3)}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
                      name="OS.add"
                      component="input"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      className="w-2/3 border border-grey-dark px-3 rounded leading-loose mx-3"
                      name="OS.baseCurve"
                      component="input"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
                      className="w-2/3 border border-grey-dark px-6 rounded leading-loose"
                      name="OS.dia"
                      component="input"
                    />
                  </div>

                  <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <Field disabled={this.props.chart.isSigned}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveExam: Actions.saveExam
    },
    dispatch
  );
}

function mapStateToProps({ applicationsReducer }) {
  return {
    ...applicationsReducer.application,
    initialValues: applicationsReducer.exam.habitualCLRx
  };
}

HabitualCLRx = reduxForm({
  form: 'HabitualCLRxForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, props) => {
    if (!props.pristine || props.dirty) {
      props.saveExam('habitualCLRx', props.chart._id, values);
    }
  }
})(HabitualCLRx);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(HabitualCLRx)
    )
  )
);
