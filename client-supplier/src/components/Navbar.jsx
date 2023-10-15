import { useContext } from "react";
import SupplierContext from "../context/SupplierContext";

const Navbar = () => {
    const {supplier} = useContext(SupplierContext);
    return (
      <nav className="bg-[#f4ca40] p-4">
        <div className="flex items-center">
          <div className="text-white text-xl font-semibold">{supplier}</div>
          <div className="ml-4">
            <img
              src="https://placekitten.com/40/40" // Replace with your avatar image URL
              alt="Avatar"
              className="rounded-full h-10 w-10"
            />
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  