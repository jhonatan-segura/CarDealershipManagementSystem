import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { purchaseVehicle } from "../api/apiConnection";
import Modal from "../components/Modal";

const Purchase: React.FC = () => {
  const { vehicleId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState([""]);
  const [leftButtonText, setLeftButtonText] = useState("");
  const [rightButtonText, setRightButtonText] = useState("");
  const [counterPosition, setCounterPosition] = useState<"left" | "right">(
    "left"
  );
  const [resultType, setResultType] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (vehicleId) {
        const data = await purchaseVehicle(vehicleId);
        setShowModal(true);
        setTitle("Ok");
        setBodyText([data.message]);
        setLeftButtonText("Ok");
        setResultType("error");
      }
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const onClose = async () => {

  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Estás a 1 paso</h1>

      <div
        className="p-4 bg-light rounded mx-auto"
        style={{
          maxWidth: "700px",
          border: "1px solid #ccc",
        }}
      >
        <h4 className="mb-4">Por favor digita tus datos</h4>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label text-start w-100">
                Nombre Completo
              </label>
              <input type="text" className="form-control" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-start w-100">Cédula</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-start w-100">Celular</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label text-start w-100">Email</label>
              <input type="email" className="form-control" required />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn text-white px-5 py-2"
              style={{
                backgroundColor: "#7B4EFF",
                borderRadius: "12px",
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            >
              Lo quiero
            </button>
          </div>
        </form>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAction={() => onClose()}
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

export default Purchase;
