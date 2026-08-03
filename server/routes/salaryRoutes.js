const express = require("express");

const router = express.Router();

const {

    getEmployeeSalaries,

    addSalary,

    updateSalary,

    deleteSalary,

} = require("../controllers/salaryController");


// ==================== Get Employee Salary ====================

router.get("/:employeeId", getEmployeeSalaries);


// ==================== Add Salary ====================

router.post("/", addSalary);


// ==================== Update Salary ====================

router.put("/:id", updateSalary);


// ==================== Delete Salary ====================

router.delete("/:id", deleteSalary);


module.exports = router;


const controllers = require("../controllers/salaryController");

console.log("Controllers:", controllers);

