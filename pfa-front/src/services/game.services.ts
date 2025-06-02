import { GameTypes } from "../types/enums/gameTypes.enum";
import type { Game } from "../types/game";
import { supabase } from "../utils/supabaseClient";
import { Observable } from "rxjs";

export const getGames = async () => {
  //TODO:Add a acheck here to only get the memory games
  let { data: games, error } = await supabase.from("game").select("*");
  console.log("inside the et game");
  console.log(games);
  if (error) throw error;
  return games as Game[];
};

// export const getScreens = async () => {
//   //TODO:Add a acheck here to only get the memory games
//   let { data: screens, error } = await supabase.from("screen").select("*");
//   console.log("inside the get screens");
//   console.log(screens);
//   if (error) throw error;
//   return screens;
// };

export const addScreen = async (formData: any, pairImages: File[] = []) => {
  const gameId = formData.gameId;
  let levelId = await getHighestLevel(gameId);
  if (!levelId) {
    console.log(
      "No levels found for the specified game, about to create a new level:"
    );
    levelId = await createLevel(gameId);
  }
  let screenNumber = 1;
  const highestScreenNumber = await getHighestScreenNumber(levelId);
  if (highestScreenNumber !== undefined) screenNumber = highestScreenNumber + 1;

  const { error } = await supabase.from("screen").insert([
    {
      level_id: levelId,
      screen_number: screenNumber,
      instruction: formData.instruction,
      type: GameTypes.MEMORY,
    },
  ]);
  if (error) throw error;
  console.log(
    "Screen added successfully with levelId:",
    levelId,
    "and screenNumber:",
    screenNumber
  );
  const screenId = await getScreenId(levelId, screenNumber);

  await addScreenOptions(screenId, pairImages);

  return true;
};

const getScreenId = async (levelId: string, screenNumber: number) => {
  const { data, error } = await supabase
    .from("screen")
    .select("screen_id")
    .eq("level_id", levelId)
    .eq("screen_number", screenNumber);
  if (error) throw error;

  return data[0].screen_id;
};

const addOption = async (
  screenId: string,
  pictureUrl: string,
  pairId: string
) => {
  const { error } = await supabase.from("option").insert([
    {
      screen_id: screenId,
      picture_url: pictureUrl,
      pair_id: pairId,
    },
  ]);

  if (error) throw error;

  console.log(`option for the screen ${screenId} added successfully`);
};

const addScreenOptions = async (screenId: string, pairImages: File[]) => {
  for (let i = 0; i < pairImages.length; i++) {
    const file = pairImages[i];
    const pictureUrl = await addImage(file);
    if (!pictureUrl)
      throw new Error(`Image at index ${i} could not be uploaded.`);

    const pairId = crypto.randomUUID();
    //calling the addOption twice to add the two options for the pair
    await addOption(screenId, pictureUrl, pairId);
    await addOption(screenId, pictureUrl, pairId);
  }
};

const addImage = async (file: File) => {
  const filePath = `images/memory-game/${file.name}`;

  const { data, error } = await supabase.storage
    .from("game-assets")
    .upload(filePath, file, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) throw error;

  console.log("image uploaded successfully in", data.path);
  return data.path;
};

const getHighestLevel = async (gameId: string) => {
  //TODO:Add a acheck here to only get the memory games
  let { data: level } = await supabase
    .from("level")
    .select("*")
    .eq("game_id", gameId)
    .order("level_number", { ascending: false })
    .limit(1);
  if (level && level.length > 0) {
    return level[0];
  }
  return null; // Return null if no levels found
};

const getHighestScreenNumber = async (levelId: string) => {
  //TODO:Add a acheck here to only get the memory games
  let { data: screen, error } = await supabase
    .from("screen")
    .select("screen_number")
    .eq("level_id", levelId)
    .order("screen_number", { ascending: false })
    .limit(1);
  console.log(screen);
  if (screen && screen.length > 0) {
    console.log("highest screen number for the level", screen[0].screen_number);
    return screen[0].screen_number; // Return the level_id of the highest level
  }
  if (error) throw error;
};

export const addNewLevelScreen = async (
  formData: any,
  pairImages: File[] = []
) => {
  const gameId = formData.gameId;
  const levelId = await createLevel(gameId);

  const { error } = await supabase.from("screen").insert([
    {
      level_id: levelId,
      screen_number: 1,
      instruction: formData.instruction,
      type: GameTypes.MEMORY,
    },
  ]);
  if (error) throw error;
  console.log("Screen added successfully with levelId:", levelId);
  const screenId = await getScreenId(levelId, 1);

  await addScreenOptions(screenId, pairImages);

  return true;
};

export const addNewMemoryGame = (
  formData: any,
  pairImages: File[]
): Observable<{ msg: string; type: "info" | "success" | "error" }> => {
  return new Observable((subscriber) => {
    const { name, description, category, instruction } = formData;

    (async () => {
      try {
        subscriber.next({ msg: "Creating game...", type: "info" });
        const gameId = await createMemoryGame(name, description, category);
        subscriber.next({ msg: "Game created successfully!", type: "success" });

        subscriber.next({ msg: "Creating level...", type: "info" });
        const levelId = await createLevel(gameId);
        subscriber.next({
          msg: "Level created successfully!",
          type: "success",
        });

        subscriber.next({ msg: "Creating screen...", type: "info" });

        const screenId = await createFirstScreen(
          levelId,
          instruction,
          GameTypes.MEMORY
        );

        subscriber.next({ msg: "Screen created!", type: "success" });

        subscriber.next({ msg: "Uploading image pairs...", type: "info" });
        await addScreenOptions(screenId, pairImages);
        subscriber.next({ msg: "Images added!", type: "success" });

        subscriber.complete();
      } catch (err: any) {
        subscriber.error(err);
      }
    })();

    return () => {
    };
  });
};

const createFirstScreen = async (
  levelId: string,
  instruction: string,
  type: GameTypes
) => {
  const { error } = await supabase.from("screen").insert([
    {
      level_id: levelId,
      screen_number: 1,
      instruction: instruction,
      type: type,
    },
  ]);
  if (error) throw new Error("Error creating screen.");
  console.log("Screen created successfully");

  const screenId = await getScreenId(levelId, 1);

  return screenId;
};

const createMemoryGame = async (
  name: string,
  description: string,
  category: string
) => {
  const educatorId = localStorage.getItem("userId") ?? null;

  console.log("Creating memory game with name:", name);
  const { error } = await supabase.from("game").insert([
    {
      educator_id: educatorId,
      name,
      category,
      type: GameTypes.MEMORY_MATCH,
      description,
    },
  ]);
  if (error) throw new Error("Error creating game");
  console.log("Game created successfully with name:", name);
  const { data } = await supabase
    .from("game")
    .select("game_id")
    .eq("name", name)
    .eq("description", description);
  if (!data || data.length === 0)
    throw new Error("Failed to retrieve the created level ID.");

  console.log("Game created successfully with ID:", data[0].game_id);
  return data[0].game_id;
};

const createLevel = async (gameId: string) => {
  const highestLevel = await getHighestLevel(gameId);
  if (!highestLevel) {
    console.log(
      "No levels found for the specified game. Creating the first level."
    );
  } else {
    console.log("Highest level found:", highestLevel);
  }
  const levelNumber = highestLevel ? highestLevel.level_number + 1 : 1;

  console.log(
    "Creating level with number:",
    levelNumber,
    "for gameId:",
    gameId
  );
  const { error } = await supabase.from("level").insert([
    {
      game_id: gameId,
      level_number: levelNumber,
    },
  ]);
  if (error) throw error;

  const { data } = await supabase
    .from("level")
    .select("level_id")
    .eq("game_id", gameId)
    .eq("level_number", levelNumber);
  if (!data || data.length === 0)
    throw new Error("Failed to retrieve the created level ID.");

  return data[0].level_id;
};
