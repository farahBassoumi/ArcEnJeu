import ImageUploadInput from "./ImageUploadInput";
interface MemoryCardsUploadsProps {
  numberOfPairs: number;
  pairImages: (File | null)[];
  onChange: (index: number, file: File | null) => void;
}

export const MemoryCardsUploads: React.FC<MemoryCardsUploadsProps> = ({
  numberOfPairs,
  pairImages,
  onChange,
}) => (
  <div className="w-full text-[var(--color-gray)]">
    <label className="block mb-1 text-xs ml-4">Images des paires</label>
    <div className="grid grid-cols-1 gap-2">
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
