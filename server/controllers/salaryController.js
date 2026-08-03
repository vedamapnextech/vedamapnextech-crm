const Salary = require("../models/Salary");

// ==================== Get Employee Salaries ====================

const getEmployeeSalaries = async (req, res) => {
    try {

        const salaries = await Salary.find({
            employee: req.params.employeeId,
        }).sort({
            year: -1,
            createdAt: -1,
        });

        res.json(salaries);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// ==================== Add Salary ====================

const addSalary = async (req, res) => {

    try {

        const {
            employee,
            month,
            year,
            basicSalary,
            incentive,
            paidAmount,
            remarks,
        } = req.body;

        // Duplicate Month Check

        const existingSalary = await Salary.findOne({
            employee,
            month,
            year,
        });

        if (existingSalary) {

            return res.status(400).json({
                message: "Salary for this month already exists.",
            });

        }

        const netSalary =
            Number(basicSalary) + Number(incentive);

        const pendingAmount =
            netSalary - Number(paidAmount);

        let salaryStatus = "Pending";

        if (Number(paidAmount) >= netSalary) {

            salaryStatus = "Paid";

        } else if (Number(paidAmount) > 0) {

            salaryStatus = "Partial";

        }

        const salary = await Salary.create({

            employee,

            month,

            year,

            basicSalary,

            incentive,

            paidAmount,

            netSalary,

            pendingAmount,

            status: salaryStatus,

            remarks,

        });

        res.status(201).json(salary);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};

// ==================== Update Salary ====================

const updateSalary = async (req, res) => {

    try {

        const {
            month,
            year,
            basicSalary,
            incentive,
            paidAmount,
            remarks,
        } = req.body;

        const netSalary =
            Number(basicSalary) + Number(incentive);

        const pendingAmount =
            netSalary - Number(paidAmount);

        let salaryStatus = "Pending";

        if (Number(paidAmount) >= netSalary) {

            salaryStatus = "Paid";

        } else if (Number(paidAmount) > 0) {

            salaryStatus = "Partial";

        }

        const salary = await Salary.findByIdAndUpdate(

            req.params.id,

            {
                month,
                year,
                basicSalary,
                incentive,
                paidAmount,
                netSalary,
                pendingAmount,
                status: salaryStatus,
                remarks,
            },

            {
                new: true,
            }

        );

        if (!salary) {

            return res.status(404).json({
                message: "Salary Not Found",
            });

        }

        res.json(salary);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};

// ==================== Delete Salary ====================

const deleteSalary = async (req, res) => {

    try {

        const salary = await Salary.findByIdAndDelete(
            req.params.id
        );

        if (!salary) {

            return res.status(404).json({
                message: "Salary Not Found",
            });

        }

        res.json({
            message: "Salary Deleted Successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};
module.exports = {
    getEmployeeSalaries,
    addSalary,
    updateSalary,
    deleteSalary,
};