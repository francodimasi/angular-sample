export interface Score {
    id: string;
    points: number;
    bonus: number;
    multiplier: number;
    match: Match;
    prediction: Prediction;
}

interface Match {
    id: string;
    matchTime: string;
    localTeamScore: number;
    visitorTeamScore: number;
    localTeam: string;
    visitorTeam: string;
}

interface Prediction {
    id: string;
    predictionTime: number;
    predictionIdAI: number;
    localScorePrediction: number;
    visitorScorePrediction: number;
    match: string;
    localTeam: string;
    visitorTeam: string;
}