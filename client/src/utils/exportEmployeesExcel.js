import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportEmployeesExcel = (employees) => {


    const data = employees.map((employee) => ({

        "Employee ID": employee.employeeId,

        "Full Name": employee.fullName,

        "Mobile Number": employee.mobileNumber,

        Email: employee.email,

        Department: employee.department,

        Designation: employee.designation,

        Role: employee.role,

        "Joining Date": employee.joiningDate
            ? new Date(employee.joiningDate).toLocaleDateString()
            : "-",

        "Date Of Birth": employee.dateOfBirth
            ? new Date(employee.dateOfBirth).toLocaleDateString()
            : "-",

        "Emergency Contact": employee.emergencyContactMobile || "-",

        Status: employee.status,

        Address: employee.address || "-",

        Remarks: employee.remarks || "-",

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet["!cols"] = [
        { wch: 15 }, // Employee ID
        { wch: 25 }, // Full Name
        { wch: 18 }, // Mobile Number
        { wch: 30 }, // Email
        { wch: 20 }, // Department
        { wch: 22 }, // Designation
        { wch: 18 }, // Role
        { wch: 18 }, // Joining Date
        { wch: 18 }, // Date Of Birth
        { wch: 20 }, // Emergency Contact
        { wch: 15 }, // Status
        { wch: 35 }, // Address
        { wch: 35 }, // Remarks
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Employees"
    );

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const file = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
    );
    
    worksheet["!autofilter"] = {
        ref: `A1:M${data.length + 1}`,
    };

    saveAs(file, "Employees.xlsx");

};

export default exportEmployeesExcel;