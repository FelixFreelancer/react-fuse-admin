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
import { BASE_URL } from '../../../fuse-configs/apiConfig';
import { FuseAnimateGroup } from '@fuse';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            open: false,
            open1:false,
            addressCity: '',
            addressCountry: '',
            addressLine1: '',
            addressLine2: '',
            addressState: '',
            addressZip: '',
            expMonth: '',
            expYear: '',
            name1: '',

            customerID: '',
            cardId: ''
        };
        this.submit = this.submit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.addNewOffice = this.addNewOffice.bind(this);

    }
  
    handleBack(event) {
       
        this.props.handleBack();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.getSingleCardDataInfo !== this.props.getSingleCardDataInfo) {
            if (this.props.getSingleCardDataInfo) {
                if (this.props.getSingleCardDataInfo.data) {
                    this.setState({ addressCity: this.props.getSingleCardDataInfo.data.address_city })
                    this.setState({ addressCountry: this.props.getSingleCardDataInfo.data.address_country })
                    this.setState({ addressLine1: this.props.getSingleCardDataInfo.data.address_line1 })
                    this.setState({ addressLine2: this.props.getSingleCardDataInfo.data.address_line2 })
                    this.setState({ addressState: this.props.getSingleCardDataInfo.data.address_state })
                    this.setState({ addressZip: this.props.getSingleCardDataInfo.data.address_zip })
                    this.setState({ expMonth: this.props.getSingleCardDataInfo.data.exp_month })
                    this.setState({ expYear: this.props.getSingleCardDataInfo.data.exp_year })
                    this.setState({ name1: this.props.getSingleCardDataInfo.data.name })
                }
            }

        }
    }

    addNewOffice(event) {
        this.props.history.push('/settings/offices')
    }
    componentDidMount() {

        var userInfo = localStorage.getItem("userData");
        if (userInfo) {
            var data = JSON.parse(userInfo);
            if (data) {
                var userId = data._id;
                this.props.getCardList(userId)
            }
        }
    }

    handleClickOpen = (i, customerID, cardId) => {
        console.log('customerID,cardId ====> ', customerID, cardId);
        this.setState({ open: true });
        this.setState({ customerID: customerID, cardId: cardId })
        this.props.getSingleCardData(customerID, cardId)
    };

    handleClickDelete = (i, customerID, cardId) => {
        console.log('customerID,cardId ====> ', customerID, cardId);
        this.setState({ open1: true });
        this.setState({ customerID: customerID, cardId: cardId })
        //this.props.getSingleCardData(customerID, cardId)
    };

    handleDelete = (i, customerID, cardId) => {
        console.log("helloooooooooo")
        var customerID = this.state.customerID
        var cardId = this.state.cardId
        this.props.deleteCardInfo(customerID, cardId)
        this.handleDeleteClose()
    }
    handleDeleteClose = () => {
        this.setState({ open1: false });
    };


    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit(event) {
        event.preventDefault();
        var cardDetails = {
            address_city: this.state.addressCity,
            address_country: this.state.addressCountry,
            address_line1: this.state.addressLine1,
            address_line2: this.state.addressLine2,
            address_state: this.state.addressState,
            address_zip: this.state.addressZip,
            exp_month: this.state.expMonth,
            exp_year: this.state.expYear,
            name: this.state.name1,

        }
        console.log("Card data", cardDetails)
        console.log('customer and card id ====> ', this.state.customerID, this.state.cardId);
        var customer_id = this.state.customerID;
        var card_id = this.state.cardId;
        var officeId = this.props.match.params.id
        if (officeId) {
            this.props.updateCardInfo(customer_id, card_id, cardDetails)
        }
        var userInfo = localStorage.getItem("userData");
        if (userInfo) {
            var data = JSON.parse(userInfo);
            if (data) {
                var userId = data._id;
                this.props.getCardList(userId)
            }
        }
        this.handleClose()


    };

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };
    async submit(ev) {
        ev.preventDefault();
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        
        var userInfo = localStorage.getItem("userData");
        var data = JSON.parse(userInfo);
         

        if (token) {

            if (token.id) {
                var userId = data._id;
                var tokenId = token.id;
                const paymentInfo = {
                    userId: userId,
                    token: tokenId
                }
                this.props.SendPaymentDetails(paymentInfo)
                this.props.getCardList(userId)
                
               
            }
        }
        this._element.clear();

    }
    render() {

        const { classes } = this.props;
        console.log(this.props)
        return (
            <div>
                <FuseAnimate animation="transition.slideUpIn" delay={400}>
                    <div className="p-24 flex w-full">
                        <Card className="w-full ">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Payment
                                </Typography>
                                <Divider />

                                <div className="checkout">
                                    {/* <h2>Would you like to complete the purchase?</h2> */}
                                    <CardElement onReady={(c) => this._element = c} style={{ base: { fontSize: '18px' } }} />

                                    <Button type="submit" variant="contained" color="primary" onClick={this.submit} style={{ marginTop: "50px" }}>
                                        Send
                                    </Button>

                                </div>

                                <div className="flex justify-end my-24">
                                    <Button
                                        // disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" onClick={this.addNewOffice} style={{ marginTop: "50px" }}>
                                        Add New Office
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>

                    </div>
                </FuseAnimate>

                <FuseAnimateGroup
                    className="flex flex-wrap w-full card-dtl"
                    enter={{
                        animation: 'transition.slideLeftBigIn'
                    }}
                    leave={{
                        animation: 'transition.slideLeftBigOut'
                    }}
                >
                    {console.log("this.props.getCardListData", this.props.getCardListData)}
                    {this.props.getCardListData && this.props.getCardListData.map((cardData, index) => (
                        <div className="pb-24 md:w-1/2 lg:w-1/3 sm:p-16 card-dtl-inr" key={index}>
                            <Card elevation={1} className="flex flex-col h-256">
                                <div
                                    className="flex flex-no-shrink items-center justify-between px-12 h-32"
                                    style={{
                                        background: '#3C4252',
                                        color: 'white'
                                    }}
                                >
                                    <Typography
                                        className="font-medium truncate"
                                        color="inherit"
                                    >
                                        {cardData.name || ''}
                                    </Typography>
                               
                                </div>
                                <CardContent className="flex flex-col flex-auto items-center justify-center">
                                  
                                    <Typography
                                        className="text-center text-13 font-600 mt-4"
                                        color="textSecondary"
                                    >
                                        Brand : <span style={{ textTransform: 'capitalize' }}>{cardData.brand || 'Unspecified'}</span>

                                    </Typography>
                                    <Typography
                                        className="text-center text-13 font-600 mt-4"
                                        color="textSecondary"
                                    >
                                        Country : <span style={{ textTransform: 'capitalize' }}>{(cardData.country) || 'Unspecified'}</span>
                                    </Typography>
                                    <Typography
                                        className="text-center text-13 font-600 mt-4"
                                        color="textSecondary"
                                    >
                                        Expiry Month : <span style={{ textTransform: 'capitalize' }}>{(cardData.exp_month) || 'Unspecified'}</span>
                                        Expiry Year : <span style={{ textTransform: 'capitalize' }}>{(cardData.exp_year) || 'Unspecified'}</span>
                                    </Typography>
                                    <Typography
                                        className="text-center text-13 font-600 mt-4"
                                        color="textSecondary"
                                    >
                                        Visit Date : xx/xx/xxxx
                                    </Typography>
                                    <Typography
                                        className="text-center text-13 font-600 mt-4"
                                        color="textSecondary"
                                    >
                                        Customer : customer
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardActions className="justify-center">
                                    <Button
                                        component={Link}
                                        //to={`/patient/${cardData.id}`}
                                        onClick={(e) => this.handleClickOpen(index, cardData.customer, cardData.id)}
                                        className="justify-start px-32"
                                        variant="contained" color="primary"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        component={Link}
                                        onClick={(e) => this.handleClickDelete(index, cardData.customer, cardData.id)}
                                        className="justify-start px-32"
                                        variant="contained" color="primary"
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))}

                </FuseAnimateGroup>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Card Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Card Details
                        </DialogContentText>
                        <form className="px-8 pt-12 pb-8 mb-4" onSubmit={this.handleSubmit}>

                            <div className="flex my-12 wrap-state-zip">
                                <div className="w-1/3 mr-6">
                                    <label htmlFor="addressCity">Addresss City</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded leading-loose px-6 mx-3"
                                        name="addressCity"
                                        value={this.state.addressCity}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="w-1/3 mx-3">
                                    <label htmlFor="addressCountry">Address Country</label>
                                    <select name="addressCountry" className="w-full border mb-8 px-6 mx-3" value={this.state.addressCountry} onChange={this.handleChange} required>
                                        <option value=""></option>
                                        <option value="AL">AL</option>
                                        <option value="North Carolina">North Carolina</option>
                                    </select>
                                </div>
                                <div className="w-1/3 ml-6">
                                    <label htmlFor="addressLine1">Address Line1</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded leading-loose px-6 mx-3"
                                        name="addressLine1"
                                        value={this.state.addressLine1}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex my-12 wrap-state-zip">
                                <div className="w-1/3 mr-6">
                                    <label htmlFor="addressLine2">Address Line2</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded leading-loose px-6 mx-3"
                                        name="addressLine2"
                                        value={this.state.addressLine2}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="w-1/3 mx-3">
                                    <label htmlFor="addressState">Address State</label>
                                    <select name="addressState" className="w-full border mb-8 px-6 mx-3" value={this.state.addressState} onChange={this.handleChange} required>
                                        <option value=""></option>
                                        <option value="AL">AL</option>
                                        <option value="North Carolina">North Carolina</option>
                                    </select>
                                </div>
                                <div className="w-1/3 ml-6">
                                    <label htmlFor="addressZip">Address Zip</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded leading-loose px-6 mx-3"
                                        name="addressZip"
                                        value={this.state.addressZip}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex my-12 wrap-state-zip">
                                <div className="w-1/3 mr-6">
                                    <label htmlFor="expMonth">Expiry Month</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded leading-loose px-6 mx-3"
                                        name="expMonth"
                                        value={this.state.expMonth}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="w-1/3 mx-3">
                                    <label htmlFor="expYear">Expiry Year</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded leading-loose px-6 mx-3"
                                        name="expYear"
                                        value={this.state.expYear}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="w-1/3 ml-6">
                                    <label htmlFor="name1">Name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded leading-loose px-6 mx-3"
                                        name="name1"
                                        value={this.state.name1}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" variant="contained" color="primary"  className="mr-12">
                                Save
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Cancle
                        </Button>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete dialogue */}

                <Dialog
                  open={this.state.open1}
                  onClose={this.handleDeleteClose}
                  aria-labelledby="alert-dialog-title1"
                  aria-describedby="alert-dialog-description1"
                >
                  <DialogTitle id="responsive-dialog-title1">{"Are you sure you want to delete this record?"}</DialogTitle>
                  <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description1">
                      Let Google help apps determine location. This means sending anonymous location data to
                      Google, even when no apps are running.
                  </DialogContentText> */}
                  </DialogContent>
                  <DialogActions className="record-btm-btn">
                    <Button onClick={this.handleDeleteClose} color="primary" variant="contained">
                      Cancle
                  </Button>
                    <Button onClick={this.handleDelete} color="secondary" autoFocus variant="contained">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        SendPaymentDetails: Actions.SendPaymentDetails,
        getCardList: Actions.getCardList,
        getSingleCardData: Actions.getSingleCardData,
        updateCardInfo: Actions.updateCardInfo,
        deleteCardInfo: Actions.deleteCardInfo
    }, dispatch);
}


function mapStateToProps({ authReducers, settingReducer }) {
    return {
        getCardListData: settingReducer.payment.getCardList,
        getSingleCardDataInfo: settingReducer.payment.getSingleCard,
    }
}

//export default  withStyles(styles, { withTheme: true })(injectStripe(withRouter(connect( mapStateToProps,mapDispatchToProps)(CheckoutForm))))

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
