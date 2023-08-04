const db = require("../../models");
const users = db.User;

const cashierControllers = {
  getCashiers: async (req, res) => {
    try {
      const cashiers = await users.findAll({ where: { role: "Cashier" } });
      return res.status(200).json({ message: "Cashiers retrieved successfully", data: cashiers });
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve cashiers", error: error.message });
    }
  },
  cashierActive: async (req, res) => {
    try {
      const cashierId = req.query.id;

      await db.sequelize.transaction(async (t) => {
        const updateCashier = await users.update(
          { isActive: true },
          { where: { id: cashierId }, transaction: t }
        );

        res.status(200).json({ message: "Cashier active!" });
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating cashier status", error: error.message })
    }
  },

  cashierInActive: async (req, res) => {
    try {
      const cashierId = req.query.id
      await db.sequelize.transaction(async (t) => {
        const updateCashier = await users.update(
          { isActive: false },
          { where: { id: cashierId }, transaction: t }
        );
        res.status(200).json({ message: "Cashier inactive!" });
      })
    } catch (error) {
      res.status(500).json({ message: "Error updating cashier status", error: error.message })
    }
  },
};

module.exports = cashierControllers;