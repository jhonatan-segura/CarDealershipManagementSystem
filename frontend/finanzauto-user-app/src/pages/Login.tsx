import { useRef, useState } from "react";
import api from "../api/apiConnection";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState([""]);
  const [leftButtonText, setLeftButtonText] = useState("");
  const [rightButtonText] = useState("");
  const [counterPosition] = useState<"left" | "right">(
    "left"
  );
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const formRef = useRef<HTMLFormElement>(null);
  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = formRef.current;

    if (passwordError) {
      setPasswordError("Formato inválido. Usa 3 letras y 3 números (ABC123)");
      return;
    }

    if (form && form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await api.post("/users/login", { email, password });
      const userData = {
        name: response.data.name,
        email: response.data.email,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
      if (response.status === 401) {
        setShowModal(true);
        setTitle("¡Aviso!");
        setBodyText(["Usuario o contraseña incorrectos"]);
        setLeftButtonText("Ok");
        setResultType("error");
      }
      navigate("/");
    } catch (error: any) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error", error.response.data.toString()]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const onClose = async () => {

  }

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
          <div className="card p-4 w-100" style={{ maxWidth: "400px" }}>
            <h3 className="mb-3">Iniciar sesión</h3>
            <form
              ref={formRef}
              className={`container mt-4 row g-3 needs-validation ${
                validated ? "was-validated" : ""
              }`}
              noValidate
              onSubmit={handleLogin}
            >
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control ${
                    passwordError ? "is-invalid" : "is-valid"
                  }`}
                  placeholder="Contraseña"
                  minLength={8}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  {"La contraseña debe tener mínimo 8 carácteres."}
                </div>
              </div>
              <div className="d-grid gap-2">
                <button onClick={handleLogin} className="btn btn-primary">
                  Continuar
                </button>
                <button type="submit" className="btn btn-outline-secondary">
                  Registrarme ahora
                </button>
              </div>
            </form>
          </div>
        </div>
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
}
