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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddInsurance from './addInsurance';
import { updateInsurance } from '../store/actions/insurance.action';
import * as _Actions from 'app/store/actions';
const styles = theme => ({
  layoutRoot: {},
  button: {
    marginRight: theme.spacing.unit,
  },
});

class insurance extends Component {
  constructor() {
    super();
    this.state = {
      // shareholders: [{ _id: "", Id_Office_Detail: "", Id_Insurance: "", Username: "", Password: "" }],
      shareholders: [{ _id: "", Id_Office_Detail: "", Id_Insurance: "" }],
      open: false,
      Index: '',
      shareholderId: '',
      loading: false,
      changeInsurance: false,
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
  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
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
      this.props.deleteInsurance(this.state.shareholderId)
      this.setState({
        shareholders: this.state.shareholders.filter((s, sidx) => this.state.Index !== sidx)
      });
    } else {
      this.setState({
        shareholders: this.state.shareholders.filter((s, sidx) => this.state.Index !== sidx)
      });
    }

    this.handleClose()
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {

    this.props.getInsuranceName();
    if (this.props.match.params.id) {
      this.props.getInsurance(this.props.match.params.id);
      this.setState({ changeInsurance: true })
    }

  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("hello")
  //   if (prevProps.getInsuranceData !== this.props.getInsuranceData) {

  //       if (this.props.getInsuranceData) {
  //         this.setState({ shareholders: this.props.getInsuranceData })
  //       }

  //   }
  // }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("hello")
    if (this.state.changeInsurance === true) {
      if (localStorage.getItem("insurance")) {
        console.log("IN IF")
        var data = JSON.parse(localStorage.getItem("insurance"))
        this.setState({ shareholders: data })
        this.setState({ changeInsurance: false })
        // this.setState({ change: false })
      } else {
        console.log("this.props.getInsuranceData=>", this.props.getInsuranceData)
        if (this.props.getInsuranceData) {
          console.log("this.props.getInsuranceData=>", this.props.getInsuranceData)
          this.setState({ shareholders: this.props.getInsuranceData })
          localStorage.setItem("insurance", JSON.stringify(this.state.shareholders))
          this.setState({ changeInsurance: false })
        }
      }

    }
  }
  handleShareholderNameChange = idx => e => {
    let shareHolders = [...this.state.shareholders];
    shareHolders[idx][e.target.name] = e.target.value;
    this.setState({ shareholders: shareHolders, flag:true });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    localStorage.removeItem("insurance")
    var _shareholders = this.state.shareholders
    this.state.shareholders.map((item, id) => {
      _shareholders[id].Id_Office_Detail = this.props.match.params.id
    })
    this.setState({ shareholders: _shareholders })
    if(this.state.flag){
    updateInsurance(this.state.shareholders)
      .then((resp) => {
        this.props.showMessage({ variant: 'success', message: 'Successfully saved' });
        setTimeout(() => {
          this.setState({ flag: false });
          this.setState({ loading: false });
          this.props.nextStep();
        }, 2000);
      })
      .catch((error) => {
        this.props.showMessage({ variant: 'error', message: 'error' });
      })
    }else{
      this.props.nextStep();
    }
    //this.props.nextStep();
  };
  handleBack(event) {
    this.props.handleBack();
    localStorage.setItem("insurance", JSON.stringify(this.state.shareholders))
  }

  handleAddShareholder = () => {
    this.setState({flag:true})
    this.setState({
      shareholders: this.state.shareholders.concat([{ _id: "", Id_Office_Detail: "", Id_Insurance: "", Username: "", Password: "" }])
    });
    localStorage.setItem("insurance", JSON.stringify(this.state.shareholders))

  };

  // handleRemoveShareholder = (idx, detID) => () => {
  //   this.props.deleteInsurance(detID)
  //   this.setState({
  //     shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
  //   });
  // };
  render() {
    //console.log("insurance name ~~~~~~~~~~~~>", this.props.getInsurName)
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <FuseAnimate animation="transition.slideUpIn" delay={400}>
          <div className="p-24 flex w-full">

            <Card className="md:w-1/2 mr-16 full-width-mobile-view">
              <CardContent>
                <div className="mt-5 mb-32 icon-div icon-div-01">

                  <Typography variant="h6">Insurance</Typography>
                  <Typography noWrap>
                    {/* Setup the types of exames you will offer */}
                  </Typography>
                </div>
                <Typography color="textSecondary" gutterBottom>
                  Insurance
                  </Typography>
                <Divider />
                <AddInsurance />
                <Divider />
                <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit}>
                  <div className="flex text-center text-grey-darker">

                    <div className="flex-1 mr-12">Insurance</div>
                    <div className="flex-1 mr-12">User Name</div>
                    <div className="flex-1 ml-12">Password</div>
                    <div className="flex-1 ml-12"></div>
                  </div>
                  {this.state.shareholders.map((shareholder, idx) => (
                    <div className="flex mar-btm" key={idx}>

                      <div className="flex-1 mr-12">
                        <select name="selState" className="w-full px-6 border rounded leading-loose mx-3" value={shareholder.Id_Insurance} name="Id_Insurance" onChange={this.handleShareholderNameChange(idx)} required>

                          {this.props.getInsurName && this.props.getInsurName.data && this.props.getInsurName.data.map((data, i) => {
                            return (

                              <option key={i} value={data._id}>{data.Insurance_Name}</option>
                            )

                          })
                          }
                        </select>

                      </div>
                      <div className="flex-1 mr-12">
                        <input
                          type="text"
                          className="w-full px-6 border rounded leading-loose mx-3"
                          // placeholder={`Shareholder #${idx + "length" + 1} name`}
                          name="Username"
                          onChange={this.handleShareholderNameChange(idx)}
                          value={shareholder.Username}
                          required
                        />
                      </div>

                      <div className="flex-1 mr-12">
                        <input
                          type="password"
                          className="w-full px-6 border rounded leading-loose mx-3"
                          // placeholder={`Shareholder #${idx + "length" + 1} name`}
                          name="Password"
                          onChange={this.handleShareholderNameChange(idx)}
                          value={shareholder.Password}
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
                  <Button  color="primary" onClick={this.goToNextStep} >
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
    updateInsurance: Actions.updateInsurance,
    getInsurance: Actions.getInsurance,
    getInsuranceName: Actions.getInsuranceName,
    deleteInsurance: Actions.deleteInsurance,
    showMessage: _Actions.showMessage

  }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
  return {
    //userData: authReducers.login,
    getInsurName: settingReducer.insurance.getInsuranceName,
    getInsuranceData: settingReducer.insurance.getInsurance
    //officeData:settingReducer.office
  }
}

export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(insurance)
    )
  ))
);
