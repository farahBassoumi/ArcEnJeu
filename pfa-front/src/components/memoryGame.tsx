import React, { useEffect, useState } from "react";
import ImageUploadInput from "./ImageUploadInput";
import ValidateMemoryGame from "./ValidateMemoryGame";

const MemoryGameComponent = ({
  setSelectedGame,
}: {
  setSelectedGame: (game: null) => void;
}) => {
  const [formData, setFormData] = useState({
    numberOfPairs: 0,
    prompt: "Choisissez les deux cartes identiques",
  });
  const [pairImages, setPairImages] = useState<(File | null)[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationStep, setShowValidationStep] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePairsNbr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      numberOfPairs: value,
    }));

    // Reset image array
    setPairImages(new Array(value).fill(null));
  };

  const onImageInputChange = (index: number, file: File | null) => {
    setPairImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  // ✅ Validate the form whenever the dependencies change
  useEffect(() => {
    setShowValidationStep(false);

    const { numberOfPairs, prompt } = formData;

    const imagesAreValid =
      pairImages.length === numberOfPairs &&
      pairImages.every((img) => img !== null);

    const numberValid = numberOfPairs >= 1 && numberOfPairs <= 20;
    const fieldsFilled = prompt.trim() !== "";

    const valid = numberValid && fieldsFilled && imagesAreValid;

    setIsFormValid(valid);

    if (!numberValid) {
      setError("Le nombre de paires doit être compris entre 1 et 20.");
      setSuccess("");
    } else if (!fieldsFilled) {
      setError("Veuillez remplir tous les champs.");
      setSuccess("");
    } else if (!imagesAreValid) {
      setError("Veuillez ajouter toutes les images des paires.");
      setSuccess("");
    } else {
      setError("");
      setSuccess("Le jeu est bien configuré !");
    }
  }, [formData, pairImages]);

  const onsubmit = () => {
    if (isFormValid) {
      console.log("Form is valid, submitting...");
      setShowValidationStep(true);
    }
  };
  const handleBack = () => {
    setSelectedGame(null);
  };

  return (
    <div className="w-full max-w-[600px] py-[30px] px-[50px] mt-[40px] flex flex-col items-center justify-center gap-[30px] border-2 border-(--color-main-between) rounded-[30px] bg-(--color-main-light) shadow text-center">
      <div>
        <h2 className="text-lg text-(--color-gray) font-semibold">
          Création d&apos;un jeu de mémoire
        </h2>
        <p className="text-sm text-(--color-gray) font-light">
          Définissez les cartes, les images ou les mots à associer.
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-[20px]">
        <div className="w-full text-left text-(--color-gray)">
          <label className="block mb-1 ml-[15px] text-xs">
            Nombre de paires
          </label>
          <input
            type="number"
            name="numberOfPairs"
            value={formData.numberOfPairs}
            onChange={handleChangePairsNbr}
            placeholder="Nombre de paires"
            className="w-full px-4 py-2 rounded-[40px] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--color-main)"
            required
          />
        </div>

        <div className="w-full text-left text-(--color-gray)">
          <label className="block mb-1 text-xs ml-[15px]">
            La consigne affichée
          </label>
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[40px] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--color-main)"
          />
        </div>
      </div>

      {/* Only show image upload when there's at least 1 pair */}
      {formData.numberOfPairs > 0 && (
        <ImageUploads
          onChange={onImageInputChange}
          showInputs={true}
          numberOfPairs={formData.numberOfPairs}
          pairImages={pairImages}
        />
      )}

      <div className="w-full flex flex-col text-sm">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
      </div>

      <div className="flex flex-row justify-center gap-[20px] items-center">
        <button
          onClick={handleBack}
          className="text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center bg-(--color-gray) rounded-full text-[16px]"
        >
          Retour
        </button>

        <button
          onClick={onsubmit}
          disabled={!isFormValid}
          className={`text-(--color-beige) px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center rounded-full text-[16px] ${
            isFormValid
              ? "bg-(--color-main) hover:bg-(--color-hover-main)"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Suivant
        </button>
      </div>
      <div>
        {showValidationStep && (
          <div>
            <p className="text-green-600 text-center">
              Vérifiez les images avant de confirmer.
            </p>

            <ValidateMemoryGame
              images={pairImages}
              onBack={() => setSelectedGame(null)}
              onConfirm={onsubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGameComponent;

interface ImageUploadsProps {
  showInputs: boolean;
  numberOfPairs: number;
  pairImages: (File | null)[];
  onChange: (index: number, file: File | null) => void;
}

const ImageUploads: React.FC<ImageUploadsProps> = ({
  showInputs,
  numberOfPairs,
  pairImages,
  onChange,
}) => {
  if (!showInputs || numberOfPairs < 1) return null;

  return (
    <div className="w-full text-(--color-gray)">
      <label className="block mb-1 text-xs ml-[15px]">Images des paires</label>
      <div className="grid grid-cols-1 gap-[10px]">
        {Array.from({ length: numberOfPairs }, (_, index) => (
          <ImageUploadInput
            key={index}
            index={index}
            image={pairImages[index] || null}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};
