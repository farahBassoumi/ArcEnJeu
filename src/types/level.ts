import type { GameTypes } from "./enums/gameTypes.enum";

export interface Level {
  level_id: string;
  game_id: string;
  level_number: number;
  instruction: string;
  instruction_image_url: string | null;
  type: GameTypes;
  created_at: string;
  updated_at: string;
}