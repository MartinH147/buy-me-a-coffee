// https://www.youtube.com/watch?v=e-whXipfRvg @5.07

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js"

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();

      setStripePromise(loadStripe(publishableKey))
    })
  }, [])

  return (
   <>
    <h1>React Stripe and the Payment ELement</h1>
   </>
  );
}

export default Payment;
