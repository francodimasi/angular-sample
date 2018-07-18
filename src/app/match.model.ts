import { Predicted } from "./prediction.model";
import { Score } from "./score.model";

export interface Match {
    localTeam: Team;
    visitorTeam: Team;
    createdAt: number;
    updatedAt: number;
    id: string;
    tournamentStage: number;
    matchTime: string;
    localTeamScore?: number;
    visitorTeamScore?: number;
    prediction?: Predicted;
    score?: Score;
    canBet?: boolean;
    points?: number;
  }

interface Team {
  createdAt: number;
  updatedAt: number;
  id: string;
  name: string;
  img: string;
}