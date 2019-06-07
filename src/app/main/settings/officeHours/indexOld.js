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
import {saveOffice} from '../../../../app/main/settings/store/actions/office.action';
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
      pacticeName: '',
      address1: '',
      address2: '',
      city: '',
      selState: '',
      ZIP: '',
      phone: '',
     // values: { "Monday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Tuesday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Wednesday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Thursday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Friday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Saturday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Sunday": [{ "from": "", "to": "" }, { "from": "", "to": "" }] }
      values: [{ day: "", office_start_time: "", office_end_time: "", lunch_start_time: "",lunch_end_time:"" }]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    //this.getOfficeId = this.getOfficeId.bind(this);

    //this.handleBack = this.handleBack.bind(this);
  }
  componentDidMount() {
    localStorage.removeItem("appointment");
    localStorage.removeItem("user");
    localStorage.removeItem("billing");
    localStorage.removeItem("insurance");

    if(this.props.match.params.id){
    this.props.getOfficeDetails(this.props.match.params.id)
    }
    this.props.getState();
    this.props.getOfficeTime()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

    if (prevProps.getOfficeData.getOfficeDetails !== this.props.getOfficeData.getOfficeDetails) {
      if(this.props.getOfficeData.getOfficeDetails) {
      if (this.props.getOfficeData.getOfficeDetails.data) {
        this.setState({ pacticeName: this.props.getOfficeData.getOfficeDetails.data.office.Office_Name })
        this.setState({ address1: this.props.getOfficeData.getOfficeDetails.data.office.Address_1 })
        this.setState({ address2: this.props.getOfficeData.getOfficeDetails.data.office.Address_2 })
        this.setState({ city: this.props.getOfficeData.getOfficeDetails.data.office.City })
        this.setState({ ZIP: this.props.getOfficeData.getOfficeDetails.data.office.Zip })
        this.setState({ selState: this.props.getOfficeData.getOfficeDetails.data.office.State })
        this.setState({ phone: this.props.getOfficeData.getOfficeDetails.data.office.Phone })
        // console.log('here office data ====>',this.props.getOfficeData.getOfficeDetails.data.officeTime.officeTime);
        
      }
    }
    }
    if (prevProps.getOfficeTimeData !== this.props.getOfficeTimeData) {  
    if (this.props.getOfficeTimeData) {
      if (this.props.getOfficeTimeData!== null && this.props.getOfficeTimeData !== null) {
        this.setState({ values: this.props.getOfficeTimeData })
      }
    }
  }
  }
  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

    handleChange1 = idx => e => {
      console.log("index", idx)
    let values = [...this.state.values];
    console.log("value", e.target.value)
    values[idx][e.target.name] = e.target.value;
    this.setState({ values: values });
    // console.log("i", i, "day", day, "input_value", input_value);
    // shareHolders[idx][e.target.name] = e.target.value;
    // // let v = [...this.state.values];
    // let state_values = this.state.values;


    // console.log("state_values =>", state_values);

    // console.log("length", Object.keys(this.state.values).length)

    // Object.keys(this.state.values).map((v, id) => {
    //    console.log("v => ", v);

      // if (v === day) {
      //   let day_obj = state_values[v];
      //   console.log("day_obj =>", day_obj);

      //   if (slot === 1 || slot === 3)  // from
      //   {
      //     if (slot === 1) {
      //       day_obj[0].from = input_value;
      //     }
      //     else if (slot === 3) {
      //       day_obj[1].from = input_value;
      //     }
      //   } else  // to
      //   {
      //     if (slot === 2) {
      //       day_obj[0].to = input_value;
      //     }
      //     else if (slot === 4) {
      //       day_obj[1].to = input_value;
      //     }
      //   }

      //   state_values[v] = day_obj;
      // }


    //   this.setState({ values: state_values })

    // })

    // console.log("state_values => ", state_values);


  }
  goToNextStep(event){
   // event.preventDefault();
    this.props.nextStep();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.userData) {
      var userInfo = this.props.userData.userData
      var userId = userInfo._id
      // this.getDoctorID(ids)

    }
    console.log("SUBMIT => ", this.state.values);
    // alert('A name was submitted: ' + this.state.values.join(', '));
    const officeInfo = {
      Office_Name: this.state.pacticeName,
      Address_1: this.state.address1,
      Address_2: this.state.address2,
      City: this.state.city,
      State: this.state.selState,
      Zip: this.state.ZIP,
      Phone: this.state.phone,
      officeTime: this.state.values,
      userId: userId

    }
    console.log("office data", officeInfo)
    var officeId = this.props.match.params.id
    if(officeId){
    this.props.updateOffice(officeInfo, officeId)
   // this.props.nextStep();
    }
    else{
      saveOffice(officeInfo)
      .then((resp) => {
        console.log("response of office page", resp.data.data.office._id)
        var Id = resp.data.data.office._id
        if(resp.data.success === true){
          this.props.showMessage({  variant: 'success', message: 'Successfully Added Office' });
          this.props.getOfficeId(Id);


      }else{
        this.props.showMessage({  variant: 'error', message: 'error' });
      
      }
        
    })
    .catch((error) => {
    
    })
    }
  
  };
  render() {
   
    //console.log("start1", this.state.start1)
    console.log("props", this.props.getOfficeTimeData)
    return (
      <FusePageCarded
        // classes={{
        //   content: 'flex',
        //   header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 '
        // }}
        className="abbbbbbbb"
        header={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-center">
              <Icon className="text-32 mr-0 sm:mr-12">store</Icon>
              <Typography className="hidden sm:flex" variant="h6">
                Add Office
              </Typography>
            </div>

            <Button
              component={Link}
              to="/settings/offices"
              className="whitespace-no-wrap"
              variant="contained"
            >
              <span className="sm:flex">Return</span>
            </Button>
          </div>
        }
        content={
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
                {/* <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Office Hours
                  </Typography>
                  <Divider /> */}
                  <form className="px-8 pt-12 pb-8 mb-4 office-time">
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
                  </form>
                </CardContent>
              </Card>
            </div>
          </FuseAnimate>
        }
      />
    );
  }
  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveOffice: Actions.saveOffice,
    getOfficeDetails: Actions.getOfficeDetails,
    updateOffice: Actions.updateOffice,
    showMessage: _Actions.showMessage,
    getState: Actions.getState,
    getOfficeTime:Actions.getOfficeTime

  }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
  return {
    userData: authReducers.login,
    getOfficeData: settingReducer.office,
    getSateName: settingReducer.office.getState,
    getOfficeTimeData:settingReducer.office.getOfficeTime
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
