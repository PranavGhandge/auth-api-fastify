import { db } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mail";

export const getUserService = async () => {
    const [rows] = await db.execute("select id,name,email from user");

    return rows
};

export const createUserService = async (body: any) => {
    const { name, email, password } = body;

    const hashPassword = await bcrypt.hash(password, 10)

    const [result] = await db.execute(
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashPassword]
    )

    return {
        Message: "User Created",
        data: { name, email }
    };
};


export const loginUserService = async (body: any) => {
    const { email, password } = body;

    const [rows]: any = await db.execute("select * from user where email = ?", [email]);

    const user = rows[0]

    if (!user) {
        throw new Error("User not Found");
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Invalid Password")
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    )

    await db.execute("update user set refresh_token = ? where id=?", [refreshToken, user.id])

    return {
        message: "Login Successful",
        token,
        refreshToken
    }
}

export const forgotPasswordService = async (email: string) => {
    const [rows]: any = await db.execute("select*from user where email = ?", [email]);

    const user = rows[0]

    if (!user) {
        throw new Error("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 5 * 60 * 1000;

    await db.execute("update user set otp=?, otp_expiry = ? where email= ?", [otp, expiry, email]);

    await sendEmail(email, otp);

    return {
        message: "OTP generated",
    };
};

export const resetPasswordService = async (body: any) => {
    const { email, otp, newPassword } = body;

    const [rows]: any = await db.execute("select * from user where email=?", [email]);

    const user = rows[0]

    if (!user) {
        throw new Error("User not Found")
    }

    if (user.otp !== otp) {
        throw new Error("Invalid OTP")
    }

    if (Date.now() > user.otp_expiry) {
        throw new Error("OTP Expired")
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)

    await db.execute("update user set password=?, otp=NULL, otp_expiry= NULL where email=? ",
        [hashPassword, email]
    )

    return {
        Message: "Password reset successsful"
    }
}

export const refreshTokenService = async (token: string) => {
    try {
        const decoded: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        )

        const [rows]: any = await db.execute(
            "select * from user where id =? and refresh_token=?",
            [decoded.id, token]
        )

        const user = rows[0];

        if (!user) {
            throw new Error(" Invalid refresh token");
        }

        const newAccessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "15m" }
        );

        return {
            accessToken: newAccessToken
        }
    }
    catch (err) {
        throw new Error("Invalid or expired refresh token")
    }
}






