import { GameTypes } from "../types/enums/gameTypes.enum";
import type { Game } from "../types/game";
import { supabase } from "../utils/supabaseClient";
import { Observable } from "rxjs";

export const getMemoryGames = async () => {
  let { data: games, error } = await supabase
    .from("game")
    .select("*")
    .eq("type", GameTypes.MEMORY_MATCH);
  console.log(games);
  if (error) throw error;
  return games as Game[];
};

export const addScreen = (
  formData: any,
  pairImages: File[] = []
): Observable<{ msg: string; type: "info" | "success" | "error" }> => {
  return new Observable((subscriber) => {
    (async () => {
      try {
        const gameId = formData.gameId;
        const instruction = formInstructionTranslationJson(formData);
        subscriber.next({ msg: "Getting highest level...", type: "info" });
        let levelId = await getHighestLevel(gameId);
        if (!levelId) {
          subscriber.next({
            msg: "No level found. Creating new level...",
            type: "info",
          });
          levelId = await createLevel(gameId);

          subscriber.next({ msg: "New level created.", type: "success" });
        }

        subscriber.next({
          msg: "Checking highest screen number...",
          type: "info",
        });
        let screenNumber = 1;
        const highestScreenNumber = await getHighestScreenNumber(
          levelId.level_id
        );
        if (highestScreenNumber !== undefined) {
          screenNumber = highestScreenNumber + 1;
        }

        subscriber.next({ msg: "Inserting new screen...", type: "info" });

        const screenId = await createScreen(
          levelId.level_id,
          instruction,
          screenNumber,
          GameTypes.MEMORY
        );

        subscriber.next({
          msg: "Screen created successfully!",
          type: "success",
        });

        subscriber.next({ msg: "Uploading image pairs...", type: "info" });
        await addScreenOptions(screenId, pairImages);
        subscriber.next({ msg: "Images added successfully!", type: "success" });

        subscriber.complete();
      } catch (err: any) {
        subscriber.error(err);
      }
    })();

    return () => {};
  });
};

export const addNewLevelScreen = (
  formData: any,
  pairImages: File[] = []
): Observable<{ msg: string; type: "info" | "success" | "error" }> => {
  return new Observable((subscriber) => {
    (async () => {
      try {
        const gameId = formData.gameId;
        const instruction = formInstructionTranslationJson(formData);
        subscriber.next({ msg: "Creating new level...", type: "info" });
        const levelId = await createLevel(gameId);
        subscriber.next({
          msg: "Level created successfully!",
          type: "success",
        });

        subscriber.next({
          msg: "Creating screen for new level...",
          type: "info",
        });
        const { error } = await supabase.from("screen").insert([
          {
            level_id: levelId,
            screen_number: 1,
            instruction: instruction,
            type: GameTypes.MEMORY,
          },
        ]);
        if (error) throw new Error("Error creating screen.");
        subscriber.next({
          msg: "Screen created successfully!",
          type: "success",
        });

        const screenId = await getScreenId(levelId, 1);

        subscriber.next({ msg: "Uploading image pairs...", type: "info" });
        await addScreenOptions(screenId, pairImages);
        subscriber.next({ msg: "Images added successfully!", type: "success" });

        subscriber.complete();
      } catch (err: any) {
        subscriber.error(err);
      }
    })();

    return () => {};
  });
};

export const addNewMemoryGame = (
  formData: any,
  pairImages: File[]
): Observable<{ msg: string; type: "info" | "success" | "error" }> => {
  return new Observable((subscriber) => {
    const { category } = formData;
    const { name, description, instruction } = formTranslationJson(formData);

    (async () => {
      try {
        console.log("Creating memory game with name:", name);
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

        const screenId = await createScreen(
          levelId,
          instruction,
          1,
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

    return () => {};
  });
};

//utility functions
const formInstructionTranslationJson = (formData: any) => {
  const { instructionFrench, instructionEnglish, instructionArabic } = formData;
  const instructionTranslation = {
    fr: instructionFrench,
    en: instructionEnglish,
    ar: instructionArabic,
  };
  return JSON.stringify(instructionTranslation);
};

const formTranslationJson = (formData: any) => {
  const {
    nameFrench,
    nameEnglish,
    nameArabic,
    descriptionFrench,
    descriptionEnglish,
    descriptionArabic,
    instructionFrench,
    instructionEnglish,
    instructionArabic,
  } = formData;
  const name = {
    fr: nameFrench,
    en: nameEnglish,
    ar: nameArabic,
  };
  const descriptionTranslation = {
    fr: descriptionFrench,
    en: descriptionEnglish,
    ar: descriptionArabic,
  };
  const instructionTranslation = {
    fr: instructionFrench,
    en: instructionEnglish,
    ar: instructionArabic,
  };
  return {
    name: JSON.stringify(name),
    description: JSON.stringify(descriptionTranslation),
    instruction: JSON.stringify(instructionTranslation),
  };
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
  let { data: level } = await supabase
    .from("level")
    .select("*")
    .eq("game_id", gameId)
    .order("level_number", { ascending: false })
    .limit(1);
  if (level && level.length > 0) {
    return level[0];
  }
  return null;
};

const getHighestScreenNumber = async (levelId: string) => {
  let { data: screen, error } = await supabase
    .from("screen")
    .select("screen_number")
    .eq("level_id", levelId)
    .order("screen_number", { ascending: false })
    .limit(1);
  console.log(screen);
  if (screen && screen.length > 0) {
    console.log("highest screen number for the level", screen[0].screen_number);
    return screen[0].screen_number;
  }
  if (error) throw error;
};

const createScreen = async (
  levelId: string,
  instruction: string,
  screenNumber: number,
  type: GameTypes
) => {
  const { error } = await supabase.from("screen").insert([
    {
      level_id: levelId,
      screen_number: screenNumber,
      instruction: instruction,
      type: type,
    },
  ]);
  if (error) throw new Error("Error creating screen.");
  console.log("Screen created successfully");

  const screenId = await getScreenId(levelId, screenNumber);

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
