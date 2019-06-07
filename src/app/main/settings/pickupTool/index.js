import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { FusePageSimple, DemoContent } from '@fuse';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Button, Icon, Typography, Fab, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import * as Actions from '../store/actions';
import '../../../../styles/style-narola.css';
import reducer from '../../../auth/store/reducers';
import settingReducer from '../store/reducers';
import { bindActionCreators } from 'redux';
import withReducer from 'app/store/withReducer';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Open Sans, sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#c23d4b',
            },
        }
    }
};

const styles = theme => ({
    layoutRoot: {},
    button: {
        marginRight: theme.spacing.unit,
        marginTop: "50px"
        // marginTop:100
    },
});

class PickTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            chart:"Free",
            eligibility:'',
            billing:'',
            chartchecked:true,
            eligibilityChecked:false,
            billchecked:false,
            list:[]


        };
        //  this.submit = this.submit.bind(this);

        this.handleBack = this.handleBack.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);

    }
    goToNextStep(event) {
        this.props.nextStep();
    }
    handleBack(event) {

        this.props.handleBack();
    }


    handleChange1 = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    toggleChangeChart = () => {
        this.setState(prevState => ({
            chartchecked: !prevState.chartchecked,
        }));
      

    }

    toggleChangeEligible = () => {
        this.setState(prevState => ({
            eligibilityChecked: !prevState.eligibilityChecked,
        }));
       // console.log("eligibilityChecked",this.state.eligibilityChecked)
      
        if(this.state.eligibilityChecked) {
           
            this.setState({eligibility: 99})
        }
       else{
        this.setState({eligibility: 0})
       }
      
       
    }

    toggleChangeBill = () => {
        this.setState(prevState => ({
            billchecked: !prevState.billchecked,
        }));
       // console.log("billchecked",this.state.billchecked)
        if(this.state.billchecked) {
           
            this.setState({billing: 99})
        }
       else{
        this.setState({billing: 0})
       }
        
    }


    handleChange = ({ error }) => {
        if (error) {
            this.setState({ errorMessage: error.message });
        }
    };



    render() {
       
        const { classes } = this.props;
        //console.log("eligibility~~~~~~~~~~>", this.state.eligibility)
        console.log('this.state.eligibility ====> ',this.state.eligibility);
        console.log('this.state.list ====> ',this.state.billing);

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={400}>
                <div className="p-24 flex w-full office-officetime-wrap">
                    <Card className="md:w-1/2 mr-16  w-full">
                        <CardContent>
                            <div className="mt-5 mb-32 icon-div icon-div-02">
                                <Typography variant="h6">Pick Your Tools</Typography>
                                <Typography noWrap>
                                    Choose the things you want to use in your practice
                                </Typography>
                            </div>
                            <Typography color="textSecondary" gutterBottom>

                            </Typography>
                            <Divider />
                            <div className="mt-25 mb-10 ">   
                                <Typography noWrap>
                                   How Easy Will You Make It To Run The Practice? 
                                </Typography>
                            </div>
                            <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit}>
                                <div className="w-full max-w-md my-24">
                                    <div className="flex flex-wrap mb-6">

                                        <div className="mb-6 md:w-1/4">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.chartchecked}
                                                        onChange={this.toggleChangeChart}
                                                        value={this.state.chart}
                                                        color="secondary"
                                                        style={{ height: '24px' }}
                                                    />
                                                }
                                                label="Chart"
                                            />
                                        </div>
                                        <div className="mb-6 md:w-1/4" style={{ lineHeight: '24px' }}>
                                            <p>{this.state.chart}</p>
                                        </div>
                                        <div className="mb-6 md:w-2/4" style={{ lineHeight: '24px' }}>
                                            <p>Your Free Electronic Health Record.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mb-6">

                                        <div className="mb-6 md:w-1/4">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.eligibilityChecked}
                                                        onChange={this.toggleChangeEligible}
                                                        value={this.state.eligibility}
                                                        color="secondary"
                                                        style={{ height: '24px' }}
                                                    />
                                                }
                                                label="Eligibility"
                                            />
                                        </div>
                                        <div className="mb-6 md:w-1/4" style={{ lineHeight: '24px' }}>
                                            <p>$90</p>
                                        </div>
                                        <div className="mb-6 md:w-2/4" style={{ lineHeight: '24px' }}>
                                            <p>Your Free Electronic Health Record.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mb-6">

                                        <div className="mb-6 md:w-1/4">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.billchecked}
                                                        onChange={this.toggleChangeBill}
                                                        value={this.state.billing}
                                                        color="secondary"
                                                        style={{ height: '24px' }}
                                                    />
                                                }
                                                label="Billing"
                                            />
                                        </div>
                                        <div className="mb-6 md:w-1/4" style={{ lineHeight: '24px' }}>
                                            <p>$90</p>
                                        </div>
                                        <div className="mb-6 md:w-2/4" style={{ lineHeight: '24px' }}>
                                            <p>Your Free Electronic Health Record.</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex flex-wrap mb-6">

                                        <div className="mb-6 md:w-1/4">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.chartchecked}
                                                        onChange={this.toggleChangeChart}
                                                        value={this.state.chartchecked}
                                                        color="secondary"
                                                        style={{ height: '24px' }}
                                                    />
                                                }
                                                label="Chart"
                                            />
                                        </div>
                                        <div className="mb-6 md:w-1/4" style={{ lineHeight: '24px' }}>
                                            <p>{this.state.chart}</p>
                                        </div>
                                        <div className="mb-6 md:w-2/4" style={{ lineHeight: '24px' }}>
                                            <p>Your Free Electronic Health Record.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mb-6">

                                        <div className="mb-6 md:w-1/4">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.chartchecked}
                                                        onChange={this.toggleChangeChart}
                                                        value={this.state.chartchecked}
                                                        color="secondary"
                                                        style={{ height: '24px' }}
                                                    />
                                                }
                                                label="Chart"
                                            />
                                        </div>
                                        <div className="mb-6 md:w-1/4" style={{ lineHeight: '24px' }}>
                                            <p>{this.state.chart}</p>
                                        </div>
                                        <div className="mb-6 md:w-2/4" style={{ lineHeight: '24px' }}>
                                            <p>Your Free Electronic Health Record.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mb-6">

                                        <div className="mb-6 md:w-1/4">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.chartchecked}
                                                        onChange={this.toggleChangeChart}
                                                        value={this.state.chartchecked}
                                                        color="secondary"
                                                        style={{ height: '24px' }}
                                                    />
                                                }
                                                label="Chart"
                                            />
                                        </div>
                                        <div className="mb-6 md:w-1/4" style={{ lineHeight: '24px' }}>
                                            <p>{this.state.chart}</p>
                                        </div>
                                        <div className="mb-6 md:w-2/4" style={{ lineHeight: '24px' }}>
                                            <p>Your Free Electronic Health Record.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mb-6">

                                        <div className="mb-6 md:w-1/4">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.chartchecked}
                                                        onChange={this.toggleChangeChart}
                                                        value={this.state.chartchecked}
                                                        color="secondary"
                                                        style={{ height: '24px' }}
                                                    />
                                                }
                                                label="Chart"
                                            />
                                        </div>
                                        <div className="mb-6 md:w-1/4" style={{ lineHeight: '24px' }}>
                                            <p>{this.state.chart}</p>
                                        </div>
                                        <div className="mb-6 md:w-2/4" style={{ lineHeight: '24px' }}>
                                            <p>Your Free Electronic Health Record.</p>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="flex justify-between mt-32">
                                    <Button variant="contained" color="primary" onClick={this.handleBack}>Back</Button>
                                    <Button variant="contained" color="secondary" onClick={this.goToNextStep}>Save And Next</Button>

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

    }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
    return {

    }
}

//export default  withStyles(styles, { withTheme: true })(injectStripe(withRouter(connect( mapStateToProps,mapDispatchToProps)(CheckoutForm))))
export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
    withStyles(styles, { withTheme: true })(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(PickTool)
        )
    ))
);
