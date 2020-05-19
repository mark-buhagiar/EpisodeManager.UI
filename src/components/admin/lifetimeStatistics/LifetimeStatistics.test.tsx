import { cleanup, render, wait } from '@testing-library/react';
import React from 'react';
import { getEpisodeCountQualityDistribution, getTotalShowCount } from '../../../api/showsApi';
import { getTotalUserCount } from '../../../api/usersApi';
import { QualityId } from '../../../models/enums/Qualities';
import LifetimeStatistics from './LifetimeStatistics';

const totalUserCountResult = 12;
const totalShowCountResult = 11;
const qualityDistribution = [
    {
        count: 31,
        quality: 1,
    },
    {
        count: 31,
        quality: 2,
    },
    {
        count: 27,
        quality: 3,
    },
];

jest.mock('../../../api/usersApi', () => ({
    getTotalUserCount: jest.fn(),
}));

jest.mock('../../../api/showsApi', () => ({
    getEpisodeCountQualityDistribution: jest.fn(),
    getTotalShowCount: jest.fn(),
}));

afterEach(async () => {
    await cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
});

describe('When the component is rendered', () => {
    afterEach(async () => {
        await cleanup();
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it('should display a loading indicator while data is being retrieved', async (): Promise<void> => {
        (getEpisodeCountQualityDistribution as jest.Mock).mockResolvedValue(qualityDistribution);
        (getTotalUserCount as jest.Mock).mockResolvedValue(totalUserCountResult);
        (getTotalShowCount as jest.Mock).mockResolvedValue(totalShowCountResult);

        const { getByRole, asFragment } = render(<LifetimeStatistics />);

        expect(getByRole('progressbar')).toBeTruthy();
        expect(asFragment()).toMatchSnapshot();

        await wait();
    });

    it('should display a metadata once data is retrieved', async (): Promise<void> => {
        (getEpisodeCountQualityDistribution as jest.Mock).mockResolvedValue(qualityDistribution);
        (getTotalUserCount as jest.Mock).mockResolvedValue(totalUserCountResult);
        (getTotalShowCount as jest.Mock).mockResolvedValue(totalShowCountResult);

        const { asFragment, queryByRole } = render(<LifetimeStatistics />);
        await wait();

        expect(queryByRole('progressbar')).toBeNull();
        expect(asFragment()).toMatchSnapshot();
    });

    it.each`
        usersError | showsError | distributionError
        ${false}   | ${false}   | ${false}
        ${false}   | ${false}   | ${true}
        ${false}   | ${true}    | ${false}
        ${false}   | ${true}    | ${true}
        ${true}    | ${false}   | ${false}
        ${true}    | ${false}   | ${true}
        ${true}    | ${true}    | ${false}
        ${true}    | ${true}    | ${true}
    `(
        'should display successful requests if a request fails',
        async ({ usersError, showsError, distributionError }): Promise<void> => {
            const errorResult = new Error('test error');

            if (distributionError) (getEpisodeCountQualityDistribution as jest.Mock).mockRejectedValue(errorResult);
            else (getEpisodeCountQualityDistribution as jest.Mock).mockResolvedValue(qualityDistribution);

            if (showsError) (getTotalShowCount as jest.Mock).mockRejectedValue(errorResult);
            else (getTotalShowCount as jest.Mock).mockResolvedValue(totalShowCountResult);

            if (usersError) (getTotalUserCount as jest.Mock).mockRejectedValue(errorResult);
            else (getTotalUserCount as jest.Mock).mockResolvedValue(totalUserCountResult);

            const { getByText } = render(<LifetimeStatistics />);
            await wait();

            if (usersError) expect(getByText(`# of users: N/A`)).toBeTruthy();
            else expect(getByText(`# of users: ${totalUserCountResult}`)).toBeTruthy();

            if (distributionError) expect(getByText(`Quality distribution N/A`)).toBeTruthy();
            else {
                expect(
                    getByText(
                        `# of episodes (Standard definition): ${
                            qualityDistribution.find((x) => x.quality === QualityId.StandardDef)?.count
                        }`,
                    ),
                ).toBeTruthy();
                expect(
                    getByText(
                        `# of episodes (720p): ${qualityDistribution.find((x) => x.quality === QualityId.P720)?.count}`,
                    ),
                ).toBeTruthy();
                expect(
                    getByText(
                        `# of episodes (1080p): ${
                            qualityDistribution.find((x) => x.quality === QualityId.P1080)?.count
                        }`,
                    ),
                ).toBeTruthy();
            }

            if (showsError) expect(getByText(`# of shows: N/A`)).toBeTruthy();
            else expect(getByText(`# of shows: ${totalShowCountResult}`)).toBeTruthy();
        },
    );
});
