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
import * as _Actions from 'app/store/actions';
import { updateBilling } from '../store/actions/billing.action';

const styles = theme => ({
  layoutRoot: {},
  button: {
    marginRight: theme.spacing.unit,
  },
});

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {

      shareholders: [{ _id: "", CPT_Name: "", CPT_Description: "", CPT_Price: "" }],
      open: false,
      Index: '',
      shareholderId: '',
      changeBill: false,
      loading: false,
      flag:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  goToNextStep(event) {
    // event.preventDefault();
    this.props.nextStep();
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getBilling(this.props.match.params.id)
      this.setState({ changeBill: true })
    }
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("hello")
  //   if (prevProps.getBillingdata !== this.props.getBillingdata) {

  //     if (this.props.getBillingdata) {
  //       this.setState({ shareholders: this.props.getBillingdata })
  //     } else {
  //       this.setState({
  //         shareholders: [...this.state.shareholders, ...[{ _id: "", CPT_Name: "", CPT_Description: "", CPT_Price: "" }]]
  //       });
  //     }

  //   }
  // }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("hello")
    if (this.state.changeBill === true) {
      if (localStorage.getItem("billing")) {
        console.log("IN IF")
        var data = JSON.parse(localStorage.getItem("billing"))
        this.setState({ shareholders: data })
        this.setState({ changeBill: false })
        // this.setState({ change: false })
      } else {
        console.log("this.props.getBillingdata=>", this.props.getBillingdata)
        if (this.props.getBillingdata) {
        console.log("this.props.getBillingdata=>", this.props.getBillingdata)
        this.setState({ shareholders: this.props.getBillingdata })
        localStorage.setItem("billing", JSON.stringify(this.state.shareholders))
        this.setState({ changeBill: false })
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
      shareholders: [...this.state.shareholders, ...[{ _id: "", CPT_Name: "", CPT_Description: "", CPT_Price: "" }]]
    });
    localStorage.setItem("billing", JSON.stringify(this.state.shareholders))
  };

  // handleRemoveShareholder = (idx, detID) => () => {
  //   console.log("deleteid", detID)
  //   this.props.deleteBilling(detID)
  //   this.setState({
  //     shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
  //   });
  // };

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
      this.props.deleteBilling(this.state.shareholderId)
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
    this.setState({ loading: true });
    localStorage.removeItem("billing")
    var _shareholders = this.state.shareholders
    this.state.shareholders.map((item, id) => {
      _shareholders[id].office = this.props.match.params.id
    })
    this.setState({ shareholders: _shareholders })
    console.log("updateBilling~~~~~~~~~~~~~>", this.state.shareholders)
    if(this.state.flag){
    updateBilling(this.state.shareholders)
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

    // this.props.nextStep();
  };

  handleBack(event) {
    this.props.handleBack();
    localStorage.setItem("billing", JSON.stringify(this.state.shareholders))
  }

  render() {
    console.log("billing data", this.props.getBillingdata)
    console.log('props ', this.props);
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <FuseAnimate animation="transition.slideUpIn" delay={400}>
          <div className="p-24 flex w-full">

            <Card className="md:w-1/2 mr-16 full-width-mobile-view">
              <CardContent>
                <div className="mt-5 mb-32 icon-div icon-div-04">

                  <Typography variant="h6">Configure CPT Codes</Typography>
                  <Typography noWrap>
                    Setup the prices for current procedural terminology
                  </Typography>
                </div>
                <Typography color="textSecondary" gutterBottom>
                  Billing
                  </Typography>
                <Divider />
                <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit}>
                  <div className="flex text-center text-grey-darker">

                    <div className="flex-1 mr-12">CPT Name</div>
                    <div className="flex-1 mr-12">Description</div>
                    <div className="flex-1 mr-12">Price</div>
                    <div className="flex-1 ml-12"></div>
                  </div>
                  {this.state.shareholders.map((shareholder, idx) => (
                    <div className="flex mar-btm" key={idx}>

                      <div className="flex-1 mr-12">
                        <input
                          type="text"
                          className="w-full px-6 border rounded leading-loose mx-3"
                          //placeholder={`Shareholder #${idx + "name" + 1} name`}
                          //name={`Shareholder #${idx +"name"+ 1} name`}
                          name="CPT_Name"
                          onChange={this.handleShareholderNameChange(idx)}
                          value={shareholder.CPT_Name}
                          required
                        />
                      </div>
                      <div className="flex-1 mr-12">
                        <input
                          type="text"
                          className="w-full px-6 border rounded leading-loose mx-3"
                          // placeholder={`Shareholder #${idx + "length" + 1} name`}
                          name="CPT_Description"
                          onChange={this.handleShareholderNameChange(idx)}
                          value={shareholder.CPT_Description}
                          required
                        />
                      </div>
                      <div className="flex-1 mr-12">
                        <input
                          type="number"
                          className="w-full px-6 border rounded leading-loose mx-3"
                          // placeholder={`Shareholder #${idx + "length" + 1} name`}
                          name="CPT_Price"
                          onChange={this.handleShareholderNameChange(idx)}
                          value={shareholder.CPT_Price}
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
                  <Button type="submit" variant="contained" color="primary" className="mr-12" >
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
    updateBilling: Actions.updateBilling,
    getBilling: Actions.getBilling,
    deleteBilling: Actions.deleteBilling,
    showMessage: _Actions.showMessage

  }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
  return {
    // userData: authReducers.login,
    getBillingdata: settingReducer.billing.getBilling
  }
}

export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Billing)
    )
  ))
);
