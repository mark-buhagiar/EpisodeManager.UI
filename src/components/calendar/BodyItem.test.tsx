import { cleanup, render } from '@testing-library/react';
import React from 'react';
import CalendarBodyItem from './BodyItem';
import moment from 'moment';
import useIsToday from '../../hooks/useIsToday';

jest.mock('../../HoC/withEpisodesSelectedContext', () => {
    return {
        useEpisodesSelectedDispatcher: jest.fn(),
    };
});

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

const episodes = [
    {
        id: 526,
        title: 'Episode 8',
        show: 'First show',
        publishedDate: placeholderDate,
        season: 1,
        number: 8,
        airDate: null,
        quality: 2,
        repack: false,
        link: 'alink',
        downloaded: false,
    },
    {
        id: 529,
        title: '',
        show: 'Second Show',
        publishedDate: placeholderDate,
        season: 1,
        number: 1,
        airDate: null,
        quality: 1,
        repack: true,
        link: 'blink',
        downloaded: false,
    },
];

afterEach(async () => {
    await cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
});

describe('When the component is rendered', () => {
    it.each`
        date
        ${new Date(2020, 3, 1)}
        ${new Date(2020, 3, 10)}
    `('should display a date label (date= $date)', ({ date }: { date: Date }) => {
        const { getByTestId } = render(<CalendarBodyItem date={date} episodes={[]} />);
        if (date.getDate() === 1)
            expect(getByTestId('month-date', { exact: false }).textContent).toEqual(moment(date).format('MMMMD'));
        else expect(getByTestId('month-date', { exact: false }).textContent).toEqual(moment(date).format('D'));
    });

    it('should display the episodes passed down as props', () => {
        const { getByText } = render(<CalendarBodyItem date={new Date()} episodes={episodes} />);
        episodes.forEach((episode) => {
            expect(getByText(episode.show)).toBeTruthy();
        });
    });

    it.each`
        isToday
        ${true}
        ${false}
    `('should be highlighted when the date is today (isToday = $isToday)', ({ isToday }: { isToday: boolean }) => {
        (useIsToday as jest.Mock).mockReturnValue(isToday);
        const { getByTestId } = render(<CalendarBodyItem date={new Date()} episodes={episodes} />);
        if (isToday)
            expect(getByTestId('calendar-body-item', { exact: false }).getAttribute('class')).toContain('date-today');
        else
            expect(getByTestId('calendar-body-item', { exact: false }).getAttribute('class')).not.toContain(
                'date-today',
            );
    });
});
