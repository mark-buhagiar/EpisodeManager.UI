export enum EpisodeSelectedActionTypes {
    SELECTED = 1,
    DESELECTED = 2,
}

export type EpisodeSelectedAction =
    | { type: EpisodeSelectedActionTypes.SELECTED }
    | { type: EpisodeSelectedActionTypes.DESELECTED };
