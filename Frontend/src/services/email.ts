import nodemailer from "nodemailer";
import toast from "react-hot-toast";

interface Props {
  mail: string;
  message: string;
}
export const sendEmail = async ({ mail, message }: Props) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "chrisdspain371@gmail.com",
      pass: "bomv wiks uonv biwb",
    },
  });
  const mailOptions = {
    from: mail,
    to: "chrisdspain371@gmail.com",
    subject: "",
    text: message,
  };
  try {
    await transporter.sendMail(mailOptions);
    toast.success(
      `Mensaje enviado correctamente. Responderemos lo mas pronto posible`,
      {
        duration: 4000,
        style: {
          background: "#7DA640",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
      }
    );
  } catch (error) {
    toast.error(`El mensaje no fue enviado`, {
      duration: 4000,
    });
  }
};
