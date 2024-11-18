const {TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



const sendOTP = async (req, res, next) => {
  const { countryCode, phoneNumber } = req.body
  try {
    console.log('Sending OTP to:', `+${countryCode}${phoneNumber}`)
    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: 'sms',
      })
    res
      .status(200)
      .json({ message: 'OTP sent successfully', data: otpResponse })
  } catch (err) {
    console.error('Failed to send OTP:', err) // Logs detailed error info
    res.status(500).json({ message: 'Failed to send OTP', error: err })
  }
}

const verifyOTP = async (req, res,next) => {
    const {countryCode, phoneNumber, otp} = req.body;
    try{
        const otpResponse=await client.verify.
        v2.services(TWILIO_SERVICE_SID).verificationChecks.create({
            to: `+${countryCode}${phoneNumber}`,
            code: otp
        });
        res.status(200).json({message: "OTP verified successfully", data: otpResponse});
    }catch(err){
       res.status(500).json({message: "Failed to verify OTP", error: err});
    }
};

module.exports = {sendOTP, verifyOTP};

