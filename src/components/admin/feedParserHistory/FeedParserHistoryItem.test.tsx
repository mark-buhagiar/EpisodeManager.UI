import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { getParseHistoryDetails, forceSyncParseHistory } from '../../../api/feedParserApi';
import { toDateAndTimeFormat } from '../../../helpers/dateHelpers';
import FeedParserHistoryItem from './FeedParserHistoryItem';
import { act } from 'react-dom/test-utils';

jest.mock('../../../api/feedParserApi', () => ({
    getParseHistoryDetails: jest.fn(),
    forceSyncParseHistory: jest.fn(),
}));

const parseHistoryItem = {
    id: 28,
    retrievedOn: moment('2020-04-13T15:28:27.751938').toDate(),
    lastSyncedOn: moment('2020-04-13T15:28:27.751938').toDate(),
    episodeCount: 100,
    syncCount: 1,
    success: true,
};

const parseHistoryDetails = {
    id: 28,
    episodeTitles: [
        'Good Witch 6x01 The Anniversary 1080p',
        'MasterChef (AU) 12x12 1080p',
        'MasterChef (AU) 12x13 1080p',
        'MasterChef (AU) 12x14 Immunity Challenge: Time Auction 1080p',
        'MasterChef (AU) 12x15 Elimination Challenge: Texture 1080p',
        'Bar Rescue 7x10 Raging Turkey 720p',
        'American Idol 18x14 On with the Show: Homeward Bound',
        'The Rookie 2x19 The Q Word 1080p',
        'American Idol 18x14 On with the Show: Homeward Bound 720p',
        'Bar Rescue 7x10 Raging Turkey 1080p',
        'Good Girls 3x11 Synergy 1080p',
    ],
};

afterEach(async () => {
    await cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
});

describe('When the component is rendered', () => {
    it('should display a summary as the accordion header', async (): Promise<void> => {
        const { getByText, asFragment, getByTitle } = render(
            <FeedParserHistoryItem parseHistoryItem={parseHistoryItem} />,
        );
        expect(getByText(toDateAndTimeFormat(moment(parseHistoryItem.lastSyncedOn)))).toBeTruthy();
        expect(getByText(parseHistoryItem.success ? 'Success' : 'Failure')).toBeTruthy();
        expect(getByTitle('Episode count').textContent).toEqual(String(parseHistoryItem.episodeCount));
        expect(asFragment()).toMatchSnapshot();
    });
});

async function expandAccordion(getByRoleScope: any): Promise<void> {
    fireEvent.click(getByRoleScope('button'));
    await wait();
}

describe('When the accordion header is clicked', () => {
    it('should display a loading indicator while additional details are being retrieved', async (): Promise<void> => {
        const { asFragment, getByRole } = render(<FeedParserHistoryItem parseHistoryItem={parseHistoryItem} />);
        (getParseHistoryDetails as jest.Mock).mockResolvedValue({});
        fireEvent.click(getByRole('button'));

        expect(asFragment()).toMatchSnapshot();
        expect(getByRole('progressbar')).toBeTruthy();
        await wait();
    });

    it('should display the retrieved details and the force sync button', async (): Promise<void> => {
        const { asFragment, getByRole, queryByRole, getAllByTestId, getByText } = render(
            <FeedParserHistoryItem parseHistoryItem={parseHistoryItem} />,
        );
        (getParseHistoryDetails as jest.Mock).mockResolvedValue({ ...parseHistoryDetails });

        await expandAccordion(getByRole);

        const sortedEpisodeTitles = [...parseHistoryDetails.episodeTitles];
        sortedEpisodeTitles.sort((a, b) => (a > b ? 1 : -1));
        const episodesOnPage = getAllByTestId('episode-title');
        sortedEpisodeTitles.forEach((title, index) => expect(episodesOnPage[index].textContent).toEqual(title));
        expect(getByText('Force Re-sync')).toBeTruthy();
        expect(queryByRole('progressbar')).toBeNull();
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('When the Force Re-sync button is clicked', () => {
    it('should make a request to the web-service', async () => {
        jest.useFakeTimers();
        const { getByRole, getByText } = render(<FeedParserHistoryItem parseHistoryItem={parseHistoryItem} />);
        (getParseHistoryDetails as jest.Mock).mockResolvedValue({ ...parseHistoryDetails });
        (forceSyncParseHistory as jest.Mock).mockImplementation((parseId: number) => Promise.resolve(parseId));
        await expandAccordion(getByRole);

        fireEvent.click(getByText('Force Re-sync'));
        expect(getByText('Force Re-sync').getAttribute('class')?.includes('disabled')).toBeTruthy();
        expect(forceSyncParseHistory).toHaveBeenCalledWith(parseHistoryDetails.id);
        await wait();
        expect(getByText('Force Re-sync').getAttribute('class')?.includes('disabled')).toBeFalsy();
    });
});
