import React, { useEffect, useState } from "react";
import ValidateMemoryGame from "../components/ValidateMemoryGame";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNewMemoryGame, getGames } from "../services/game.services";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { ImageUploadSection } from "../components/ImageUploadsSection";
import { Category, getCategories } from "../types/enums/category.enum";

const AddMemoryGame = ({}: {}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numberOfPairs: 2,
    name: "game name",
    description: "desc",
    category: Category.ANIMALS,
    instruction: "instruction",
  });
  const [pairImages, setPairImages] = useState<(File | null)[]>([]);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationStep, setShowValidationStep] = useState(false);
  const categories = getCategories();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const setFormMessages = () => {
    const { numberOfPairs, instruction } = formData;

    const imagesAreValid =
      pairImages.length === numberOfPairs &&
      pairImages.every((img) => img !== null);

    const numberValid = numberOfPairs >= 2 && numberOfPairs <= 20;
    const fieldsFilled = instruction.trim() !== "";

    const valid = numberValid && fieldsFilled && imagesAreValid;

    setIsFormValid(valid);

    if (!numberValid) {
      setError(t("errors.invalid_pair_number"));
    } else if (!fieldsFilled) {
      setError(t("errors.missing_fields"));
    } else if (!imagesAreValid) {
      setError(t("errors.missing_images"));
    } else {
      setError("");
    }
  };

  useEffect(() => {
    getGames();

    setShowValidationStep(false);
    setFormMessages();
  }, [formData, pairImages]);

  const onValidationSubmit = () => {
    if (isFormValid) {
      console.log("Form is valid, proceeding with submission...");
      const validImages = pairImages.filter((img) => img !== null);
      addNewMemoryGame(formData, validImages);

      toast.success(t("success.added"));
      handleBack();
    }
  };
  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="w-full max-w-[600px] py-[30px] px-[50px] mt-[40px] flex flex-col items-center justify-center shadow-md  rounded-[30px] bg-(--color-main-light) shadow text-center">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        //  closeButton={false}
        toastClassName="!bg-[--color-main-light] !text-[--color-gray] !rounded-[30px] !shadow-md !px-6 m-4  text-sm font-medium text-center"
      />
      {!showValidationStep ? (
        <div className="pt-[40px]">
          <div className="py-[10px]">
            <h2 className="text-lg text-(--color-gray) font-semibold">
              {t("games.memory.create_custom_memory_game")}
            </h2>
            <p className="text-sm text-(--color-gray) font-light">
              {t("games.memory.configure_game_and_have_fun")}
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-[20px]">
            <div className="w-full text-left text-(--color-gray)">
              <label className="block mb-1 text-xs ml-[15px]">
                {t("games.memory.game_name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
              />
            </div>

            <div className="w-full text-left text-(--color-gray)">
              <label className="block mb-1 text-xs ml-[15px]">
                {t("games.memory.optional_description")}
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
              />
            </div>

            <div className="w-full text-left text-(--color-gray)">
              <label className="block mb-1 text-xs ml-[15px]">
                {t("games.memory.select_category")}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4  py-2 rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[--color-main]"
              >
                <option value="">
                  {t("games.memory.select_category_placeholder")}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full text-left text-(--color-gray)">
              <label className="block mb-1 text-xs ml-[15px]">
                {t("games.memory.instruction_before_start")}
              </label>
              <input
                type="text"
                name="instruction"
                value={formData.instruction}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
              />
            </div>
            <div className="w-full text-left text-(--color-gray)">
              <label className="block mb-1 ml-[15px] text-xs">
                {t("games.memory.number_of_pairs")}
              </label>
              <input
                type="number"
                name="numberOfPairs"
                value={formData.numberOfPairs}
                onChange={handleChangePairsNbr}
                placeholder={t("games.memory.number_of_pairs_placeholder")}
                className="w-full px-4 py-2 rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                required
              />
            </div>
          </div>

          <div className="mt-[20px]">
            {/* Only show image upload when there's at least 1 pair */}
            {formData.numberOfPairs > 1 && (
              <ImageUploadSection
                onChange={onImageInputChange}
                showInputs={true}
                numberOfPairs={formData.numberOfPairs}
                pairImages={pairImages}
              />
            )}

            <div className="w-full flex flex-col text-sm my-[10px] ">
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>

            <div className="flex flex-row justify-center gap-[20px] items-center">
              <button
                onClick={handleBack}
                className="text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center bg-(--color-gray) rounded-[15px] text-[16px]"
              >
                {t("buttons.back")}
              </button>

              <button
                onClick={() => setShowValidationStep(true)}
                disabled={!isFormValid}
                className={`text-(--color-beige) px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center rounded-[15px] text-[16px] ${
                  isFormValid
                    ? "bg-(--color-hover-main)"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {t("buttons.next")}
              </button>
            </div>
            <div className="text-sm text-(--color-gray) mt-[20px]">
              <p>vous pouvez aussi:</p>
              <a
                className="text-blue-500 mx-1 underline hover:text-blue-700"
                href="/memory-game/add-screen"
              >
                ajouter un ecran
              </a>
              ou
              <a
                className="text-blue-500  mx-1 underline hover:text-blue-700"
                href="/memory-game/add-level"
              >
                ajouter un level
              </a>
              a un jeu deja existant
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ValidateMemoryGame
            images={pairImages}
            onBack={() => setShowValidationStep(false)}
            onConfirm={onValidationSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default AddMemoryGame;
