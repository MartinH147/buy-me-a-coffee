// https://www.youtube.com/watch?v=e-whXipfRvg @6:51 look back for ERRORS

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js"

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
    fetch("/create-user-intent", {
      method: "POST",
      body: JSON.stringify({})
    }).then(async (r) => {
      const { clientSecret } = await r.json();

      console.log(clientSecret)
    })
  }, [])

  return (
   <>
    <h1>React Stripe and the Payment ELement</h1>
   </>
  );
}

export default Payment;
