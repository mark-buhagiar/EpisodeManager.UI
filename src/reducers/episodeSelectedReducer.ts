import { EpisodeSelectedAction, EpisodeSelectedActionTypes } from './episodeSelectedReducerActions';

const episodeSelectedReducer = (state: number, action: EpisodeSelectedAction): number => {
    switch (action.type) {
        case EpisodeSelectedActionTypes.SELECTED: {
            return state + 1;
        }
        case EpisodeSelectedActionTypes.DESELECTED: {
            return state - 1;
        }
        default:
            return state;
    }
};

export default episodeSelectedReducer;
