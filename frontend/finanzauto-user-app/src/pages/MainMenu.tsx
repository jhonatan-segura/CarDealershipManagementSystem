import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import ModalSearch from "../components/ModalSearch";
import { searchVehicleByPlate } from "../api/apiConnection";
import Modal from "../components/Modal";

const MainMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState([""]);
    const [leftButtonText, setLeftButtonText] = useState("");
    const [rightButtonText] = useState("");
    const [counterPosition] = useState<"left" | "right">(
      "left"
    );
    const [resultType, setResultType] = useState<"success" | "error">(
      "success"
    );

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }
  }, []);

  const capitalizeText = (text: string) => {
    let words = text.split(" ");
    let phrase = words.map(w => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    });
    return phrase.join(" ");
  };

  const handleSearch = async (plate: string) => {
    try {
      const data = await searchVehicleByPlate(plate);
      navigate(`/edit-vehicle/${data.id}`)
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const onClose = async () => {

  }

  return (
    <div className="container vh-100 d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-center mb-5">
        Hola, {user && capitalizeText(user.name)}
      </h2>
      <h3 className="text-center mb-5">Opciones disponibles</h3>
      <div className="row justify-content-center gap-4">
        <div
          className="card text-center shadow p-4 cursor-pointer"
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => navigate("/inventory")}
        >
          <i className="bi bi-eye fs-1 mb-3 text-primary"></i>
          <h5 className="card-title">Ver Inventario</h5>
        </div>
        <div
          className="card text-center shadow p-4"
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => navigate("/create-vehicle")}
        >
          <i className="bi bi-journal-plus fs-1 mb-3 text-success"></i>
          <h5 className="card-title">Cargar Vehículo</h5>
        </div>
        <div
          className="card text-center shadow p-4"
          style={{ width: "250px", cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-pencil-square fs-1 mb-3 text-warning"></i>
          <h5 className="card-title">Editar Vehículo</h5>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        onAction={() => onClose()}
        title={title}
        bodyText={bodyText}
        leftButtonText={leftButtonText}
        rightButtonText={rightButtonText}
        counterPosition={counterPosition}
        resultType={resultType}
      />
      <ModalSearch
        show={showModal}
        onClose={() => setShowModal(false)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default MainMenu;
