import jsPDF from "jspdf";

const exportInstallationPDF = (installation) => {

    const doc = new jsPDF();

    let y = 50;

    // =========================
    // Header
    // =========================

    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("VEDAMAP NEXTECH", 20, 16);

    doc.setFontSize(14);
    doc.text("Installation Report", 20, 26);

    doc.setTextColor(0, 0, 0);

    // =========================
    // Row Function
    // =========================

    const addRow = (label, value) => {

        doc.setFont("helvetica", "bold");
        doc.text(label, 20, y);

        doc.setFont("helvetica", "normal");
        doc.text(String(value || "-"), 80, y);

        doc.setDrawColor(220);
        doc.line(20, y + 3, 190, y + 3);

        y += 10;

    };

    // =========================
    // Data
    // =========================

    addRow("Customer", installation.customer?.name);

    addRow("WB Code", installation.wbCode);

    addRow("Company", installation.customer?.company);

    addRow("Site Name", installation.siteName);

    addRow("Location", installation.location);

    addRow("Product", installation.product?.name);

    addRow("Engineer", installation.engineer);

    addRow(
        "Installation Date",
        installation.installationDate
            ? new Date(installation.installationDate).toLocaleDateString()
            : "-"
    );

    addRow(
        "Commissioning Date",
        installation.commissioningDate
            ? new Date(installation.commissioningDate).toLocaleDateString()
            : "-"
    );

    addRow("Status", installation.status);

    addRow("Remarks", installation.remarks);

    // =========================
    // Footer
    // =========================

    y += 10;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);

    doc.text(
        `Generated On : ${new Date().toLocaleString()}`,
        20,
        y
    );

    // =========================
    // Save
    // =========================

    doc.save(`Installation-${installation.wbCode}.pdf`);

};

export default exportInstallationPDF;