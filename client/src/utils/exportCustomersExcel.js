import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportCustomersExcel = (customers) => {

    const data = customers.map((customer) => ({

        "WB Code": customer.wbCode,

        "Customer Name": customer.name,

        Company: customer.company,

        "Contact Person": customer.contactPerson,

        "Mobile Number": customer.phone,

        Email: customer.email,

        "GST Number": customer.gstNumber,

        City: customer.city,

        Address: customer.address,

        "Customer Type": customer.customerType,

        Status: customer.status,

        "Customer Since": customer.customerSince
            ? new Date(customer.customerSince).toLocaleDateString()
            : "-",

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet["!cols"] = [
        { wch: 12 }, // WB Code
        { wch: 25 }, // Customer Name
        { wch: 25 }, // Company
        { wch: 22 }, // Contact Person
        { wch: 18 }, // Mobile Number
        { wch: 30 }, // Email
        { wch: 18 }, // GST Number
        { wch: 18 }, // City
        { wch: 35 }, // Address
        { wch: 18 }, // Customer Type
        { wch: 15 }, // Status
        { wch: 18 }, // Customer Since
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Customers"
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
        ref: `A1:L${data.length + 1}`,
    };

    saveAs(file, "Customers.xlsx");

};

export default exportCustomersExcel;