import { Link } from "react-router-dom"

function Nav() {
  return (
   <div className="flex justify-between items-center px-7 py-5">
    <h1>Manthan</h1>
    <ul className=" flex gap-5">
      <li><Link to={"/createcustomer"}>Customer</Link></li>
      <li><Link to={"/invoice"}>Invoice</Link></li>
      <li><Link to={"/csv"}>Csv</Link></li>
      <li><Link to={"/filter"}>Filter</Link></li>
    </ul>
   </div>
  )
}

export default Nav