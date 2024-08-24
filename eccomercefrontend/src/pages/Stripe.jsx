import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
const KEY='pk_test_51L46SpSGaGiMaMX08LyUV3KA20Rl9qyJatPJP9dCjohyjzvl4plswXS0xmoOjXtybahQ4n8v5aLTuLWw6do3mfEY00IyJSOIHq'
function Stripe() {
    const [stripe,setstripetoken]=useState(null)

    const onToken=(token)=>{
    setstripetoken(token)
    console.log(token)
    }

    useEffect(() => {
    const makerequest=async()=>{
        try {
           const res=await axios.post("https://eccomerce-n4q3.onrender.com/api/checkout/payment",{
            tokenId:stripe.id,
            amount:111
           })
        } catch (error) {
            console.log(error)
        }
    }
    makerequest()
    }, [stripe])
  return (

    <div>Stripe
    <StripeCheckout
    name='abc shop'
    billingAddress shippingAddress description='your total is $20'
    amount={2000}
    token={onToken}
    stripeKey={KEY}
    ></StripeCheckout>
    <button>pay now</button>
    </div>
  )
}

export default Stripe