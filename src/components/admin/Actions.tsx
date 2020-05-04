import React from 'react';
import Panel from '../common/panel';
import ButtonGroup from '../common/button/ButtonGroup';
import { ButtonProps } from '../common/button/Button';
import * as feedParserApi from '../../api/feedParserApi';
import './AdminActions.scss';

const AdminActions: React.FC = (): JSX.Element => {
    async function handleFetchNewEpisodesClicked(): Promise<void> {
        await feedParserApi.syncWithShowRss();
    }

    const buttons = [{ label: 'Fetch New Episodes', onClick: handleFetchNewEpisodesClicked }] as ButtonProps[];

    return (
        <Panel title="Actions">
            <ButtonGroup buttons={buttons} className="admin-actions" />
        </Panel>
    );
};

export default AdminActions;
