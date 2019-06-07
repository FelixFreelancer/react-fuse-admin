import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Grid
} from '@material-ui/core';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    }
});

class EventDialogForm extends React.Component {
    state = {
        examType: "",
        insuranceProv: "",
        labelWidth: 0
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef.current).offsetWidth
        });
        const { getExamType, insuranceProvider } = this.props;
        getExamType();
        insuranceProvider();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.callBackSelect({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        console.log("exam type", this.props.getExamType)
        console.log("insuranceProvider", this.props.insuranceProvider)
        this.InputLabelRef = React.createRef();
        return (
            <div className={classes.root} autoComplete="off">
            <br/>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                            <FormControl required  variant="outlined" ageclassname={classes.formControl}>
                            <InputLabel ref={this.InputLabelRef} htmlFor="examType-native-required">Exam Type</InputLabel>
                            <Select
                                native
                                value={this.state.examType}
                                onChange={this.handleChange}
                                name="examType"
                                inputProps={{
                                id: 'examType-native-required',
                                }}
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="examType"
                                        id="outlined-examType-simple"
                                    />
                                }
                            >
                             <option value=""></option>
                            {this.props.examType && this.props.examType.map((exam, _id) => {
                                    return (
                                       
                                    <option key={exam._id} id={exam._id} value={exam._id}>{exam.Exam_Name}</option>
                                )
                                })
                                }
                                
                            </Select>
                            {/* <FormHelperText>Required</FormHelperText> */}
                            </FormControl>
                       
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <FormControl required  variant="outlined" insuranceclassname={classes.formControl}>
                            <InputLabel ref={this.InputLabelRef} htmlFor="insurance-native-required">Insurance Provider</InputLabel>
                            <Select
                                native
                                value={this.state.insuranceProv}
                                onChange={this.handleChange}
                                name="insuranceProv"
                                inputProps={{
                                id: 'insurance-native-required',
                                }}
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="insurance"
                                        id="outlined-insurance-simple"
                                    />
                                }
                            >
                             <option value=""></option>
                            {this.props.insurance && this.props.insurance.map((insur, _id) => {
                                    return (
                                       
                                    <option key={insur._id} id={insur._id} value={insur._id}>{insur.Insurance_Name}</option>
                                )
                                })
                                }
                                
                            </Select>
                            {/* <FormHelperText>Required</FormHelperText> */}
                            </FormControl>
                        
                    </Grid>

                </Grid>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getExamType: Actions.getExamType,
        insuranceProvider: Actions.insuranceProvider
    }, dispatch);
}

function mapStateToProps({ calendarApp }) {
    return {
        examType: calendarApp.events.examType,
        insurance: calendarApp.events.insurance

    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EventDialogForm));
