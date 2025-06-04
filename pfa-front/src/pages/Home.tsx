import React from "react";
import { GameTypeCard } from "../components/GameTypeCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const navigate = useNavigate();
const { t } = useTranslation();
 
  return (
    <div className=" flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <p className="text-[30px] text-(--color-pink) p-[20px] ">
          {t("home.title")}
        </p>
        <div className="flex flex-row justify-around gap-[50px] py-[20px] ">
          <GameTypeCard
        labelKey="game_type_card.add_game.label"
        descriptionKey="game_type_card.add_game.description"
        onClick={() => navigate("/memory-game/add-game")}
      />
      <GameTypeCard
        labelKey="game_type_card.add_level.label"
        descriptionKey="game_type_card.add_level.description"
        onClick={() => navigate("/memory-game/add-level")}
      />
      <GameTypeCard
        labelKey="game_type_card.add_screen.label"
        descriptionKey="game_type_card.add_screen.description"
        onClick={() => navigate("/memory-game/add-screen")}
      />
        </div>
      </div>
    </div>
  );
};

export default Home;
