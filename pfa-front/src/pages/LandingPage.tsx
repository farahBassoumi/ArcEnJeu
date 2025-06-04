import React, { useRef } from "react";
import looking from "../assets/images/looking.jpg";
import { useTranslation } from "react-i18next";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import sparkles from "../assets/icons/sparkles.json";
import jumping from "../assets/icons/jumping.json";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const navigate = useNavigate();
  return (
    <div className="bg-(--color-beige) ">
      <div className="flex flex-row justify-around items-center  py-[30px] ">
        <div className="right flex flex-col w-[800px] gap-[10px] items-start px-[40px] ">
          <div className=" ml-[-150px] mb-[-50px] overflow-visible">
            <Lottie
              lottieRef={lottieRef}
              animationData={sparkles}
              loop={true}
              autoplay={true}
              className="w-[100x] h-[100px]"
            />
          </div>
          <div className="text-(--color-gray) text-left text-[40px] font-bold  ">
            {t("landing_page.title")}
          </div>
          <div className="text-(--color-gray) ml-[20px] mt-[-10px] text-left text-[15px] font-light italic  ">
            {t("landing_page.subtitle")}
          </div>

          <div className="text-(--color-gray) text-left pt-[10px]  text-[20px] ">
            {t("landing_page.description")}
          </div>
          <div className="text-left py-[10px] ">
            <button  
            onClick={() => {
              navigate("/signup");
            }}
            className=" cursor-pointer px-6 py-6 max-h-[40px] h-full w-[300px]   flex items-center justify-between flex-row  bg-(--color-main) hover:bg-(--color-hover-main)  rounded-[20px]">
              <div className="text-(--color-beige)" > {t("landing_page.get_started")}</div>
              <div className="  overflow-visible">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={jumping}
                  loop={true}
                  autoplay={true}
                  className="w-[50x] h-[50px]"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="left size-[300px] floating">
          <img className="rounded-full shadow-lg w-full h-full" src={looking} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
