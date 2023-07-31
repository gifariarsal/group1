const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter");
const path = require("path");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const users = db.User;

const authControllers = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const data = await users.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });

      if (data)
        return res
          .status(500)
          .json({ message: "Username or email already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await db.sequelize.transaction(async (t) => {
        const result = await users.create(
          {
            username,
            email,
            password: hashedPassword,
            role: "Cashier",
            isActive: true,
          },
          { transaction: t }
        );

        return res.status(200).json({
          message:
            "Register success with username: " + result.username,
          data: result,
        });
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Register failed", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let where = {};

      if (username) {
        where.username = username;
      }

      const checkLogin = await users.findOne({ where });
      if (!checkLogin.isActive)
        return res.status(404).json({ message: "Your Account is not Active" });
      // console.log("check log:",checkLogin)

      const passwordValid = await bcrypt.compare(password, checkLogin.password);
      // console.log("pass:",passwordValid)
      if (!passwordValid)
        return res.status(404).json({ message: "Incorrect password" });

      let payload = {
        id: checkLogin.id,
        username: checkLogin.username,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "100h",
      });

      return res.status(200).json({ message: "Login success", data: token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Login failed", error: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const checkEmail = await users.findOne({ where: { email } });

      if (!checkEmail)
        return res.status(400).json({ message: "Email not found" });
      let payload = {
        id: checkEmail.id,
        username: checkEmail.username,
        email: checkEmail.email,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "2h" });
      const redirect = `http://localhost:3000/verification/${token}`;

      const data = await fs.readFile(
        path.resolve(__dirname, "../email/forgotPassword.html"),
        "utf-8"
      );
      const tempCompile = handlebars.compile(data);
      const tempResult = tempCompile({ redirect });
      await transporter.sendMail({
        from: process.env.user_gmail,
        to: email,
        subject: "Forgot Password",
        html: tempResult,
      });
      return res
        .status(200)
        .json({
          message: "Request accepted. Check your email to reset your password",
        });
    } catch (error) {
      return res.status(500).json({ message: "Failed to send request" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { id, email } = req.user;
      const { newPassword } = req.body;
      const user = await users.findOne({ where: { id } });
      if (!user) return res.status(400).json({ message: "Account not found" });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await db.sequelize.transaction(async (t) => {
        const result = await users.update(
          {
            password: hashedPassword,
          },
          { where: { id }, transaction: t }
        );

        const data = await fs.readFile(
          path.resolve(__dirname, "../email/resetPassword.html"),
          "utf-8"
        );
        const tempCompile = handlebars.compile(data);
        const tempResult = tempCompile();
        await transporter.sendMail({
          to: email,
          subject: "Reset Password",
          html: tempResult,
        });
      });
      return res
        .status(200)
        .json({ message: "Your password has been reset successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Failed to reset your password",
          error: error.message,
        });
    }
  },
};

module.exports = authControllers;
