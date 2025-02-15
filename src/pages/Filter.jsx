import { useEffect, useState } from "react";
import axios from "axios";
import "./filter.css";
import { jsPDF } from "jspdf";

function Filter() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8080/filter").then((response) => {
      setData(response.data);
      setFilteredData(response.data);
    });
  }, []);

  const filterDate = () => {
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      setError("The 'From Date' cannot be later than the 'To Date'.");
      setFilteredData([]);
      return;
    }

    setError("");

    if (!fromDate || !toDate) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((product) => {
      const productDate = new Date(product.regdate);
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      return productDate >= startDate && productDate <= endDate;
    });
    setFilteredData(filtered);
  };
const exportCSV = () => {
    let headers = ["Name,Mobile,Email,RegDate"];
    let dataCsv = filteredData.reduce((acc, user) => {
      const { name, mobile, email, regdate } = user;
      const formattedDate = new Date(regdate).toLocaleDateString("en-CA");
      acc.push([name, mobile, email, formattedDate].join(","));
      return acc;
    }, []);

    if (dataCsv.length === 0) {
      alert("No data available for export.");
      return;
    }

    downloadFile({
      data: [...headers, ...dataCsv].join("\n"),
      fileName: "users.csv",
      fileType: "text/csv",
    });
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);

    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportPDF = () => {
    if (filteredData.length === 0) {
      alert("No data available for export.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("User Data Report", 20, 10);

    const headers = ["Name", "Mobile", "Email", "RegDate"];
    const tableData = filteredData.map((item) => [
      item.name,
      item.mobile,
      item.email,
      item.regdate,
    ]);

    doc.autoTable({
      startY: 20,
      head: [headers],
      body: tableData,
    });

    doc.save("users_report.pdf");
  };

  return (
    <div className="flex justify-between m-10 min-h-[100dvh] ">
      <div className="">
        <div className="flex gap-10 mb-20">
          <div className="flex flex-col gap-2">
            <label htmlFor="">To Date</label>
            <input
              type="date"
              name="to"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">From Date</label>
            <input
              type="date"
              name="from"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <button onClick={filterDate} className="w-20 h-10 mt-7">
            Filter
          </button>
        </div>

        {error && <div className="text-red-500 mb-5">{error}</div>}

        <div className=" flex gap-10">
          <div className="showexport w-fit">
            <button className="!bg-green-600 px-10 h-10  w-full  ">Export Data</button>
            <div className=" setshow border border-gray-400 flex justify-center items-center gap-20 p-5   rounded-2xl shadow-2xl shadow-gray-500">
              <button className="w-20 h-10 " onClick={exportPDF}>
                PDF
              </button>
              <button className="w-20 h-10 " onClick={exportCSV}>
                CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    <div className="rounded-2xl ">
      <table className="h-fit w-[40vw]  ">
        <thead>
          <tr className="">
            <th className="px-2 py-1 border-b text-center">Name</th>
            <th className="px-2 py-1 border-b text-center">Mobile</th>
            <th className="px-2 py-1 border-b text-center">Email</th>
            <th className="px-2 py-1 border-b text-center">RegDate</th>
          </tr>
        </thead>
        <tbody className="">
          {filteredData.map((product, key) => {
            return (
              <tr key={key}>
                <td className="px-2 py-1 border-b text-center">
                  {product.name}
                </td>
                <td className="px-2 py-1 border-b text-center">
                  {product.mobile}
                </td>
                <td className="px-2 py-1 border-b text-center">
                  {product.email}
                </td>
                <td className="px-2 py-1 border-b text-center">
                  {product.regdate}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Filter;
