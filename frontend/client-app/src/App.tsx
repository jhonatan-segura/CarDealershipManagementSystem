import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import VehicleDetail from "./pages/VehicleDetail";
import Purchase from "./pages/Purchase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/vehicle/:vehicleId" element={<VehicleDetail />} />
        <Route path="/purchase/:vehicleId" element={<Purchase />} />
      </Routes>
    </Router>
  );
}

export default App;
