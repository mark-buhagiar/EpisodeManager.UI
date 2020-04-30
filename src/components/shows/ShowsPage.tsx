import React from 'react';
import Filters from './Filters';

const ShowsPage: React.FC = (): JSX.Element => {
    async function handleSearchClicked(selectedShowId: number | null): Promise<void> {
        console.log(`SEARCH: Selected ${selectedShowId}`);
    }
    return (
        <>
            <Filters onSubmit={handleSearchClicked} />
        </>
    );
};

export default ShowsPage;
