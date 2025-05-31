// src/components/EmotionGameForm.tsx
import React, { useState } from "react";
import ImageUploadInput from "./ImageUploadInput";
import  Emotion  from "../types/emotions.enum";
interface EmotionGameFormProps {
  setSelectedGame: (game: null) => void;
}

const EmotionGameForm: React.FC<EmotionGameFormProps> = ({ setSelectedGame }) => {
  const [started, setStarted] = useState(false);
  const [sceneCount, setSceneCount] = useState<number | null>(null);
  const [isSceneCountValidated, setIsSceneCountValidated] = useState(false);
  const [scenes, setScenes] = useState<any[]>([]);

  const handleSceneCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count >= 2) {
      setSceneCount(count);
      setScenes(Array(count).fill({}));
    } else {
      setSceneCount(null);
      setScenes([]);
    }
  };

  const handleSceneChange = (index: number, field: string, value: any) => {
    const updatedScenes = [...scenes];
    updatedScenes[index] = {
      ...updatedScenes[index],
      [field]: value,
    };
    setScenes(updatedScenes);
  };

  const handleImageChange = (index: number, file: File | null) => {
    handleSceneChange(index, "image", file);
  };

  return (
    <div className="w-full max-w-[600px] p-6 mt-8 flex flex-col items-center gap-4 border-2 border-[--color-main] rounded-[30px] bg-[--color-main-light] shadow text-center">
      {!started ? (
        <>
          <h2 className="text-lg text-[--color-gray] font-semibold">
            Création d&apos;un jeu des émotions
          </h2>
          <p className="text-sm text-[--color-gray] font-light">
            Ce jeu commence par la récitation d’une histoire interactive. Ensuite, l’enfant doit jouer une émotion inspirée de la scène racontée.
            Par exemple : « Une fille joue seule, puis son amie arrive pour partager son jouet » → l’émotion attendue est la joie.
            L’enfant est alors invité à imiter cette émotion, et la réponse est évaluée automatiquement grâce aux technologies de l’intelligence artificielle.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Commencer
          </button>
        </>
      ) : !isSceneCountValidated ? (
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-[--color-gray] font-semibold">
            Nombre total de scènes (minimum 2) :
          </label>
          <input
            type="number"
            min={2}
            className="p-2 border rounded"
            onChange={handleSceneCountChange}
          />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setSelectedGame(null)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Retour
            </button>
            <button
              disabled={sceneCount === null}
              onClick={() => setIsSceneCountValidated(true)}
              className={`px-4 py-2 text-white rounded transition ${
                sceneCount === null
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Valider
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full text-left">
          {scenes.map((scene, index) => (
            <div key={index} className="p-4 border rounded bg-white shadow-sm">
              <h4 className="text-md font-semibold text-[--color-gray] mb-2">
                {index === sceneCount! - 1
                  ? `Scène ${index + 1} (Détection des émotions)`
                  : `Scène ${index + 1}`}
              </h4>

              <label className="text-sm font-medium">Texte de la scène</label>
              <textarea
                rows={2}
                className="w-full p-2 border rounded mb-2"
                placeholder="Décrivez la scène..."
                value={scene.text || ""}
                onChange={(e) =>
                  handleSceneChange(index, "text", e.target.value)
                }
              />

              <label className="text-sm font-medium">Image</label>
              <ImageUploadInput
                index={index}
                image={scene.image || null}
                onChange={handleImageChange}
              />

              {index === sceneCount! - 1 && (
                <>
                  <label className="text-sm font-medium mt-2">Émotion attendue</label>
                    <select
                    className="w-full p-2 border rounded mb-2"
                    value={scene.expectedEmotion || ""}
                    onChange={(e) =>
                        handleSceneChange(index, "expectedEmotion", e.target.value)
                    }
                    >
                    <option value="">-- Choisissez une émotion --</option>
                    {Object.entries(Emotion).map(([key, label]) => (
                        <option key={key} value={label}>
                        {label}
                        </option>
                    ))}
                    </select>

                </>
              )}
            </div>
          ))}

          <button
            onClick={() => console.log(scenes)} // Replace with actual logic
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Enregistrer le jeu
          </button>
        </div>
      )}
    </div>
  );
};

export default EmotionGameForm;
