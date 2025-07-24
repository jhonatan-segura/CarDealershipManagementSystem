import { useEffect, useRef, useState } from "react";
import {
  deleteImageById,
  getBrands,
  getColors,
  getModelLines,
  getVehicleById,
  registerVehicle,
  updateVehicleById,
  uploadMultipleImages,
} from "../api/apiConnection";
import type {
  Brand,
  Color,
  ImageDataWithId,
  ModelLine,
  VehicleBodyRequest,
  VehicleReceived,
} from "../types/Types";
import Modal from "../components/Modal";
import ImageUploader from "../components/ImageUploader";
import { useNavigate, useParams } from "react-router-dom";
import ModalVehicleStatus from "../components/ModalVehicleStatus";

interface Props {
  mode: "create" | "edit";
}

const VehicleRegistrationModification: React.FC<Props> = ({ mode }) => {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const currentYear = new Date().getFullYear();
  const [allowedColors, setAllowedColors] = useState<Color[]>();
  const [allowedBrands, setAllowedBrands] = useState<Brand[]>();
  const [allowedModelLines, setAllowedModelLines] = useState<ModelLine[]>();
  const [plate, setPlate] = useState("");
  const [colorId, setColorId] = useState<number>(0);
  const [brandId, setBrandId] = useState<string>();
  const [modelLineId, setModelLineId] = useState<number>(0);
  const [yearReleased, setYearReleased] = useState(currentYear);
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [observaton, setObservation] = useState("");
  const [statusId, setStatusId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalVehicleStatus, setShowModalVehicleStatus] =
    useState<boolean>(false);
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => currentYear - i
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [validated, setValidated] = useState(false);
  const [plateError, setPlateError] = useState("");
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState([""]);
  const [leftButtonText, setLeftButtonText] = useState("");
  const [rightButtonText, setRightButtonText] = useState("");
  const [counterPosition, setCounterPosition] = useState<"left" | "right">(
    "left"
  );
  const [resultType, setResultType] = useState<"success" | "error">("success");
  const [imageIds, setImageIds] = useState<number[]>([]);
  const [imagesToDisplay, setImagesToDisplay] = useState<ImageDataWithId[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
    }

    fetchColors();
    fetchBrands();
    fetchModelLinesByBrand("1");
    if (mode === "edit") {
      if (vehicleId) {
        fetchVehicleData(vehicleId);
      }
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = formRef.current;

    if (!plate || plateError) {
      setPlateError("Formato inválido. Usa 3 letras y 3 números (ABC123)");
      return;
    }

    if (form && form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (mode === "create") {
      handleSave();
    } else {
      setShowModalVehicleStatus(true);
    }

    setValidated(true);
  };

  const fetchVehicleData = async (id: string) => {
    try {
      const data: VehicleReceived = await getVehicleById(id);
      setPlate(data.plate);
      setColorId(data.color.id);
      setBrandId(data.modelLine.brandId);
      setModelLineId(data.modelLine.id);
      setMileage(data.mileage.toString());
      setYearReleased(data.yearReleased);
      setCost(data.cost.toString());
      setObservation(data.observations[0].text);
      setStatusId(data.status.id);

      const fullImgSrc: ImageDataWithId[] = data.images.map(i => {
        return {
          id: i.id.toString(),
          imageData: `data:${i.contentType};base64,${i.imageData}`,
        };
      });

      const imageIds: number[] = data.images.map(i => i.id);

      fetchModelLinesByBrand(data.modelLine.brandId);

      setImagesToDisplay(fullImgSrc);
      setImageIds(imageIds);
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const fetchColors = async () => {
    try {
      const data = await getColors();
      setAllowedColors(data);
      setColorId(data[0].id);
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await getBrands();
      setAllowedBrands(data);
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const fetchModelLinesByBrand = async (id: string) => {
    try {
      const data = await getModelLines(id);
      setAllowedModelLines(data);
      if (mode === "create") setModelLineId(data[0].id);
    } catch (error) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const clearPage = () => {
    setPlate("");
    setColorId(1);
    setModelLineId(1);
    setYearReleased(currentYear);
    setMileage("");
    setCost("");
    setObservation("");
    setImageIds([]);
    setImagesToDisplay([]);
  };

  const handleSave = async () => {
    let bodyRequest: VehicleBodyRequest = {
      plate: plate,
      colorId: colorId,
      modelLineId: modelLineId,
      yearReleased: yearReleased,
      mileage: parseFloat(mileage),
      cost: parseFloat(cost),
      observation: observaton,
      imageIds: imageIds,
      statusId: "1",
    };

    try {
      await registerVehicle(bodyRequest);
      setShowModal(true);
      setTitle("Ok");
      setBodyText(["Vehículo creado correctamente"]);
      setLeftButtonText("Cerrar");
      setRightButtonText("Enviar a reparación");
      setCounterPosition("left");
      setResultType("success");
      clearPage();
    } catch (error: any) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText([error.response.data.message]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const handleUpdate = async () => {
    let bodyRequest: VehicleBodyRequest = {
      plate: plate,
      colorId: colorId,
      modelLineId: modelLineId,
      yearReleased: yearReleased,
      mileage: parseFloat(mileage),
      cost: parseFloat(cost),
      observation: observaton,
      imageIds: imageIds,
      statusId: statusId,
    };

    try {
      if (vehicleId) await updateVehicleById(vehicleId, bodyRequest);
      setShowModal(true);
      setTitle("Ok");
      setBodyText(["Vehículo creado correctamente"]);
      setLeftButtonText("Cerrar");
      setRightButtonText("Enviar a reparación");
      setCounterPosition("left");
      setResultType("success");
      clearPage();
    } catch (error: any) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText([error.response.data.message]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const handleImagesSelected = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const ids = await uploadMultipleImages(formData); // <- array de ids

      const readFilesAsBase64 = (files: File[]) => {
        const readers = files.map(file => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        });
        return Promise.all(readers);
      };

      const base64Images = await readFilesAsBase64(files); // <- array de base64 strings

      const newImages: ImageDataWithId[] = base64Images.map((imageData, i) => ({
        imageData,
        id: ids[i].toString(),
      }));

      setImageIds(prev => [...prev, ...ids]);

      setImagesToDisplay(prev => [...prev, ...newImages]);
    } catch (err) {
      setShowModal(true);
      setTitle("¡Aviso!");
      setBodyText(["Ha ocurrido un error al subir las imágenes"]);
      setLeftButtonText("Ok");
      setResultType("error");
    }
  };

  const deleteImage = async (id: string, index: number) => {
    if (id !== undefined) {
      try {
        const data = await deleteImageById(id);
        setImageIds(prev => [...prev, ...data]);
      } catch (err) {
        setShowModal(true);
        setTitle("¡Aviso!");
        setBodyText(["Ha ocurrido un error al eliminar las imágenes"]);
        setLeftButtonText("Ok");
        setResultType("error");
      }
    }

    setImagesToDisplay(prev => prev.filter((_, i) => i !== index));
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

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d+(\.\d{0,2})?$/;

    if (value === "") {
      setCost("");
      return;
    }

    if (regex.test(value)) {
      setCost(value);
    }
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d+$/;

    if (value === "") {
      setMileage("");
      return;
    }

    if (regex.test(value)) {
      setMileage(value);
    }
  };

  const handleObservationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setObservation(value);
    }
  };

  const handleStatusChange = (id: string) => {
    setStatusId(id);
  };

  return (
    <div className="vh-100 d-flex flex-row align-items-center justify-content-around gap-4 mx-4">
      <div className="p-4" style={{ width: "700px" }}>
        <h3 className="mb-3">Registrar vehículo</h3>
        <div className="card d-flex flex-column" style={{ width: "700px" }}>
          <form
            ref={formRef}
            className={`container mt-4 row g-3 needs-validation ${
              validated ? "was-validated" : ""
            }`}
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="plate" className="form-label">
                  Placa
                </label>
                <input
                  type="text"
                  id="plate"
                  className={`form-control ${
                    plateError ? "is-invalid" : "is-valid"
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
              </div>
              <div className="col-md-6">
                <label className="form-label">Color</label>
                <select
                  className="form-select"
                  value={colorId}
                  onChange={e => setColorId(parseInt(e.target.value))}
                >
                  {allowedColors?.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Marca</label>
                <select
                  className="form-select"
                  value={brandId}
                  onChange={e => {
                    setBrandId(e.target.value);
                    fetchModelLinesByBrand(e.target.value);
                  }}
                >
                  {allowedBrands?.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Línea</label>
                <select
                  className="form-select"
                  value={modelLineId}
                  onChange={e => setModelLineId(parseInt(e.target.value))}
                >
                  {allowedModelLines?.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Año</label>
                <select
                  className="form-select"
                  value={yearReleased}
                  onChange={e => setYearReleased(parseInt(e.target.value))}
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Km</label>
                <input
                  type="text"
                  className="form-control"
                  value={mileage}
                  onChange={e => handleMileageChange(e)}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Valor</label>
                <input
                  type="text"
                  className="form-control"
                  value={cost}
                  onChange={e => {
                    handleCostChange(e);
                  }}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Observación</label>
                <textarea
                  className="form-control"
                  value={observaton}
                  onChange={handleObservationChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="btn btn-danger w-100"
                >
                  Cancelar
                </button>
              </div>
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary w-100">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="p-4" style={{ width: "700px" }}>
        <h3 className="mb-3">Cargar imágenes</h3>
        <ImageUploader
          onImagesSelected={handleImagesSelected}
          imagesToDisplay={imagesToDisplay}
          onRemoveImage={deleteImage}
        />
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onAction={() => handleSave()}
        title={title}
        bodyText={bodyText}
        leftButtonText={leftButtonText}
        rightButtonText={rightButtonText}
        counterPosition={counterPosition}
        resultType={resultType}
      />
      <ModalVehicleStatus
        show={showModalVehicleStatus}
        onClose={() => setShowModalVehicleStatus(false)}
        onSave={handleUpdate}
        statusId={statusId}
        changeStatus={handleStatusChange}
      />
    </div>
  );
};

export default VehicleRegistrationModification;
