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

const styles = theme => ({
  layoutRoot: {}
});

class EOM extends Component {
  render() {
    return (
      <form className="flex flex-wrap mb-24">
        <div className="w-full md:w-1/2">
          <Card className="mr-16">
            <CardContent>
              <Typography
                className="text-center"
                color="textSecondary"
                gutterBottom
              >
                EOM
              </Typography>
              <Divider />
              <div className="w-full max-w-md my-8">
                <div className="w-full max-w-xs mt-16">
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block md:text-right mb-1 md:mb-0 pr-20 text-grey-dark"
                        htmlFor="inline-full-name"
                      >
                        EOM
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <Field disabled={this.props.chart.isSigned}
                        name="eom"
                        component={Select}
                        className="mb-8 w-full"
                      >
                        {['Full & Smooth', 'Restriction'].map(
                          (option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mx-32 mt-32 pt-32 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Additional Text Notes
                  </label>

                  <Field disabled={this.props.chart.isSigned}
                    name="eomAdditionalTextNote"
                    multiline
                    rows="8"
                    component={TextField}
                    className="w-full"
                    margin="normal"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/2">
          <Card className="ml-16">
            <CardContent>
              <Typography
                className="text-center"
                color="textSecondary"
                gutterBottom
              >
                Pupils
              </Typography>
              <Divider />
              <div className="w-full max-w-md my-8">
                <div className="w-full mt-16">
                  <div className="md:flex md:items-center mb-6 w-full">
                    <div className="md:w-1/3">
                      <label
                        className="block md:text-right mb-1 md:mb-0 pr-20 text-grey-dark"
                        htmlFor="inline-full-name"
                      >
                        PERRL
                      </label>
                    </div>
                    <div className="md:w-1/3">
                      <Field disabled={this.props.chart.isSigned}
                        name="pupils"
                        component={Select}
                        className="mb-8 w-full"
                      >
                        {['+', '-'].map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div className="md:w-1/3">
                      <label
                        className="block md:text-left mb-1 md:mb-0 pl-20 text-grey-dark"
                        htmlFor="inline-full-name"
                      >
                        APD
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mx-32 mt-32 pt-32 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Additional Text Notes
                  </label>

                  <Field disabled={this.props.chart.isSigned}
                    name="pupilsAdditionalTextNote"
                    multiline
                    component={TextField}
                    rows="8"
                    className="w-full"
                    margin="normal"
                  />
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
    initialValues: applicationsReducer.exam.eom
  };
}

EOM = reduxForm({
  form: 'EOMForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
  onChange: (
    values,
    dispatch,
    { pristine, dirty, saveExam, chart }
  ) => {
    if (!pristine || dirty) {
      saveExam('eom', chart._id, values);
    }
  }
})(EOM);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(EOM)
    )
  )
);
