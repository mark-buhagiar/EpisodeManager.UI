import React from 'react';
import ActionButton from './ActionButton';
import { useEpisodesSelectedListener } from '../../HoC/withEpisodesSelectedContext';
import './Button.scss';

interface Props {
    className: string;
}

const Actions: React.FC<Props> = ({ className }): JSX.Element => {
    const episodesSelected = useEpisodesSelectedListener();

    const component = (): JSX.Element => {
        return episodesSelected > 0 ? (
            <div className={`button-group ${className}`}>
                <ActionButton
                    dispatch={(null as unknown) as React.Dispatch<any>}
                    enabled={episodesSelected > 0}
                    label="Download"
                ></ActionButton>
                <ActionButton
                    dispatch={(null as unknown) as React.Dispatch<any>}
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
