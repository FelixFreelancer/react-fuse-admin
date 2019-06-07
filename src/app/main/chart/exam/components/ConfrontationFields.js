import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { bindActionCreators } from 'redux';
import * as Actions from './../../store/actions';
import reducer from './../../store/reducers';

// Material Components + Form Fields
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { Select, TextField } from '../../../../shared-components/Form';
import { CFValues, CFMethodValues } from './../../Values';

const styles = theme => ({
  layoutRoot: {}
});

class ConfrontationFields extends Component {
  render() {
    return (
      <form className="flex flex-wrap mb-24 text-center justify-center">
        <div className="w-full">
          <Card>
            <CardContent className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-32 mb-6 md:mb-0">
                <Typography color="textSecondary" gutterBottom>
                  Confrontation Fields
                </Typography>
                <Divider />

                <div className="w-full max-w-xs">
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3" />
                    <div className="md:w-2/3">
                      <label
                        className="block mb-1 md:mb-0 text-grey-dark mt-16"
                        htmlFor="inline-full-name"
                      >
                        CF
                      </label>
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block md:text-right mb-1 md:mb-0 pr-20 text-grey-dark"
                        htmlFor="inline-full-name"
                      >
                        OD
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <Field disabled={this.props.chart.isSigned} 
                      name="OD" component={Select} className="mb-8">
                        {CFValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block md:text-right mb-1 md:mb-0 pr-20 text-grey-dark"
                        htmlFor="inline-full-name"
                      >
                        OS
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <Field disabled={this.props.chart.isSigned}
                      name="OS" component={Select} className="mb-8">
                        {CFValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block md:text-right mb-1 md:mb-0 pr-20 text-grey-dark"
                        htmlFor="inline-full-name"
                      >
                        Method
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <Field disabled={this.props.chart.isSigned}
                        name="method"
                        component={Select}
                        className="mb-8 w-full"
                      >
                        {CFMethodValues.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-32 mb-6 md:mb-0">
                <Typography color="textSecondary" gutterBottom>
                  Additional test notes
                </Typography>
                <Divider />
                <Field disabled={this.props.chart.isSigned}
                  name="additionalTestNotes"
                  component={TextField}
                  multiline
                  rows="8"
                  className="w-full"
                  margin="normal"
                />
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
    initialValues: applicationsReducer.exam.confrontationFields
  };
}

ConfrontationFields = reduxForm({
  form: 'ConfrontationFieldsForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (
    values,
    dispatch,
    { pristine, dirty, saveExam, chart }
  ) => {
    if (!pristine || dirty) {
      saveExam('confrontationFields', chart._id, values);
    }
  }
})(ConfrontationFields);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ConfrontationFields)
    )
  )
);
