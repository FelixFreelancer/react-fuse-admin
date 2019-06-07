import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, FieldArray, reduxForm, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from './../../store/reducers';
import { bindActionCreators } from 'redux';
import * as Actions from './../../store/actions';

// Material Components
import { Fab, Switch, Icon } from '@material-ui/core';

// Material Components + Form Fields
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import {
  Select,
  SlideToggle,
  TextField
} from '../../../../shared-components/Form';
import Dialog from './../../../../shared-components/Dialog';

import {
  SphereValues,
  CylinderValues,
  AxisValues,
  AddValues,
  VisualAccuityValues,
  examDefaultValues
} from './../../Values';

const styles = theme => ({
  layoutRoot: {}
});

const cardStyles = {
  margin: '0 0'
};

const Refraction = ({ title }) => {
  return (
    <div className="flex flex-wrap mb-6">
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-grey-darker">
        <p>{title}</p>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field
          className="mb-8" component={Select} name={`sphere`}>
          {SphereValues.map((option, index) => (
            <option key={index} value={option}>
              {option > 0 ? `+${option.toFixed(2)}` : option.toFixed(2)}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field className="mb-8" component={Select} name={`cylinder`}>
          {CylinderValues.map((option, index) => (
            <option key={index} value={option}>
              {option > 0 ? `+${option.toFixed(2)}` : option.toFixed(2)}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field className="mb-8" component={Select} name={`axis`}>
          {AxisValues.map((option, index) => (
            <option key={index} value={option}>
              {('00' + option).slice(-3)}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field className="mb-8" component={Select} name={`add`}>
          {AddValues.map((option, index) => (
            <option key={index} value={option}>
              {option > 0 ? `+${option.toFixed(2)}` : option.toFixed(2)}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <Field
          className="mb-8"
          component={Select}
          name={`DVA[0]`}
          className="mb-8"
        >
          {VisualAccuityValues.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Field>
        <span className="mx-12">/</span>
        <Field
          className="mb-8"
          component={Select}
          name={`DVA[1]`}
          className="mb-8"
        >
          {VisualAccuityValues.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <Field
          className="mb-8"
          component={Select}
          name={`NVA[0]`}
          className="mb-8"
        >
          {VisualAccuityValues.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Field>
        <span className="mx-12">/</span>
        <Field
          className="mb-8"
          component={Select}
          name={`NVA[1]`}
          className="mb-8"
        >
          {VisualAccuityValues.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Field>
      </div>
    </div>
  );
};

/**
 * Converted to state component
 */
class renderRefractions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      index: null
    };
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete(index) {
    this.setState({ isDialogOpen: true, index });
  }

  handleClose = ({ confirmed, index }) => {
    if (confirmed === true) {
      this.props.fields.remove(index);
    }
    this.setState({ isDialogOpen: false });
  };

  render() {
    const { fields, chart } = this.props;
    console.log("initial values===", chart);

    return (

      <fieldset disabled={chart.isSigned}>
        {this.state.isDialogOpen}
        {fields.map((field, index) => (
          <div className="p-8" key={index}>
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
              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <p>DVA</p>
              </div>

              <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <p>NVA</p>
              </div>
            </div>
            <FormSection name={`${field}.OD`}>
              <Refraction title={'OD'} />
            </FormSection>
            <FormSection name={`${field}.OS`}>
              <Refraction title={'OS'} />
            </FormSection>
            <div className="px-32 mb-24">
              <Field
                component={TextField}
                name={`${field}.intendedFor`}
                label="Intended for"
                className="w-full"
              />
              <Divider />
              <div className="flex justify-end mt-24">
                <Field
                  component={SlideToggle}
                  name={`${field}.isFinal`}
                  label="Final"
                />
                {fields.length > 1 ? (
                  <Fab
                    disabled={chart.isSigned}
                    size="small"
                    color="primary"
                    aria-label="Delete"
                    className="mx-12"
                    onClick={() => this.confirmDelete(index)}
                  >
                    <Icon>delete</Icon>
                  </Fab>
                ) : (
                    ''
                  )}
              </div>
            </div>
            <Divider />
          </div>
        ))}
        <div className="flex justify-end mt-24">
          <Fab
            disabled={chart.isSigned}
            size="small"
            color="secondary"
            aria-label="Add"
            className="mx-12"
            onClick={() => fields.push(examDefaultValues.subjectiveRefraction)}
          >
            <Icon>add</Icon>
          </Fab>
          <Dialog
            open={this.state.isDialogOpen}
            index={this.state.index}
            onClose={this.handleClose}
            message="Are you sure you would like to delete"
          />
        </div>
      </fieldset>
    );
  }
}

class SubjectiveRefraction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chart } = this.props;
    return (
      <div className="flex flex-wrap mb-24 text-center">
        <fieldset className="w-full md:w-1/1">
          <Card style={cardStyles}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Subjective Refraction
              </Typography>
              <Divider />
              <form className="w-full mt-24">
                <FieldArray
                  name="subjectiveRefraction"
                  component={renderRefractions}
                  chart={chart}
                />
              </form>
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
    initialValues: {
      subjectiveRefraction: applicationsReducer.exam.subjectiveRefraction
    }
  };
}

SubjectiveRefraction = reduxForm({
  form: 'SubjectiveRefractionForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (
    values,
    dispatch,
    { pristine, dirty, saveExam, chart }
  ) => {
    if (!pristine || dirty) {
      saveExam(
        'subjectiveRefraction',
        chart._id,
        values.subjectiveRefraction
      );
    }
  }
})(SubjectiveRefraction);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(SubjectiveRefraction)
    )
  )
);
