import Routes from "./routes/routes";
import SupplierContext from "./context/SupplierContext";
import { useState, useEffect } from "react";

function App() {
  const [supplier, setSupplier] = useState(null);

  // Load the supplier from local storage on component mount
  useEffect(() => {
    console.log("use effect fetch");
    const storedSupplier = localStorage.getItem("supplier");
    console.log(storedSupplier);
    if (storedSupplier) {
      setSupplier(JSON.parse(storedSupplier));
    }
  }, []);
  
  // Save the supplier to local storage whenever it changes
  useEffect(() => {
    console.log("use effect save");
    localStorage.setItem("supplier", JSON.stringify(supplier));
  }, [supplier]);
  

  return (
    <SupplierContext.Provider value={{ supplier, setSupplier }}>
      <Routes />
    </SupplierContext.Provider>
  );
}

export default App;
