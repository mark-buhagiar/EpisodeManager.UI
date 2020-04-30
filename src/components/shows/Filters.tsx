import React, { useState } from 'react';
import Show from '../../models/Show';
import ShowFilter from './ShowFilter';
import ButtonGroup from '../common/button/ButtonGroup';
import { ButtonProps } from '../common/button/Button';
import './Filters.scss';

interface Props {
    onSubmit: (selectedShowId: number | null) => void;
}

const Filters: React.FC<Props> = ({ onSubmit }): JSX.Element => {
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);

    function handleFormSubmit(): void {
        onSubmit(selectedShow?.id ?? null);
    }
    const buttons = [
        { label: 'Search', onClick: handleFormSubmit, enabled: selectedShow !== null, submit: true },
    ] as ButtonProps[];

    function handleShowSelected(show: Show): void {
        setSelectedShow(show);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <ShowFilter onShowSelected={handleShowSelected} />
            <ButtonGroup className="search-button" buttons={buttons} />
        </form>
    );
};

export default Filters;
