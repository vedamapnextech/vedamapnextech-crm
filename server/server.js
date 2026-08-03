require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");
const dealerRoutes = require("./routes/dealerRoutes");
const customerProductRoutes = require("./routes/customerProductRoutes");
const installationRoutes = require("./routes/installationRoutes");
const leadRoutes = require("./routes/leadRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");
const path = require("path");
const salaryRoutes = require("./routes/salaryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const supportRoutes = require("./routes/supportRoutes");

const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const createDefaultAdmin = require("./utils/createDefaultAdmin");
const dealerCustomerRoutes = require("./routes/dealerCustomerRoutes");
const customerRoutes = require("./routes/customerRoutes");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/customer-products", customerProductRoutes);
app.use("/api/dealer-customers", dealerCustomerRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/dealers", dealerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/installations", installationRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/dashboard", dashboardRoutes);

app.use("/api/supports", supportRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);


const PORT = 5000;


// ==================== Home Route ====================

app.get("/", (req, res) => {
  res.send("Server Running...");
});



const startServer = async () => {
  await connectDB();

  await createDefaultAdmin();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();