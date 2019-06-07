import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton,Tooltip, Paper, Typography, Toolbar, AppBar, FormControlLabel, Switch, Grid } from '@material-ui/core';
import FuseUtils from '@fuse/FuseUtils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from '@lodash';
import moment from 'moment';
import * as Actions from './store/actions';
import EventDialogForm from './EventDialogForm';
import {FuseAnimate, TextFieldFormsy} from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import Formsy from 'formsy-react';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

const defaultEventState = {
    id: FuseUtils.generateGUID(),
    firstName: '',
    allDay: true,
    start: new Date(),
    end: new Date(),
    desc: ''
};

class EventDialog extends Component {
    constructor(props) {
        super(props);
    this.state = {
        ...defaultEventState,
        firstName: '',
        lastName:'',
        email:'',
        phone:'',
        dateOfBirth:'2017-05-24',
        insurance:true,
        appointmentDate:'2018-04-28',
        appointmentTime:'11:45'
        //selfPay:false,
        
       
    };
    this.closeComposeDialog = this.closeComposeDialog.bind(this);
   // this.closeNewEventDialog = this.closeNewEventDialog.bind(this);
}
  
    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        var userInfo = localStorage.getItem("userData"); 
        var data = JSON.parse(userInfo)
        var ids = data._id

        const dataList = {
            //id:ids,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            dateOfBirth: this.state.dateOfBirth,
            appointmentDate: this.state.appointmentDate,
            appointmentTime: this.state.appointmentTime,
            examType: this.state.examType,
            insurance:this.state.insuranceProv
          }

        if (this.props.eventDialog.type === 'new') {
                this.props.addEvent(dataList);
                this.closeComposeDialog()
        }
        else if(this.props.eventDialog.type === 'edit'){
              this.props.updateEvent(dataList);
                this.closeComposeDialog()
        }


    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.eventDialog.props.open && this.props.eventDialog.props.open) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.eventDialog.type === 'edit' &&
                this.props.eventDialog.data &&
                !_.isEqual(this.props.eventDialog.data, prevState)) {
                this.setState({ ...this.props.eventDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.eventDialog.type === 'new') {
                this.setState({ ...defaultEventState, ...this.props.eventDialog.data });
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.eventDialog.type === 'edit' ? this.props.closeEditEventDialog() : this.props.closeNewEventDialog();
    };

    canBeSubmitted() {
        const { firstName } = this.state;
        return (
            firstName.length > 0
        );
    }

    callBackSelect = (value) => {
        //console.log("callback", value)
        this.setState(value);
    } 

    render() {
        console.log("label~~~~>", this.props.eventDialog.data)
        console.log("date~~~~~>", this.props.date)
        //console.log("this.props.eventDialog.type~~~~~~~>", this.props.eventDialog.type)
        const { eventDialog, addEvent, updateEvent, removeEvent, classes,label, date } = this.props;
        const {canSubmit} = this.state;
        const start = moment(this.state.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        const end = moment(this.state.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

        return (
            <Dialog {...eventDialog.props} onClose={this.closeComposeDialog} fullWidth maxWidth="sm">

                <AppBar position="static">
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {eventDialog.type === 'new' ? 'New Appointment' : 'Edit Appointment'}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Formsy
                
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center"
                >
                <DialogContent classes={{ root: "p-16 pb-0 row sm:p-24 sm:pb-0" }}>
                Patient Detail
                
                <Paper className={classes.root} elevation={1}>
                
                    <FuseAnimate delay={500}>
                        <div className="flex items-center justify-center">
                            <Tooltip title="Previous">
                                <IconButton aria-label="Previous">
                                    <Icon>chevron_left</Icon>
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">{}</Typography>
                            <Tooltip title="Next">
                                <IconButton aria-label="Next">
                                    <Icon>chevron_right</Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </FuseAnimate>
               
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                    
                        <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="firstName"
                        label="First Name"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        required
                        variant="outlined"
                    />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="lastName"
                        label="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        required
                        variant="outlined"
                    />
                    </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                        <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        validations="isEmail"
                        validationError="This is not a valid email"
                        required
                        variant="outlined"
                    />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="phone"
                        label="Cell"
                        onChange={this.handleChange}
                        value={this.state.phone}
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        required
                        variant="outlined"
                    />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                                    <TextFieldFormsy
                                        id="date"
                                        name="dateofBirth"
                                        label="Date Of Birth"
                                        type="date"
                                        className="mb-16"
                                        //defaultValue="2017-05-24"
                                        onChange={this.handleChange}
                                        value={this.state.dateOfBirth}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        validationErrors={{
                                            minLength: 'please select Birthdate'
                                        }}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        required
                                    />
                        {/* <TextFieldFormsy
                        name="dateofBirth"
                        label="Date Of Birth"
                        type="date"
                        className="mb-16"
                        InputLabelProps={{
                            shrink: true
                        }}
                        validationErrors={{
                            minLength: 'please select Birthdate'
                        }}
                        defaultValue={this.state.dateOfBirth}
                        onChange={this.handleChange}
                        variant="outlined"
                        required
                        
                    /> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                className="mt-8 mb-16"
                                control={
                                    <Switch
                                        checked={this.state.insurance}
                                        id="insurance" name="insurance" onChange={this.handleChange}
                                    />
                                }
                                label="insurance"
                            />

                        </Grid>
                    </Grid>
                    
                    </Paper>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                                <EventDialogForm callBackSelect={this.callBackSelect}/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mx-auto my-16"
                        aria-label="LOG IN"
                        disabled={!canSubmit}
                    >
                        Save
                    </Button>
                {/* {eventDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addEvent(this.state);
                                this.closeComposeDialog();
                            }}
                           disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between pl-8 sm:pl-16">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    updateEvent(this.state);
                                    this.closeComposeDialog();
                                }}
                               disabled={!this.canBeSubmitted()}
                            > Save
                        </Button>
                            <IconButton
                                onClick={() => {
                                    removeEvent(this.state.id);
                                    this.closeComposeDialog();
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )} */}
                     </Formsy>
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeEditEventDialog: Actions.closeEditEventDialog,
        closeNewEventDialog: Actions.closeNewEventDialog,
        addEvent: Actions.addEvent,
        updateEvent: Actions.updateEvent,
        removeEvent: Actions.removeEvent
    }, dispatch);
}

function mapStateToProps({ calendarApp }) {
    return {
        eventDialog: calendarApp.events.eventDialog
    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EventDialog));
