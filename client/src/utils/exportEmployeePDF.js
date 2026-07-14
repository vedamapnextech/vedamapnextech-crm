// ==================== TODO ====================
// Add Company Logo
// Improve PDF Design
// Add Employee Photo in PDF
// =============================================
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportEmployeePDF = (employee) => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129);

    doc.text("Employee Details", 14, 20);

    autoTable(doc, {

        startY: 30,

        head: [["Field", "Value"]],

        body: [

            ["Employee ID", employee.employeeId],
            ["Full Name", employee.fullName],
            ["Mobile Number", employee.mobileNumber],
            ["Email", employee.email],
            ["Department", employee.department],
            ["Designation", employee.designation],
            ["Role", employee.role],
            ["Joining Date", new Date(employee.joiningDate).toLocaleDateString()],

            [
                "Date Of Birth",
                employee.dateOfBirth
                    ? new Date(employee.dateOfBirth).toLocaleDateString()
                    : "-"
            ],

            [
                "Emergency Contact",
                employee.emergencyContactMobile || "-"
            ],

            ["Status", employee.status],

            ["Address", employee.address || "-"],

            ["Remarks", employee.remarks || "-"],

            [
                "Aadhaar",
                employee.aadhaarDocument
                    ? "Uploaded"
                    : "Not Uploaded"
            ],

            [
                "Created Date",
                new Date(employee.createdAt).toLocaleString()
            ],

            [
                "Last Updated",
                new Date(employee.updatedAt).toLocaleString()
            ]

        ]

    });

    doc.save(`${employee.employeeId}.pdf`);

};

export default exportEmployeePDF;