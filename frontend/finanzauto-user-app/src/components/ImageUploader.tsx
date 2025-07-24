import React, { useRef, useEffect } from "react";
import type { ImageDataWithId } from "../types/Types";

interface ImageUploaderProps {
  onImagesSelected: (images: File[]) => void;
  imagesToDisplay: ImageDataWithId[];
  onRemoveImage: (id: string, index: number) => Promise<void>;
}

const MAX_IMAGES = 10;

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesSelected,
  imagesToDisplay,
  onRemoveImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  useEffect(() => {
    if (thumbnailRefs.current[activeIndex]) {
      thumbnailRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const handleFiles = (files: FileList) => {
    const selectedFiles = Array.from(files);
    const validFiles = selectedFiles.filter(file =>
      allowedTypes.includes(file.type)
    );

    if (imagesToDisplay.length + validFiles.length > MAX_IMAGES) {
      return;
    }

    onImagesSelected(validFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {imagesToDisplay.length > 0 && (
        <div className="text-center mb-3 position-relative">
          <button
            className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
            onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))}
            disabled={activeIndex === 0}
            style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
          >
            <i className="bi bi-chevron-left fs-4"></i>
          </button>

          <img
            src={imagesToDisplay[activeIndex].imageData}
            alt={`Preview ${activeIndex}`}
            className="img-fluid rounded"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />

          <button
            className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
            onClick={() =>
              setActiveIndex(prev =>
                Math.min(prev + 1, imagesToDisplay.length - 1)
              )
            }
            disabled={activeIndex === imagesToDisplay.length - 1}
            style={{
              opacity: activeIndex === imagesToDisplay.length - 1 ? 0.3 : 1,
            }}
          >
            <i className="bi bi-chevron-right fs-4"></i>
          </button>
        </div>
      )}

      <div className="d-flex overflow-auto gap-3 mb-3 pb-2">
        {imagesToDisplay.map((i, index) => (
          <div
            key={index}
            ref={el => {
              thumbnailRefs.current[index] = el;
            }}
            className={`position-relative border rounded p-1 ${
              index === activeIndex ? "border-primary border-2" : ""
            }`}
            style={{ minWidth: "100px", cursor: "pointer" }}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={i.imageData}
              alt={`Miniatura ${index}`}
              className="img-fluid"
              style={{ height: "80px", width: "100px", objectFit: "cover" }}
            />
            <button
              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
              onClick={e => {
                e.stopPropagation();
                if (i.id) onRemoveImage(i.id, index);
                if (index === activeIndex) setActiveIndex(0);
                else if (index < activeIndex) setActiveIndex(i => i - 1);
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        ))}

        {imagesToDisplay.length < MAX_IMAGES && (
          <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            className="d-flex flex-column align-items-center justify-content-center text-center border border-dashed rounded p-3"
            style={{
              minWidth: "100px",
              height: "80px",
              backgroundColor: "#f8f9fa",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: "none" }}
              multiple
            />
            <i className="bi bi-plus-lg fs-4 text-primary"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
