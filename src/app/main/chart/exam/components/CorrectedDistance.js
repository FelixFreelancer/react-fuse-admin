import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';

// Material Components + Form Fields
import { Field, reduxForm } from 'redux-form';
import { Paper, Divider, Typography } from '@material-ui/core';
import { Select, TextField } from '../../../../shared-components/Form';

import { VisualAccuityValues } from '../../Values';

const styles = theme => ({
  layoutRoot: {}
});

class CorrectedDistance extends Component {
  render() {
    return (
      <Paper className="flex flex-wrap mb-24 p-16 text-center">
        <div className="w-full md:w-1/2">
          <div className="mr-16">
            <Typography color="textSecondary" gutterBottom>
              Corrected Distance Visual Accuity
            </Typography>
            <Divider />
            <div className="w-full max-w-md my-24">
              <div className="flex flex-wrap mb-12 text-center text-grey-dark">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0" />
                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <p>VA</p>
                </div>
              </div>

              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 text-grey-dark">
                  <p>OD</p>
                </div>

                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <Field disabled={this.props.chart.isSigned}
                  name="OD.VAL" component={Select} className="mb-8">
                    {VisualAccuityValues.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <span className="mx-24">/</span>
                  <Field disabled={this.props.chart.isSigned}
                  name="OD.VAR" component={Select} className="mb-8">
                    {VisualAccuityValues.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 text-grey-dark">
                  <p>OS</p>
                </div>

                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <Field disabled={this.props.chart.isSigned}
                  name="OS.VAL" component={Select} className="mb-8">
                    {VisualAccuityValues.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <span className="mx-24">/</span>
                  <Field disabled={this.props.chart.isSigned}
                  name="OS.VAR" component={Select} className="mb-8">
                    {VisualAccuityValues.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>

              <div className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 text-grey-dark">
                  <p>OU</p>
                </div>

                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <Field disabled={this.props.chart.isSigned}
                  name="OU.VAL" component={Select} className="mb-8">
                    {VisualAccuityValues.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <span className="mx-24">/</span>
                  <Field disabled={this.props.chart.isSigned}
                  name="OU.VAR" component={Select} className="mb-8">
                    {VisualAccuityValues.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="ml-16">
            <Typography color="textSecondary" gutterBottom>
              Additional Test Note
            </Typography>
            <Divider />
            <div className="w-full max-w-md my-8">
              <Field disabled={this.props.chart.isSigned}
                name="additionalTestNotes"
                component={TextField}
                multiline
                rows="8"
                className="w-full"
                margin="normal"
                helperText="Color test, RGP Notes etc..."
              />
            </div>
          </div>
        </div>
      </Paper>
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
    initialValues: applicationsReducer.exam.correctedDistanceVa
  };
}

CorrectedDistance = reduxForm({
  form: 'CorrectedDistanceForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, props) => {
    if (!props.pristine || props.dirty) {
      props.saveExam('correctedDistanceVa', props.chart._id, values);
    }
  }
})(CorrectedDistance);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(CorrectedDistance)
    )
  )
);
