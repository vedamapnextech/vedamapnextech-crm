// ==================== TODO ====================
// Add Company Logo
// Improve PDF Design
// Add Customer Signature
// =============================================

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportCustomerPDF = (customer, products = []) => {

    const doc = new jsPDF();

    // ==================== Title ====================

    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129);

    doc.text("Customer Details", 14, 20);

    // ==================== Customer Information ====================

    autoTable(doc, {

        startY: 30,

        head: [["Field", "Value"]],

        body: [

            ["WB Code", customer.wbCode],

            ["Customer Name", customer.name],

            ["Company", customer.company],

            ["Contact Person", customer.contactPerson || "-"],

            ["Mobile Number", customer.phone],

            ["Email", customer.email || "-"],

            ["GST Number", customer.gstNumber || "-"],

            ["City", customer.city || "-"],

            ["Address", customer.address || "-"],

            ["Customer Type", customer.customerType],

            ["Status", customer.status],

            [
                "Customer Since",
                customer.customerSince
                    ? new Date(customer.customerSince).toLocaleDateString()
                    : "-"
            ],

            [
                "Created Date",
                new Date(customer.createdAt).toLocaleString()
            ],

            [
                "Last Updated",
                new Date(customer.updatedAt).toLocaleString()
            ]

        ]

    });

    // ==================== Products ====================

    autoTable(doc, {

        startY: doc.lastAutoTable.finalY + 10,

        head: [[
            "Product",
            "Total",
            "Paid",
            "Pending",
            "Status"
        ]],

        body: products.length
            ? products.map((product) => [

                product.productName,

                `Rs. ${Number(product.totalAmount || 0).toLocaleString()}`,

                `Rs. ${Number(product.paidAmount || 0).toLocaleString()}`,

                `Rs. ${Number(product.pendingAmount || 0).toLocaleString()}`,

                product.paymentStatus,

            ])
            : [["No Products", "-", "-", "-", "-"]]

    });

    // ==================== Payment Summary ====================

    const totalAmount = products.reduce(
        (sum, product) => sum + Number(product.totalAmount || 0),
        0
    );

    const paidAmount = products.reduce(
        (sum, product) => sum + Number(product.paidAmount || 0),
        0
    );

    const pendingAmount = products.reduce(
        (sum, product) => sum + Number(product.pendingAmount || 0),
        0
    );

    const paymentStatus =
        pendingAmount === 0
            ? "Paid"
            : paidAmount === 0
                ? "Pending"
                : "Partial";

    autoTable(doc, {

        startY: doc.lastAutoTable.finalY + 10,

        head: [["Payment Summary", "Value"]],

        body: [

            [
                "Total Business",
                `Rs. ${totalAmount.toLocaleString()}`
            ],

            [
                "Paid Amount",
                `Rs. ${paidAmount.toLocaleString()}`
            ],

            [
                "Pending Amount",
                `Rs. ${pendingAmount.toLocaleString()}`
            ],

            [
                "Payment Status",
                paymentStatus
            ]

        ]

    });

    // ==================== Product Remarks ====================

    autoTable(doc, {

        startY: doc.lastAutoTable.finalY + 10,

        head: [["Product", "Remarks"]],

        body: products.length
            ? products.map((product) => [

                product.productName,

                product.remarks || "-"

            ])
            : [["-", "-"]]

    });

    doc.save(`${customer.wbCode}.pdf`);

};

export default exportCustomerPDF;