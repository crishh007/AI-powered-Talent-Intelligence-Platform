const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");const crypto = require("crypto");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check if user already exists
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await pool.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email, role, created_at`,
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const result = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const userId = result.rows[0].id;

        // Generate random reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Token valid for 15 minutes
        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        await pool.query(
            `UPDATE users
             SET reset_token = $1,
                 reset_token_expiry = $2
             WHERE id = $3`,
            [resetToken, expiry, userId]
        );

        res.json({
            message: "Password reset token generated",
            resetToken: resetToken
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                message: "Token and new password are required"
            });
        }

        const result = await pool.query(
            `SELECT id
             FROM users
             WHERE reset_token = $1
             AND reset_token_expiry > CURRENT_TIMESTAMP`,
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        const userId = result.rows[0].id;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `UPDATE users
             SET password = $1,
                 reset_token = NULL,
                 reset_token_expiry = NULL
             WHERE id = $2`,
            [hashedPassword, userId]
        );

        res.json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error("Reset password error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};