import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConnection";
import Modal from "../components/Modal";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState([""]);
  const [leftButtonText, setLeftButtonText] = useState("");
  const [rightButtonText] = useState("");
  const [counterPosition] = useState<"left" | "right">(
    "left"
  );
  const [resultType, setResultType] = useState<"success" | "error">("success");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/users/register", form);
      navigate("/");
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const onClose = async () => {};

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-7 p-0 position-relative">
          <img
            src="/images/car dealership.jpg"
            alt="Ford Dealer"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.36)" }}
          ></div>

          <img
            src="/images/finanzauto_logo.png"
            alt="Logo"
            className="position-absolute"
            style={{
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "60%",
              height: "auto",
            }}
          />
        </div>

        <div className="col-md-5 d-flex align-items-center justify-content-center bg-light">
          <div className="card p-4" style={{ width: "400px" }}>
            <h3 className="mb-3">Registrar</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre(s)</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido(s)</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Dirección de correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Continuar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
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
}

export default Register;
