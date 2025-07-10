let nodemailer = require("nodemailer")

exports.sendMailCustomer = (member) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.MailId,
            pass: process.env.MailPassword,
        },
    });
    let mailOptions = {
        from: "Abhishek Bain ",
        to: member.email,
        subject: "Payment Reminder", // Subject line
        html: `<p style="font-size: 16px; margin-bottom: 16px;">Dear <strong>${member.name}</strong>,</p>

        <p style="font-size: 16px; margin-bottom: 16px;">
          We hope you are doing well. This is a friendly reminder that your payment is pending.
        </p>

        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="margin: 0;"><strong>Customer Name:</strong> ${member.name}</p>
          <p style="margin: 0;"><strong>Phone:</strong> ${member.phone}</p>
          <p style="margin: 0;"><strong>Email:</strong> ${member.email}</p>
        </div>

        <p style="font-size: 16px; margin-bottom: 16px;">
          Please complete your payment at your earliest convenience to avoid any service interruptions.
        </p>

        <a href="#" style="display: inline-block; background-color: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 16px;">
          Pay Now
        </a>
                `, // html body
    }

    transport.sendMail(mailOptions, (err, info) => {

    })
}