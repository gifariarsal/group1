const db = require("../../models");
const product = db.Product;
const category = db.Category;
const { Op } = db.Sequelize;

const productControllers = {
  getProductById: async (req, res) => {
    try {
      const products = await product.findOne({
        attributes: { exclude: ["categoryId"] },
        where: { id: req.params.id },
        include: [
          {
            model: category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      if (!products)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product found", data: products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get product", error: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        name,
        categoryId,
        productImg,
        modal_produk,
        harga_produk,
        quantity,
        description,
      } = req.body;
      await db.sequelize.transaction(async (t) => {
        const result = await product.create(
          {
            name,
            categoryId,
            productImg: req.file.path,
            modal_produk,
            harga_produk,
            quantity,
            description,
          },
          { transaction: t }
        );
        res.status(200).json({
          message: "Product created successfully",
          data: result,
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create product", error: error.message });
    }
  },

  getProduct: async (req, res) => {
    const { name, categoryId, sort_createdAt, sort_Harga, size, page } = req.query;
    const limitPerPage = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;
    const offset = limitPerPage * (pageNumber - 1);
    const findName = { name: { [Op.like]: `%${name || ""}%` } };
    if (categoryId) findName.categoryId = categoryId;

    try {
      const products = await product.findAll({
        attributes: { exclude: ["categoryId"] },
        where: findName,
        limit: limitPerPage,
        productPage: pageNumber,
        offset,
        include: [
          {
            model: category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        order: [["createdAt", sort_createdAt || "DESC"]],
        order: [["harga_produk", sort_Harga || "DESC"]]
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: "Get Product Success",
        limit: limitPerPage,
        productPage: pageNumber,
        data: products,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get product", error: error.message });
    }
  },
};

module.exports = productControllers;
