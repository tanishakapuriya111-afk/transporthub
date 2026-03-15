const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

/**
 * Send a password reset email.
 * @param {string} to  - recipient email
 * @param {string} resetUrl - full reset link
 */
const sendResetEmail = async (to, resetUrl) => {
  const mailOptions = {
    from: `"TransportHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset Your Password – TransportHub',
    html: `
      <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 520px; margin: 0 auto;
                  background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;
                  border: 1px solid rgba(255,107,53,0.3);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ff6b35, #ff8555);
                    padding: 32px 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 1.6rem; color: #fff; letter-spacing: 1px;">
            🚚 TransportHub
          </h1>
        </div>

        <!-- Body -->
        <div style="padding: 40px;">
          <h2 style="color: #ffffff; margin-top: 0;">Reset Your Password</h2>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
            We received a request to reset the password for your account.<br/>
            Click the button below to choose a new password.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}"
               style="display: inline-block; background: #ff6b35; color: #ffffff;
                      padding: 14px 36px; border-radius: 8px; text-decoration: none;
                      font-weight: 600; font-size: 1rem; letter-spacing: 0.5px;">
              Reset Password
            </a>
          </div>

          <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.6;">
            This link expires in <strong style="color:#ff6b35;">1 hour</strong>.
            If you didn't request a password reset, you can safely ignore this email.
          </p>

          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />

          <p style="color: rgba(255,255,255,0.3); font-size: 0.8rem; text-align: center; margin: 0;">
            If the button doesn't work, copy this link into your browser:<br/>
            <a href="${resetUrl}" style="color: #ff6b35; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Send an admin reply email to a contact.
 * @param {string} to           - recipient email
 * @param {string} name         - recipient name
 * @param {string} subject      - original subject
 * @param {string} replyMessage - admin's reply text
 */
const sendReplyEmail = async (to, name, subject, replyMessage) => {
  const mailOptions = {
    from: `"TransportHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Re: ${subject} - TransportHub`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto;
                  background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;
                  border: 1px solid rgba(255,107,53,0.3);">
        <div style="background: linear-gradient(135deg, #ff6b35, #ff8555);
                    padding: 32px 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 1.6rem; color: #fff; letter-spacing: 1px;">
            TransportHub
          </h1>
        </div>
        <div style="padding: 40px;">
          <h2 style="color: #ffffff; margin-top: 0;">Hello, ${name}!</h2>
          <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 4px;">
            In reply to your message: <strong style="color:#ff6b35;">${subject}</strong>
          </p>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
          <div style="background: rgba(255,255,255,0.04); border-left: 3px solid #ff6b35;
                      padding: 20px 24px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; margin: 0; white-space: pre-line;">${replyMessage}</p>
          </div>
          <p style="color: rgba(255,255,255,0.45); font-size: 0.85rem; line-height: 1.6;">
            If you have further questions, feel free to contact us again through our website.
          </p>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
          <p style="color: rgba(255,255,255,0.3); font-size: 0.8rem; text-align: center; margin: 0;">
            &copy; TransportHub &middot; This is a reply from our admin team.
          </p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail, sendReplyEmail };
