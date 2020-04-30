import React, { useState, useEffect } from 'react';
import Episode from '../../models/Episode';
import QualityIndicator from '../qualityIndicator/QualityIndicator';
import { useEpisodesSelectedDispatcher } from '../../HoC/withEpisodesSelectedContext';
import { EpisodeSelectedActionTypes } from '../../reducers/episodeSelectedReducerActions';
import { useEpisodeActionContext } from '../../HoC/withEpisodeActionContext';
import { addEpisodeDownloaded } from '../../api/usersApi';

const CalendarEpisode: React.FC<Episode> = (episode: Episode): JSX.Element => {
    const episodeSelectedDispatcher = useEpisodesSelectedDispatcher();
    const { downloadState, markDownloadedSate } = useEpisodeActionContext();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isDownloaded, setIsDownloaded] = useState<boolean>(episode.downloaded);

    const toggleEpisodeSelected = (): void => {
        if (isSelected) {
            // We are going to DESELECT it
            episodeSelectedDispatcher({ type: EpisodeSelectedActionTypes.DESELECTED });
        } else {
            // We are going to SELECT it
            episodeSelectedDispatcher({ type: EpisodeSelectedActionTypes.SELECTED });
        }
        setIsSelected(!isSelected);
    };

    const markEpisodeDownloaded = (): void => {
        addEpisodeDownloaded(episode.id);
        setIsDownloaded(true);
    };

    const downloadEpisode = (): void => {
        //window.open(episode.link, '_blank');
        setIsDownloaded(true);
        markEpisodeDownloaded();
    };

    useEffect(() => {
        if (isSelected && downloadState.length > 0) {
            downloadEpisode();
            toggleEpisodeSelected();
        }
        // eslint-disable-next-line
    }, [downloadState]);

    useEffect(() => {
        if (isSelected && markDownloadedSate.length > 0) {
            if (!isDownloaded) markEpisodeDownloaded();
            toggleEpisodeSelected();
        }
        // eslint-disable-next-line
    }, [markDownloadedSate]);

    const airDetails = (): string => {
        if (!!episode.airDate) return `(${episode.airDate})`;
        if (!!episode.season && !!episode.number) return `(${episode.season}x${episode.number})`;
        return '';
    };

    const getRepackIcon = (): JSX.Element =>
        episode.repack ? (
            <span title="Repack" className="material-icons">
                replay
            </span>
        ) : (
            <></>
        );

    return (
        <div className={`episode ${isDownloaded ? 'downloaded' : ''}`}>
            <input className="checkbox" type="checkbox" onChange={toggleEpisodeSelected} checked={isSelected} />

            <div className="details">
                <span title={episode.show} className="show-name" onClick={downloadEpisode}>
                    {episode.show}
                </span>
                <span className="file-details">
                    <span title={episode.title} className="air-details">
                        {airDetails()}
                    </span>
                    <QualityIndicator qualityId={episode.quality} />
                    {getRepackIcon()}
                </span>
            </div>
        </div>
    );
};

export default CalendarEpisode;
