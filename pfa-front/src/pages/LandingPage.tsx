import React from "react";
import guy from "../assets/images/guy.svg"; 

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#F1F0E8] ">
      <div className="flex flex-row justify-around items-center px-[200px] py-[100px] ">
        <div className="right flex flex-col gap-[10px] items-start  ">
          <div className=" text-[#494949] text-left text-[40px] font-bold  ">
            Une plateforme simple pour les éducateurs et instructeurs
          </div>
          <div className="text-[#494949] text-left  text-[20px] ">
            Créez des jeux éducatifs et adaptés aux enfants autistes.
          </div>
          <div className="text-left py-[10px] ">
            <button className="text-[#F1F0E8] cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[300px] w-full  flex items-center justify-center bg-[#89A8B2] hover:bg-[#6299a8]  rounded-full">
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
