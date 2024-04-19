const Otp = require('../models/Otp.model.js');

async function sendMail(transporter,email) {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);

        const info = await transporter.sendMail({
            from: 'monojit9158592447@gmail.com', 
            to: email, 
            subject: "Innovative Education Otp", 
            text: `Your one time password(OTP): ${otp}`, 
            html: `<b>Your one time password(OTP): ${otp}</b>`, 
        });

        const _otp = await Otp.create({
            otp: String(otp),
            user: email
        })

        return true;
    }
    catch(err){
        console.log(err)
        return false;
    }
    

}
module.exports = sendMail;