import React from "react";
import Logo from "../assets/icons/Logo.svg";
import ArrowRight from "../assets/icons/ArrowRight.svg"; 
import SignUpPopup from "../components/signUp";

const Header: React.FC = () => {
  return (
    <div className="flex flex-row justify-between items-center py-[10px] px-[50px] bg-[#89A8B2]">
      <div className="flex flex-row items-center gap-[10px] text-[#F1F0E8]">
        <div className=" flex items-center justify-center p-[4px] size-[30px] ">
          <img src={Logo} alt="" />
        </div>
        <div>Cerveau Doux </div>
      </div>
      <div className="flex flex-row items-center gap-[20px]">
        <button className="bg-transparent text-[#F1F0E8] cursor-pointer">
          à propos
        </button>
        <div className="authentication flex flex-row items-center gap-[15px]">
          {/* <button className="  text-[#494949] cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[300px] w-full  flex items-center justify-center bg-[#F1F0E8] text-[#242424] rounded-full">
            Connection
          </button> */}
                <SignUpPopup />

          <button className="  text-[#494949] cursor-pointer px-4  py-2  max-h-[40px]  max-w-[300px] w-full flex items-center justify-center bg-[#F1F0E8] text-[#242424] rounded-full">
            <div>Inscription</div>
            <div>
              <div className="flex items-center justify-center size-[20px] mt-[5px] ">
                <img src={ArrowRight} alt="" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
