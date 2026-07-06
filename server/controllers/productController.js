const Product = require("../models/Product");

// ==================== Get All Products ====================

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ==================== Add Product ====================

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};




// ==================== Get Single Product ====================

const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found",
            });
        }

        res.json(product);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};




// ==================== Update Product ====================

const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
            }

        );

        if (!product) {

            return res.status(404).json({
                message: "Product Not Found",
            });

        }

        res.json(product);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};





// ==================== Delete Product ====================

const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product Not Found",
            });

        }

        res.json({
            message: "Product Deleted Successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};




module.exports = {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};