import React, { useRef, useState } from "react";

interface PopupBuscarProps {
  show: boolean;
  onClose: () => void;
  onSearch: (plate: string) => void;
}

const ModalSearch: React.FC<PopupBuscarProps> = ({
  show,
  onClose,
  onSearch,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [validated, setValidated] = useState(false);
  const [plate, setPlate] = React.useState("");
  const [plateError, setPlateError] = useState("");

  if (!show) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setValidated(true);
    if (!plate || plateError) {
      setPlateError("Formato inválido. Usa 3 letras y 3 números (ABC123)");
      return;
    }

    const form = formRef.current;
    if (form && form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    onSearch(plate);
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setPlate(value);

    const fullPattern = /^[A-Z]{3}\d{3}$/;

    if (!fullPattern.test(value)) {
      setPlateError("Formato requerido (ABC123)");
    } else {
      setPlateError("");
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "300px" }}>
        <h4 className="text-center mb-4">Buscar</h4>
        <form
          ref={formRef}
          className={`container mt-4 row g-3 needs-validation ${
            validated ? "was-validated" : ""
          }`}
          noValidate
          onSubmit={handleSubmit}
        >
          <label htmlFor="plate" className="form-label">
            Digite una placa
          </label>
          <input
            type="text"
            id="plate"
            className={`form-control ${
              validated ? (plateError ? "is-invalid" : "is-valid") : ""
            }`}
            placeholder="ABC123"
            value={plate}
            onChange={handlePlateChange}
            required
          />
          <div className="invalid-feedback">
            {plateError ||
              "Formato inválido. Usa 3 letras y 3 números (ABC123)"}
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-danger w-50 me-2" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary w-50">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSearch;
