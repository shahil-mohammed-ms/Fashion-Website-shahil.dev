import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from '../../../axios'
import { useNavigate,useLocation } from 'react-router-dom';


function OnlinePayment(props) {

  const navigate = useNavigate();
  const { proId, userId, cartId, quantity, total, name, size, sellerId } = props.paymentInfo;

  const paypalOptions = {
    'client-id': 'Af383g8lO77fcHhA_9I7jieqFTrBmhUoTj0-XUEiZ4LJUYG5xqoJQl-nvxdfnvGNRcqsiy-hkx8cx9E6',
  };

 // Function to handle a successful transaction and send order details to your server
 const handleSuccessfulTransaction = async(details) => {
  console.log(details)
  // alert('Transaction completed by ' + details.payer.name.given_name);
  const response = await axios.post('/Order/addorder',{
    COD:'Online',
    proId,
    userId,
    cartId,
    quantity,
    total,
    name,
    size,
    sellerId

  })
  
};

// Function to handle transaction failures
const handleTransactionFailure = (error) => {
  // Handle transaction failure here
  console.error('Transaction failed:', error);
  // Provide user feedback about the transaction failure
  alert('Transaction failed. Please try again.');
};


  return (
    <PayPalScriptProvider options={paypalOptions}>
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total, // Replace with your desired amount  
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(
          handleSuccessfulTransaction, // Call this function on success
            handleTransactionFailure  
        //   function (details) {
        //   alert('Transaction completed by ' + details.payer.name.given_name);

          
        //   // You can handle the successful transaction here.
        // }
        );
      }}
    />
  </PayPalScriptProvider>
  )
}

export default OnlinePayment