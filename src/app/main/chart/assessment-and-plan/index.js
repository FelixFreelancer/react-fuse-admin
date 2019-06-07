import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import reducer from './../store/reducers';

import { bindActionCreators } from 'redux';
import * as Actions from './../store/actions';

// Material Components + Form Fields
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from '../../../shared-components/Form';

// Material Components
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
  Switch
} from '@material-ui/core';
const styles = theme => ({
  layoutRoot: {}
});

class AssessmentAndPlan extends Component {
  constructor(props) {
    super(props);
    this.addToPlan = this.addToPlan.bind(this);
  }

  addToPlan() {
   // console.log(this.props.diagnosis, this.props.plan, 'sharan');
    this.props.change('plan', `${this.props.plan}\n${this.props.diagnosis}`);
  }

  toggleSigned = (event) => {
    console.log(event.target.checked);
    const isSigned = event.target.checked;
    this.props.signChart(isSigned, this.props.chart._id);
  }

  componentWillMount() {
    this.props.getAp(this.props.chart._id);
  }
  render() {
    console.log("Harsha", this.props.chart);
    return (
      <div className="p-12">
        <Typography variant="h5">Assessment and Plan</Typography>
        <Divider className="my-24" />

        <form className="flex flex-wrap mb-24">
          <div className="w-full md:w-1/2">
            <Card className="mr-16">
              <CardContent>
                <Typography
                  className="text-center"
                  color="textSecondary"
                  gutterBottom
                >
                  Assessment
                </Typography>
                <Divider />
                <div className="w-full max-w-md my-24">
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block md:text-right mb-1 md:mb-0 pr-20 text-grey-dark"
                        htmlFor="inline-full-name"
                      >
                        Diagnosis
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <Field
                        disabled={this.props.chart.isSigned}
                        component={TextField}
                        name="diagnosis"
                        margin="normal"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end my-24">
                    <Button
                      onClick={this.addToPlan}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Add to Plan
                    </Button>
                  </div>

                  <Divider className="my-12" />
                  <div className="flex flex-wrap mb-6">
                    <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-grey-dark">
                      <Typography color="textSecondary" gutterBottom>
                        Plan
                      </Typography>
                      <div className="w-full max-w-md my-8">
                        <Field
                          component={TextField}
                          name="plan"
                          rows="8"
                          multiline
                          disabled={this.props.chart.isSigned}
                          className="w-full border"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/2">
            <Card className="ml-16">
              <CardContent>
                <div className="w-full max-w-md my-24">
                  <div className="flex flex-wrap mb-6">
                    <div
                      style={{ lineHeight: '46px' }}
                      className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-right"
                    >
                      <p>Unsigned</p>
                    </div>
                    <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center">
                      <Switch
                        onChange={this.toggleSigned}
                        checked={this.props.chart.isSigned}
                      />
                    </div>
                    <div
                      style={{ lineHeight: '46px' }}
                      className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-left"
                    >
                      <p>Signed</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap mb-6 mt-24 text-grey-dark">
                    <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                      <img src="https://qph.fs.quoracdn.net/main-qimg-2248bdd01f82b9fb9becdc4bd9a92c53" />
                    </div>
                    <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                      <p>August 4th, 2018</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
        <div className="flex justify-between mt-32">
          <Link to={`/chart/${this.props.chart._id}/exam`}>
            <Button variant="contained">Back</Button>
          </Link>
          <Link to={`/chart/${this.props.chart._id}/bill`}>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

AssessmentAndPlan = reduxForm({
  form: 'APForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, props) => {
    if (!props.pristine || props.dirty) {
      props.saveAp(values, props.chart._id);
    }
  }
})(AssessmentAndPlan);

const selector = formValueSelector('APForm');

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAp: Actions.getAp,
      saveAp: Actions.saveAp,
      signChart: Actions.signChart
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { Reducer, applicationsReducer } = state;
  return {
    ...applicationsReducer.application,
    initialValues: applicationsReducer.ap,
    diagnosis: selector(state, 'diagnosis'),
    plan: selector(state, 'plan')
  };
}

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(AssessmentAndPlan)
    )
  )
);
