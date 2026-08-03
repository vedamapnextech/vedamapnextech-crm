import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportDealerCustomersExcel = (customers, dealerName = "All Dealers") => {

    const data = customers.map((customer) => ({

        "Dealer": customer.dealer?.name || dealerName,

        "WB Code": customer.wbCode,

        "Customer Name": customer.name,

        Company: customer.company,

        "Contact Person": customer.contactPerson,

        Phone: customer.phone,

        Email: customer.email,

        GST: customer.gstNumber,

        City: customer.city,

        Address: customer.address,

        Status: customer.status,

        "Customer Since": customer.customerSince
            ? new Date(customer.customerSince).toLocaleDateString()
            : "-",

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
        { wch: 25 },
        { wch: 12 },
        { wch: 25 },
        { wch: 25 },
        { wch: 20 },
        { wch: 18 },
        { wch: 30 },
        { wch: 18 },
        { wch: 18 },
        { wch: 35 },
        { wch: 15 },
        { wch: 18 },
    ];

    worksheet["!autofilter"] = {
        ref: `A1:L${data.length + 1}`,
    };

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Dealer Customers"
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

    saveAs(file, `${dealerName}-Customers.xlsx`);
};

export default exportDealerCustomersExcel;