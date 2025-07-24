import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onAction: () => Promise<void>;
  title: string;
  bodyText: string[];
  leftButtonText: string;
  rightButtonText: string;
  counterPosition: "left" | "right";
  resultType: "success" | "error";
}

const Modal: React.FC<DeleteModalProps> = ({
  show,
  onClose,
  onAction,
  title,
  bodyText,
  leftButtonText,
  rightButtonText,
  counterPosition,
  resultType,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (!show) return;

    setSecondsLeft(10);
    setEnable(false);

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setEnable(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-body">
            <h3 className="fw-bold">{title}</h3>
            {bodyText.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <div className="d-flex justify-content-center gap-3 mt-3">
              {resultType === "success" ? (
                <>
                  <button
                    className="btn btn-success px-4"
                    onClick={onClose}
                    disabled={counterPosition === "left" ? !enable : false}
                  >
                    {leftButtonText}
                    {counterPosition === "left" &&
                      !enable &&
                      ` (${secondsLeft} secs)`}
                  </button>
                  <button
                    className="btn btn-danger px-4"
                    onClick={onAction}
                    disabled={counterPosition === "right" ? !enable : false}
                  >
                    {rightButtonText}
                    {counterPosition === "right" &&
                      !enable &&
                      ` (${secondsLeft} secs)`}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary px-4"
                    onClick={onClose}
                  >
                    {leftButtonText}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
