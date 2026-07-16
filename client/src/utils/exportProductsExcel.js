import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportProductsExcel = (products) => {

    const data = products.map((product) => ({

        "Product Name": product.name,

        Brand: product.brand || "-",

        Model: product.model || "-",

        "Unit Price": product.price,

        Stock: product.stock,

        GST: product.gst ? `${product.gst}%` : "-",

        Warranty: product.warranty || "-",

        Status: product.status,

        "Created Date": product.createdAt
            ? new Date(product.createdAt).toLocaleDateString()
            : "-",

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet["!cols"] = [
        { wch: 22 }, // Product Name
        { wch: 18 }, // Brand
        { wch: 18 }, // Model
        { wch: 15 }, // Unit Price
        { wch: 10 }, // Stock
        { wch: 10 }, // GST
        { wch: 18 }, // Warranty
        { wch: 15 }, // Status
        { wch: 18 }, // Created Date
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Products"
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

    saveAs(file, "Products.xlsx");

};

export default exportProductsExcel;