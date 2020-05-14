import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Actions from './Actions';
import { syncWithShowRss } from '../../../api/feedParserApi';

jest.mock('../../../api/feedParserApi', () => ({ syncWithShowRss: jest.fn() }));

describe('When clicking the fetch new episodes button', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.resetAllMocks();
    });

    it('should render', (): void => {
        const { asFragment } = render(<Actions />);
        expect(asFragment()).toMatchSnapshot();
    });

    it(`should do nothing if successful`, async (): Promise<void> => {
        const { getByText } = render(<Actions />);
        (syncWithShowRss as jest.Mock).mockReturnValue(new Promise((resolve) => setTimeout(() => resolve(), 10)));

        const fetchButton = getByText('Fetch', { exact: false });
        fireEvent.click(fetchButton);

        expect(fetchButton.classList.contains('disabled')).toBeTruthy();
        expect(syncWithShowRss).toHaveBeenCalledTimes(1);
        act(() => {
            jest.advanceTimersByTime(10);
        });
        await act(async () => await Promise.resolve());
        expect(fetchButton.classList.contains('disabled')).toBeFalsy();
    });

    it(`should display an error when the request is unsuccessful`, async (): Promise<void> => {
        const { getByText } = render(<Actions />);
        (syncWithShowRss as jest.Mock).mockReturnValue(
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    reject('Error test');
                }, 10),
            ),
        );

        const fetchButton = getByText('Fetch', { exact: false });
        fireEvent.click(fetchButton);

        expect(fetchButton.classList.contains('disabled')).toBeTruthy();
        expect(syncWithShowRss).toHaveBeenCalledTimes(1);
        act(() => {
            jest.advanceTimersByTime(10);
        });

        await act(async () => await Promise.resolve());
        expect(fetchButton.classList.contains('disabled')).toBeTruthy();
    });
});
