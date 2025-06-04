import  { useRef } from "react";
import { useTranslation } from "react-i18next";
import turning from "../assets/icons/wink.json";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type GameTypeCardProps = {
  labelKey: string;
  descriptionKey: string;
  onClick: () => void;
};

export const GameTypeCard = ({ labelKey, descriptionKey, onClick }: GameTypeCardProps) => {
  const { t } = useTranslation();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div
      className="w-full max-w-[400px] h-[300px] p-[20px] hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center justify-center gap-[10px] rounded-[30px] bg-(--color-main-light) hover:bg-(--color-main) shadow hover:shadow-lg text-center"
      onClick={onClick}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      
    >
      <div className="overflow-visible">
        <Lottie
        
          lottieRef={lottieRef}
          animationData={turning}
          loop={false}
          autoplay={false} 
          className="w-[70px] h-[70px]"
        />
      </div>
      <div className="text-lg text-(--color-gray) font-semibold">{t(labelKey)}</div>
      <div className="text-sm text-(--color-gray) font-light">{t(descriptionKey)}</div>
    </div>
  );
};
