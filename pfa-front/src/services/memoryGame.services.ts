// src/services/memoryGameService.ts

import { supabase } from "../utils/supabaseClient";
export const getGames = async () => {
  let { data: game, error } = await supabase.from("game").select("*");
  console.log("inside the et game");
  console.log(game);
  if (error) throw error;
  return game;
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

export const createMemoryGame = async (
  prompt: string,
  numberOfPairs: number,
  imageFiles: File[]
) => {
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
