const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const express = require('express')
const User=require('../models/users')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('payment',auth, (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send(err)
        }
        res.status(200).send(stripeRes)
        
    }
    )
}
)

module.exports = router