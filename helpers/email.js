import nodemailer from "nodemailer";

export const sendEmail = (email, id) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AGROIA_MAIL,
      pass: process.env.AGROIA_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.AGROIA_MAIL,
    to: email,
    subject: "Recover your AgroIa App Password",
    text: `Recover your password by entering to this website:\n ${process.env.FRONTEND_URL}recover_password/${id}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return error;
    } else {
      return info;
    }
  });
};
