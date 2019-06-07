import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import {
    Card,
    Typography,
    CardContent,
    withStyles,
} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { TextField } from './../../../../shared-components/Form';
import { SlideToggle } from '../../../../shared-components/Form';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
const styles = theme => ({
    layoutRoot: {}
});

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
var signDate


class WaiversAndReleases extends Component {
  constructor(props){
    super(props);
    this.state={
      // intervalId:"",
      // currentTime:moment.utc(dateTime).format('MM/DD/YYYY HH:mm:ss')
    }
  }
    render() {
      // const { currentTime } =this.state;
      console.log('this.props.initialValues ====> ',this.props.initialValues);
        const { patientId } = this.props;
        return (
            <Card className="mb-16 w-full">
                <CardContent>
                    <Typography variant="subtitle1" className="mb-6">Waivers and Releases</Typography>
                    <div className="w-full max-w-md my-24">
                        {/* <Typography variant="subtitle1"><p>HIPAA : 02/25/2018</p></Typography>
                        <Typography variant="subtitle1"><p>Financial : 02/25/2018</p></Typography>
                        <Typography variant="subtitle1"><p>Billing : 02/25/2018</p></Typography> */}
                         <Field component={TextField} name="HIPAA" label="Signed Waivers" />
                         {/* <Field component={TextField} name="financial" label="Signed Waivers" />
                         <Field component={TextField} name="billing" label="Signed Waivers" /> */}
                    </div>
                    <Field component={SlideToggle} name="isSigned" label="Signed Waivers" />
                   {/* {currentTime} */}
                   {/* {signDate} */}
                </CardContent>
            </Card>
        );
    }
    // componentDidMount(){
    //  var intervalId=setInterval(()=>{
    //     this.setState({
    //       currentTime:moment.utc(dateTime).format('MM/DD/YYYY HH:mm:ss')
    //     })
    //   },2000);
    //   this.setState({
    //     intervalId
    //   })
    // }
    // componentWillUnmount(){
    //   clearInterval(this.state.intervalId);
    // }
}

WaiversAndReleases = reduxForm({
    form: 'WaiversAndReleasesForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
    onChange: (values, dispatch, { autoSave, pristine, dirty }) => {
      console.log('values ====> ',values);
      // if (!pristine || dirty) {
       
        if(values.isSigned === true){
          signDate = moment.utc(dateTime).format('MM/DD/YYYY HH:mm:ss') ;
          console.log('signDate ====> ',signDate);
        }else{
          signDate =""
        }
        var data ={
          HIPAA: signDate,
          isSigned: true,
          // financial: signDate,
          // billing: signDate
        }
        autoSave('waiversAndReleases', { waiversAndReleases: data });
      //}
    }
  })(WaiversAndReleases);
  
  function mapStateToProps({ patientReducer }) {
    return {
      initialValues: patientReducer.profile.waiversAndReleases
      
    };
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({   
      getProfile: Actions.getProfile,
     // getInsuranceName: Actions.getInsuranceName
    
    }, dispatch);
  }
  export default withReducer('Reducer', reducer)(
    withStyles(styles, { withTheme: true })(
      withRouter(
        connect(
          mapStateToProps,
          mapDispatchToProps
        )(WaiversAndReleases)
      )
    )
  );

// WaiversAndReleases = reduxForm({
//     form: 'WaiversAndReleasesForm'
// })(WaiversAndReleases);

// function mapStateToProps({ profileReducer }) {
//     return {
//         ...profileReducer.patient
//     };
// }

// export default withReducer('Reducer', reducer)(
//     withStyles(styles, { withTheme: true })(
//         withRouter(connect(mapStateToProps, null)(WaiversAndReleases))
//     )
// );



