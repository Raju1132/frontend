
import axios from "axios";
import { useEffect, useState } from "react";

function CreateCustomer() {
  const [formData, setFormData] = useState({
    cust_id: "",
    dealer_code: "",
    oem_id: "",
    cust_gst: "",
    cust_cin_no: "",
    cust_loyalty_id: "",
    cust_addhaar_no: "",
    cust_pan_no: "",
    cust_legal_name: "",
    cust_name: "",
    cust_primary_mobile: "",
    cust_secondary_mobile: "",
    cust_email: "",
    cust_gender: "",
    cust_dob: "",
    cust_marital_status: "",
    cust_anniversary_date: "",
    cust_present_address: "",
    cust_permanent_address: "",
    cust_office_address: "",
    cust_nationality: "",
    cust_state: "",
    cust_district: "",
    cust_city: "",
    pincode: "",
    created_by: "",
  });
  const [refresh, setRefresh] = useState(true);
  const [customerdata, setCustomerData] = useState([]);
  const [nav, setNav] = useState(true);
  const [loading, setLoading] = useState(false); // To manage loading state

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/customers")
      .then((res) => {
        setCustomerData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [nav, refresh]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/customers", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setRefresh(!refresh); // Refresh data after submitting
      })
      .catch((error) => {
        console.error("error!", error);
      });
  };

  const deleteCustomer = (id) => {
    setLoading(true); // Show loading indicator while deleting
    axios
      .delete(`http://localhost:8080/customers/${id}`)
      .then(() => {
        setRefresh(!refresh); // Refresh data after deletion
      })
      .catch((error) => {
        console.error("Failed to delete customer:", error);
      })
      .finally(() => {
        setLoading(false); // Hide loading indicator after deletion
      });
  };

  return (
    <>
      <div className="flex w-full justify-evenly my-10">
        <button onClick={() => setNav(true)}>Create Customer</button>
        <button onClick={() => setNav(false)}>See Customers</button>
      </div>

      {nav ? (
        
         
          <form
          onSubmit={handleSubmit}
          className=" flex flex-col justify-center items-center  h-fit "
        >
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <div className=" flex gap-2 justify-between">
                <label>Customer ID:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_id"
                  value={formData.cust_id}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Dealer Code:</label>
                <input
                  type="text"
                  className="p-1 rounded"
                  name="dealer_code"
                  value={formData.dealer_code}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>OEM ID:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="oem_id"
                  value={formData.oem_id}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-2 justify-between">
                <label>GST:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_gst"
                  value={formData.cust_gst}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>CIN No:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_cin_no"
                  value={formData.cust_cin_no}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Loyalty ID:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_loyalty_id"
                  value={formData.cust_loyalty_id}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Aadhaar No:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_addhaar_no"
                  value={formData.cust_addhaar_no}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>PAN No:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_pan_no"
                  value={formData.cust_pan_no}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Legal Name:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_legal_name"
                  value={formData.cust_legal_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Name:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_name"
                  value={formData.cust_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Primary Mobile:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_primary_mobile"
                  value={formData.cust_primary_mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Secondary Mobile:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_secondary_mobile"
                  value={formData.cust_secondary_mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Email:</label>
                <input
                  className="p-1 rounded"
                  type="email"
                  name="cust_email"
                  value={formData.cust_email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-between">
                <label>Gender:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_gender"
                  value={formData.cust_gender}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>DOB:</label>
                <input
                  className="p-1 rounded"
                  type="date"
                  name="cust_dob"
                  value={formData.cust_dob}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Marital Status:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_marital_status"
                  value={formData.cust_marital_status}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Anniversary Date:</label>
                <input
                  className="p-1 rounded"
                  type="date"
                  name="cust_anniversary_date"
                  value={formData.cust_anniversary_date}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Present Address:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_present_address"
                  value={formData.cust_present_address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Permanent Address:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_permanent_address"
                  value={formData.cust_permanent_address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Office Address:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_office_address"
                  value={formData.cust_office_address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Nationality:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_nationality"
                  value={formData.cust_nationality}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>State:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_state"
                  value={formData.cust_state}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>District:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_district"
                  value={formData.cust_district}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>City:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="cust_city"
                  value={formData.cust_city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Pincode:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <label>Created By:</label>
                <input
                  className="p-1 rounded"
                  type="text"
                  name="created_by"
                  value={formData.created_by}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div></div>
          </div>

          <button type="submit" className=" mt-10 px-2 py-1 rounded w-46">
            Submit
          </button>
        </form>
     
      ) : (
        <div>
          {loading ? (
            <p>Loading...</p> // Display loading message or spinner
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-900">
                  <th>Actions</th> 
                  {Object.keys(customerdata[0] || {}).map((val, key) => (
                    <th key={key} className="px-2 py-1 border-b text-center">
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerdata.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td>
                      <button onClick={() => deleteCustomer(row.cust_id)}>Delete</button>
                    </td>
                    {Object.values(row).map((val, key) => (
                      <td key={key} className="px-4 py-2 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}

export default CreateCustomer;
