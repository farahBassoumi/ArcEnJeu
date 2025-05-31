import React, { useState } from "react";
import { GameTypes } from "../types/gameTypes.enum";
import MemoryGameComponent from "../components/memoryGame";
import EmotionGameForm from "../components/emotionsGame";
type GameTypeCardProps = {
  label: string;
  description: string;
  onClick: () => void;
};

const GameTypeCard = ({ label, description, onClick }: GameTypeCardProps) => {
  return (
    <div
      className="  w-full max-w-[400px] p-[20px] cursor-pointer flex flex-col items-center justify-center gap-[10px] border-2 border-(--color-main) rounded-[30px] bg-(--color-main-light) hover:bg-(--color-main) shadow hover:shadow-lg text-center transition"
      onClick={onClick}
    >
      <div className="text-lg text-(--color-gray) font-semibold  ">{label}</div>
      <div className="text-sm text-(--color-gray) font-light  ">
        {description}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameTypes | null>(null);

  return (
    <div className=" flex flex-col items-center justify-center p-4">
      {!selectedGame && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-(--color-pink) p-[20px] ">
            Commençons à créer des jeux !
          </p>
          <div className="flex flex-row justify-around gap-[50px] py-[20px] ">
           
            <GameTypeCard
              label="Jeu de mémoire"
              description="Créez un jeu pour entraîner la mémoire en choisissants le nombre des pairs en puis en entrant des paires de cardes."
              onClick={() => setSelectedGame(GameTypes.MEMORY)}
            />
            <GameTypeCard
              label="QCM"
              description="Créez un jeu à choix multiples en choisissants le nombre des questions et en entrant les questions et les réponses."
              onClick={() => setSelectedGame(GameTypes.MCQ)}
            />
                        <GameTypeCard
              label=" Jeu des émotions"
              description="Créez un jeu basé sur les émotions en écrivant une histoire interactive, puis en définissant les émotions attendues à la fin."
              onClick={() => setSelectedGame(GameTypes.EmotionGame)}
            />
          </div>
        </div>
      )}
      {selectedGame === GameTypes.MEMORY && (
        <MemoryGameComponent setSelectedGame={setSelectedGame} />
      )}
      {selectedGame === GameTypes.EmotionGame && (
        <EmotionGameForm setSelectedGame={setSelectedGame} />
      )}

      {selectedGame === GameTypes.MCQ && (
        <div className="w-full max-w-[500px] p-[20px] mt-[40px] flex flex-col items-center justify-center gap-[10px] border-2 border-(--color-main) rounded-[30px] bg-(--color-main-light) shadow text-center">
          <h2 className="text-lg text-(--color-gray) font-semibold">
            Création d&apos;un QCM
          </h2>
          <p className="text-sm text-(--color-gray) font-light">
            Ajoutez vos questions et les choix de réponses.
          </p>
          {/* Formulaire spécifique ici */}
          <button
            onClick={() => setSelectedGame(null)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Retour
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
