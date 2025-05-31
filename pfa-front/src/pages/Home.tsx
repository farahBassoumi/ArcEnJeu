import React from "react";
import { GameTypes } from "../types/enums/gameTypes.enum";
import { GameTypeCard } from "../components/GameTypeCard";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (gameType: GameTypes) => {
    if (gameType === GameTypes.MEMORY_MATCH) {
      navigate("/memory-game/add-game");
    } else if (gameType === GameTypes.MULTIPLE_CHOICE) {
      navigate("/mcq-game");
    }
  };
  return (
    <div className=" flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg font-semibold text-(--color-pink) p-[20px] ">
          Commençons à créer des jeux !
        </p>
        <div className="flex flex-row justify-around gap-[50px] py-[20px] ">
          <GameTypeCard
            label="Jeu de mémoire"
            description="Créez un jeu pour entraîner la mémoire en choisissants le nombre des pairs en puis en entrant des paires de cardes."
            onClick={() => handleNavigation(GameTypes.MEMORY_MATCH)}
          />
          <GameTypeCard
            label="QCM"
            description="Créez un jeu à choix multiples en choisissants le nombre des questions et en entrant les questions et les réponses."
            onClick={() => handleNavigation(GameTypes.MULTIPLE_CHOICE)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
