require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const twilioRouter=require("./src/routes/twilio-sms");

const app = express();
const port=process.env.PORT || 3000;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use("/twilio-sms",twilioRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
}   );

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });

module.exports = app;