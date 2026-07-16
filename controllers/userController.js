import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            interest,
            password,
            confirmPassword,
        } = req.body;

        // Validate required fields
        if (
            !name ||
            !email ||
            !phone ||
            !interest ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            interest,
            password: hashedPassword,
            authProvider: "local",
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                interest: user.interest,
                authProvider: user.authProvider,
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};