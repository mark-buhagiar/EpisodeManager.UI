import React, { createContext, useContext, useState } from 'react';

type EpisodeActionContext = {
    dispatchDownload: React.Dispatch<string>;
    dispatchMarkDownloaded: React.Dispatch<string>;
    downloadState: string;
    markDownloadedSate: string;
};

const EpisodeActionContext = createContext<EpisodeActionContext | null>(null);

export const withEpisodeActionContext = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FunctionComponent<P> => (props: P): JSX.Element => {
    const [markDownloadedSate, dispatchMarkDownloaded] = useState<string>('');
    const [downloadState, dispatchDownload] = useState<string>('');
    const state = { dispatchMarkDownloaded, markDownloadedSate, downloadState, dispatchDownload };

    return (
        <EpisodeActionContext.Provider value={state}>
            <WrappedComponent {...props} />
        </EpisodeActionContext.Provider>
    );
};

export const useEpisodeActionContext = (): EpisodeActionContext => {
    const contextVal = useContext(EpisodeActionContext);
    if (contextVal !== null) return contextVal;
    throw Error('EpisodeActionContext was not initialized');
};
