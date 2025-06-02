import React, { useEffect, useState } from "react";
import ValidateMemoryGame from "../components/ValidateMemoryGame";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { addScreen, getMemoryGames } from "../services/game.services";
import { t } from "i18next";
import { ImageUploadSection } from "../components/ImageUploadsSection";
import type { Game } from "../types/game";

const AddMemoryGameScreen = ({}: {}) => {
  const [formData, setFormData] = useState({
    numberOfPairs: 0,
    instruction: "",
    gameId: "",
  });
  const [pairImages, setPairImages] = useState<(File | null)[]>([]);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidationStep, setShowValidationStep] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fetchGames = async () => {
    try {
      const fetchedGames = await getMemoryGames();

      setGames(fetchedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

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
    const { numberOfPairs, gameId } = formData;

    const imagesAreValid =
      pairImages.length === numberOfPairs &&
      pairImages.every((img) => img !== null);

    const numberValid = numberOfPairs >= 2 && numberOfPairs <= 20;

    const valid = (numberValid && gameId && imagesAreValid) || false;
    console.log("formData", formData);
    console.log("valid", valid);
    //setIsFormValid(valid);
    setIsFormValid(true);

    if (!numberValid) {
      setError(t("errors.invalid_pair_number"));
    } else if (!gameId) {
      setError(t("errors.missing_fields"));
    } else if (!imagesAreValid) {
      setError(t("errors.missing_images"));
    } else {
      setError("");
    }
  };

  useEffect(() => {
    console.log("inside of the useEffect memory game component");
    setShowValidationStep(false);
    setFormMessages();
    // if (pairImages.length > 0 && formData.numberOfPairs > 0)
    //   if (pairImages[0]) addImage(pairImages[0]);
  }, [formData, pairImages]);

  const onValidationSubmit = () => {
    if (!isFormValid) return;

    const validImages = pairImages.filter((img) => img !== null);

    const toastId = toast.loading("Creating game...");

    const subscription = addScreen(formData, validImages).subscribe({
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
        toast.success(t("success.game_added"));
        handleBack();
      },
    });

    return () => subscription.unsubscribe();
  };

  const handleBack = () => {
    setShowValidationStep(false);
  };
  return (
    <div className="w-full max-w-[600px] py-[30px] px-[50px] mt-[40px] flex flex-col items-center justify-center shadow-md  rounded-[30px] bg-(--color-main-light) shadow text-center">
      <Toaster />
      {!showValidationStep ? (
        <div className="pt-[40px]">
          <div className="py-[10px]">
            <h2 className="text-lg text-(--color-gray) font-semibold">
              {t("games.memory.create_custom_memory_game_screen")}
            </h2>
            <p className="text-sm text-(--color-gray) font-light">
              {t("games.memory.configure_game_and_have_fun")}
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-[20px]">
            <div className="w-full text-left text-[--color-gray]">
              <label className="block mb-1 text-xs ml-[15px]">
                {t("games.memory.select_game")}
              </label>
              <div className="relative w-full">
                <select
                  name="gameId"
                  value={formData.gameId}
                  onChange={handleChange}
                  className="w-full appearance-none px-4 py-2 pr-10 rounded-[15px] bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[--color-main]"
                >
                  <option value="">
                    {t("games.memory.select_game_placeholder")}
                  </option>
                  {games.map((game: Game) => (
                    <option key={game.game_id} value={game.game_id}>
                      {game.name}
                    </option>
                  ))}
                </select>
                {/* Optional: Add a chevron icon */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  ▼
                </div>
              </div>
            </div>
            <div className="w-full text-left text-(--color-gray)">
              <label className="block mb-1 text-xs ml-[15px]">
                {t("games.memory.prompt_before_start")}
              </label>
              <input
                type="text"
                name="instruction"
                value={formData.instruction}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-(--color-main)"
              />
            </div>
            <div className="w-full text-left text-[--color-gray]">
              <label className="block mb-1 ml-[15px] text-xs">
                {t("games.memory.number_of_pairs")}
              </label>
              <input
                type="number"
                name="numberOfPairs"
                value={formData.numberOfPairs}
                onChange={handleChangePairsNbr}
                placeholder={t("games.memory.number_of_pairs_placeholder")}
                className="w-full px-4 py-2 rounded-[15px] bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[--color-main]"
                required
              />
            </div>
          </div>

          <div className="mt-[20px]">
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
                href="/memory-game/add-game"
              >
                ajouter un jeu
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

export default AddMemoryGameScreen;
