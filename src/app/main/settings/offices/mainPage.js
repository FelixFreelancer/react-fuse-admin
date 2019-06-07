import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Add from './add'

import OfficePage from './officePage'
import Appointment from '../appointment';
// import OfficePage from './officePage'
import User from '../users';
import Billing from '../billing';
import Insurance from '../insurance';
import Payment from '../payment';
import PickUp from '../pickupTool';
import OfficeHours from '../officeHours';
const styles = theme => ({
  // root: {
  //   width: '100%',
  // },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return [ 'Office','OfficeHours','Appointment', 'User', 'Billing', 'Insurance','PickUp','Payment'];
  //return [ 'PickUp','payment'];
}



class mainPage extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  componentDidMount() {
    var as = 0;
    console.log('this.props.match.params.step ====>', this.props.match);
    // switch (this.props.match.params.step) {
    //   // case "ListPage":
    //   //   as = 0;
    //   //   break;
    //   case "appointment":
    //     as = 1;
    //     break;
    //   case "users":
    //     as = 2;
    //     break;
    //   case "billing":
    //     as = 3;
    //     break;
    //   case "insurance":
    //     as = 4;
    //     break;
    //   case "payment":
    //     as = 5;
    //     break;
    //   default:
    //     as = 0;
    //     break;
    // }

    // this.setState({
    //   activeStep: as
    // })
  }

  //isStepOptional = step => step === 1;

  nextStep = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
    //this.props.history.push(`./appointment`)
  };

  handleBack = () => {
    console.log("Back");
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  getOfficeId = (Id) => {
         console.log("office ID ~~~~~~~~~>", Id)
         this.props.history.push(`/settings/offices/mainPage/${Id}`)
         this.setState({activeStep: 1})
  };
  // componentDidMount() {
  //   console.log("~~~~~~~~~>", this.props.match.path)
  //   console.log("~~~~~~~~~>", this.props)
  //   var as = 0;
  //   switch (this.props.match.path) {
  //     case "/settings/offices/mainPage/:id/":
  //       as = 0;
  //       break;
  //     case "/settings/offices/mainPage/:id/":
  //       as = 1;
  //       break;
  //     case "/settings/offices/mainPage/:id/":
  //       as = 2;
  //       break;
  //     case "/settings/offices/mainPage/:id/":
  //       as = 3;
  //       break;
  //     case "/settings/offices/mainPage/:id/":
  //       as = 4;
  //       break;
  //     case "/settings/offices/mainPage/:id/":
  //       as = 5;
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setState({activeStep:as})

  // }
   getStepContent  = (step) => {
    switch (step) {
        
        case 0:
          return (
            <OfficePage
              nextStep={this.nextStep}
              handleBack={this.handleBack}
              getOfficeId={this.getOfficeId}
              // handleChange={this.handleChange}
              // values={values}
            />
          );
          case 1:
          return (
            <OfficeHours
              nextStep={this.nextStep}
              handleBack={this.handleBack}
          
            />
          );
        case 2:
          return (
            <Appointment
              nextStep={this.nextStep}
              handleBack={this.handleBack}
          
            />
          );
        case 3:
          return (
            <User
              nextStep={this.nextStep}
              handleBack={this.handleBack}
          
          />
          );
        
        case 4:
          return (
            <Billing
              nextStep={this.nextStep}
              handleBack={this.handleBack}
             
            />
          );
          case 5:
          return (
            <Insurance
              nextStep={this.nextStep}
              handleBack={this.handleBack}
            
            />
          );
          case 6:
          return (
            <PickUp
            nextStep={this.nextStep}
            handleBack={this.handleBack}            
            />
          );
        case 7:
          return (
            <Payment
            handleBack={this.handleBack}            
            />
          );
          default:
          break;
      }
}
  handleSkip = () => {
    const { activeStep } = this.state;
    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className="fghfhgjhjj">
        <Stepper className="steper-wrap" activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
       
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step className="steper-wrap-inr" key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
              <div>
                <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                <div className="step-2">
               
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(mainPage);