export interface Prediction {
    match: string;
    user?: string;
    localTeam: string;
    localScorePrediction: number;
    visitorTeam: string;
    visitorScorePrediction: number;
}

export interface Predicted {
    id: string;
    predictionTime: number;
    localScorePrediction: number;
    visitorScorePrediction: number;
    match: MatchDetail;
}

interface MatchDetail {
    id: string;
    matchTime: string;
    localTeam: string;
    visitorTeam: string;
}