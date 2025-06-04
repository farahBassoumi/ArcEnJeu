import React, { useEffect, useState } from "react";
import ValidateMemoryGame from "../components/ValidateMemoryGame";
import "react-toastify/dist/ReactToastify.css";
import { addNewMemoryGame } from "../services/game.services";
import { ImageUploadSection } from "../components/ImageUploadsSection";
import { Category, getCategories } from "../types/enums/category.enum";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
 import sparkles from "../assets/icons/startLine.json";
const AddMemoryGame = ({}: {}) => {
  const [formData, setFormData] = useState({
    numberOfPairs: 2,
    nameFrench: "",
    nameEnglish: "",
    nameArabic: "",
    descriptionFrench: "",
    descriptionEnglish: "",
    descriptionArabic: "",
    category: Category.ANIMALS,
    instructionFrench: "",
    instructionEnglish: "",
    instructionArabic: "",
  });
  const [pairImages, setPairImages] = useState<(File | null)[]>([]);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationStep, setShowValidationStep] = useState(false);
  const categories = getCategories();
  const { t } = useTranslation();
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
    const {
      numberOfPairs,
      instructionFrench,
      instructionEnglish,
      instructionArabic,
    } = formData;

    const imagesAreValid =
      pairImages.length === numberOfPairs &&
      pairImages.every((img) => img !== null);

    const numberValid = numberOfPairs >= 2 && numberOfPairs <= 20;
    const fieldsFilled =
      instructionFrench.trim() !== "" ||
      instructionEnglish.trim() !== "" ||
      instructionArabic.trim() !== "";

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
    setShowValidationStep(false);
    setFormMessages();
  }, [formData, pairImages]);

  const onValidationSubmit = () => {
    if (!isFormValid) return;

    const validImages = pairImages.filter((img) => img !== null);

    const toastId = toast.loading("Creating game...");

    const subscription = addNewMemoryGame(formData, validImages).subscribe({
      next: ({ msg, type }) => {
        if (type === "info") {
          toast.loading(msg, { id: toastId });
        } else if (type === "success") {
          toast.success(msg);
        } else if (type === "error") {
          toast.error(msg);
          toast.dismiss(toastId);
        }
      },
      error: (err) => {
        toast.error("An error occurred", err);
        toast.dismiss(toastId);
      },
      complete: () => {
        toast.dismiss(toastId);
        toast.success(t("success.added"));
        handleBack();
      },
    });

    return () => subscription.unsubscribe();
  };

  const handleBack = () => {
    setShowValidationStep(false);
  };

  return (
    <div className="w-full max-w-[800px] py-[30px] px-[50px]  flex flex-col items-center justify-center shadow-md  rounded-[30px] bg-(--color-main-light) shadow text-center">
      <Toaster />

      {!showValidationStep ? (
 <div className="text-[14px] ">
          <div className="mt-[-30px]">
            <div className=" mb-[-30px] overflow-visible">
              <Lottie
                animationData={sparkles}
                loop={true}
                autoplay={true}
                className="w-[150x] h-[150px]"
              />
            </div>
            <h2 className="text-lg text-(--color-gray) font-semibold">
              {t("games.memory.create_custom_memory_game")}
            </h2>
            <p className="text-sm text-(--color-gray) font-light">
              {t("games.memory.configure_game_and_have_fun")}
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-[20px]">
            <div className="flex flex-row justify-between gap-[8px] ">
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[15px]">
                  {t("games.memory.game_name_french")}
                </label>
                <input
                  type="text"
                  name="nameFrench"
                  value={formData.nameFrench}
                  onChange={handleChange}
                  placeholder="Nom du jeu en français"
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[5px]">
                  {t("games.memory.game_name_english")}
                </label>
                <input
                  type="text"
                  name="nameEnglish"
                  value={formData.nameEnglish}
                  placeholder="Game name in English"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[5px]">
                  {t("games.memory.game_name_arabic")}
                </label>
                <input
                  type="text"
                  name="nameArabic"
                  placeholder="اسم اللعبة باللغة العربية"
                  value={formData.nameArabic}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between gap-[8px] ">
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[5px]">
                  {t("games.memory.optional_description_french")}
                </label>
                <input
                  placeholder=" description en français"
                  type="text"
                  name="descriptionFrench"
                  value={formData.descriptionFrench}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[5px]">
                  {t("games.memory.optional_description_english")}
                </label>
                <input
                  type="text"
                  name="descriptionEnglish"
                  placeholder=" description en anglais"
                  value={formData.descriptionEnglish}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[5px]">
                  {t("games.memory.optional_description_arabic")}
                </label>
                <input
                  type="text"
                  name="descriptionArabic"
                  placeholder="وصف باللغة العربية"
                  value={formData.descriptionArabic}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
            </div>

            <div className="flex flex-row justify-between gap-[8px] ">
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[15px]">
                  {t("games.memory.instruction_french")}
                </label>
                <input
                  type="text"
                  name="instructionFrench"
                  placeholder=" instruction en français"
                  value={formData.instructionFrench}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[15px]">
                  {t("games.memory.instruction_english")}
                </label>
                <input
                  type="text"
                  name="instructionEnglish"
                  placeholder=" instruction en anglais"
                  value={formData.instructionEnglish}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
              <div className="w-full text-left text-(--color-gray)">
                <label className="block mb-1 text-xs ml-[15px]">
                  {t("games.memory.instruction_arabic")}
                </label>
                <input
                  type="text"
                  name="instructionArabic"
                  placeholder="تعليمات باللغة العربية"
                  value={formData.instructionArabic}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
                />
              </div>
            </div>
            <div className="w-full text-left text-(--color-gray)">
              <label className="block mb-1 text-xs ml-[15px]">
                {t("games.memory.select_category")}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4  py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-[--color-main]"
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
              <label className="block mb-1 ml-[15px] text-xs">
                {t("games.memory.number_of_pairs")}
              </label>
              <input
                type="number"
                name="numberOfPairs"
                value={formData.numberOfPairs}
                onChange={handleChangePairsNbr}
                placeholder={t("games.memory.number_of_pairs_placeholder")}
                className="w-full px-4 py-2 rounded-[10px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
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
                className="text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center bg-(--color-gray) rounded-[10px] text-[16px]"
              >
                {t("buttons.back")}
              </button>

              <button
                onClick={() => setShowValidationStep(true)}
                disabled={!isFormValid}
                className={`text-(--color-beige) px-6 py-2 max-h-[40px] h-full max-w-[150px] w-full flex items-center justify-center rounded-[10px] text-[16px] ${
                  isFormValid
                    ? "bg-(--color-hover-main)"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {t("buttons.next")}
              </button>
            </div>
            <div className="text-sm text-(--color-gray) mt-[20px]">
              <p>{t("games.you_can_also")}</p>
              <a
                className="text-blue-500 mx-1 underline hover:text-blue-700"
                href="/memory-game/add-screen"
              >
                {t("games.add_screen")}
              </a>

              {t("games.or")}
              <a
                className="text-blue-500  mx-1 underline hover:text-blue-700"
                href="/memory-game/add-level"
              >
                {t("games.add_level")}
              </a>
              {t("games.to_existing_game")}
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
