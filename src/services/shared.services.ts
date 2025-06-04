import { supabase } from "../utils/supabaseClient";

export const getCategories = async () => {
  let { data: game, error } = await supabase.from("categorie").select("*");
  console.log("inside the et game");
  console.log(game);
  if (error) throw error;
  return game;
};

export const Categories = [
  { id: "1", name: "fruit et légumes", value:"FRUITS_VEGETABLES" },
  { id: "2", name: "animaux", value:"ANIMALS" },
];
