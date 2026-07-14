
require("dotenv").config();

const customerProductRoutes = require("./routes/customerProductRoutes");
const installationRoutes = require("./routes/installationRoutes");
const leadRoutes = require("./routes/leadRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const path = require("path");

const supportRoutes = require("./routes/supportRoutes");

const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/customer-products", customerProductRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/installations", installationRoutes);
app.use("/api/supports", supportRoutes);
app.use("/api/employees", employeeRoutes);


const PORT = 5000;


// ==================== Home Route ====================

app.get("/", (req, res) => {
  res.send("Server Running...");
});



connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});