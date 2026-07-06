require("dotenv").config();
const installationRoutes = require("./routes/installationRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const customers = require("./data/customers");
const products = require("./data/products");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/installations", installationRoutes);


const PORT = 5000;


// ==================== Home Route ====================

app.get("/", (req, res) => {
  res.send("Server Running...");
});



connectDB();

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});