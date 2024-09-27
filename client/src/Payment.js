// https://www.youtube.com/watch?v=e-whXipfRvg @11:51

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from './CheckoutForm';
import { Elements } from "@stripe/react-stripe-js"
import Spline from '@splinetool/react-spline';
import './App.css'

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();

      setStripePromise(loadStripe(publishableKey))
    })
  }, [])

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({})
    }).then(async (r) => {
      const { clientSecret } = await r.json();

      setClientSecret(clientSecret);
    })
  }, [])

  return (
   <div className="App">
    <div className="coffeeCupContainer">
      <Spline scene="https://prod.spline.design/oAud9-tKqGkuyJP6/scene.splinecode" className="coffeeCup"/>
    </div>
    <div className="paymentContainer">
      <h1>Buy Me a Coffee</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret}} className="paymentBox">
          <CheckoutForm />
        </Elements>
      )}
    </div>
   </div>
  );
}

export default Payment;
