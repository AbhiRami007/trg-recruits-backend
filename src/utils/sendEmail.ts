const sendGridMail = require('@sendgrid/mail')



sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

function getMessage(email, subject, body) {
  return {
    to: email,
    from: 'therecruitsgroup@gmail.com',
    subject: subject,
    text: 'The Recruits Group Ltd.',
    html: body,
  }
}

const sendEmail=async (email, subject, body)=> {
  try {
    await sendGridMail.send(getMessage(email, subject, body))
    console.log('email sent successfully')
  } catch (error) {
    console.error('Error sending test email')
    console.error(error)
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

export default{sendEmail}
