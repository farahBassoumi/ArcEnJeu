import React from "react";
import Logo from "../assets/icons/Logo.svg";
import SignUpPopup from "../components/signUp";
import LoginPopup from "../components/Login";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div
      
      className="flex flex-row justify-between items-center py-[10px] px-[50px] bg-(--color-main)"
    >
      <div onClick={() => navigate("/")}  className=" cursor-pointer flex flex-row items-center gap-[10px] text-(--color-beige)">
        <div  className=" flex items-center justify-center p-[4px] size-[30px] ">
          <img src={Logo} alt="" />
        </div>
        <div>Cerveau Doux </div>
      </div>
      <div className="flex flex-row items-center gap-[20px]">
        <button className="bg-transparent text-(--color-beige) cursor-pointer">
          à propos
        </button>
        <div className="authentication flex flex-row items-center gap-[15px]">
          <LoginPopup />
          <SignUpPopup />
        </div>
      </div>
    </div>
  );
};

export default Header;
