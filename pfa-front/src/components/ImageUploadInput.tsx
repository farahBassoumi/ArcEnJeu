// components/ImageUploadInput.tsx
import React from "react";

type ImageUploadInputProps = {
  index: number;
  image: File | null;
  onChange: (index: number, file: File | null) => void;
};

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ index, image, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(index, file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="w-full px-4 py-2 rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[--color-main]"
    />
  );
};

export default ImageUploadInput;
