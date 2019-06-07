import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageSimple, DemoContent } from '@fuse';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Button, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import * as _Actions from 'app/store/actions';
//import { saveProfile } from '../store/reducers';
// import reducer from '../store/reducers';
import reducer from '../../../auth/store/reducers';
import settingReducer from '../store/reducers'
import { Field, reduxForm } from 'redux-form';
import { Select, TextField } from '../../../shared-components/Form';
import { bindActionCreators } from 'redux';
import { BASE_URL } from '../../../fuse-configs/apiConfig';
import _ from '@lodash';
import axiosCore from 'axios';
const axios = axiosCore.create({
  baseURL: BASE_URL
});
const styles = theme => ({
  layoutRoot: {}
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      npi: '',
      email: '',
      title: '',
      cell: '',


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //  getDoctorID(userID) {
  //    console.log("call API with this id ===============>", userID);
  //     const request = axios.get(`/settings/doctorByUserId/${userID}`);
  //     return  request.then(response => {
  //         console.log('response ====>',response);
  //         console.log("data!!!!!!+++++++++++++", response.data.data._id)
  //         var doctoreId = response.data.data._id
  //         if(doctoreId) {
  //           this.props.getProfile(doctoreId)
  //         }

  //       });
  //   }

  componentDidUpdate(prevProps, prevState, snapshot) {

    console.log("prevProps")
    if (!prevProps.profile.profile.getProfile && this.props.profile.profile.getProfile) {

      if (this.props.profile.profile.getProfile &&
        !_.isEqual(this.props.profile.profile.getProfile, prevState)) {
        if (this.props.profile.profile.getProfile.data) {
          //this.setState({ ...this.props.profile.profile.getProfile.data });
          this.setState({ firstName: this.props.profile.profile.getProfile.data.First_Name })
          this.setState({ lastName: this.props.profile.profile.getProfile.data.Last_Name })
          this.setState({ npi: this.props.profile.profile.getProfile.data.NPI })
          this.setState({ title: this.props.profile.profile.getProfile.data.Title })
          this.setState({ email: this.props.profile.profile.getProfile.data.EMail })
          this.setState({ cell: this.props.profile.profile.getProfile.data.Cell })
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.userData) {
      console.log("this.props.userData ==>", this.props.userData)
      var userInfo = this.props.userData.userData
      console.log("userData ==>", userInfo)
      if (userInfo) {
        var ids = userInfo._id
        console.log("fdgfhfh **====>", ids)
        // this.getDoctorID(ids)
        this.props.getProfile(this.props.userData.userData.doctorId)
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


  handleSubmit(event) {
    event.preventDefault();
    const dataList = {
      First_Name: this.state.firstName,
      Last_Name: this.state.lastName,
      NPI: this.state.npi,
      EMail: this.state.email,
      Title: this.state.title,
      Cell: this.state.cell

    }
    //var userInfo = this.props.userData.userData
    //console.log("userData ==>", userInfo._id)
    // var DoctoreId = this.props.userData.userData.doctorId
    var DoctoreId = 'ssss'
    this.props.saveProfile(dataList, DoctoreId);
    //this.props.showMessage({  variant: 'success', message: 'Successfully Added Profile' });
  };
  render() {
    const { classes } = this.props;
    var userInfo = this.props.profile.profile.getProfile
    if (userInfo) {
      console.log("profile data~~~~~~~~", this.props.profile.profile.getProfile.data)
    }

    // var data = JSON.parse(userInfo)
    // var ids = data._id
    //  console.log("profile **====>", userInfo && userInfo.user)
    //  console.log("authreducer **====>", this.props.userData)
    return (
      // pageLoader ?
      // <div>Loading ....</div>
      // :
      <div>

        <FuseAnimate animation="transition.slideUpIn" delay={400}>
          <div className="p-24 flex w-full">
            <Card className="md:w-1/3 mr-16">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Profile
                  </Typography>
                <Divider />

                <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit}>

                  <div className="my-12">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="w-full border rounded leading-loose px-6 mx-3"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="my-12">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="w-full border rounded leading-loose px-6 mx-3"
                      name="lastName"
                      onChange={this.handleChange}
                      value={this.state.lastName}
                      required
                    />
                  </div>
                  <div className="my-12">
                    <label htmlFor="npi">NPI</label>
                    <input
                      type="number"
                      className="w-full border rounded leading-loose px-6 mx-3"
                      name="npi"
                      value={this.state.npi}
                      onChange={this.handleChange}

                      required
                    />
                  </div>
                  <div className="my-12">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="w-full border rounded leading-loose px-6 mx-3"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                      required
                    />
                  </div>
                  <div className="my-12">
                    <label htmlFor="cell">Cell</label>
                    <input
                      type="text"
                      className="w-full border rounded leading-loose px-6 mx-3"
                      name="cell"
                      onChange={this.handleChange}
                      value={this.state.cell}
                      required
                    />
                  </div>
                  <div className="my-12">
                    <label htmlFor="title">Title</label>
                    <select name="title" className="w-full border mb-8 px-6 mx-3" value={this.state.title} onChange={this.handleChange} required>
                      <option value=""></option>
                      <option value="Doctor">Doctor</option>
                      <option value="Doctore1">Doctore1</option>
                    </select>

                  </div>
                  {/* <input type="submit" value="Submit"/> */}
                  <Button type="submit" variant="contained" color="primary" >
                    Submit
                  </Button>
                  {/* <Button onClick={() => this.props.showMessage({
                    message: "temp msg",
                    variant: 'success',
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    }
                  })}>
                    Top - Right
                </Button> */}

                </form>

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
    saveProfile: Actions.saveProfile,
    getProfile: Actions.getProfile,
    showMessage: _Actions.showMessage


  }, dispatch);
}
function mapStateToProps({ authReducers, settingReducer }) {
  console.log('[profilePage.js] ====>', authReducers);
  return {
    // userData: authReducers.user.userData,
    userData: authReducers.login,
    profile: settingReducer
  }
}

// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(ProfilePage)
    )
  ))
);
