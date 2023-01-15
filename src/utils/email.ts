import sendGridMail from "@sendgrid/mail";
import { CONFIG } from "../config/env";

sendGridMail.setApiKey(CONFIG.SENDGRID_API_KEY ? CONFIG.SENDGRID_API_KEY : "");

function getMessage(email, subject, body) {
  return {
    to: email,
    from: {
      name: "The Recruits Group Ltd.",
      email: "therecruitsgroup@gmail.com",
    },
    subject: subject,
    html: body,
  };
}

async function sendEmail(email, subject, body) {
  try {
    await sendGridMail.send(getMessage(email, subject, body));
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

const sendVerificationEmail = async (email, subject, body) => {
  console.log("Sending email");
  await sendEmail(email, subject, body);
};

export { sendVerificationEmail };
