// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Add from './add'

// import officePage from './officePage'
// import Appointment from '../appointment';
// import OfficePage from './officePage'
// import User from '../users';
// import Billing from '../billing';
// import Insurance from '../insurance';
// import Payment from '../payment';
// const styles = theme => ({
//   root: {
//     width: '100%',
//   },
//   button: {
//     marginRight: theme.spacing.unit,
//   },
//   instructions: {
//     marginTop: theme.spacing.unit,
//     marginBottom: theme.spacing.unit,
//   },
// });

// function getSteps() {
//   return ['ListPage', 'Appointment', 'User', 'Billing', 'Insurance', 'payment'];
// }

// function getStepContent(step) {
//     switch (step) {
//         case 1:
//         return (
//           <OfficePage
//             nextStep={this.nextStep}
//             // prevStep={this.prevStep}
//             // handleChange={this.handleChange}
//             // values={values}
//           />
//         );
//         case 2:
//           return (
//             <Appointment
//               nextStep={this.nextStep}
//               // prevStep={this.prevStep}
//               // handleChange={this.handleChange}
//               // values={values}
//             />
//           );
//         case 3:
//           return (
//             <User
//               nextStep={this.nextStep}
//              //prevStep={this.prevStep}
//             // handleChange={this.handleChange}
//             // values={values}
//           />
//           );
//           case 4:
//         return (
//             <User
//             nextStep={this.nextStep}
//             // prevStep={this.prevStep}
//             // handleChange={this.handleChange}
//             // values={values}
//           />
//           );
//         case 5:
//           return (
//             <Billing
//               nextStep={this.nextStep}
//               // prevStep={this.prevStep}
//               // handleChange={this.handleChange}
//               // values={values}
//             />
//           );
//           case 6:
//           return (
//             <Insurance
//               nextStep={this.nextStep}
//               // prevStep={this.prevStep}
//               // handleChange={this.handleChange}
//               // values={values}
//             />
//           );
//         // case 4:
//         //   return (
//         //     <Confirmation
//         //       nextStep={this.nextStep}
//         //       prevStep={this.prevStep}
//         //       values={values}
//         //     />
//         //   );
//         // case 5:
//         //   return <Success />;
//       }
// }

// class Add extends React.Component {
//   state = {
//     activeStep: 0,
//     skipped: new Set(),
//   };

// //   componentDidMount() {
// //     var as = 0;
// //     console.log('this.props.match.params.step ====>', this.props.match.params.step);
// //     switch (this.props.match.params.step) {
// //       case "ListPage":
// //         as = 0;
// //         break;
// //       case "appointment":
// //         as = 1;
// //         break;
// //       case "users":
// //         as = 2;
// //         break;
// //       case "billing":
// //         as = 3;
// //         break;
// //       case "insurance":
// //         as = 4;
// //         break;
// //       case "payment":
// //         as = 5;
// //         break;
// //       default:
// //         as = 0;
// //         break;
// //     }

// //     this.setState({
// //       activeStep: as
// //     })
// //   }

//   //isStepOptional = step => step === 1;

//   handleNext = () => {
//     const { activeStep } = this.state;
//     let { skipped } = this.state;
//     if (this.isStepSkipped(activeStep)) {
//       skipped = new Set(skipped.values());
//       skipped.delete(activeStep);
//     }
//     this.setState({
//       activeStep: activeStep + 1,
//       skipped,
//     });
//     this.props.history.push(`./appointment`)
//   };

//   handleBack = () => {
//     this.setState(state => ({
//       activeStep: state.activeStep - 1,
//     }));
//   };

//   handleSkip = () => {
//     const { activeStep } = this.state;
//     // if (!this.isStepOptional(activeStep)) {
//     //   // You probably want to guard against something like this,
//     //   // it should never occur unless someone's actively trying to break something.
//     //   throw new Error("You can't skip a step that isn't optional.");
//     // }

//     this.setState(state => {
//       const skipped = new Set(state.skipped.values());
//       skipped.add(activeStep);
//       return {
//         activeStep: state.activeStep + 1,
//         skipped,
//       };
//     });
//   };

//   handleReset = () => {
//     this.setState({
//       activeStep: 0,
//     });
//   };

//   isStepSkipped(step) {
//     return this.state.skipped.has(step);
//   }

//   render() {
//     const { classes } = this.props;
//     const steps = getSteps();
//     const { activeStep } = this.state;

//     return (
//       <div className={classes.root}>
//         <Stepper activeStep={activeStep}>
//           {steps.map((label, index) => {
//             const props = {};
//             const labelProps = {};
//             // if (this.isStepOptional(index)) {
//             //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
//             // }
//             if (this.isStepSkipped(index)) {
//               props.completed = false;
//             }
//             return (
//               <Step key={label} {...props}>
//                 <StepLabel {...labelProps}>{label}</StepLabel>
//               </Step>
//             );
//           })}
//         </Stepper>
//         <div>
//           {activeStep === steps.length ? (
//             <div>
//               <Typography className={classes.instructions}>
//                 All steps completed - you&apos;re finished
//               </Typography>
//               <Button onClick={this.handleReset} className={classes.button}>
//                 Reset
//               </Button>
//             </div>
//           ) : (
//               <div>
//                 <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//                 <div>
//                   <Button
//                     disabled={activeStep === 0}
//                     onClick={this.handleBack}
//                     className={classes.button}
//                   >
//                     Back
//                 </Button>
//                   {/* {this.isStepOptional(activeStep) && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={this.handleSkip}
//                     className={classes.button}
//                   >
//                     Skip
//                   </Button>
//                 )} */}
//                   {/* <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={this.handleNext}
//                     className={classes.button}
//                   >
//                     {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                   </Button> */}
//                 </div>
//               </div>
//             )}
//         </div>
//       </div>
//     );
//   }
// }




// // HorizontalLinearStepper.propTypes = {
// //   classes: PropTypes.object,
// // };

// export default withStyles(styles)(Add);