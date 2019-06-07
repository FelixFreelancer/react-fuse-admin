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

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            firstName:'',
            lastName:'',
            cardName: '',
            errorMessage: '',
            referralCode: '',
            chartchecked: true,
            eligibilityChecked: true,
            billChecked: true,

            chart: 'Free',
            eligibility: 99,
            billing: 99

        };
        //  this.submit = this.submit.bind(this);

        this.handleBack = this.handleBack.bind(this);
        this.addNewOffice = this.addNewOffice.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
    }
    goToNextStep(event){
        // event.preventDefault();
         this.props.nextStep();
       }
    handleBack(event) {

        this.props.handleBack();
    }

    componentDidMount() {

    }

    addNewOffice(event) {
        this.props.history.push('/settings/offices')
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
        // if(this.state.chartchecked === true){
        //     this.setState({eligibility:99})
        // }else{
        //     this.setState({eligibility:0})
        // }
        // console.log("eligibility~~~~~~~~~~>", this.state.eligibility)

    }

    toggleChangeEligible = () => {
        this.setState(prevState => ({
            eligibilityChecked: !prevState.eligibilityChecked,
        }));
    }

    toggleChangeBill = () => {
        this.setState(prevState => ({
            billChecked: !prevState.billChecked,
        }));
    }


    handleChange = ({ error }) => {
        if (error) {
            this.setState({ errorMessage: error.message });
        }
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (this.props.stripe) {
            this.props.stripe.createToken().then((resp) => {
                console.log('resp ====> ', resp.token.id);
                var userInfo = localStorage.getItem("userData");
                var data = JSON.parse(userInfo);
                console.log('token ====> ', resp.token);
                if (resp.token) {
                    console.log('token.id ====> ', resp.token.id);
                    if (resp.token.id) {
                        var userId = data._id;
                        var tokenId = resp.token.id;
                        const paymentInfo = {
                            userId: userId,
                            token: tokenId,
                            referralCode: this.state.referralCode
                        }
                        console.log('paymentInfo ====> ', paymentInfo);
                        this.props.SendPaymentDetails(paymentInfo)
                    }
                }
            });


        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }

    };


    render() {

        const { classes } = this.props;
        console.log("eligibility~~~~~~~~~~>", this.state.eligibility)
        // chartchecked: true,
        // eligibilityChecked: true,
        // billChecked: true,          
        //    var chart = this.state.chartchecked === true ? this.setState({eligibility:90}) : this.setState({eligibility:0}) 
        //    var billing = this.state.eligibilityChecked === true ? this.setState({billing:90}) : this.setState({billing:0}) 
        //    var totalAmount = chart + billing; 
        return (
            <FuseAnimate animation="transition.slideUpIn" delay={400}>
                <div className="p-24 flex w-full office-officetime-wrap">
                   
                    <Card className="md:w-1/2 office-time-wrap">
                        <CardContent>
                        <div className="mt-5 mb-32 icon-div icon-div-05">
                                <Typography variant="h6">Pay for Subscription</Typography>
                                <Typography noWrap>
                                Purchase the modules you selected
                                </Typography>
                                <Divider /> 
                            </div>
                            {/* <Typography color="textSecondary" gutterBottom>
                                Payment
                                </Typography>
                            <Divider /> */}

                            <div className="checkout">
                                <div className="CardDemo">
                                    <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="my-6 md:w-1/2">
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded leading-loose px-6 mx-3"
                                                name="firstName"
                                                value={this.state.firstName}
                                                onChange={this.handleChange1}
                                                required
                                            />
                                        </div>
                                        <div className="my-6 md:w-1/2">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded leading-loose px-6 mx-3"
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={this.handleChange1}
                                                required
                                            />
                                        </div>
                                        <div className="my-6 md:w-1/2">
                                            <label htmlFor="cardName">Name On Card</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded leading-loose px-6 mx-3"
                                                name="cardName"
                                                value={this.state.cardName}
                                                onChange={this.handleChange1}
                                                required
                                            />
                                        </div>
                                        <label>
                                            Card details
                                            <CardElement
                                                onChange={this.handleChange}
                                                {...createOptions()}
                                                required
                                            />
                                        </label>
                                        <div className="error" role="alert">
                                            {this.state.errorMessage}
                                        </div>
                                        <div className="md:w-1/2">
                                            <label htmlFor="referralCode">Refferral Code</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded leading-loose px-6 mx-3"
                                                name="referralCode"
                                                value={this.state.referralCode}
                                                onChange={this.handleChange1}
                                                pattern="15OFFNOW"
                                                required
                                            />
                                        </div>
                                        <div className="my-6 total-wrap">

                                            <label htmlFor="referralCode" className="px-6 mx-3">Total: {}

                                            </label>

                                        </div>
                                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "50px" }}>
                                            Pay
                                       </Button>

                                    </form>
                                </div>
                            </div>

                            <div className="flex justify-end my-24">
                                <Button
                                   color="primary"
                                    // disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                    </Button>
                                <Button type="submit" variant="contained" color="secondary" onClick={this.addNewOffice} style={{ marginTop: "50px" }}>
                                    Done
                                    </Button>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </FuseAnimate>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        SendPaymentDetails: Actions.SendPaymentDetails,
    
    }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
    return {
        getCardListData: settingReducer.payment.getCardList,
        getSingleCardDataInfo: settingReducer.payment.getSingleCard,
    }
}


export default withReducer('settingReducer', settingReducer)(withReducer('authReducers', reducer)(
    withStyles(styles, { withTheme: true })(injectStripe(
        withRouter(
            connect(
                mapStateToProps,
                mapDispatchToProps
            )(CheckoutForm)
        )
    )))
);
