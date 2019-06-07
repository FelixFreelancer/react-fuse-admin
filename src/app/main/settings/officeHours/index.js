import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded, DemoContent } from '@fuse';
import { Button, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import '../../../../styles/style-narola.css';
import reducer from '../../../auth/store/reducers';
import settingReducer from '../store/reducers';
import { saveOffice, updateOfficeHours, getOfficeHoursData } from '../../../../app/main/settings/store/actions/officeHours.action';
import * as _Actions from '../../../../app/store/actions';
import _ from '@lodash';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const short_day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]
const styles = theme => ({
  layoutRoot: {}
  // button: {
  //   marginRight: theme.spacing.unit,
  // },

});

class OfficeHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      values: [{ _id: "", day: "", office_start_time: "", office_end_time: "", lunch_start_time: "", lunch_end_time: "" }],
      flag: false,
      change: false,
      change1:false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleBack = this.handleBack.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);

  }
  componentDidMount() {
    this.props.getOfficeTime()
    if (this.props.match.params.id) {
    this.props.getOfficeHoursData(this.props.match.params.id)
    this.setState({ change1: true })
    }
    this.setState({ change: true })
    // getOfficeHoursData(this.props.match.params.id)
    //   .then((resp) => {

    //     if (resp.data.data === null) {
    //       console.log(resp)
    //       this.props.getOfficeTime()
    //     } else {
    //       console.log('resp ====> ', resp);
    //       console.log('resp.data.officeTime ====> ', resp.data.data.officeTime);
    //       resp.data.data.officeTime.forEach(timeSlot => {
    //         delete timeSlot._id
    //       });
    //       var officeHours = resp.data.data.officeTime
    //       this.setState({ values: officeHours })

    //     }
    //   })
    //   .catch((error) => {
    //     this.props.showMessage({ variant: 'error', message: 'error' });
    //   })
  }


  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.state.change1 === true && this.props.getOfficeHoursDataStore ) { 
  //     if (localStorage.getItem("officeHours")) {
  //       console.log("IN IF")
  //       var data = JSON.parse(localStorage.getItem("officeHours"))
  //       this.setState({ values: data })
  //       this.setState({ change1: false })
  //       // this.setState({ change: false })
  //     } else {
  //       if (this.props.getOfficeHoursDataStore) {
  //         console.log("this.props.officeHours=>", this.props.getAppointment)
  //         this.setState({ values: this.props.getOfficeHoursDataStore.officeTime })
  //         localStorage.setItem("officeHours", JSON.stringify(this.state.values))
  //         this.setState({ change1: false })
  //       }
  //     }
      

  //   }else if (this.state.change === true && this.props.getOfficeTimeData) {
  //       // this.setState({ values: this.props.getOfficeTimeData })
  //       // this.setState({ change: false })
  //       if (localStorage.getItem("officeHours")) {
  //         console.log("IN IF")
  //         var data = JSON.parse(localStorage.getItem("officeHours"))
  //         this.setState({ values: data })
  //         this.setState({ change: false })
  //         // this.setState({ change: false })
  //       } else {
  //         if (this.props.getOfficeHoursDataStore) {
  //           console.log("this.props.officeHours=>", this.props.getAppointment)
  //           this.setState({ values:  this.props.getOfficeTimeData})
  //           localStorage.setItem("officeHours", JSON.stringify(this.state.values))
  //           this.setState({ change: false })
  //         }
  //       }
  //   }  

  // }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('this.props.change ++++++====> ', this.state.change);
    if (this.state.change1 === true && this.props.getOfficeHoursDataStore ) {
     // console.log('this.props.getOfficeHoursData ++++++====> ', this.props.getOfficeHoursDataStore && this.props.getOfficeHoursDataStore.officeTime);
      if (this.props.getOfficeHoursDataStore.officeTime) {
       // console.log('this.props.getOfficeHoursData.officeTime ====> ', this.props.getOfficeHoursDataStore.officeTime);
      
          console.log('officeTime =+++++++++++===> ', this.props.getOfficeHoursDataStore.officeTime);
          this.setState({ values: this.props.getOfficeHoursDataStore.officeTime })
          this.setState({ change1: false })
          //this.setState({ change: false })
        
      } 
    }else if (this.state.change === true && this.props.getOfficeTimeData) {
     
        console.log('this.props.getOfficeTimeData ====> ', this.props.getOfficeTimeData);
        this.setState({ values: this.props.getOfficeTimeData })
        this.setState({ change: false })
      //  this.setState({ change1: false })
    }
   

  }


  handleChange1 = idx => e => {
    let values = [...this.state.values];
    values[idx][e.target.name] = e.target.value;
    this.setState({ values: values, flag: true });
    localStorage.setItem("officeHours", JSON.stringify(this.state.values))
  };


  goToNextStep(event) {
    this.props.nextStep();
  }
  handleBack(event) {
    this.props.handleBack();
    localStorage.setItem("officeHours", JSON.stringify(this.state.values))

  }

  handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("officeHours")
    this.setState({ loading: true });

    console.log('this.state.value ====> ', this.state.values);
    var data = this.state.values;
      if(this.props.getOfficeHoursDataStore){
      var id = this.props.getOfficeHoursDataStore._id 
      }
    const dataList = {
      officeId: this.props.match.params.id,
      officeTime: data,
       _id:id

    }

    if (this.state.flag) {
      updateOfficeHours(dataList)
        .then((resp) => {
          console.log('resp ====> ', resp);
          this.props.showMessage({ variant: 'success', message: 'Successfully saved' });
          setTimeout(() => {
            this.setState({ loading: false });
            this.setState({ loading: false });
            this.props.nextStep();
          }, 2000);


        })
        .catch((error) => {
          this.props.showMessage({ variant: 'error', message: 'error' });
        })
    } else {
      this.props.nextStep();
    }

  };

  render() {

    //console.log("start1", this.state.start1)
    const { loading } = this.state;
    console.log("getOfficeHorseData~~~~~~~~~~~>", this.props.getOfficeTimeData)
    return (

      <FuseAnimate animation="transition.slideUpIn" delay={400}>
        <div className="p-24 flex w-full office-officetime-wrap">

          <Card className="md:w-1/2 office-time-wrap">
            <CardContent>
              <div className="mt-5 mb-32 icon-div icon-div-03">
                <Typography variant="h6">Setup Your Availability</Typography>
                <Typography noWrap>
                  Configure the times you can schedule patients for the office
                </Typography>
              </div>

              <Typography color="textSecondary" gutterBottom>
                Office Hours
                            </Typography>
              <Divider />

              <form className="px-8 pt-12 pb-8 mb-4 office-time" onSubmit={this.handleSubmit}>
                <div className="flex text-center">
                  <div className="flex-1 mr-6" />
                  <div className="flex-1 mr-6">Start</div>
                  <div className="flex-1 mr-12">End</div>
                  <div className="flex-1 ml-12">Start</div>
                  <div className="flex-1 ml-6">End</div>
                </div>
                {this.state.values && this.state.values.map((day, i) => (
                  <div className="flex" key={i}>
                    <div className="flex-1 mr-6">
                      <Typography
                        style={{ lineHeight: '32px' }}
                        gutterBottom
                      >
                        <label htmlFor="days">{day.day}</label>
                      </Typography>
                    </div>
                    <div className="flex-1 mr-6">
                      {/* {this.state.values && console.log("here ===>", this.state.values[day][0] )} */}
                      <TextField
                        id="time"
                        type="time"
                        name="office_start_time"

                        className="w-full px-6 border rounded leading-loose mx-3"
                        onChange={this.handleChange1(i)}
                        value={day.office_start_time}
                        //onChange={(e) => this.handleChange1(this, i, day, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />

                    </div>
                    <div className="flex-1 mr-12">
                      <TextField
                        id="time1"
                        type="time"
                        name="office_end_time"
                        value={day.office_end_time}
                        // value={this.state.values[day][0].to}
                        className="w-full px-6 border rounded leading-loose mx-3"
                        onChange={this.handleChange1(i)}
                        //onChange={(e) => this.handleChange1(this, i, day, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                    <div className="flex-1 ml-12">
                      <TextField
                        id="time2"
                        type="time"
                        name="lunch_start_time"
                        value={day.lunch_start_time}
                        //value={this.state.values[day][1].from}
                        className="w-full px-6 border rounded leading-loose mx-3"
                        onChange={this.handleChange1(i)}
                        // onChange={(e) => this.handleChange1(this, i, day, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                    <div className="flex-1 ml-6">
                      <TextField
                        id="time3"
                        type="time"
                        value={day.lunch_end_time}
                        name="lunch_end_time"
                        // value={this.state.values[day][1].to}
                        className="w-full px-6 border rounded leading-loose mx-3"
                        onChange={this.handleChange1(i)}
                        //onChange={(e) => this.handleChange1(this, i, day, e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Divider className="mb-32" />
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
              </form>
            </CardContent>
          </Card>
        </div>
      </FuseAnimate>


    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // saveOffice: Actions.saveOffice,
    //getOfficeDetails: Actions.getOfficeDetails,
    updateOfficeHours: Actions.updateOfficeHours,
    showMessage: _Actions.showMessage,
    //getState: Actions.getState,
    getOfficeHoursData: Actions.getOfficeHoursData,
    getOfficeTime: Actions.getOfficeTime

  }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
  return {
    userData: authReducers.login,
    // getOfficeData: settingReducer.office,
    // getSateName: settingReducer.office.getState,
    getOfficeTimeData: settingReducer.office.getOfficeTime,
    getOfficeHoursDataStore: settingReducer.officeHours.getOfficeHours
  }
}

export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(OfficeHours)
    )
  ))
);
