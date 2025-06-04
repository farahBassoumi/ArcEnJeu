import React, { useEffect, useState } from "react";
import stars from "../assets/icons/stars.png";
import Translation from "../assets/icons/Translation.svg";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n/config";
import ArrowRight from "../assets/icons/ArrowRight.svg";
import { useUser } from "../utils/UserContext";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, contextLogout } = useUser();
  const [language, setLanguage] = useState<string>( );
  const { t } = useTranslation();
  useEffect(() => {
    console.log("Checking user login status...");
    const userId = localStorage.getItem("userId");
    console.log(`User ID from localStorage: ${userId}`);
    console.log(`Is user logged in? ${!!userId}`);
  }, []);
  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "ar") setLanguage("العربية");
    else if (currentLanguage === "fr") setLanguage("français");
    else setLanguage("english");
  }, []);

  const onChangeLanguage = () => {
    const languages = ["fr", "en", "ar"];
    const currentIndex = languages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLanguage = languages[nextIndex];
    if (newLanguage === "ar") setLanguage("العربية");
    else if (newLanguage === "fr") setLanguage("français");
    else setLanguage("english");

    console.log(`Changing language to ${newLanguage}`);
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    contextLogout();
    navigate("/");
  };

  const handleLogoClick = () => {
    if (isLoggedIn) navigate("/home");
    else navigate("/");
  };

  return (
    <div className="flex flex-row justify-between items-center py-[5px] px-[50px] bg-(--color-main)">
      <div
        onClick={handleLogoClick}
        className=" cursor-pointer flex flex-row items-center gap-[10px] text-(--color-beige)"
      >
        <div className=" flex items-center justify-center size-[50px] ">
          <img src={stars} alt="" />
        </div>
        <div className=" px-2 text-[18px]" >
          {t("app_name")}

        </div>
      </div>
      <div className="flex flex-row items-center gap-[20px]">
        <button onClick={
          () => {
            navigate("/about");
          }
        } className="bg-transparent text-(--color-beige) cursor-pointer">
          {t("about_page.button")}
        </button>
        <div className="authentication flex flex-row items-center gap-[15px]">
          {!isLoggedIn ? (
            <div className="flex text-(--color-gray) flex-row text-[14px] items-center gap-[10px]">
              <button
                className=" hover:scale-105  transition-transform duration-200   cursor-pointer px-6 py-2 max-h-[40px] h-full w-200px] flex items-center justify-center bg-(--color-beige)  rounded-[20px]"
                onClick={() => navigate("/login")}
              >
                {t("auth.login")}
              </button>
              <button
                onClick={() => navigate("/signup")}
                className=" hover:scale-105  transition-transform duration-200    cursor-pointer px-6  py-2  max-h-[40px]  w-200px]  flex items-center justify-center bg-(--color-beige)  rounded-[20px]"
              >
                <div>{t("auth.sign_up")}</div>
                <div>
                  <div className="flex items-center justify-center size-[20px]  ml-[5px] mt-[2px] ">
                    <img src={ArrowRight} alt="" />
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className=" hover:scale-105  text-(--color-gray) text-[14px]  transition-transform duration-200    cursor-pointer px-4  py-2  max-h-[40px]  max-w-[300px] w-full flex items-center justify-center bg-(--color-beige)  rounded-[20px]"
            >
              <div> 
                {t("auth.logout")}

              </div>
            </button>
          )}

          <div className="cursor-pointer flex flex-col w-[30px] items-center justify-center hover:scale-110  transition-transform duration-200   " onClick={onChangeLanguage}>
            <img className="h-full w-full mb-[-5px] " src={Translation} alt="" />
            <span className=" text-(--color-beige) font-semibold  text-[10px]">{language}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
