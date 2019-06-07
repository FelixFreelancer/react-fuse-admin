import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import reducer from './../store/reducers';
import { bindActionCreators } from 'redux';
import * as Actions from './../store/actions';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
// Material Components + Form Fields
import { Field, FieldArray, reduxForm } from 'redux-form';
import {
  TextField,
  SlideToggle,
  Radios
} from '../../../shared-components/Form';
import TypeAheadField from './../../../shared-components/DownShift';

// Material Components
import {
  Card,
  Button,
  CardContent,
  Divider,
  Typography,
  Radio,
  FormControlLabel,
  Fab,
  Icon
} from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
   // height: 250,
    zIndex: '100',
    position:'relative'
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  }
});


// const renderCPT = ({ fields, meta, items }) => (
//   <section>
//     <div className="md:flex md:items-center justify-center mb-6">
//       <div className="md:w-1/2">

//       {/* <TypeAheadField
//             placeholder="Eg: 99203"
//             textFieldClassName="w-full p-16"
//             name="CPT0"
//             items={items}
//             fields={fields}
//             key={0}
//             index={0}
//           /> */}
//         {fields.map((member, index) => (
//           <TypeAheadField
//             placeholder="Eg: 99203"
//             textFieldClassName="w-full p-16"
//             name={member}
//             items={items}
//             fields={fields}
//             key={index}
//             index={index}

//           />
//         ))}
//       </div>
//     </div>

//     <div className="flex justify-end my-24">
//       <Fab
//         size="small"
//         color="secondary"
//         aria-label="Add"
//         className="mx-12"
//         onClick={() => fields.push()}
//       >
//         <Icon>add</Icon>
//       </Fab>
//     </div>
//   </section>
// );

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

// function Control(props) {
//   return (
//     <TextField
//       fullWidth
//       InputProps={{
//         inputComponent,
//         inputProps: {
//           className: props.selectProps.classes.input,
//           inputRef: props.innerRef,
//           children: props.children,
//           ...props.innerProps,
//         },
//       }}
//       {...props.selectProps.textFieldProps}
//     />
//   );
// }

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

// function SingleValue(props) {
//   return (
//     <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
//       {props.children}
//     </Typography>
//   );
// }

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}
const components = {
  // Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
 // SingleValue,
  ValueContainer,
};

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: null,
      multi: null,
    };
  }
  handleChange = name => value => {
    console.log('name ====> ', name);
    console.log('value ====> ', value);
    this.setState({
      [name]: value,
    });
    console.log('this.state ====> ', this.state);
  };
  componentWillMount() {
    //const { fields } = this.props;
    //console.log('filed value ====> ',fields);
    //if (!fields.length) fields.push();
    this.props.getBill(this.props.activePatientId);

    //  fields.push(this.props.getCTPData.data)
  }
  componentDidMount() {
    this.props.getCPT();
  }

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };
    // const items = [
    //   { label: 'Afghanistan' },
    //   { label: 'Aland Islands' },

    // ].map(item => ({
    //   value: item.label,
    //   label: item.label,
    // }));
    var items = [].map(suggestion => ({
      value: suggestion.label,
      label: suggestion.label,
    }));
    this.props.getCTPData && this.props.getCTPData.data && this.props.getCTPData.data.map((val, i) => {
      items.push({ value: val.CPT_Name, label: val.CPT_Name })
    });

    return (
      <div className="p-12">
        <Typography variant="h5">Bill</Typography>
        <Divider className="my-24" />

        <form className="flex flex-wrap justify-center mb-24">
          <div className="w-full md:w-2/3">
            <Card>
              <CardContent>
                <Typography
                  className="text-center"
                  color="textSecondary"
                  gutterBottom
                >
                  CPT
                </Typography>
                <Divider />
                <div className="w-full max-w-md my-24 multi-cpt">
                  <div className={classes.root}>
                    <NoSsr>

                      <div className={classes.divider} />
                      <Select
                        classes={classes}
                        styles={selectStyles}
                        textFieldProps={{
                          label: 'Label',
                          InputLabelProps: {
                            shrink: true,
                          },
                        }}
                        name="CPT"
                        options={items}
                        components={components}
                        value={this.state.multi}
                        onChange={this.handleChange('multi')}
                        placeholder="Select multiple countries"
                        isMulti
                      />
                    </NoSsr>
                  </div>
                  {/* <FieldArray name="CPT" component={renderCPT} props={items} items={items} /> */}

                  <Divider className="my-12" />

                  <div className="flex flex-wrap mb-6">
                    <div
                      className="md:w-1/3 text-center"
                      style={{ paddingTop: '20px' }}
                    >
                      <Field
                        component={SlideToggle}
                        label="Paid"
                        name="isPaid"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <Field
                        name="amount"
                        component={TextField}
                        type="number"
                        label="Amount"
                        margin="normal"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center mb-6 mt-32">
                    <div className="md:w-1/3" />
                    <Field
                      name="paymentMode"
                      component={Radios}
                      row={true}
                      className="md:w-2/3"
                    >
                      {['Cash', 'Credit Card', 'Insurance'].map(
                        (option, index) => (
                          <FormControlLabel
                            value={option}
                            key={index}
                            control={<Radio />}
                            label={option}
                          />
                        )
                      )}
                    </Field>
                  </div>

                  <div className="flex flex-wrap mb-6">
                    <div
                      style={{ paddingTop: '27px' }}
                      className="md:w-1/3 text-center"
                    >
                      <Field
                        component={SlideToggle}
                        name="isBilledInsurance"
                        label="Billed Insurance"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <Field
                        name="confirmationCode"
                        component={TextField}
                        id="filled-multiline-flexiblea"
                        label="Confirmation Code"
                        margin="normal"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
        <div className="flex justify-between mt-32">
          <Link to={`/chart/${this.props.chart._id}/ap`}>
            <Button variant="contained">Back</Button>
          </Link>
          <Link to={`/search`}>
            <Button variant="contained" color="primary">
              Complete
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

Bill = reduxForm({
  form: 'BillForm',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onChange: (values, dispatch, { pristine, dirty, saveBill, chart }) => {
    console.log("dataaaa---->", values)
    var valueObj = {
      amount: values.amount,
      chart: values.chart,
      confirmationCode: values.confirmationCode,
      // CPT:values.CPT
    }
   // console.log("this.state.value", this.state.multi)
    if (!pristine || dirty) {
      saveBill(valueObj, chart._id,);
    }
  }
})(Bill);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBill: Actions.getBill,
      saveBill: Actions.saveBill,
      getCPT: Actions.getCPT
    },
    dispatch
  );
}

function mapStateToProps({ applicationsReducer }) {
  return {
    ...applicationsReducer.application,
    initialValues: applicationsReducer.bill,
    getCTPData: applicationsReducer.bill.getCTPVal
  };
}

export default withReducer('applicationsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Bill)
    )
  )
);
