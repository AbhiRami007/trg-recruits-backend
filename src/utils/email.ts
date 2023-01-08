import sendGridMail from '@sendgrid/mail'
import { CONFIG } from '../config/env'

    
        sendGridMail.setApiKey(
          CONFIG.SENDGRID_API_KEY ? CONFIG.SENDGRID_API_KEY : '',
        )
    
        function getMessage(email, subject, body) {
          return {
            to: email,
            from: `The Recruits Group Limited. <${CONFIG.User}>`,
            subject: subject,
            // text: 'The Recruits Group Ltd.',
            html: body,
          }
        }
    
        async function sendEmail(email, subject, body) {
          try {
            await sendGridMail.send(getMessage(email, subject, body))
            console.log('Email sent successfully')
          } catch (error) {
            console.error('Error sending test email')
            console.error(error)
            if (error.response) {
              console.error(error.response.body)
            }
          }
        }
    
const sendVerificationEmail=async (email, subject, body) => {
          console.log('Sending email')
          await sendEmail(email, subject, body)
}

export {sendVerificationEmail}
    