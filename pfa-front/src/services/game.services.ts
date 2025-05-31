import type { Game } from "../types/game";
import { supabase } from "../utils/supabaseClient";
export const getGames = async () => {
  //TODO:Add a acheck here to only get the memory games
  let { data: games, error } = await supabase.from("game").select("*");
  console.log("inside the et game");
  console.log(games);
  if (error) throw error;
  return games as Game[];
};

export const getScreens = async () => {
  //TODO:Add a acheck here to only get the memory games
  let { data: screens, error } = await supabase.from("screen").select("*");
  console.log("inside the get screens");
  console.log(screens);
  if (error) throw error;
  return screens;
};

export const addScreen = async (formData: any) => {
  const gameId = formData.gameId;
  const levelId = await getHighestLevel(gameId);
  const { data: screen, error } = await supabase.from("screen").insert([
    {
      level_id: levelId,
      screen_number: formData.screenNumber,
      instruction: formData.instruction,
      instruction_image_url: formData.instructionImageUrl,
      type: formData.type,
    },
  ]);

  console.log("inside the add screen");
  console.log(screen);
  if (error) throw error;
  return screen;
};


export const getLevels = async () => {
  //TODO:Add a acheck here to only get the memory games
  let { data: levels, error } = await supabase.from("level").select("*");
  console.log("inside the get levels");
  console.log(levels);
  if (error) throw error;
  return levels;
};
export const getHighestLevel = async (gameId: string) => {
  //TODO:Add a acheck here to only get the memory games
  let { data: level, error } = await supabase
    .from("level")
    .select("*")
    .eq("game_id", gameId)
    .order("level_number", { ascending: false })
    .limit(1);
  console.log("inside the get levels");
  console.log(level);
  if (error) throw error;
  return level;
};

export const uploadImage = async (file: File, index: number) => {
  const filePath = `memory-game/${Date.now()}_${index}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("memory-game-images")
    .upload(filePath, file);

  if (error) throw error;
  const { data: publicUrl } = supabase.storage
    .from("memory-game-images")
    .getPublicUrl(filePath);
  return publicUrl.publicUrl;
};

export const addMemoryGame = () => {};
interface MmemoryGameCreationRequest {
  name: string;
  description: string;
  type: string;
}
export const createMemoryGame = async (
  prompt: string,
  numberOfPairs: number,
  imageFiles: File[]
) => {
  //when creating a game, i wanna get the created  game id and then create a level, and then get the created level id
  // , then create a screen with the level id . and how can i give the educator the possibility to create an other level
  //  of the same game or to create two levels from the game that he wants o create , or browse through gamesn and he should
  // have the possinility to c=either add a screen , in that case we just append to the existing screens, aor create a levek,
  //  and in that case we get the associciated game's id then  create  anew level to that game and inserts the screens ,
  // either to create a whole other game and he will create a game, a level and a screen.
  //the methods should be in a shared service

  // Upload each image and collect URLs
  const uploadedUrls: string[] = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    if (!file) throw new Error(`Image at index ${i} is missing.`);
    const url = await uploadImage(file, i);
    uploadedUrls.push(url);
  }

  // Insert game entry into your "memory_games" table
  const { data, error } = await supabase.from("memory_games").insert([
    {
      prompt,
      number_of_pairs: numberOfPairs,
      images: uploadedUrls, // Make sure your table supports storing arrays
    },
  ]);

  if (error) throw error;
  return data;
};
