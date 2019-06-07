import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from './../../store/reducers';
import { connect } from 'react-redux';

// Material Components + Form Fields
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch } from '@material-ui/core';

import { Field, reduxForm } from 'redux-form';
import * as Actions from './../../store/actions';
import {
  TextField,
  Radios,
  CheckBox
} from '../../../../shared-components/Form';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  layoutRoot: {}
});

class SlitLamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    console.log(this.state);
    const edit = !this.state.edit;
    // this.state =! this.state
    this.setState({ edit });
  }
  render() {
    const { chart } = this.props;
    return (
      <div className="flex flex-wrap justify-center mb-24">
        <fieldset disabled={chart.isSigned} className="w-full">

          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Slit Lamp
              </Typography>
              <Divider />
              <form disabled={chart.isSigned} className="w-full my-24">
                <div className="flex justify-center mb-6">
                  <div className="w-1/5 px-3 mb-6 md:mb-0 text-right">
                    <p style={{ lineHeight: '45px' }}>Edit</p>
                  </div>
                  <div className="w-1/5 px-3 mb-6 md:mb-0 text-grey-darker text-center">
                    <Switch
                      checked={this.state.edit}
                      onChange={this.toggleEdit}
                    />
                  </div>
                  <div className="w-1/5 px-3 mb-6 md:mb-0 text-grey-darker text-left">
                    <p style={{ lineHeight: '45px' }}>Final</p>
                  </div>
                </div>

                <Divider className="mb-32" />
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0" />
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-grey-darker">
                    <p>OD</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-grey-darker">
                    <p>OS</p>
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Tears</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.tears"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.tears"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Lids &amp; Lashes</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.lidsAndLashes"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.lidsAndLashes"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Cornea</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.cornea"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.cornea"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Palp Conj.</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.palpConj"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.palpConj"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Bulb Conj.</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.bulbConj"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.bulbConj"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Ant Ch</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.antCh"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.antCh"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Iris</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.iris"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.iris"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Lens</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.lens"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.lens"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Ant Vit</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OD.antVit"
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      component={TextField}
                      name="OS.antVit"
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Angle</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field name="OD.angle" component={Radios} row={true}>
                      {['1', '2', '3', '4'].map((option, index) => (
                        <FormControlLabel
                          disabled={this.state.edit}
                          value={option}
                          key={index}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </Field>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field name="OS.angle" component={Radios} row={true}>
                      {['1', '2', '3', '4'].map((option, index) => (
                        <FormControlLabel
                          disabled={this.state.edit}
                          value={option}
                          key={index}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </Field>
                  </div>
                </div>

                <Divider className="my-12" />

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 md:mb-0 mx-12 text-center text-grey-darker">
                    <Typography color="textSecondary" gutterBottom>
                      Dilation
                    </Typography>
                    <Divider />
                    <Field
                      disabled={chart.isSigned}
                      component={TextField}
                      multiline
                      rows="8"
                      name="dilation"
                      className="w-full"
                      margin="normal"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mx-12 md:mb-0">
                    <Field
                      disabled={chart.isSigned}
                      name="patientRefused"
                      disabled={this.state.edit}
                      component={CheckBox}
                      label="Patient Refused"
                    />
                    <Field
                      disabled={chart.isSigned}
                      checked={this.props.initialValues.patientRescheduled}
                      name="patientRescheduled"
                      disabled={this.state.edit}
                      component={CheckBox}
                      label="Patient Rescheduled"
                    />
                    <Field
                      disabled={chart.isSigned}
                      name="onePercentTropicamide"
                      component={CheckBox}
                      label="1% Tropicamide"
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mx-12 md:mb-0">
                    <Field
                      disabled={chart.isSigned}
                      name="halfPercentTropicamide"
                      disabled={this.state.edit}
                      component={CheckBox}
                      label="0.5% Tropicamide"
                    />
                    <Field
                      disabled={chart.isSigned}
                      name="twoAndHalfPercentPhenlyephrine"
                      disabled={this.state.edit}
                      component={CheckBox}
                      label="2.5% Phenlyephrine"
                    />
                    <Field
                      disabled={chart.isSigned}
                      name="paramyd"
                      disabled
                      component={CheckBox}
                      label="Paramyd"
                    />
                  </div>
                </div>
              </form>

              <Divider />
            </CardContent>
          </Card>
        </fieldset>
      </div>

    );
  }
}

SlitLamp = reduxForm({
  form: 'SlitLampForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
  onChange: (
    values,
    dispatch,
    { pristine, dirty, saveExam, chart }
  ) => {
    if (!pristine || dirty) {
      console.log('val', values);
      saveExam('slitLamp', chart._id, values);
    }
  }
})(SlitLamp);

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
    initialValues: applicationsReducer.exam.slitLamp
  };
}

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(SlitLamp)
    )
  )
);
