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
import {saveOffice, updateOffice} from '../../../../app/main/settings/store/actions/office.action';
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
     // values: { "Monday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Tuesday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Wednesday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Thursday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Friday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Saturday": [{ "from": "", "to": "" }, { "from": "", "to": "" }], "Sunday": [{ "from": "", "to": "" }, { "from": "", "to": "" }] }
      values: [{ day: "", office_start_time: "", office_end_time: "", lunch_start_time: "",lunch_end_time:"" }],
      loading: false,
      flag:false
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
    this.setState({flag:true})
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
    this.setState({ loading: true });
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
    if(this.state.flag){
    updateOffice(officeInfo, officeId)
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
    }
    else{
      saveOffice(officeInfo)
      .then((resp) => {
        console.log("response of office page", resp.data.data._id)
        var Id = resp.data.data._id
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
    const { loading } = this.state;
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
              <Card className="md:w-1/2 mr-16">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Office
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
                    <div className="flex my-12 wrap-state-zip">
                      <div className="w-1/3 mr-6">
                        <label htmlFor="selState">State</label>
                        <select name="selState" className="w-full px-6 border rounded leading-loose mx-3" value={this.state.selState}  onChange={this.handleChange} required>
                        <option value="">Select State</option>
                        
                        {this.props.getSateName ? this.props.getSateName && this.props.getSateName.map((data, i) => {
                          return (
                            <option key={i} value={data.abbreviation}>{data.name}</option>
                          )

                        })
                        :null
                        }
                      </select>
                       
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
                   
         
                {!this.props.match.params.id &&
            // <Button type="submit" variant="contained" color="secondary">
            //   submit
            // </Button>
            <Button type="submit" variant="contained" color="secondary" disabled={loading} >
                      {loading && (
                        <Icon className="glyphicon glyphicon-refresh glyphicon-refresh-animate">refresh</Icon>

                      )}
                      {loading && <span>Saving Data</span>}
                      {!loading && <span>Save</span>}
            </Button>
                }
            {this.props.match.params.id &&
            //  <div className="flex justify-between mt-32">
            //          <Button type="submit" variant="contained" color="primary" >
            //           save 
            //       </Button>
            //       <Button variant="contained" color="secondary" onClick={this.goToNextStep}>Save And Next</Button>

            //    </div>
            <div className="flex justify-between mt-32">

                    {/* <Button variant="contained" color="primary" onClick={this.handleBack}>Back</Button> */}
                    <Button type="submit" variant="contained" color="secondary" disabled={loading} >
                      {loading && (
                        <Icon className="glyphicon glyphicon-refresh glyphicon-refresh-animate">refresh</Icon>

                      )}
                      {loading && <span>Saving Data</span>}
                      {!loading && <span>Save And Next</span>}
                    </Button>

                  </div>
            // <div>
            // <Button type="submit" variant="contained" color="primary" className="mr-12">
            //   Save
            // </Button>
            //  <Button  color="primary" onClick={this.goToNextStep} >
            //    Next
            // </Button>
            // </div>
           
            }
                    {/* <input type="submit" value="Submit" /> */}
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
      )(OfficePage)
    )
  ))
);
