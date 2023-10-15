import Routes from "./routes/routes";
import SupplierContext from "./context/SupplierContext";
import { useState } from "react";
function App() {
  const [supplier, setSupplier] = useState(null);

  return (
    <SupplierContext.Provider value={{ supplier, setSupplier }}>
      <Routes />
    </SupplierContext.Provider>
  );
}

export default App;
