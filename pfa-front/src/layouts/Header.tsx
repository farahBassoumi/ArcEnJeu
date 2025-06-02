import React, { useEffect } from "react";
import Logo from "../assets/icons/Logo.svg";
import Translation from "../assets/icons/Translation.svg";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n/config";
import ArrowRight from "../assets/icons/ArrowRight.svg";
import { useUser } from "../utils/UserContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, contextLogout } = useUser();

  useEffect(() => {
    console.log("Checking user login status...");
    const userId = localStorage.getItem("userId");
    console.log(`User ID from localStorage: ${userId}`);
    console.log(`Is user logged in? ${!!userId}`);
  }, []);

  const onChangeLanguage = () => {
    const newLanguage = i18n.language === "en" ? "fr" : "en";
    console.log(`Changing language to ${newLanguage}`);

    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    contextLogout();
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-between items-center py-[10px] px-[50px] bg-(--color-main)">
      <div
        onClick={() => navigate("/")}
        className=" cursor-pointer flex flex-row items-center gap-[10px] text-(--color-beige)"
      >
        <div className=" flex items-center justify-center p-[4px] size-[30px] ">
          <img src={Logo} alt="" />
        </div>
        <div>Cerveau Doux </div>
      </div>
      <div className="flex flex-row items-center gap-[20px]">
        <button className="bg-transparent text-(--color-beige) cursor-pointer">
          à propos
        </button>
        <div className="authentication flex flex-row items-center gap-[15px]">
          {(! isLoggedIn) ? (
            <div className="flex flex-row items-center gap-[10px]">
              <button
                className="text-(--color-gray) cursor-pointer px-6 py-2 max-h-[40px] h-full max-w-[300px] w-full flex items-center justify-center bg-(--color-beige) text-[#242424] rounded-full"
                onClick={() => navigate("/login")}
              >
                Connexion
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="  text-(--color-gray) cursor-pointer px-4  py-2  max-h-[40px]  max-w-[300px] w-full flex items-center justify-center bg-(--color-beige) text-[#242424] rounded-full"
              >
                <div>Inscription</div>
                <div>
                  <div className="flex items-center justify-center size-[20px] mt-[5px] ">
                    <img src={ArrowRight} alt="" />
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="  text-(--color-gray) cursor-pointer px-4  py-2  max-h-[40px]  max-w-[300px] w-full flex items-center justify-center bg-(--color-beige) text-[#242424] rounded-full"
            >
              <div>log out</div>
            </button>
          )}

          <div className="cursor-pointer w-[30px] " onClick={onChangeLanguage}>
            <img className="h-full w-full " src={Translation} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
