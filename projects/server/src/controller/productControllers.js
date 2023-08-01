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
        isActive,
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
            isActive
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

  updateProduct: async (req, res) => {
    try {
      const { id } = req.query; // Assuming you get the productId from the request URL or query parameters
      const updatedFields = {};
  
      if (req.body.name) {
        updatedFields.name = req.body.name;
      }
  
      if (req.body.categoryId) {
        updatedFields.categoryId = req.body.categoryId;
      }
  
      if (req.file && req.file.path) {
        updatedFields.productImg = req.file.path;
      }
  
      if (req.body.modal_produk) {
        updatedFields.modal_produk = req.body.modal_produk;
      }
  
      if (req.body.harga_produk) {
        updatedFields.harga_produk = req.body.harga_produk;
      }
  
      if (req.body.quantity) {
        updatedFields.quantity = req.body.quantity;
      }
  
      if (req.body.description) {
        updatedFields.description = req.body.description;
      }
  
      const existingProduct = await product.findOne({
        where: {
          name: updatedFields.name,
        },
      })
  
      if (existingProduct && existingProduct.id !== id) {
        return res
          .status(409)
          .json({ message: "Product name already exists. Choose a different name." });
      }

      await db.sequelize.transaction(async (t) => {
        const updatedProduct = await product.update(updatedFields, {
          where: {
            id: id,
          },
          transaction: t,
        });
  
        if (updatedProduct[0] === 0) {
          // If updatedProduct[0] is 0, it means no rows were affected by the update
          return res.status(404).json({ message: "Product not found" });
        }
  
        res.status(200).json({ message: "Product updated successfully" });
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update product", error: error.message });
    }
  },
  
  deactivateProduct: async (req, res) => {
    const productId = req.query.id;
  
    try {
      const productToUpdate = await product.findByPk(productId);
      if (!productToUpdate) {
        return res.status(404).json({ message: "Product not found" });
      }

      productToUpdate.isActive = false;
      await productToUpdate.save();
  
      res.status(200).json({ message: "Product deactivated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to deactivate product", error: error.message });
    }
  },
  
  activateProduct: async (req, res) => {
    const productId = req.query.id;
  
    try {
      const productToUpdate = await product.findByPk(productId);
      if (!productToUpdate) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      productToUpdate.isActive = true;
      await productToUpdate.save();
  
      res.status(200).json({ message: "Product activated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to activate product", error: error.message });
    }
  },

};

module.exports = productControllers;
