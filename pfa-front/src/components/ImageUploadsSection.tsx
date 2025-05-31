import { t } from "i18next";
import ImageUploadInput from "./ImageUploadInput";

interface ImageUploadSectionProps {
  showInputs: boolean;
  numberOfPairs: number;
  pairImages: (File | null)[];
  onChange: (index: number, file: File | null) => void;
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  showInputs,
  numberOfPairs,
  pairImages,
  onChange,
}) => {
  if (!showInputs || numberOfPairs < 1) return null;

  return (
    <div className="my-[15px] text-(--color-gray)">
      <label className="block mb-1 text-md text-(--color-gray) font-semibold">
        {t("games.memory.enter_pairs")}
      </label>
      <div className="grid grid-cols-1 gap-[10px]">
        {Array.from({ length: numberOfPairs }, (_, index) => (
          <ImageUploadInput
            key={index}
            index={index}
            image={pairImages[index] || null}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};
