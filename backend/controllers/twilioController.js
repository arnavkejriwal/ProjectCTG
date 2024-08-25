require('dotenv').config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const Event = require('../models/events');

const client = require('twilio')(accountSid,authToken); 

const sendSMS = async ({date, title, location, role}) => {
    
    try{
        console.log(role)
        // const eventDetails = await Event.findById(eventId)
        if (role=="Participant")
        {const message = await client.messages.create({
        body: 'Hi, we have received your registration for the '+ title +' coming up on '+ date + ' at '+location+'. \nThank you for registering and we look forward to seeing you there!\nRegards,\nThe Zubin Foundation',
        from: process.env.WHATSAPP_FROM_NUMBER,
        to: process.env.WHATSAPP_TO_NUMBER
        })
        .then(message => console.log(message.sid))}
        else{{
            const message = await client.messages.create({
            body: 'Hi, we have received your registration as a Volunteer for the '+ title +' coming up on '+ date + ' at '+location+'. \nThank you for your contribution. Please remember to check the Training page on the portal for briefing materials. We look forward to seeing you there!\nRegards,\nThe Zubin Foundation',
            from: process.env.WHATSAPP_FROM_NUMBER,
            to: process.env.WHATSAPP_TO_NUMBER
            })
            .then(message => console.log(message.sid))}
        }
    } catch (error) {
        console.error(error)
    }

}
// sendSMS()
module.exports = {sendSMS}