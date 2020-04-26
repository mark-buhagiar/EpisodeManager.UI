import React from 'react';
import ActionButton from './ActionButton';
import { useEpisodesSelectedListener } from '../../HoC/withEpisodesSelectedContext';

const Actions: React.FC = (): JSX.Element => {
    const episodesSelected = useEpisodesSelectedListener();

    const component = (): JSX.Element => {
        return episodesSelected > 0 ? (
            <>
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
            </>
        ) : (
            <></>
        );
    };

    return component();
};

export default Actions;
