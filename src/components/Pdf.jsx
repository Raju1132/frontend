import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generatePDF(data) {
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: "Manthan",
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
        {
          content: "Invoice",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#43baa0",
      cellPadding:3,
      
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content:
            `Invoice Number: ${data.invoice_no}` +
            "Order Number: " +
            data.order_no +
            "\nDate: " +
            data.invoice_date,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Billed To:\n\n" +
            "Customer Id: " +
            data.cust_id +
            "\nName: " +
            data.shipping_person_name +
            "\nOEM Id: " +
            data.oem_id +
            "\nVehicle Number: " +
            data.vehicle_frame_no +
            "\nBilling Address:" +
            data.shipping_address +
            "\nZip code" +
            data.shipping_pincode +
            "\nCity" +
            data.shipping_city,
          styles: {
            halign: "left",
          },
        },

        {
          content:
            "From:" +
            "\nCompany name" +
            " Manthan" +
            "\nJangpura" +
            "\n160102 - Dehli" +
            "\nIndia",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Total Amount: ",
          styles: {
            halign: "right",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: data.total_amount,
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#43baa0",
          },
        },
      ],
      [
        {
          content: "Due date: 2025-02-01",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Products & Services",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    head: [["Items", "Category", "Quantity", "Price", "Tax", "Amount"]],
    body: [
      ["Servicing", "Category", "2", "$450", "$50", "$1000"],
      ["Engine oil", "Category", "2", "$450", "$50", "$1000"],
      ["Cleaning", "Category", "2", "$450", "$50", "$1000"],
      ["Wiring", "Category", "2", "$450", "$50", "$1000"],
    ],
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Subtotal:",
          styles: {
            halign: "right",
          },
        },
        {
          content: data.total_amount,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total tax:",
          styles: {
            halign: "right",
          },
        },
        {
          content: data.tax_amount,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total amount:",
          styles: {
            halign: "right",
          },
        },
        {
          content: data.tax_amount + data.total_amount,
          styles: {
            halign: "right",
          },
        },
       
      ],
      [
        {
          content: "Status: ",
          styles: {
            halign: "right",
          },
        },
        {
          content: data.payment_status,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Terms & notes",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content:
          "Payment is due within [X] days. Late payments incur a [X]% fee. "+
          "Disputes must be raised within [X] days. Refunds/adjustments for defective "+
          "goods/services must be requested within [X] days. Cancellations require "+
          "notice [X] days in advance. Ownership remains with the company until full "+
          "payment. Governed by [jurisdiction] law.",
            styles: {
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "This is a centered footer",
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
  });

  return doc.save("invoice");
}
