export const sendEmail = async (to, message) => {
  // Call email provider (SendGrid, SES, etc.)
  console.log(`Email sent to ${to}: ${message}`);
};

export const sendSMS = async (to, message) => {
  // Call SMS gateway (Twilio, etc.)
  console.log(`SMS sent to ${to}: ${message}`);
};
