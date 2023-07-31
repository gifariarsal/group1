const db = require("../../models");
const user = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const transporter = require("../helpers/transporter");
const handlebars = require("handlebars");
const path = require("path");

const profileControllers = {
  changeUsername: async (req, res) => {
    try {
      const { currentUsername, newUsername } = req.body;

      const newUsernameExists = await user.findOne({
        where: { username: newUsername },
      });

      if (newUsernameExists)
        return res.status(400).json({ message: "Username already exists" });

      const usernameExists = await user.findOne({
        where: { username: currentUsername },
      });

      if (!usernameExists)
        return res.status(400).json({ message: "Username not found" });

      await db.sequelize.transaction(async (t) => {
        const result = await user.update(
          { username: newUsername },
          { where: { id: req.user.id }, transaction: t }
        );
        res
          .status(200)
          .json({
            message: "Username changed successfully",
            username: newUsername,
          });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to change username", error: error.message });
    }
  },

  changeEmail: async (req, res) => {
    try {
      const { currentEmail, newEmail } = req.body;

      const newEmailExists = await user.findOne({ where: { email: newEmail } });

      if (newEmailExists)
        return res.status(400).json({ message: "Email already exists" });

      const emailExists = await user.findOne({
        where: { email: currentEmail },
      });
      if (!emailExists)
        return res.status(400).json({ message: "Email not found" });

      let result;
      await db.sequelize.transaction(async (t) => {
        result = await user.update(
          { email: newEmail, isVerified: false },
          { where: { email: currentEmail }, transaction: t }
        );
      });
      res.status(200).json({ message: "Email changed successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to change email", error: error.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const { id } = req.user;
      const users = await user.findOne({ where: { id } });

      const checkPassword = await bcrypt.compare(oldPassword, users.password);
      if (!checkPassword)
        return res.status(400).json({ message: "Incorrect password" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await db.sequelize.transaction(async (t) => {
        const update = await user.update(
          { password: hashedPassword },
          { where: { id }, transaction: t }
        );
      });
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to change password", error: error.message });
    }
  },

  changeAvatar: async (req, res) => {
    try {
      const { id } = req.user;
      const oldAvatar = await user.findOne({ where: { id } });

      if (oldAvatar.imgProfile) {
        fs.unlink(oldAvatar.imgProfile, (err) => {
          if (err) return res.status(500).json({ error: err.message });
        });
      }

      await db.sequelize.transaction(async (t) => {
        const result = await user.update(
          { imgProfile: req.file.path },
          { where: { id } },
          { transaction: t }
        );
      });
      res.status(200).json({ message: "Avatar changed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to change avatar", error: error.message });
    }
  },
};

module.exports = profileControllers;
