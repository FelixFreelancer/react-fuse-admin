import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import * as Actions from './../../store/actions';
import reducer from './../../store/reducers';
import { bindActionCreators } from 'redux';

// Material Components + Form Fields
import { Paper, Divider, Typography } from '@material-ui/core';
import { Select, TextField } from '../../../../shared-components/Form';

// Form Values
import {
  AxisValues,
  AddValues,
  SphereValues,
  CylinderValues
} from './../../Values';

const styles = theme => ({
  layoutRoot: {}
});

class HabitualRx extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    return this.state.isLoading ? (
      'loading'
    ) : (
        <form>
          <fieldset disabled={this.props.chart.isSigned}>
            <Paper className="flex flex-wrap p-16 mb-24 text-center">
              <div className="w-full md:w-1/2">
                <div className="mr-16">
                  <Typography color="textSecondary" gutterBottom>
                    Chief Complaint
                </Typography>
                  <Divider />
                  <div className="w-full max-w-md my-8">
                    <Field
                      name="chiefComplaint"
                      component={TextField}
                      multiline
                      rows="8"
                      className="w-full"
                      margin="normal"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="ml-16">
                  <Typography color="textSecondary" gutterBottom>
                    Habitual Rx
            </Typography>
                  <Divider />
                  <div className="w-full max-w-md my-24">
                    <div className="flex flex-wrap mb-6 text-center text-grey-dark">
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0" />
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <p>Sphere</p>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <p>Cylinder</p>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <p>Axis</p>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <p>Add</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-6">
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 text-grey-dark">
                        <p>OD</p>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
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
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <Field disabled={this.props.chart.isSigned}
                        name="OD.cylinder" component={Select} className="mb-8">
                          {CylinderValues.map((option, index) => (
                            <option key={index} value={option}>
                              {option > 0
                                ? `+${option.toFixed(2)}`
                                : option.toFixed(2)}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <Field disabled={this.props.chart.isSigned}
                        name="OD.axis" component={Select} className="mb-8">
                          {AxisValues.map((option, index) => (
                            <option key={index} value={option}>
                              {('00' + option).slice(-3)}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <Field disabled={this.props.chart.isSigned}
                        name="OD.add" component={Select} className="mb-8">
                          {AddValues.map((option, index) => (
                            <option key={index} value={option}>
                              {option > 0
                                ? `+${option.toFixed(2)}`
                                : option.toFixed(2)}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-6">
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 text-grey-dark">
                        <p>OS</p>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
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
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <Field disabled={this.props.chart.isSigned}
                        name="OS.cylinder" component={Select} className="mb-8">
                          {CylinderValues.map((option, index) => (
                            <option key={index} value={option}>
                              {option > 0
                                ? `+${option.toFixed(2)}`
                                : option.toFixed(2)}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <Field disabled={this.props.chart.isSigned}
                        name="OS.axis" component={Select} className="mb-8">
                          {AxisValues.map((option, index) => (
                            <option key={index} value={option}>
                              {('00' + option).slice(-3)}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <Field disabled={this.props.chart.isSigned}
                        name="OS.add" component={Select} className="mb-8">
                          {AddValues.map((option, index) => (
                            <option key={index} value={option}>
                              {option > 0
                                ? `+${option.toFixed(2)}`
                                : option.toFixed(2)}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </fieldset>
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
    initialValues: applicationsReducer.exam.habitualRx
  };
}

HabitualRx = reduxForm({
  form: 'HabitualRxForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, props) => {
    if (!props.pristine || props.dirty) {
      props.saveExam('habitualRx', props.chart._id, values);
    }
  }
})(HabitualRx);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(HabitualRx)
    )
  )
);
