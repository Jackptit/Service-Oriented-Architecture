import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: 'devclone8@gmail.com',
    pass: 'vkuntgqgtexzetlq'
  }
});

async function sendEmail(req, res) {
  try {
    const { email, message, subject } = req.body;
    const mailOptions = {
      from: 'Công ty TN <devclone8@gmail.com>',
      to: email,
      subject: subject,
      html: message
    };
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully!');
  } catch (error) {
    res.status(400).send(error);
  }
}

export {
  sendEmail
};