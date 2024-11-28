const express = require('express');
const app = express();
const PORT = 3000;

const stripe = require("stripe")("pk_live_51MScStSG8tZRDFOL9ZHZVqpgw2Ov8C7falfvA8dIaJSUXmwo2SbwmY77hLgOoVxXglNJcb5SNyGCezQvHMM3Zsga003jgj9gnI");
const uuid = require("uuid");

app.use(express.json());

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT ", product);
  console.log("PRICE ", product.price);
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country
            }
          }
        },
        { idempontencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});