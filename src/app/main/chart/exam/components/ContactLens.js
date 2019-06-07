import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, FieldArray, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from './../../store/reducers';
import { bindActionCreators } from 'redux';
import * as Actions from './../../store/actions';

// Material Components + Values
import { Paper, Fab, Icon, Divider, Typography } from '@material-ui/core';
import {
  Select,
  TextField,
  SlideToggle
} from '../../../../shared-components/Form';
import Dialog from './../../../../shared-components/Dialog';
import {
  SphereValues,
  CylinderValues,
  AxisValues,
  VisualAccuityValues,
  examDefaultValues
} from './../../Values';

const styles = theme => ({
  layoutRoot: {}
});

const CLRxSection = ({ title }) => {
  return (
    <div className="flex content-center flex-wrap mb-6">
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <p className="leading-loose text-grey-darker">{title}</p>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field name="sphere" component={Select} className="mb-8">
          {SphereValues.map((option, index) => (
            <option key={index} value={option}>
                {option > 0 ? `+${option.toFixed(2)}` : option.toFixed(2)}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field name="cylinder" component={Select} className="mb-8">
          {CylinderValues.map((option, index) => (
            <option key={index} value={option}>
              {option > 0 ? `+${option.toFixed(2)}` : option.toFixed(2)}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field name="axis" component={Select} className="mb-8">
          {AxisValues.map((option, index) => (
            <option key={index} value={option}>
               {('00' + option).slice(-3)}
            </option>
          ))}
        </Field>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field
          name="add"
          component="input"
          className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
        />
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field
          className="w-2/3 border border-grey-dark px-6 rounded leading-loose mx-3"
          name="baseCurve"
          component="input"
        />
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field
          className="w-2/3 border border-grey-dark px-6 rounded leading-loose"
          name="dia"
          component="input"
        />
      </div>

      <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
        <Field
          className="w-full border border-grey-dark px-6 leading-loose rounded"
          name="brand"
          component="input"
        />
      </div>
    </div>
  );
};
const ContactLensSection = ({ title }) => {
  return (
    <div className="flex flex-wrap mb-6 border-b">
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-grey-dark">
        <p style={{ lineHeight: '45px' }}>{title}</p>
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field component={SlideToggle} name="centred" />
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field component={SlideToggle} name="goodMovement" />
      </div>
      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
        <Field component={Select} name="dva[0]">
          {VisualAccuityValues.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Field>
        <span className="px-12">/</span>
        <Field component={Select} name="dva[1]">
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

class renderContactLensSections extends Component {
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
    return (
      <Paper className="p-24">
        {fields.map((field, index) => (
          <div key={index}>
            <fieldset disabled={chart.isSigned} className="flex flex-wrap mb-24 p-16 text-center">
              <div className="w-full md:w-1/1">
                <Typography variant="h6" gutterBottom>
                  {index + 1}
                </Typography>
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

                  {/* TODO */}
                  <FormSection name={`${field}.OD`}>
                    <CLRxSection title="OD" />
                  </FormSection>
                  <FormSection name={`${field}.OS`}>
                    <CLRxSection title="OS" />
                  </FormSection>
                </div>
              </div>
            </fieldset>
            <Divider className="my-16" />
            <fieldset disabled={chart.isSigned} className="flex flex-wrap mb-24 text-center">
              <div className="w-full">
                <div className="mr-16">
                  <Typography color="textSecondary" gutterBottom>
                    Contact Lens
                  </Typography>
                  <Divider />
                  <div className="w-full my-24">
                    <div className="flex flex-wrap mb-6 text-grey-dark">
                      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0" />
                      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                        <p>Centered</p>
                      </div>
                      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                        <p>Good Movement</p>
                      </div>
                      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0 text-center">
                        <p>DVA</p>
                      </div>
                    </div>
                    <FormSection name={`${field}.OD`}>
                      <ContactLensSection title="OD" />
                    </FormSection>
                    <FormSection name={`${field}.OS`}>
                      <ContactLensSection title="OS" />
                    </FormSection>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="flex flex-wrap mb-24 text-center">
              <fieldset disabled={chart.isSigned} className="w-full md:w-1/2">
                <div className="mr-16">
                  <Typography color="textSecondary" gutterBottom>
                    Contact Lens
                  </Typography>
                  <Divider />
                  <div className="w-full max-w-md my-8">
                    <Field
                      name={`${field}.additionalTestNotes`}
                      component={TextField}
                      multiline
                      rows="8"
                      className="w-full"
                      margin="normal"
                      helperText="Additional test notes"
                      disabled={field.isFinal}
                    />
                  </div>
                </div>
              </fieldset>
              <div className="w-full md:w-1/2">
                <div className="ml-16">
                  <Typography color="textSecondary" gutterBottom>
                    Both Eyes
                  </Typography>
                  <Divider />
                  <fieldset disabled={chart.isSigned} className="w-full max-w-md my-24">
                    <div className="flex flex-wrap mb-6">
                      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                        <Field
                          component={SlideToggle}
                          name={`${field}.dispensed`}
                          label="Dispensed"
                          labelPlacement="bottom"
                        />
                      </div>
                      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                        <Field
                          component={SlideToggle}
                          name={`${field}.ordered`}
                          label="Ordered"
                          labelPlacement="bottom"
                        />
                      </div>
                      <div className="w-full md:flex-1 px-3 mb-6 md:mb-0">
                        <Field
                          component={SlideToggle}
                          name={`${field}.IRPerformed`}
                          label="I/R Performed"
                          labelPlacement="bottom"
                        />
                      </div>
                    </div>
                  </fieldset>
                  <Divider />
                  <div className="w-full flex justify-around my-24">
                    <Field
                      disabled={chart.isSigned}
                      component={SlideToggle}
                      name={`${field}.isFinal`}
                      label="Final"
                    />
                    {fields.length > 1 ? (
                      <Fab
                        disabled={chart.isSigned}
                        size="small"
                        color="primary"
                        aria-label="Add"
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
              </div>
            </div>
            <Dialog
              open={this.state.isDialogOpen}
              index={this.state.index}
              onClose={this.handleClose}
              message="Are you sure you would like to delete"
            />
            <Divider />
          </div>
        ))}

        <div className="flex flex-wrap mt-16 justify-end">
          <Fab
            disabled={chart.isSigned}
            variant="extended"
            color="secondary"
            aria-label="Add"
            className="mx-12"
            onClick={() => fields.push(examDefaultValues.contactLens)}
          >
            <Icon>add</Icon>
            Add CL
          </Fab>
        </div>
      </Paper>
    );
  }
}

class ContactLens extends Component {
  render() {
    const { chart } = this.props;
    return (
      <form className="mb-16">
        <FieldArray
          name="contactLens"
          component={renderContactLensSections}
          chart={chart}
        />
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
    initialValues: { contactLens: applicationsReducer.exam.contactLens }
  };
}

ContactLens = reduxForm({
  form: 'ContactLensForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (
    values,
    dispatch,
    { pristine, dirty, saveExam, chart }
  ) => {
    if (!pristine || dirty) {
      saveExam('contactLens', chart._id, values.contactLens);
    }
  }
})(ContactLens);

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ContactLens)
    )
  )
);
