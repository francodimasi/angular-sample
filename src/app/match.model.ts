import { Predicted } from "./prediction.model";

export interface Match {
    localTeam: Team;
    visitorTeam: Team;
    createdAt: number;
    updatedAt: number;
    id: string;
    tournamentStage: number;
    matchTime: string;
    prediction?: Predicted;
    canBet?: boolean;
  }

interface Team {
  createdAt: number;
  updatedAt: number;
  id: string;
  name: string;
  img: string;
}