type GameTypeCardProps = {
  label: string;
  description: string;
  onClick: () => void;
};

export const GameTypeCard = ({ label, description, onClick }: GameTypeCardProps) => {
  return (
    <div
      className="  w-full max-w-[400px] p-[20px] cursor-pointer flex flex-col items-center justify-center gap-[10px]  rounded-[30px] bg-(--color-main-light) hover:bg-(--color-main) shadow hover:shadow-lg text-center transition"
      onClick={onClick}
    >
      <div className="text-lg text-(--color-gray) font-semibold  ">{label}</div>
      <div className="text-sm text-(--color-gray) font-light  ">
        {description}
      </div>
    </div>
  );
};