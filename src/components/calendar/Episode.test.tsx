import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { addEpisodeDownloaded } from '../../api/usersApi';
import { useEpisodesSelectedDispatcher } from '../../HoC/withEpisodesSelectedContext';
import { QualityId } from '../../models/enums/Qualities';
import Episode from '../../models/Episode';
import { EpisodeSelectedActionTypes } from '../../reducers/episodeSelectedReducerActions';
import CalendarEpisode from './Episode';

jest.mock('../../api/usersApi', () => ({
    addEpisodeDownloaded: jest.fn(),
}));

jest.mock('../../HoC/withEpisodesSelectedContext', () => ({
    useEpisodesSelectedDispatcher: jest.fn(),
}));

jest.mock('../../HoC/withEpisodeActionContext', () => {
    return {
        useEpisodeActionContext: jest.fn().mockReturnValue({ downloadState: false, markDownloadedSate: jest.fn() }),
    };
});

jest.mock('../../hooks/useIsToday', () => {
    const actual = jest.requireActual('../../hooks/useIsToday');
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(actual.default),
    };
});

const placeholderDate = new Date();

const baseEpisode = {
    id: 526,
    title: 'Test episode title',
    show: 'Test show title',
    publishedDate: placeholderDate,
    quality: 1,
    link: 'http://example.com',
    repack: false,
    downloaded: false,
    season: 1,
    number: 1,
    airDate: undefined,
};

const numberedEpisode = {
    ...baseEpisode,
    season: 1,
    number: 8,
    airDate: undefined,
};

const datedEpisode = {
    ...baseEpisode,
    season: undefined,
    number: undefined,
    airDate: '22nd May 2020',
};

const repackEpisode = {
    ...baseEpisode,
    repack: true,
};

const downloadedEpisode = {
    ...baseEpisode,
    downloaded: true,
};

const standardDefEpisode = {
    ...baseEpisode,
    quality: 1,
};

const p720Episode = {
    ...baseEpisode,
    quality: 2,
};

const p1080Episode = {
    ...baseEpisode,
    quality: 2,
};

const mockUseEpisodesSelectedDispatcher = jest.fn(
    (type: EpisodeSelectedActionTypes): EpisodeSelectedActionTypes => {
        return type;
    },
);

beforeEach(() => {
    (useEpisodesSelectedDispatcher as jest.Mock).mockReturnValue(mockUseEpisodesSelectedDispatcher);
});

afterEach(async () => {
    await cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
});

describe('When the component is rendered', () => {
    it.each`
        episode
        ${numberedEpisode}
        ${datedEpisode}
        ${repackEpisode}
        ${downloadedEpisode}
        ${standardDefEpisode}
        ${p720Episode}
        ${p1080Episode}
    `('should display episode details', ({ episode }: { episode: Episode }) => {
        const { getByText, getByTestId, queryByTestId, queryByText, debug } = render(<CalendarEpisode {...episode} />);

        expect(getByTestId('episode-show-title', { exact: false }).textContent).toEqual(episode.show);

        const airDetailsText = getByTestId('episode-air-details', { exact: false }).textContent;
        if (episode.airDate !== undefined) expect(airDetailsText).toEqual(`(${episode.airDate})`);
        else expect(airDetailsText).toEqual(`(${episode.season}x${episode.number})`);

        if (episode.repack) expect(getByTestId('episode-replay-marker', { exact: false })).toBeTruthy();
        else expect(queryByTestId('episode-replay-marker')).toBeNull();

        if (episode.downloaded)
            expect(getByTestId('episode-wrapper', { exact: false }).getAttribute('class')).toContain('downloaded');

        const qualityIndicatorElement = getByTestId('episode-quality-indicator');
        if (episode.quality === QualityId.StandardDef) {
            expect(qualityIndicatorElement.getAttribute('class')).toContain('standard-def');
        } else if (episode.quality === QualityId.P720) {
            expect(qualityIndicatorElement.getAttribute('class')).toContain('p720');
        } else if (episode.quality === QualityId.P1080) {
            expect(qualityIndicatorElement.getAttribute('class')).toContain('p1080');
        }
    });
});

describe('When the episode is clicked', () => {
    it('should trigger a download', () => {
        const mockOpen = jest.fn();
        (global as any).open = mockOpen;
        const { getByTestId, debug } = render(<CalendarEpisode {...baseEpisode} />);
        fireEvent.click(getByTestId('episode-show-title', { exact: false }));

        expect(mockOpen).toBeCalledWith('http://example.com', '_blank');
        expect(getByTestId('episode-wrapper', { exact: false }).getAttribute('class')).toContain('downloaded');
        expect(addEpisodeDownloaded as jest.Mock).toHaveBeenCalledWith(baseEpisode.id);
    });
});

describe('When the user interacts with the checkbox', () => {
    it('should send a select action to the reducer when the checkbox is switched on', () => {
        const { getByTestId, debug } = render(<CalendarEpisode {...baseEpisode} />);
        const selectionCheckbox = getByTestId(`episode-checkbox-${baseEpisode.id}`);
        fireEvent.click(selectionCheckbox);
        expect(mockUseEpisodesSelectedDispatcher).toHaveBeenCalledTimes(1);
        expect(mockUseEpisodesSelectedDispatcher).toHaveBeenCalledWith({
            type: EpisodeSelectedActionTypes.SELECTED,
        });
    });

    it('should send a deselect action to the reducer when the checkbox is switched off', () => {
        const { getByTestId, debug } = render(<CalendarEpisode {...baseEpisode} />);
        const selectionCheckbox = getByTestId(`episode-checkbox-${baseEpisode.id}`);
        fireEvent.click(selectionCheckbox);
        fireEvent.click(selectionCheckbox);
        expect(mockUseEpisodesSelectedDispatcher).toHaveBeenCalledTimes(2);
        expect(mockUseEpisodesSelectedDispatcher).toHaveBeenLastCalledWith({
            type: EpisodeSelectedActionTypes.DESELECTED,
        });
    });
});
