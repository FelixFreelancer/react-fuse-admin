import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FuseAnimateGroup } from '@fuse';
import * as moment from 'moment';
import {
  Card,
  CardContent,
  Icon,
  TextField,
  Typography,
  Divider,
  CardActions,
  Button,
  CircularProgress,
  Fab
} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from 'material-ui-flat-pagination';
import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import * as Actions from './../store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reducer from './../store/reducers';
import Dialog from '@material-ui/core/Dialog';

//components
import AddPatient from './AddPatient';

const styles = theme => ({
  layoutRoot: {},
  fabProgress: {
    position: 'absolute',
    top: '8px',
    right: '22px',
    color: '#0097db',
    opacity: '0.5',
    zIndex: 1
  },
  fab: {
    bottom: '85px',
    right: '30px',
    position: 'fixed',
    zIndex: 99
  }
});

class Patients extends Component {
  state = {
    offset: 0,
    query: '',
    open: false,
    
  };

  searchPatient = offset => {
    this.props.getPatients({ search: this.state.query, offset });
    this.setState({
      offset
    });
  };
  componentDidUpdate() {
    console.log('this.props ====> ', JSON.stringify(this.props.patients))
 }
  componentDidMount() {
    this.props.getPatients({ offset: this.state.offset  });
    
  }

  addPatient = event => {
    event.preventDefault();
    console.log('ev', event);
    this.setState({ open: true });
    //this.props.getPatients({ search: this.state.query });
    
  };

  handleClose = () => {
    this.setState({ open: false });
  }

  /**
   * @description Triggered on Form Submit
   * @author Sharan
   * @param values Chart
   * @todo Save the data here
   */
  onSubmit = values => {
    console.log('values', values);
    // values.patientId = this.props.patientId;
    this.props.createPatient(values);

    this.handleClose();
  };

  render() {
    const { patients = [], isFetching, classes } = this.props;
    console.log("abcs",JSON.stringify(patients));
    

    return (
      <section>
        <Fab className={classes.fab} onClick={this.addPatient}>
          <Icon>add</Icon>
        </Fab>

        <div className="flex flex-col sm:flex-row items-center justify-between py-24">
          <TextField
            label="Search for a patient"
            placeholder="Enter a name..."
            className="flex w-full mb-16 sm:mb-0 mx-16"
            value={this.state.query}
            disabled={isFetching}
            inputProps={{
              'aria-label': 'Search'
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="Toggle password visibility"
                    onClick={event => this.searchPatient(0)}
                    disabled={isFetching}
                  >
                    <Icon>search</Icon>
                  </Fab>
                  {isFetching && (
                    <CircularProgress
                      size={40}
                      className={classes.fabProgress}
                    />
                  )}
                </InputAdornment>
              )
            }}
            onChange={event => this.setState({ query: event.target.value })}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        {!isFetching && (
          <div className="px-24">
            <div className="flex">
              {patients.length == 0 && !isFetching && (
                <div>
                  <Typography>No Patients found</Typography>
                </div>
              )}
              <FuseAnimateGroup
                className="flex flex-wrap w-full"
                enter={{
                  animation: 'transition.slideLeftBigIn'
                }}
                leave={{
                  animation: 'transition.slideLeftBigOut'
                }}
              >
                {patients && patients.patients.map((res, index) => (
                  <div className="pb-24 md:w-1/2 lg:w-1/3 sm:p-16" key={index}>
                    <Card elevation={1} className="flex flex-col h-256">
                      <div
                        className="flex flex-no-shrink items-center justify-between px-12 h-32"
                        style={{
                          background: '#0099E0',
                          color: 'white'
                        }}
                      >
                        <Typography
                          className="font-medium truncate"
                          color="inherit"
                        >
                          {res.patient && res.patient.user && res.patient.user.firstName} {res.patient && res.patient.user && res.patient.user.lastName || ''}
                        </Typography>
                    
                      </div>
                      <CardContent className="flex flex-col flex-auto items-center justify-center">
                      
                        <Typography
                          className="text-center text-13 font-600 mt-4"
                          color="textSecondary"
                        >
                          DOB : {res.patient && moment(res.patient.dob).format('MM/DD/YYYY')}
                        </Typography>
                        <Typography
                          className="text-center text-13 font-600 mt-4"
                          color="textSecondary"
                        >
                          Gender : <span style={{ textTransform: 'capitalize' }}>{res.patient && res.patient.gender || 'Unspecified'}</span>

                        </Typography>
                        <Typography
                          className="text-center text-13 font-600 mt-4"
                          color="textSecondary"
                        >
                          Insurance Name: <span style={{ textTransform: 'capitalize' }}>{(res.patient && res.patient.visionInsurance && res.patient.visionInsurance.insuranceProvider && res.patient.visionInsurance.insuranceProvider.Insurance_Name) || 'Unspecified'}</span>
                        </Typography>
                        <Typography
                          className="text-center text-13 font-600 mt-4"
                          color="textSecondary"
                        >
                          Billed Date : XXXXX
                        </Typography>
                        <Typography
                          className="text-center text-13 font-600 mt-4"
                          color="textSecondary"
                        >
                          Visit Date :  <span style={{ textTransform: 'capitalize' }}>{ res.lastVisitOn ? moment(res.lastVisitOn).format('MM/DD/YYYY') : "XXXX" }</span>
                        </Typography>
                        <Typography
                          className="text-center text-13 font-600 mt-4"
                          color="textSecondary"
                        >
                          Diagnosis : <span style={{ textTransform: 'capitalize' }}>{ res.diagnosis ? res.diagnosis : "XXXX" }</span>
                        </Typography>
                      </CardContent>
                      <Divider />
                      <CardActions className="justify-center">
                        <Button
                          component={Link}
                          to={`/patient/${res._id}`}
                          className="justify-start px-32"
                          color="secondary"
                        >
                          Manage
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ))}
              </FuseAnimateGroup>
            </div>
            <Divider />
            <div className="flex justify-end py-16">
              <Pagination
                limit={10}
                offset={this.state.offset}
                total={patients.length}
                onClick={(e, offset) => this.searchPatient(offset)}
              />
            </div>
          </div>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <AddPatient onSubmit={this.onSubmit} handleClose={this.handleClose} />
        </Dialog>
      </section>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPatients: Actions.getPatients,
      createPatient: Actions.createPatient

    },
    dispatch
  );
}

function mapStateToProps({ patientsReducer }) {
  return {
    patients:patientsReducer.patients
  };
}

export default withReducer('patientsReducer', reducer)(
  withStyles(styles, { withTheme: true })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Patients)
  )
);
