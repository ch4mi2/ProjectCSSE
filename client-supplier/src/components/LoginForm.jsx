import { useNavigate } from "react-router-dom";
import { useContext , useState} from "react";
import SupplierContext from "../context/SupplierContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setSupplier } = useContext(SupplierContext);
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSupplier(username);
    navigateToDashboard();
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-[#f4ca40] to-white p-8 rounded shadow-lg w-1/2 h-96">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Power-Up Build</h1>
        <form className="mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="block m-2 p-2 rounded-lg"
            placeholder="ABC"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="block m-2 p-2 rounded-lg"
            placeholder=""
          />
          <button
            type="submit"
            className="block bg-[#f4ca40] text-black py-2 px-4 rounded-lg mx-auto shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
