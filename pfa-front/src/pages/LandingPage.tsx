import React from "react";
import guy from "../assets/images/guy.svg"; 

const LandingPage: React.FC = () => {
  return (
    <div className="bg-(--color-beige) ">
      <div className="flex flex-row justify-around items-center px-[200px] py-[100px] ">
        <div className="right flex flex-col gap-[10px] items-start  ">
          <div className="text-(--color-gray) text-left text-[40px] font-bold  ">
            Une plateforme simple pour les éducateurs et instructeurs
          </div>
          <div className="text-(--color-gray) text-left  text-[20px] ">
            Créez des jeux éducatifs et adaptés aux enfants autistes.
          </div>
          <div className="text-left py-[10px] ">
            <button className="text-(--color-beige) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[300px] w-full  flex items-center justify-center  bg-(--color-main) hover:bg-(--color-hover-main)  rounded-full">
              en savoir plus
            </button>
          </div>
        </div>
        <div className="left">
          <img src={guy} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
