import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { deleteVehicleById, getVehicles, searchVehicleByText } from "../api/apiConnection";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import type { VehicleReceived } from "../types/Types";

const Inventory = () => {
  const [vehicles, setVehicles] = useState<VehicleReceived[]>();
  const [showModal, setShowModal] = useState(false);
  const [idItemToDelete, setIdItemToDelete] = useState<string>("");
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState([""]);
  const [leftButtonText, setLeftButtonText] = useState("");
  const [rightButtonText, setRightButtonText] = useState("");
  const [counterPosition, setCounterPosition] = useState<"left" | "right">(
    "left"
  );
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  useEffect(() => {
    getAllVehicles();
  }, []);

  const getAllVehicles = async () => {
    try {
      const data: VehicleReceived[] = await getVehicles();
      setVehicles(data);
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVehicleById(id);
      setVehicles(prev =>
        prev && vehicles ? vehicles.filter(v => v.id !== id) : []
      );
      setShowModal(false);
    } catch (err) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const updateKeywordDebounced = (() => {
    let timer: ReturnType<typeof setTimeout>;

    return (text: string) => {
      clearTimeout(timer);

      if (text === "") {
        getAllVehicles();
        return;
      }

      timer = setTimeout(async () => {
        try {
          const data = await searchVehicleByText(text);
          setVehicles(data);
        } catch (err) {
          setShowModal(true);
          setTitle("¡Aviso!");
          setBodyText(["Ha ocurrido un error"]);
          setLeftButtonText("Ok");
          setResultType("error");
        }
      }, 600);
    };
  })();

  const handleSearch = (text: string) => {
    updateKeywordDebounced(text);
  };

  const showDeleteModal = (id: string) => {
    setShowModal(true);
    setIdItemToDelete(id);
    setTitle("¡Aviso!");
    setBodyText([
      "¿Está seguro de borrar el vehículo?",
      "Esta acción no se puede reversar",
    ]);
    setLeftButtonText("Cancelar");
    setRightButtonText("Borrar");
    setCounterPosition("right");
    setResultType("success");
  };

  const redirectToEditView = (id: string) => {
    navigate(`/edit-vehicle/${id}`);
  };

  return (
    <div className="container vh-100 align-items-center justify-content-center p-5">
      <div className="d-flex flex-row gap-4 my-5 justify-content-between">
        <h3>Inventario</h3>
        <div className="input-group w-25 mb-3">
          <span className="input-group-text bg-white">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="form-control"
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive" style={{ maxHeight: "500px" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Placa</th>
              <th scope="col">Color</th>
              <th scope="col">Marca</th>
              <th scope="col">Linea</th>
              <th scope="col">Año</th>
              <th scope="col">Km</th>
              <th scope="col">Valor</th>
              <th scope="col">Observaciones</th>
              <th scope="col">Estado</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {vehicles?.map(v => (
              <tr key={v.plate}>
                <th scope="row">{v.plate}</th>
                <td>{v.color.name}</td>
                <td>{v.modelLine.brand.name}</td>
                <td>{v.modelLine.name}</td>
                <td>{v.yearReleased}</td>
                <td>{v.mileage}</td>
                <td>{v.cost}</td>
                <td>{v.observations[v.observations.length - 1].text}</td>
                <td>{v.status.name}</td>
                <td>
                  {v.status.name !== "Vendido" && (
                    <i
                      onClick={() => redirectToEditView(v.id)}
                      className="bi bi-pencil text-primary-emphasis"
                      style={{cursor: "pointer"}}
                    ></i>
                  )}
                </td>
                <td>
                  <i
                    onClick={() => showDeleteModal(v.id)}
                    style={{cursor: "pointer"}}
                    className="bi bi-trash text-danger"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAction={() => handleDelete(idItemToDelete)}
        title={title}
        bodyText={bodyText}
        leftButtonText={leftButtonText}
        rightButtonText={rightButtonText}
        counterPosition={counterPosition}
        resultType={resultType}
      />
    </div>
  );
};

export default Inventory;
