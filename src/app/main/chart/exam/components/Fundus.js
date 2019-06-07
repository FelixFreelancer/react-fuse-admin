import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import * as Actions from './../../store/actions';
import reducer from './../../store/reducers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';

// Material Components + Form Components
import { Field, reduxForm } from 'redux-form';
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Switch
} from '@material-ui/core';
import { TextField } from '../../../../shared-components/Form';

const styles = theme => ({
  layoutRoot: {}
});

class Fundus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: true
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    const edit = !this.state.edit;
    this.setState({ edit });
  }

  render() {
    const { chart } = this.props;
    console.log("my values", chart)
    return (
      <div className="flex flex-wrap justify-center mb-24">
        < fieldset disabled={chart.isSigned} className="w-full">

          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Fundus
              </Typography>
              <Divider />
              <form className="w-full my-24">
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
                    <p style={{ lineHeight: '40px' }}>Vessels</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.vessels"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.vessels"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>A/V</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.av"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.av"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Background</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.background"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.background"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Media</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.media"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.media"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Macula</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.macula"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.macula"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Post. Pole</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.postPole"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.postPole"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Vitreous</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.vitreous"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.vitreous"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Disc</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.disc"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.disc"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>Peri</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.peri"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.peri"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center text-grey-darker">
                    <p style={{ lineHeight: '40px' }}>CD</p>
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OD.cd"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                  <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                    <Field
                      name="OS.cd"
                      component={TextField}
                      disabled={this.state.edit}
                    />
                  </div>
                </div>

                <Divider className="my-12" />

                <div className="flex flex-wrap mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block md:text-right mb-1 md:mb-0 pr-20 text-grey-dark"
                      htmlFor="inline-full-name"
                      style={{ lineHeight: '65px' }}
                    >
                      Device / Lens Used
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <Field
                      name="deviceOrLensUsed"
                      component={TextField}
                      disabled={this.state.edit}
                      value="BIO + 90/78D"
                      margin="normal"
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
    initialValues: applicationsReducer.exam.fundus
  };
}

Fundus = reduxForm({
  form: 'FundusForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
  onChange: (
    values,
    dispatch,
    { pristine, dirty, saveExam, chart }
  ) => {
    if (!pristine || dirty) {
      saveExam('fundus', chart._id, values);
    }
  }
})(Fundus);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Fundus)
    )
  )
);
