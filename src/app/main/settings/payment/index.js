import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm  handleBack={this.props.handleBack}  />
      </Elements>
    );
  }
}

export default MyStoreCheckout;