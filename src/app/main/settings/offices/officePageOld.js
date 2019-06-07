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
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun"
]
const styles = theme => ({
  layoutRoot: {}
  // button: {
  //   marginRight: theme.spacing.unit,
  // },
});

class OfficePage extends Component {
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
      values: { "mon": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "tue": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "wed": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "thu": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "fri": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "sat": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "sun": [{ "from": "", "to": "" }, { "from": "", "to": "" }] }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //this.handleBack = this.handleBack.bind(this);
  }
  componentDidMount() {
    if(this.props.match.params.id){
    this.props.getOfficeDetails(this.props.match.params.id)
    }


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
        if (this.props.getOfficeData.getOfficeDetails.data.officeTime) {
          if (this.props.getOfficeData.getOfficeDetails.data.officeTime !== null && this.props.getOfficeData.getOfficeDetails.data.officeTime.officeTime !== null && this.props.getOfficeData.getOfficeDetails.data.officeTime.officeTime['mon'] >= 1) {
            this.setState({ values: this.props.getOfficeData.getOfficeDetails.data.officeTime.officeTime })
          }
        }
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
  handleChange1(_this, i, day, slot, input_value) {
    console.log("i", i, "day", day, "slot", slot, "input_value", input_value);

    // let v = [...this.state.values];
    let state_values = this.state.values;


    console.log("state_values =>", state_values);

    console.log("length", Object.keys(this.state.values).length)

    Object.keys(this.state.values).map((v, id) => {
      // console.log("v => ", v, "day", day);

      if (v === day) {
        let day_obj = state_values[v];
        console.log("day_obj =>", day_obj);

        if (slot === 1 || slot === 3)  // from
        {
          if (slot === 1) {
            day_obj[0].from = input_value;
          }
          else if (slot === 3) {
            day_obj[1].from = input_value;
          }
        } else  // to
        {
          if (slot === 2) {
            day_obj[0].to = input_value;
          }
          else if (slot === 4) {
            day_obj[1].to = input_value;
          }
        }

        state_values[v] = day_obj;
      }


      this.setState({ values: state_values })

    })

    console.log("state_values => ", state_values);


  }
  // handleBack(event){
  //   this.props.handleBack();
  // }

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
    }else{
      this.props.saveOffice(officeInfo);
    }
    this.props.nextStep();
  };
  render() {
   
    console.log("start1", this.state.start1)
    console.log("props", this.props.getOfficeData)
    return (
      <FusePageCarded
        classes={{
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
        }}
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
              <span className="hidden sm:flex">Return</span>
            </Button>
          </div>
        }
        content={
          <FuseAnimate animation="transition.slideUpIn" delay={400}>
            <div className="p-24 flex w-full">
              <Card className="md:w-1/2 mr-16">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Profile
                  </Typography>
                  <Divider />

                  <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit}>
                    <div className="my-12">
                      <label htmlFor="password">Practice Name</label>
                      <input
                        type="text"
                        className="w-full border rounded leading-loose px-6 mx-3"
                        name="pacticeName"
                        value={this.state.pacticeName}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="my-12">
                      <label htmlFor="address1">Address 1</label>
                      <input
                        type="text"
                        className="w-full border rounded leading-loose px-6 mx-3"
                        name="address1"
                        value={this.state.address1}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="my-12">
                      <label htmlFor="address2">Address 2</label>
                      <input
                        type="text"
                        className="w-full border rounded leading-loose px-6 mx-3"
                        name="address2"
                        value={this.state.address2}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="my-12">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        className="w-full border rounded leading-loose px-6 mx-3"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="flex my-12">
                      <div className="w-1/3 mr-6">
                        <label htmlFor="selState">State</label>
                        <select name="selState" className="w-full border mb-8 px-6 mx-3" value={this.state.selState} onChange={this.handleChange} required>
                          <option value=""></option>
                          <option value="AL">AL</option>
                          <option value="North Carolina">North Carolina</option>
                        </select>

                        {/* <input
                          className="w-full border rounded leading-loose px-6 mx-3"
                          name="brand"
                          value={ this.state.firstName}
                        /> */}
                      </div>
                      <div className="w-1/3 mx-3">
                        <label htmlFor="ZIP">Zip</label>
                        <input
                          type="number"
                          className="w-full border rounded leading-loose px-6 mx-3"
                          name="ZIP"
                          value={this.state.ZIP}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="w-1/3 ml-6">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="number"
                          className="w-full border rounded leading-loose px-6 mx-3"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                   
            {/* <Button
                   // disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                </Button> */}
                <Button type="submit" variant="contained" color="primary"  >
              Next
            </Button>
                    {/* <input type="submit" value="Submit" /> */}
                  </form>
                </CardContent>
              </Card>
              <Card className="md:w-1/2 mr-16">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Office Times
                  </Typography>
                  <Divider />
                  <form className="px-8 pt-12 pb-8 mb-4 office-time">
                    <div className="flex text-center text-grey-darker">
                      <div className="flex-1 mr-6" />
                      <div className="flex-1 mr-6">Start</div>
                      <div className="flex-1 mr-12">End</div>
                      <div className="flex-1 ml-12">Start</div>
                      <div className="flex-1 ml-6">End</div>
                    </div>
                    {short_day.map((day, i) => (
                      <div className="flex" key={i}>
                        <div className="flex-1 mr-6">
                          <Typography
                            style={{ lineHeight: '32px' }}
                            color="textSecondary"
                            gutterBottom
                          >
                            {day}
                          </Typography>
                        </div>
                        <div className="flex-1 mr-6">
                          {/* {this.state.values && console.log("here ===>", this.state.values[day][0] )} */}
                          <TextField
                            id="time"
                            type="time"
                            value={this.state.values[day][0].from}
                            className="w-full px-6 border rounded leading-loose mx-3"
                            onChange={(e) => this.handleChange1(this, i, day, 1, e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                          />
                          {/* <input
                            className="w-full px-6 border rounded leading-loose mx-3"
                            // name={`${index + "start1" + 1}`}

                            
                            value={this.state.start1}
                          /> */}
                        </div>
                        <div className="flex-1 mr-12">
                          <TextField
                            id="time"
                            type="time"
                            value={this.state.values[day][0].to}
                            className="w-full px-6 border rounded leading-loose mx-3"
                            onChange={(e) => this.handleChange1(this, i, day, 2, e.target.value)}
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
                            id="time"
                            type="time"
                            value={this.state.values[day][1].from}
                            className="w-full px-6 border rounded leading-loose mx-3"
                            onChange={(e) => this.handleChange1(this, i, day, 3, e.target.value)}
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
                            id="time"
                            type="time"
                            value={this.state.values[day][1].to}
                            className="w-full px-6 border rounded leading-loose mx-3"
                            onChange={(e) => this.handleChange1(this, i, day, 4, e.target.value)}
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
    updateOffice: Actions.updateOffice

  }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
  return {
    userData: authReducers.login,
    getOfficeData: settingReducer.office,
  }
}

export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(OfficePage)
    )
  ))
);
