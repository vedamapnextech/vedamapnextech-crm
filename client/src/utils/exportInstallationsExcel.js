import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportInstallationsExcel = (installations) => {

    const data = installations.map((installation) => ({

        "WB Code": installation.wbCode,

        "Customer": installation.customer?.name || "-",

        "Product": installation.product?.name || "-",

        "Site Name": installation.siteName,

        "Location": installation.location,

        "Installation Type": installation.installationType,

        "Engineer": installation.engineer,

        "Installation Date": installation.installationDate
            ? new Date(installation.installationDate).toLocaleDateString()
            : "-",

        "Commissioning Date": installation.commissioningDate
            ? new Date(installation.commissioningDate).toLocaleDateString()
            : "-",

        "Status": installation.status,

        "Remarks": installation.remarks || "-",

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
        { wch: 14 }, // WB Code
        { wch: 28 }, // Customer
        { wch: 22 }, // Product
        { wch: 22 }, // Site Name
        { wch: 25 }, // Location
        { wch: 22 }, // Installation Type
        { wch: 22 }, // Engineer
        { wch: 18 }, // Installation Date
        { wch: 20 }, // Commissioning Date
        { wch: 16 }, // Status
        { wch: 35 }, // Remarks
    ];

    worksheet["!autofilter"] = {
        ref: `A1:K${data.length + 1}`,
    };

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Installations"
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

    saveAs(file, "Installations.xlsx");

};

export default exportInstallationsExcel;