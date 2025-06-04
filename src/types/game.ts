import type { GameTypes } from "./enums/gameTypes.enum";

export interface Game {
  game_id: string;
  name: string;
  description: string;
  category: string;
  type: GameTypes;
  created_at: string;
  updated_at: string;
  educator_id: string;
  picture_url: string | null;
  total_hints: number;
}

