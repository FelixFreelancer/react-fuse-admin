import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Button, Icon, Typography, Fab, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as Actions from '../store/actions';
import '../../../../styles/style-narola.css';
import reducer from '../../../auth/store/reducers';
import settingReducer from '../store/reducers';
import { bindActionCreators } from 'redux';
import withReducer from 'app/store/withReducer';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateAppointment } from '../store/actions/appointment.action';
import * as _Actions from 'app/store/actions';

const styles = theme => ({
  layoutRoot: {},
  // button: {
  //   marginRight: theme.spacing.unit,
  // },
  button: {
    backgroundColor: "#008cba", /* Green */
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inlineBlock",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer"
  }
});

class Appointment extends Component {
  constructor() {
    super();
    this.state = {
      shareholders: [{ _id: "", Exam_Name: "", Exam_Cost: "", Exam_Time: "" }],
      open: false,
      Index: '',
      shareholderId: '',
      loading: false,
      change: false,
      flag:false

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getAppointmentDetails(this.props.match.params.id)
      this.setState({ change: true })
    }
  }
  goToNextStep(event) {
    this.props.nextStep();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("hello")
    if (this.state.change === true) {
      if (localStorage.getItem("appointment")) {
        console.log("IN IF")
        var data = JSON.parse(localStorage.getItem("appointment"))
        this.setState({ shareholders: data })
        this.setState({ change: false })
        // this.setState({ change: false })
      } else {
        console.log("this.props.getAppointment=>", this.props.getAppointment)
        if (this.props.getAppointment) {
          console.log("this.props.getAppointment=>", this.props.getAppointment)
          this.setState({ shareholders: this.props.getAppointment })
          localStorage.setItem("appointment", JSON.stringify(this.state.shareholders))
          this.setState({ change: false })
        }
      }

    }
  }

  handleShareholderNameChange = idx => e => {
    let shareHolders = [...this.state.shareholders];
    shareHolders[idx][e.target.name] = e.target.value;
    this.setState({ shareholders: shareHolders, flag:true });
  };


  handleAddShareholder = () => {
    this.setState({flag:true})
    this.setState({
      shareholders: [...this.state.shareholders, ...[{ _id: "", Exam_Name: "", Exam_Cost: "", Exam_Time: "" }]]
    });
    localStorage.setItem("appointment", JSON.stringify(this.state.shareholders))
  };

  handleClickOpen = (idx, shareholderId) => {
    this.setState({ open: true });
    this.setState({ Index: idx })
    this.setState({ shareholderId: shareholderId })
  };

  handleDelete = () => {
    console.log("index", this.state.Index)
    console.log("shareholderId", this.state.shareholderId)
    if (this.state.shareholderId) {
      console.log("this.state.shareholderId", this.state.shareholderId)
      this.props.deleteAppointment(this.state.shareholderId)
      this.setState({
        shareholders: this.state.shareholders.filter((s, sidx) => this.state.Index !== sidx)
      });
    } else {
      this.setState({
        shareholders: this.state.shareholders.filter((s, sidx) => this.state.Index !== sidx)
      });
    }
    //  this.handleRemoveShareholder(this.state.Index, this.state.shareholderId)
    //  this.props.deleteAppointment(this.state.shareholderId)
    //this.props.getOfficeList()
    this.handleClose()
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("appointment")
    this.setState({ loading: true });
    var _shareholders = this.state.shareholders

    if (this.props.match.params.id) {
      this.state.shareholders && this.state.shareholders.map((item, id) => {
        _shareholders[id].office = this.props.match.params.id
      })
      this.setState({ shareholders: _shareholders })

    }

   console.log('this.state.flag ====> ',this.state.flag);
   if(this.state.flag){
    updateAppointment(this.state.shareholders)
      .then((resp) => {

        this.props.showMessage({ variant: 'success', message: 'Successfully saved' });
        setTimeout(() => {
          this.setState({ loading: false });
          this.setState({ flag: false });
          this.props.nextStep();
        }, 2000);


      })
      .catch((error) => {
        this.props.showMessage({ variant: 'error', message: 'error' });
      })
    }else{
      this.props.nextStep();
    }

  };
  handleBack(event) {
    this.props.handleBack();
    localStorage.setItem("appointment", JSON.stringify(this.state.shareholders))
  }

  render() {

    console.log("shareholders~~~~~~~~~~~~~~~~~>", this.props.getAppointment)
    const { loading } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <FuseAnimate animation="transition.slideUpIn" delay={400}>
          <div className="p-24 flex w-full">
            <Card className="md:w-1/2 mr-16  w-full">
              <CardContent>
                <div className="mt-5 mb-32 icon-div icon-div-01">
                  <Typography variant="h6">Create your Exam Types</Typography>
                  <Typography noWrap>
                    Setup the types of exams you offer patients in your office
                  </Typography>
                </div>
                <Typography color="textSecondary" gutterBottom>
                  Appointment
                  </Typography>
                <Divider />
                <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit}>
                  <div className="flex mar-btm" >
                    <div className="flex-1 mr-12">Name</div>
                    <div className="flex-1 mr-12">Cost</div>
                    <div className="flex-1 ml-12">Time</div>
                    <div className="flex-1 ml-12"></div>
                  </div>
                  {this.state.shareholders && this.state.shareholders.map((shareholder, idx) => (
                    <div className="flex mar-btm" key={idx}>

                      <div className="flex-1 mr-12">
                        <input
                          type="text"
                          className="w-full px-6 border rounded leading-loose mx-3"
                          //placeholder={`Shareholder #${idx + "name" + 1} name`}
                          //name={`Shareholder #${idx +"name"+ 1} name`}
                          name="Exam_Name"
                          onChange={this.handleShareholderNameChange(idx)}
                          value={shareholder.Exam_Name}
                          required
                        />
                      </div>
                      <div className="flex-1 mr-12">
                        <input
                          type="number"
                          className="w-full px-6 border rounded leading-loose mx-3"
                          // placeholder={`Shareholder #${idx + "length" + 1} name`}
                          name="Exam_Cost"
                          onChange={this.handleShareholderNameChange(idx)}
                          value={shareholder.Exam_Cost}
                          required
                        />
                      </div>
                      <div className="flex-1 ml-12">
                        <input
                          id="time"
                          type="time"
                          value={shareholder.Exam_Time}
                          className="w-full px-6 border rounded leading-loose mx-3"
                          onChange={this.handleShareholderNameChange(idx)}
                          inputlabelprops={{
                            shrink: true,
                          }}
                          name="Exam_Time"
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          required
                        />

                      </div>
                      <div className="flex-1 ml-12">

                        <IconButton
                          aria-label="Toggle password visibility"
                          //onClick={this.handleRemoveShareholder(idx, shareholder._id)}
                          onClick={(e) => this.handleClickOpen(idx, shareholder._id)}
                        >
                          <Icon>delete</Icon>
                        </IconButton>
                      </div>

                    </div>
                  ))}
                  <div className="flex justify-end my-24">
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="Add"
                      className="mx-12"
                      onClick={this.handleAddShareholder}
                    >
                      <Icon>add</Icon>
                    </Fab>
                  </div>
                  <Divider />
                  <div className="flex justify-between mt-32">

                    <Button variant="contained" color="primary" onClick={this.handleBack}>Back</Button>
                    <Button type="submit" variant="contained" color="secondary" disabled={loading} >
                      {loading && (
                        <Icon className="glyphicon glyphicon-refresh glyphicon-refresh-animate">refresh</Icon>

                      )}
                      {loading && <span>Saving Data</span>}
                      {!loading && <span>Save And Next</span>}
                    </Button>

                  </div>
                  {/* <Button
                    // disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                </Button>

                  <Button type="submit" variant="contained" color="primary" className="mr-12">
                    Save
                </Button>
                  <Button color="primary" onClick={this.goToNextStep} >
                    Next
                </Button> */}

                </form>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete this record?"}</DialogTitle>
                  <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                      Let Google help apps determine location. This means sending anonymous location data to
                      Google, even when no apps are running.
                  </DialogContentText> */}
                  </DialogContent>
                  <DialogActions className="record-btm-btn">
                    <Button onClick={this.handleClose} color="primary" variant="contained">
                      Cancle
                  </Button>
                    <Button onClick={this.handleDelete} color="secondary" autoFocus variant="contained">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </FuseAnimate>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateAppointment: Actions.updateAppointment,
    getAppointmentDetails: Actions.getAppointmentDetails,
    deleteAppointment: Actions.deleteAppointment,
    showMessage: _Actions.showMessage
    //updateOffice: Actions.updateOffice

  }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
  return {
    // userData: authReducers.login,
    getAppointment: settingReducer.appointment.getAppointment,

  }
}

export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Appointment)
    )
  ))
);
