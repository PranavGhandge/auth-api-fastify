import nodemailer from "nodemailer";

export const sendEmail = async (to: string, otp: number) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Your OTP Code",
        html: `
    <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:500px; margin:auto; background:#fff; padding:20px; border-radius:10px; text-align:center;">
        
        <h2 style="color:#333;">🔐 OTP Verification</h2>
        
        <p style="color:#555; font-size:16px;">
          Use the following OTP to complete your verification:
        </p>

        <div style="margin:20px 0;">
          <span style="
            display:inline-block;
            font-size:28px;
            font-weight:bold;
            letter-spacing:5px;
            color:#fff;
            background:#007bff;
            padding:10px 20px;
            border-radius:8px;
          ">
            ${otp}
          </span>
        </div>

        <p style="color:#888; font-size:14px;">
          This OTP is valid for 5 minutes.
        </p>

        <hr style="margin:20px 0;" />

        <p style="font-size:12px; color:#aaa;">
          If you didn’t request this, please ignore this email.
        </p>

      </div>
    </div>
  `,
    });
}