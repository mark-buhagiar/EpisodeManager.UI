import React from 'react';
import { v4 as uuid } from 'uuid';
import { useEpisodeActionContext } from '../../HoC/withEpisodeActionContext';
import { useEpisodesSelectedListener } from '../../HoC/withEpisodesSelectedContext';
import { ButtonProps } from '../common/button/Button';
import ButtonGroup from '../common/button/ButtonGroup';

interface Props {
    className: string;
}

const Actions: React.FC<Props> = ({ className }): JSX.Element => {
    const episodesSelected = useEpisodesSelectedListener();
    const { dispatchDownload, dispatchMarkDownloaded } = useEpisodeActionContext();

    const handleOnClick = (dispatcher: React.Dispatch<React.SetStateAction<any>>): void => {
        dispatcher(uuid());
    };

    const enabled = (): boolean => episodesSelected > 0;

    const buttons = [
        { label: 'Download', enabled: enabled(), onClick: (): void => handleOnClick(dispatchDownload) } as ButtonProps,
        {
            label: 'Mark Downloaded',
            enabled: enabled(),
            onClick: (): void => handleOnClick(dispatchMarkDownloaded),
        } as ButtonProps,
    ] as ButtonProps[];

    return enabled() ? <ButtonGroup className={className} buttons={buttons} /> : <></>;
};

export default Actions;
