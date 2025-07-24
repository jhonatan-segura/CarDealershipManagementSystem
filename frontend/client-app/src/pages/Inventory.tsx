import { useEffect, useState } from "react";
import { getVehiclesForSale, searchVehicleByText } from "../api/apiConnection";
import type { VehicleReceived } from "../types/Types";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { formatNumberWithDots } from "../utilities/formatNumberWithDots";

const Inventory = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<VehicleReceived[]>();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState([""]);
  const [leftButtonText, setLeftButtonText] = useState("");
  const [rightButtonText, setRightButtonText] = useState("");
  const [counterPosition, setCounterPosition] = useState<"left" | "right">(
    "left"
  );
  const [resultType, setResultType] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data: VehicleReceived[] = await getVehiclesForSale();
      setVehicles(data);
    } catch (error) {
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
        fetchVehicles();
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

  const handleVehicleInspection = (id: string) => {
    navigate(`/vehicle/${id}`);
  };

  return (
    <div className="container-fluid p-0 vh-100">
      <header className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
        <div>
          <img
            src="/images/finanzauto_logo.png"
            alt="Finanzauto Logo"
            style={{ height: "50px" }}
          />
        </div>
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
      </header>

      <main className="container my-5">
        <div className="row justify-content-center">
          {vehicles?.map(v => (
            <div className="col-md-4 mb-4" key={v.id}>
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => handleVehicleInspection(v.id)}
              >
                <img
                  src={`data:${v.images[0].contentType};base64,${v.images[0].imageData}`}
                  className="card-img-top"
                  alt={v.images[0].fileName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    ${formatNumberWithDots(v.cost.toString())}
                  </h5>
                  <p className="card-text mb-0">
                    {v.modelLine.brand.name} {v.modelLine.name} {v.color.name}{" "}
                    {v.yearReleased}
                  </p>
                  <p className="card-text mb-0">
                    {formatNumberWithDots(v.mileage.toString())} km
                  </p>
                  <p className="card-text">Placa: {v.plate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAction={() => fetchVehicles()}
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
