import React, { useRef, useState } from "react";

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ACCEPTED_TYPES = "image/*";
const DEFAULT_PREVIEW_SIZE = 95;

const ImageUpload = ({
  value,
  onChange,
  onReset,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  previewSize = DEFAULT_PREVIEW_SIZE,
}) => {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file) => {
    if (!file) return false;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are accepted.");
      return false;
    }

    if (file.size > maxFileSize) {
      setError(`File size must be under ${maxFileSize / (1024 * 1024)}MB.`);
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onChange(file);
    }
    // Reset input so the same file can be selected again
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      onChange(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="f-col gap-2">
      <div
        className={`flex flex-col items-center justify-center gap-3 p-4 border-2 border-dashed rounded cursor-pointer transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        style={{ width: previewSize + 40, height: previewSize + 40 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Upload profile picture"
      >
        {value ? (
          <img
            src={value}
            alt="Profile preview"
            className="rounded-full object-cover"
            style={{ width: previewSize, height: previewSize }}
          />
        ) : (
          <div className="text-center text-gray-500 text-sm">
            <svg
              className="mx-auto mb-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Upload</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {value && onReset && (
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-red-500 hover:text-red-700 underline self-center"
        >
          Reset to default
        </button>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;
