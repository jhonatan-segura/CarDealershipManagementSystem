import React, { useEffect, useState } from "react";
import "./ModalVehicleStatus.css"; // Importamos estilos personalizados

interface Status {
  id: string;
  name: string;
  color: string;
}

interface FaseModalProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  statusId: string;
  changeStatus: (id: string) => void;
}

const statuses: Status[] = [
  { id: "1", name: "Disponible", color: "lightgreen" },
  { id: "2", name: "Reparación", color: "khaki" },
  { id: "3", name: "En Vitrina", color: "lightblue" },
  { id: "4", name: "Vendido", color: "#ec7c88ff" },
];

const ModalVehicleStatus: React.FC<FaseModalProps> = ({
  show,
  onClose,
  onSave,
  statusId,
  changeStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    if (show) setSelectedStatus(null);
  }, [show]);

  if (!show) return null;

  const getBackgroundColor = (status: Status) => {
    return selectedStatus === status.name || status.id <= statusId
      ? status.color
      : "#ccc";
  };

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-header">
            <h5 className="modal-title w-100">Seleccione la Fase</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            <div className="chain-container position-relative d-flex align-items-center">
              {statuses.map((s, i) => (
                <div
                  key={s.name}
                  className="circle-item"
                  onClick={() => {
                    if (statusId !== "4") {
                      changeStatus(s.id);
                      setSelectedStatus(s.name);
                    }
                  }}
                  style={{
                    backgroundColor: getBackgroundColor(s),
                    border: "none",
                  }}
                >
                  {s.name}
                  {i < statuses.length - 1 && <div className="line" />}
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-danger mx-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            {statusId !== "4" && (
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={() => {
                  onSave();
                  onClose();
                }}
              >
                Guardar Cambios
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVehicleStatus;
