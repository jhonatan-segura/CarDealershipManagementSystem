import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById } from "../api/apiConnection";
import { useEffect, useState } from "react";
import type { ImageDataWithId, VehicleReceived } from "../types/Types";
import Modal from "../components/Modal";
import { formatNumberWithDots } from "../utilities/formatNumberWithDots";

const VehicleDetail = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const currentYear = new Date().getFullYear();
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState<string>();
  const [brand, setBrand] = useState<string>();
  const [modelLine, setModelLine] = useState<string>();
  const [yearReleased, setYearReleased] = useState(currentYear);
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [observation, setObservation] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState([""]);
  const [leftButtonText, setLeftButtonText] = useState("");
  const [rightButtonText, setRightButtonText] = useState("");
  const [counterPosition, setCounterPosition] = useState<"left" | "right">(
    "left"
  );
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const [imagesToDisplay, setImagesToDisplay] = useState<ImageDataWithId[]>([]);

  useEffect(() => {
    if (vehicleId) {
      fetchVehicle(vehicleId);
    }
  }, []);

  const fetchVehicle = async (id: string) => {
    try {
      const data: VehicleReceived = await getVehicleById(id);
      setPlate(data.plate);
      setColor(data.color.name);
      setBrand(data.modelLine.brand.name);
      setModelLine(data.modelLine.name);
      setMileage(formatNumberWithDots(data.mileage.toString()));
      setYearReleased(data.yearReleased);
      setCost(formatNumberWithDots(data.cost.toString()));
      setObservation(data.observations[data.observations.length - 1].text);
      setStatus(data.status.name);

      const fullImgSrc: ImageDataWithId[] = data.images.map(i => {
        return {
          id: i.id.toString(),
          imageData: `data:${i.contentType};base64,${i.imageData}`,
        };
      });

      setImagesToDisplay(fullImgSrc);
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
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
        {/* <div className="input-group w-25 mb-3">
          <span className="input-group-text bg-white">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Buscar..."
            className="form-control"
            onChange={e => handleSearch(e.target.value)}
          />
        </div> */}
      </header>

      <div className="row align-items-center">
        <div className="col-md-6">
          <div
            id="vehicleCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {imagesToDisplay.map((i, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={i.imageData}
                    className="d-block w-100"
                    alt={`Slide ${index}`}
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#vehicleCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#vehicleCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="d-flex justify-content-between mb-4"
            style={{ marginRight: "20px" }}
          >
            <h1 className="display-5">
              {brand} {modelLine} {color} {yearReleased}
            </h1>
            <h1 className="display-5">{status}</h1>
          </div>
          <h1 className="display-5">${cost}</h1>
          <h2 className="display-6 mt-3">Especificaciones</h2>
          <p className="lead mt-3 mb-0">{mileage} km</p>
          <p className="lead mb-0">Placa {plate}</p>
          <h2 className="display-6 mt-3">Descripción</h2>
          <p className="lead mb-0">{observation}</p>
          <button onClick={() => navigate(`/purchase/${vehicleId}`)}>
            Comprar
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAction={() => fetchVehicle("")}
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

export default VehicleDetail;
