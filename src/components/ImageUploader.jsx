import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'lucide-react';
import clsx from 'clsx';

const ImageUploader = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      readImage(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      readImage(file);
    }
  };

  const readImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => onImageUpload(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col items-center justify-center w-full max-w-2xl h-64 win95-inset transition-all cursor-pointer",
        isDragging 
          ? "bg-[#000080] text-white" 
          : "bg-white text-black",
        "mx-auto my-8 p-8 text-center"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className={`p-4 mb-4 ${isDragging ? 'text-white' : 'text-black'}`}>
        <Upload className={clsx("w-12 h-12", isDragging && "animate-bounce")} />
      </div>
      
      <h3 className="text-sm md:text-base mb-2 font-bold font-sans">
        DRAG & DROP IMAGE
      </h3>
      <p className="text-xs font-sans tracking-widest">
        OR CLICK TO BROWSE
      </p>
    </div>
  );

};

ImageUploader.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUploader;
