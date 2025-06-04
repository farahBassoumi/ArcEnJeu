import i18n from "../../i18n/config";

export enum Category {
  ANIMALS = "ANIMALS",
  COLORS_SHAPES = "COLORS_SHAPES",
  NUMBERS = "NUMBERS",
  EMOTIONS = "EMOTIONS",
};const CategoriesFR = [
  { id: "1", name: "Animaux", value: Category.ANIMALS },
  { id: "2", name: "Couleurs et Formes", value: Category.COLORS_SHAPES },
  { id: "3", name: "Nombres", value: Category.NUMBERS },
  { id: "4", name: "Émotions", value: Category.EMOTIONS },
];

const CategoriesEN = [
  { id: "1", name: "Animals", value: Category.ANIMALS },
  { id: "2", name: "Colors and Shapes", value: Category.COLORS_SHAPES },
  { id: "3", name: "Numbers", value: Category.NUMBERS },
  { id: "4", name: "Emotions", value: Category.EMOTIONS },
];

const CategoriesAR = [
  { id: "1", name: "الحيوانات", value: Category.ANIMALS },
  { id: "2", name: "الألوان والأشكال", value: Category.COLORS_SHAPES },
  { id: "3", name: "الأرقام", value: Category.NUMBERS },
  { id: "4", name: "العواطف", value: Category.EMOTIONS },
];

export const getCategories = () => {
  const lang = i18n.language ?? 'en';
  if (lang.startsWith('fr')) return CategoriesFR;
  if (lang.startsWith('ar')) return CategoriesAR;
  return CategoriesEN;
};
