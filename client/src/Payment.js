// https://www.youtube.com/watch?v=e-whXipfRvg

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
      <p>Thanks for stopping by! I appreciate your support (so do my taste buds).</p>
      <div className="paymentOption">
        <h2>Shout me a coffee</h2>
        <button>$5</button>
      </div>
      <div className="paymentOption">
        <h2>Or a kebab</h2>
        <button>$15</button>
      </div>
      <div className="paymentOption">
        <h2>Or a multi-course Michelin-starred meal</h2>
        <button>$400</button>
      </div>

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
