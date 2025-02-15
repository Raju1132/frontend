import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import generatePDF from "../components/Pdf";
import {jsPDF} from "jspdf";

export default function Invoice() {
  const [data, setData] = useState({});
  const [nav, setNav] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    invoice_no: "",
    order_no: "",
    cust_id: "",
    dealer_code: "",
    oem_id: "",
    vehicle_frame_no: "",
    invoice_date: "",
    total_amount: "",
    tax_amount: "",
    discount_amount: "",
    net_amount: "",
    payment_status: "",
    shipping_person_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_pincode: "",
    shipping_contact: "",
    created_by: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For numeric fields, convert value to number
    const newValue =
      name == "id" ||
      name === "total_amount" ||
      name === "tax_amount" ||
      name === "discount_amount" ||
      name === "net_amount"
        ? parseFloat(value)
        : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const exportPDF = () => {
    if (data.length === 0) {
      alert("No data available for export.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("User Data Report", 20, 10);

    const headers = [
      "ID",
      "InvoiceNo",
      "OrderNo",
      "CustomerID",
      "DealerCode",
      "OEMID",
      "VehicleFrameNo",
      "InvoiceDate",
      "TotalAmount",
      "TaxAmount",
      "DiscountAmount",
      "NetAmount",
      "PaymentStatus",
      "ShippingPersonName",
      "ShippingAddress",
      "ShippingCity",
      "ShippingState",
      "ShippingPincode",
      "ShippingContact",
      "CreatedBy",
    ];
    const tableData = data.map((items) => [
      items.id,
      items.invoice_no,
      items.order_no,
      items.cust_id,
      items.dealer_code,
      items.oem_id,
      items.vehicle_frame_no,
      items.invoice_date,
      items.total_amount,
      items.tax_amount,
      items.discount_amount,
      items.net_amount,
      items.payment_status,
      items.shipping_person_name,
      items.shipping_address,
      items.shipping_city,
      items.shipping_state,
      items.shipping_pincode,
      items.shipping_contact,
      items.created_by,
    ]);

    doc.autoTable({
      startY: 20,
      head: [headers],
      body: tableData,
    });

    doc.save("users_report.pdf");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/invoice-details",
        formData
      );
      console.log("Invoice created successfully:", response.data);
      alert("Invoice created successfully!");
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Error creating invoice!");
    }
  };

  let params = useParams();
  let id = params.id;

  useEffect(() => {
    axios
      .get("http://localhost:8080/invoice-details")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching invoice details:", err);
      });
  }, []);

  const PdfGenerator = (val) => {
    generatePDF(val);
  };

  return (
    <div>
      <div>
        <div className="flex w-full justify-evenly my-10">
          <button onClick={() => setNav(true)}>Create Invoice</button>
          <button onClick={() => setNav(false)}>See Invoice</button>
        </div>

        {nav ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 justify-center items-center"
          >
            <div className="flex gap-10">
              <div className="flex flex-col">
                <div className="flex justify-between mt-2 w-96">
                  <label>Invoice ID:</label>
                  <input
                    type="number"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-between mt-2 w-96">
                  <label>Invoice No:</label>
                  <input
                    type="text"
                    name="invoice_no"
                    value={formData.invoice_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Order No:</label>
                  <input
                    type="text"
                    name="order_no"
                    value={formData.order_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Customer ID:</label>
                  <input
                    type="text"
                    name="cust_id"
                    value={formData.cust_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Dealer Code:</label>
                  <input
                    type="text"
                    name="dealer_code"
                    value={formData.dealer_code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>OEM ID:</label>
                  <input
                    type="text"
                    name="oem_id"
                    value={formData.oem_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Vehicle Frame No:</label>
                  <input
                    type="text"
                    name="vehicle_frame_no"
                    value={formData.vehicle_frame_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Invoice Date:</label>
                  <input
                    type="date"
                    name="invoice_date"
                    value={formData.invoice_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Total Amount:</label>
                  <input
                    type="number"
                    name="total_amount"
                    value={formData.total_amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Tax Amount:</label>
                  <input
                    type="number"
                    name="tax_amount"
                    value={formData.tax_amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between mt-2 w-96">
                  <label>Discount Amount:</label>
                  <input
                    type="number"
                    name="discount_amount"
                    value={formData.discount_amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Net Amount:</label>
                  <input
                    type="number"
                    name="net_amount"
                    value={formData.net_amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Payment Status:</label>
                  <input
                    type="text"
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Shipping Person Name:</label>
                  <input
                    type="text"
                    name="shipping_person_name"
                    value={formData.shipping_person_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Shipping Address:</label>
                  <textarea
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Shipping City:</label>
                  <input
                    type="text"
                    name="shipping_city"
                    value={formData.shipping_city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Shipping State:</label>
                  <input
                    type="text"
                    name="shipping_state"
                    value={formData.shipping_state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Shipping Pincode:</label>
                  <input
                    type="text"
                    name="shipping_pincode"
                    value={formData.shipping_pincode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Shipping Contact:</label>
                  <input
                    type="text"
                    name="shipping_contact"
                    value={formData.shipping_contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex justify-between mt-2 w-96">
                  <label>Created By:</label>
                  <input
                    type="text"
                    name="created_by"
                    value={formData.created_by}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className=" flex gap-20 mt-10 ">
              <button type="submit">Submit Invoice</button>
            </div>
          </form>
        ) : (
          <>
            <button className="mb-5" onClick={exportPDF}>Export All</button>

            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-900">
                  <th>Actions</th>
                  {Object.keys(data[0] || {}).map((val, key) => (
                    <th key={key} className="px-2 py-1 border-b text-center">
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td>
                      <button onClick={() => PdfGenerator(row)}>
                        Download
                      </button>
                    </td>
                    {Object.values(row).map((val, key) => (
                      <td key={key} className="px-4 py-2 text-center">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
