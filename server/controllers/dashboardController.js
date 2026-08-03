const Employee = require("../models/Employee");
const Salary = require("../models/Salary");
const Customer = require("../models/Customer");
const Lead = require("../models/Lead");
const Product = require("../models/Product");
const CustomerProduct = require("../models/CustomerProduct");
const Installation = require("../models/Installation");
const DealerCustomer = require("../models/DealerCustomer");


const getDashboardStats = async (req, res) => {
    try {
        // Employees
        const employees = await Employee.find();

        const totalEmployees = employees.length;
        // Products
        const totalProducts = await Product.countDocuments();

        // Product Sales
        const customerProducts = await CustomerProduct.find();

        const totalProductSales = customerProducts.reduce(
            (sum, product) => sum + Number(product.totalAmount || 0),
            0
        );
        const totalDealerCustomers = await DealerCustomer.countDocuments();
        // Installations
        const totalInstallations = await Installation.countDocuments();


        const pendingInstallations = await Installation.countDocuments({
            status: "Pending",
        });

        const activeEmployees = employees.filter(
            (emp) => emp.status === "Active"
        ).length;

        const inactiveEmployees = employees.filter(
            (emp) => emp.status === "Inactive"
        ).length;

        const totalDepartments = new Set(
            employees.map((emp) => emp.department).filter(Boolean)
        ).size;

        const totalRoles = new Set(
            employees.map((emp) => emp.role).filter(Boolean)
        ).size;

        // Customers
        const totalCustomers = await Customer.countDocuments();

        // Leads
        const totalLeads = await Lead.countDocuments();

        // Salary
        const salaries = await Salary.find();

        const totalSalaryPaid = salaries.reduce(
            (sum, salary) => sum + Number(salary.paidAmount || 0),
            0
        );

        const totalPendingSalary = salaries.reduce(
            (sum, salary) => sum + Number(salary.pendingAmount || 0),
            0
        );

        const totalIncentive = salaries.reduce(
            (sum, salary) => sum + Number(salary.incentive || 0),
            0
        );


        res.status(200).json({
            totalEmployees,
            activeEmployees,
            inactiveEmployees,

            totalCustomers,
            totalProducts,
            totalLeads,

            totalInstallations,
            pendingInstallations,
            totalDealerCustomers,

            totalDepartments,
            totalRoles,
            totalProductSales,

            totalSalaryPaid,
            totalPendingSalary,
            totalIncentive,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load dashboard",
        });
    }
};

module.exports = {
    getDashboardStats,
};