import axios from "axios";
import Papa from "papaparse";
import { useState } from "react";

function Csv() {
  const [data, setData] = useState([]);
  const [filename, setFilename] = useState("");
  const [selectedColumns, setSelectedColumns] = useState({});

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFilename(file.name);
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        result.data.pop();
        setData(result.data);

        const initialSelection = {};
        Object.keys(result.data[0]).forEach((column) => {
          initialSelection[column] = true; 
        });
        setSelectedColumns(initialSelection);
      },
    });
  };

  const handleColumnChange = (column) => {
    setSelectedColumns((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const handledata = () => {
    if (data.length > 0) {
      
      const headings = Object.keys(selectedColumns).filter(
        (column) => selectedColumns[column]
      );

      const body = data.map((row) => {
        return headings.map((column) => row[column]);
      });

      const cleanFilename = filename.replaceAll(" ", "_").replaceAll(".csv", '');
      const variables = [cleanFilename, headings, body];
      console.log(variables);

      axios.post("http://localhost:8080/csv", variables)
        .then((res) => {
          alert("Data is Uploaded");
        })
        .catch((err) => {
          console.error("Error uploading CSV:", err);
          alert("There was an error uploading the CSV.");
        });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        className="py-2 px-2"
      />
      <div>
        {data.length ? (
          <>
            <button className="my-5" onClick={handledata}>Upload to DB</button>

            <div className="mb-4">
              <h3>Select columns to upload:</h3>
              {Object.keys(data[0]).map((column, index) => (
                <div key={index} className="inline-block mr-4">
                  <input
                    type="checkbox"
                    checked={selectedColumns[column]}
                    onChange={() => handleColumnChange(column)}
                    id={`column-${column}`}
                  />
                  <label htmlFor={`column-${column}`}>{column}</label>
                </div>
              ))}
            </div>

            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-900">
                  {Object.keys(data[0]).map((val, key) => (
                    selectedColumns[val] && (
                      <th key={key} className="px-2 py-1 border-b text-center">
                        {val}
                      </th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b">
                    {Object.keys(row).map((col, key) => (
                      selectedColumns[col] && (
                        <td key={key} className="px-4 py-2 text-center">
                          {row[col]}
                        </td>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Csv;
