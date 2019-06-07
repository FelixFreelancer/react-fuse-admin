// CardSection.js
import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement />
      </label>
    );
  }
}

export default injectStripe(CardSection);