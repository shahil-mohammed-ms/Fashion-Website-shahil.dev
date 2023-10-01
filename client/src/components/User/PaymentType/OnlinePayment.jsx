import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


function OnlinePayment() {

  const paypalOptions = {
    'client-id': 'Af383g8lO77fcHhA_9I7jieqFTrBmhUoTj0-XUEiZ4LJUYG5xqoJQl-nvxdfnvGNRcqsiy-hkx8cx9E6',
  };


  return (
    <PayPalScriptProvider options={paypalOptions}>
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: '10.00', // Replace with your desired amount
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(function (details) {
          alert('Transaction completed by ' + details.payer.name.given_name);
          // You can handle the successful transaction here.
        });
      }}
    />
  </PayPalScriptProvider>
  )
}

export default OnlinePayment