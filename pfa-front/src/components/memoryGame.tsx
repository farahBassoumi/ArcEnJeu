import React, { useEffect, useState } from "react";
import ValidateMemoryGame from "./ValidateMemoryGame";
import { toast } from "react-toastify";
import { getGames } from "../services/memoryGame.services";
import { MemoryCardsUploads } from "./memoryCardsUploads";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/config";

const DEFAULT_PROMPT = "Choisissez les deux cartes identiques";

const MemoryGameComponent = ({
  setSelectedGame,
}: {
  setSelectedGame: (game: null) => void;
}) => {
  const [formData, setFormData] = useState({
    numberOfPairs: 0,
    prompt: DEFAULT_PROMPT,
  });
  const [pairImages, setPairImages] = useState<(File | null)[]>([]);
  const [showValidationStep, setShowValidationStep] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { t } = useTranslation();

  useEffect(() => {
    getGames();
  }, []);

  // const changeLanguage = (lng: "en" | "fr") => {
  //   console.log(`Changing language to ${lng}`);
  //   i18n.changeLanguage(lng);
  // };

    const onChangeLanguage = () => {
      const newLanguage = i18n.language === "en" ? "fr" : "en";
      console.log(`Changing language to ${newLanguage}`);

    i18n.changeLanguage(newLanguage);
  };


  useEffect(() => {
    const { numberOfPairs, prompt } = formData;

    const imagesAreValid =
      pairImages.length === numberOfPairs && pairImages.every(Boolean);
    const numberValid = numberOfPairs >= 1 && numberOfPairs <= 20;
    const fieldsFilled = prompt.trim() !== "";

    if (!numberValid)
      setMessage({
        type: "error",
        text: "Le nombre de paires doit être compris entre 1 et 20.",
      });
    else if (!fieldsFilled)
      setMessage({ type: "error", text: "Veuillez remplir tous les champs." });
    else if (!imagesAreValid)
      setMessage({
        type: "error",
        text: "Veuillez ajouter toutes les images des paires.",
      });
    else setMessage({ type: "success", text: "Le jeu est bien configuré !" });
  }, [formData, pairImages]);

  const isFormValid = message.type === "success";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePairsNbr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    setFormData((prev) => ({ ...prev, numberOfPairs: value }));
    setPairImages(new Array(value).fill(null));
  };

  const onImageInputChange = (index: number, file: File | null) => {
    setPairImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const onSubmit = () => {
    if (!isFormValid) return;
    toast.success("Ajouté avec succès !");
    setShowValidationStep(true);
  };

  const handleBack = () => setSelectedGame(null);

  return (
    <div className="w-full max-w-[600px] py-8 px-12 mt-10 flex flex-col items-center gap-8 border-2 rounded-[30px] bg-[var(--color-main-light)] shadow text-center">
      <Header />
      <div className="flex gap-2">
        <button onClick={onChangeLanguage}>English</button>
      </div>
      <p className="text-sm text-[var(--color-gray)] font-light">
        {t('welcome')}
      </p>
      <FormInputs
        formData={formData}
        handleChange={handleChange}
        handleChangePairsNbr={handleChangePairsNbr}
      />
      {!showValidationStep ? (
        <>
          {formData.numberOfPairs > 0 && (
            <MemoryCardsUploads
              onChange={onImageInputChange}
              numberOfPairs={formData.numberOfPairs}
              pairImages={pairImages}
            />
          )}

          {message.text && (
            <p
              className={`text-center text-sm ${
                message.type === "error" ? "text-red-500" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <div className="flex gap-5 justify-center">
            <button onClick={handleBack} className="btn-secondary">
              Retour
            </button>
            <button
              onClick={onSubmit}
              disabled={!isFormValid}
              className={`btn-primary ${
                !isFormValid && "opacity-50 cursor-not-allowed"
              }`}
            >
              Suivant
            </button>
          </div>
        </>
      ) : (
        <ValidateMemoryGame
          images={pairImages}
          onBack={() => setShowValidationStep(false)}
          onConfirm={onSubmit}
        />
      )}
    </div>
  );
};

export default MemoryGameComponent;

const Header = () => (
  <div>
    <h2 className="text-lg text-[var(--color-gray)] font-semibold">
      Création d&apos;un jeu de mémoire
    </h2>
    <p className="text-sm text-[var(--color-gray)] font-light">
      Définissez les cartes, les images ou les mots à associer.
    </p>
  </div>
);

const FormInputs = ({
  formData,
  handleChange,
  handleChangePairsNbr,
}: {
  formData: { numberOfPairs: number; prompt: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePairsNbr: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="w-full flex flex-col gap-5">
    <div className="text-left">
      <label className="block mb-1 ml-4 text-xs text-[var(--color-gray)]">
        Nombre de paires
      </label>
      <input
        type="number"
        name="numberOfPairs"
        value={formData.numberOfPairs}
        onChange={handleChangePairsNbr}
        className="input"
        placeholder="Nombre de paires"
      />
    </div>
    <div className="text-left">
      <label className="block mb-1 ml-4 text-xs text-[var(--color-gray)]">
        La consigne affichée
      </label>
      <input
        type="text"
        name="prompt"
        value={formData.prompt}
        onChange={handleChange}
        className="input"
        placeholder="Ex: Associez les cartes identiques"
      />
    </div>
  </div>
);
