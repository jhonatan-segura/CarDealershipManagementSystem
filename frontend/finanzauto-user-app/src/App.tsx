import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import Inventory from "./pages/Inventory";
import VehicleRegistrationModification from "./pages/VehicleRegistrationModification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route
          path="/create-vehicle"
          element={
            <VehicleRegistrationModification mode="create" />
          }
        />
        <Route
          path="/edit-vehicle/:vehicleId"
          element={<VehicleRegistrationModification mode="edit"/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
