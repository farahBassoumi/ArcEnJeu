import type { GameTypes } from "./enums/gameTypes.enum";

export interface Screen {
  screen_id: string;
  level_id: string;
  screen_number: number;
  instruction: string;
  instruction_image_url: string | null;
  type: GameTypes;
  created_at: string;
  updated_at: string;
}
