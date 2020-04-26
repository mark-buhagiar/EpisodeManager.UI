import React, { createContext, useContext, useReducer } from 'react';
import episodeSelectedReducer from '../reducers/episodeSelectedReducer';
import { EpisodeSelectedAction } from '../reducers/episodeSelectedReducerActions';

type EpisodesSelectedDispatcherContextType = React.Dispatch<EpisodeSelectedAction> | null;
type EpisodesSelectedListenerContextType = number | null;

const EpisodesSelectedDispatcherContext = createContext<EpisodesSelectedDispatcherContextType>(null);
const EpisodesSelectedListenerContext = createContext<EpisodesSelectedListenerContextType>(null);

export const withEpisodesSelectedContext = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> => (props: P): JSX.Element => {
    const [episodesSelected, dispatcher] = useReducer(episodeSelectedReducer, 0);
    return (
        <EpisodesSelectedDispatcherContext.Provider value={dispatcher}>
            <EpisodesSelectedListenerContext.Provider value={episodesSelected}>
                <WrappedComponent {...props} />
            </EpisodesSelectedListenerContext.Provider>
        </EpisodesSelectedDispatcherContext.Provider>
    );
};

export const useEpisodesSelectedDispatcher = (): React.Dispatch<EpisodeSelectedAction> => {
    const contextVal = useContext(EpisodesSelectedDispatcherContext);
    if (!contextVal) throw Error('EpisodesSelectedDispatcherContext was not initialized');
    return contextVal;
};

export const useEpisodesSelectedListener = (): number => {
    const contextVal = useContext(EpisodesSelectedListenerContext);
    if (contextVal !== null) return contextVal;
    throw Error('EpisodesSelectedListenerContext was not initialized');
};
