import React from "react";

interface ValidateMemoryGameProps {
  images: (File | null)[];
  onBack: () => void;
  onConfirm: () => void;
}

const ValidateMemoryGame: React.FC<ValidateMemoryGameProps> = ({
  images,
  onBack,
  onConfirm,
}) => {
  return (
    <div className="w-full max-w-[600px] p-[20px] mt-[40px] flex flex-col items-center gap-[30px] text-center">
      <h2 className="text-lg text-(--color-gray) font-semibold">
        Vérification des images
      </h2>
      <p className="text-sm text-(--color-gray)">
        Veuillez vérifier que toutes les images sont correctes.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {images.map((file, idx) => (
          <div key={idx} className="w-full border rounded-md overflow-hidden">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`Image ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-[100px] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                Aucune image
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-(--color-gray) text-(--color-beige) rounded-full"
        >
          Retour
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-(--color-hover-main) text-white rounded-full"
        >
          Confirmer
        </button>
      </div>
    </div>
  );
};

export default ValidateMemoryGame;
