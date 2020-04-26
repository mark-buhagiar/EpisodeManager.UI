import React, { useState } from 'react';
import Episode from '../../models/Episode';
import { Quality, QualityDescriptions } from '../../models/enums/Qualities';
import { useEpisodesSelectedDispatcher } from '../../HoC/withEpisodesSelectedContext';
import { EpisodeSelectedActionTypes } from '../../reducers/episodeSelectedReducerActions';

const CalendarEpisode: React.FC<Episode> = (episode: Episode): JSX.Element => {
    const episodeSelectedDispatcher = useEpisodesSelectedDispatcher();
    const [isSelected, setIsSelected] = useState<boolean>(false);

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

    const airDetails = (): string => {
        if (!!episode.airDate) return `(${episode.airDate})`;
        if (!!episode.season && !!episode.number) return `(${episode.season}x${episode.number})`;
        return '';
    };

    const getQualityIndicator = (): string => {
        switch (episode.quality) {
            case Quality.StandardDef:
                return 'standard-def';
            case Quality.P720:
                return 'p720';
            case Quality.P1080:
                return 'p1080';
            default:
                return '';
        }
    };

    const getQualityDescription = (): string => {
        switch (episode.quality) {
            case Quality.StandardDef:
                return QualityDescriptions.standardDef;
            case Quality.P720:
                return QualityDescriptions.p720;
            case Quality.P1080:
                return QualityDescriptions.p1080;
            default:
                return '';
        }
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
        <div className={`episode ${episode.downloaded ? 'downloaded' : ''}`}>
            <input className="checkbox" type="checkbox" onChange={toggleEpisodeSelected} checked={isSelected} />

            <div className="details">
                <span title={episode.show} className="show-name">
                    {episode.show}
                </span>
                <span className="file-details">
                    <span title={episode.title} className="air-details">
                        {airDetails()}
                    </span>
                    <span title={getQualityDescription()} className={`dot ${getQualityIndicator()}`}></span>
                    {getRepackIcon()}
                </span>
            </div>
        </div>
    );
};

export default CalendarEpisode;
