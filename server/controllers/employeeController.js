const Employee = require("../models/Employee");

// ==================== Get All Employees ====================

const getEmployees = async (req, res) => {
    try {

        const employees = await Employee.find().sort({ createdAt: -1 });

        res.json(employees);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// ==================== Get Single Employee ====================

const getEmployeeById = async (req, res) => {
    try {

        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found",
            });
        }

        res.json(employee);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// ==================== Add Employee ====================

const addEmployee = async (req, res) => {
    try {

        // ==================== Generate Employee ID ====================

        const lastEmployee = await Employee.findOne()
            .sort({ createdAt: -1 })
            .select("employeeId");

        let employeeId = "EMP-001";

        if (lastEmployee?.employeeId) {

            const lastNumber = parseInt(
                lastEmployee.employeeId.replace("EMP-", ""),
                10
            );

            employeeId = `EMP-${String(lastNumber + 1).padStart(3, "0")}`;
        }




        const existingMobile = await Employee.findOne({
            mobileNumber: req.body.mobileNumber,
        });

        if (existingMobile) {
            return res.status(400).json({
                message: "Mobile Number already exists.",
            });
        }

        const existingEmail = await Employee.findOne({
            email: req.body.email,
        });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists.",
            });
        }

        const employee = await Employee.create({
            ...req.body,
            employeeId,
        });

        res.status(201).json(employee);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// ==================== Update Employee ====================

const updateEmployee = async (req, res) => {
    try {

        const existingEmployeeId = await Employee.findOne({
            employeeId: req.body.employeeId,
            _id: { $ne: req.params.id },
        });

        if (existingEmployeeId) {
            return res.status(400).json({
                message: "Employee ID already exists.",
            });
        }

        const existingMobile = await Employee.findOne({
            mobileNumber: req.body.mobileNumber,
            _id: { $ne: req.params.id },
        });

        if (existingMobile) {
            return res.status(400).json({
                message: "Mobile Number already exists.",
            });
        }

        const existingEmail = await Employee.findOne({
            email: req.body.email,
            _id: { $ne: req.params.id },
        });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists.",
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found",
            });
        }

        res.json(employee);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// ==================== Delete Employee ====================

const deleteEmployee = async (req, res) => {
    try {

        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee Not Found",
            });
        }

        res.json({
            message: "Employee Deleted Successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};