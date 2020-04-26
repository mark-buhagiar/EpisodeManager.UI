import React from 'react';
import { useEpisodeActionContext } from '../../HoC/withEpisodeActionContext';
import { useEpisodesSelectedListener } from '../../HoC/withEpisodesSelectedContext';
import ActionButton from './ActionButton';
import './Button.scss';

interface Props {
    className: string;
}

const Actions: React.FC<Props> = ({ className }): JSX.Element => {
    const episodesSelected = useEpisodesSelectedListener();
    const { dispatchDownload, dispatchMarkDownloaded } = useEpisodeActionContext();

    const component = (): JSX.Element => {
        return episodesSelected > 0 ? (
            <div className={`button-group ${className}`}>
                <ActionButton
                    dispatch={dispatchDownload}
                    enabled={episodesSelected > 0}
                    label="Download"
                ></ActionButton>
                <ActionButton
                    dispatch={dispatchMarkDownloaded}
                    enabled={episodesSelected > 0}
                    label="Mark Watched"
                ></ActionButton>
            </div>
        ) : (
            <></>
        );
    };

    return component();
};

export default Actions;
