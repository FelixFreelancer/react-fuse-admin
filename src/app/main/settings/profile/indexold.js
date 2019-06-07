import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
//import { Button, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Icon from '@material-ui/core/Icon';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfilePage from './profilePage';
import Office from '../offices';
import Appointment from '../appointment';
import User from '../users';
import Billing from '../billing';
import Insurance from '../insurance';
import Payment from '../payment';


const styles = theme => ({
  root: {
    width: '100%',
  },
  layoutRoot: {},
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});
function getSteps() {
  return ['Profile', 'Office', 'Appointment', 'User', 'Billing', 'Insurance', 'payment'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Office />
    case 1:
      return <Appointment />;
    case 2:
      return <User />;
    case 3:
      return <Billing />;
    case 4:
      return <Insurance />;
    case 5:
      return <Payment />; 
    default:
      return 'Unknown step';
  }
}
class Profile extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    activeStep: 0,
    completed: {},
  };


  componentDidMount() {
    console.log("~~~~~~~~~>", this.props.match.path)
    console.log("~~~~~~~~~>", this.props)
    var as = 0;
    switch (this.props.match.path) {
      case "/settings/offices":
        as = 0;
        break;
      case "/settings/appointment":
        as = 1;
        break;
      case "/settings/users":
        as = 2;
        break;
      case "/settings/billing":
        as = 3;
        break;
      case "/settings/insurance":
        as = 4;
        break;
      case "/settings/payment":
        as = 5;
        break;
      default:
        break;
    }
    this.setState({activeStep:as})

  }
  totalSteps = () => getSteps().length;

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <FusePageSimple
        classes={{
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
        }}

        content={
          <div className={classes.root}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {this.allStepsCompleted() ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                </Typography>
                  <Button onClick={this.handleReset}>Reset</Button>
                </div>
              ) : (
                  <div>
                    <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                    <div>
                      {/* <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                  </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        Next
                  </Button> */}
                      {/* {activeStep !== steps.length &&
                        (this.state.completed[this.state.activeStep] ? (
                          <Typography variant="caption" className={classes.completed}>
                            Step {activeStep + 1} already completed
                      </Typography>
                        ) : (
                            <Button variant="contained" color="primary" onClick={this.handleComplete}>
                              {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                            </Button>
                          ))} */}
                    </div>
                  </div>
                )}
            </div>
          </div>
        }
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ fuse }) {
  return {
    mainTheme: fuse.settings.mainTheme
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);
